// import { getStoredCart } from './cartButton';

import { connect } from 'net';

// export function increaseCartItemQuantity(bookId: string): void {
//   const cart = getStoredCart();
//   if (!cart) return;

//   const cartItem = cart.books.find((item) => item.book._id === bookId);
//   if (cartItem) {
//     cartItem.quantity++;
//     cart.total += cartItem.book.price;
//     setStoredCart(cart);
//   }
// }

// export function decreaseCartItemQuantity(bookId: string): void {
//   const cart = getStoredCart();
//   if (!cart) return;

//   const cartItemIndex = cart.books.findIndex(
//     (item) => item.book._id === bookId
//   );
//   if (cartItemIndex > -1) {
//     const cartItem = cart.books[cartItemIndex];
//     cartItem.quantity--;
//     cart.total -= cartItem.book.price;

//     if (cartItem.quantity === 0) {
//       cart.books.splice(cartItemIndex, 1);
//     }

//     setStoredCart(cart);
//   }
// }

// export function initQuantityButtonsEventListeners(): void {
//   const increaseButtons = document.querySelectorAll('[data-action="increase"]');
//   const decreaseButtons = document.querySelectorAll('[data-action="decrease"]');

//   increaseButtons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//       const bookId = (event.target as HTMLElement).closest('.card')?.dataset
//         .bookId;

//       increaseCartItemQuantity(bookId);
//     });
//   });

//   decreaseButtons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//       const bookId = (event.target as HTMLElement).closest('.card')?.dataset
//         .bookId;

//       decreaseCartItemQuantity(bookId);
//     });
//   });
// }

export const initCartEventListeners = () => {
  document.getElementById('checkout-button')?.addEventListener('click', () => {
    sessionStorage.setItem('checkoutAllowed', 'true');
  });
};
