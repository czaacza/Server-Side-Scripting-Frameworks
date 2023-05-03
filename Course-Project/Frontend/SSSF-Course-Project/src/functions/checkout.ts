import { getStoredUser } from '../api/users';
import { doGraphQLFetch } from '../graphql/fetch';
import { createOrderQuery } from '../graphql/queries';
import { Cart } from '../interfaces/Cart';
import { User } from '../interfaces/User';
import router from '../router';
import { getStoredCart } from './cartButton';
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripe: Stripe | null = null;
let card: any = null;

export const checkIfCheckoutAllowed = () => {
  if (sessionStorage.getItem('checkoutAllowed') !== 'true') {
    return false;
  } else {
    sessionStorage.removeItem('checkoutAllowed');
    return true;
  }
};

export const initCheckoutEventListeners = async () => {
  await initStripe();

  const cart = getStoredCart();
  if (!cart) return;
  const user = await getStoredUser();

  document
    .getElementById('place-order-button')
    ?.addEventListener('click', async (e) => {
      e.preventDefault();
      handleCheckoutButton(user as User, cart);
    });
};

const handleCheckoutButton = async (user: User, cart: Cart) => {
  if (!stripe) {
    console.log('Stripe is not initialized');
    return;
  }

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: card,
  });

  if (error) {
    return;
  } else {
    console.log('Payment method created successfully:', paymentMethod);
  }

  const order = await sendCreateOrderMutation(user as User, cart);
  if (order) {
    router.navigate('/order-confirmation');
    // sendOrderConfirmationEmail(order.details.email, `${JSON.stringify(order)}`);
  } else {
    // Show an error message
  }
};

async function sendCreateOrderMutation(user: User, cart: Cart) {
  const firstName = (document.getElementById('firstName') as HTMLInputElement)
    .value;
  const lastName = (document.getElementById('lastName') as HTMLInputElement)
    .value;
  const phone = (document.getElementById('phoneNumber') as HTMLInputElement)
    .value;
  const email = (document.getElementById('emailAddress') as HTMLInputElement)
    .value;
  const comments = (
    document.getElementById('orderComments') as HTMLInputElement
  ).value;

  const totalPrice = cart.total;

  const books = cart.books.map((cartItem) => {
    return {
      book: cartItem.book.id,
      quantity: cartItem.quantity,
    };
  });

  const orderInput = {
    userId: user.id,
    books,
    totalPrice,
    details: {
      firstName,
      lastName,
      phone,
      email,
      comments,
    },
    status: 'PLACED',
  };

  const variables = { orderInput };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    createOrderQuery,
    variables
  );

  if (!data) {
    return null;
  }

  return data.createOrder;
}

async function sendOrderConfirmationEmail(
  userEmail: string,
  orderDetails: string
): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_EMAIL_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, orderDetails }),
    });

    if (response.ok) {
      console.log('Email sent successfully.');
    } else {
      console.error('Error sending email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export const initStripe = async () => {
  const apiKey =
    'pk_test_51N3HUFADmiYDRA8PnlZPQeVHLulyqHggEeRESAbe2sgtktLf5n95mmHroeBbdW9xr3XdZus3uGRRIhqiKOrbe4eu00TrfI72Xf';
  stripe = await loadStripe(apiKey);
  if (stripe) {
    initStripeElements();
  } else {
    console.log('Failed to load Stripe');
  }
};

// Add this function inside your checkout.ts file
const initStripeElements = () => {
  if (!stripe) return;

  const elements = stripe.elements();

  const style = {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  };

  card = elements.create('card', { style });

  card.mount('#card-element');

  card.on('change', (event: any) => {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError!.textContent = event.error.message;
    } else {
      displayError!.textContent = '';
    }
  });
};
