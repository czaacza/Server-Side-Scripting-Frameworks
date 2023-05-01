import { getStoredUser } from '../api/users';
import { doGraphQLFetch } from '../graphql/fetch';
import { createOrderQuery } from '../graphql/queries';
import { Cart } from '../interfaces/Cart';
import { User } from '../interfaces/User';
import router from '../router';
import { getStoredCart } from './cartButton';

export const checkIfCheckoutAllowed = () => {
  if (sessionStorage.getItem('checkoutAllowed') !== 'true') {
    return false;
  } else {
    sessionStorage.removeItem('checkoutAllowed');
    return true;
  }
};

export const initCheckoutEventListeners = async () => {
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
  console.log('place order button clicked');
  const order = await sendCreateOrderMutation(user as User, cart);
  if (order) {
    console.log('Order created successfully:', order);
    // Redirect to the order confirmation page or show a success message
    router.navigate('/order-confirmation');
    console.log(order);
  } else {
    console.log('Failed to create the order');
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
