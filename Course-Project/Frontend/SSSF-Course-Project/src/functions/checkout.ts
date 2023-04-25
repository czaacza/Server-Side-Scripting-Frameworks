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
      ``;
      const order = await sendCreateOrderMutation(user, cart);
      if (order) {
        console.log('Order created successfully:', order);
        // Redirect to the order confirmation page or show a success message
        router.navigate('/order-confirmation');
      } else {
        console.log('Failed to create the order');
        // Show an error message
      }
    });
};

async function sendCreateOrderMutation(user: User, cart: Cart) {
  const firstName = document.getElementById('firstName')?.value;
  const lastName = document.getElementById('lastName')?.value;
  const phone = document.getElementById('phoneNumber')?.value;
  const email = document.getElementById('emailAddress')?.value;
  const comments = document.getElementById('orderComments')?.value;

  const totalPrice = cart.total;
  const token = sessionStorage.getItem('token')?.slice(1, -1);

  const books = cart.books.map((cartItem) => {
    return {
      book: cartItem.book._id,
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
