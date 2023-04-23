import { Book } from '../interfaces/Book';
import { Cart } from '../interfaces/Cart';
import router from '../router';

export function addToCart(book: Book): void {
  let cart: Cart = getStoredCart() || {
    books: [],
    total: 0,
  };

  const index = cart.books.findIndex((item) => item.book._id === book._id);

  if (index !== -1) {
    cart.books[index].quantity += 1;
  } else {
    cart.books.push({ book, quantity: 1 });
  }

  cart.total += book.price;

  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartTotal();
}

export function initAddToCartButtons(): void {
  const addToCartButtons =
    document.querySelectorAll<HTMLButtonElement>('.add-to-cart-btn');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const bookData = button.dataset.book;

      if (bookData) {
        const book = JSON.parse(bookData);
        console.log('book', book);
        addToCart(book);
      }
    });
  });
}

export function updateCartTotal(): void {
  const storedCart = getStoredCart();

  if (storedCart) {
    const cartTotalPriceElements =
      document.querySelectorAll('.cart-total-price');
    cartTotalPriceElements.forEach((element) => {
      element.textContent = storedCart.total.toFixed(2);
    });

    updateDropdownMenu(storedCart);
  }
}

function updateDropdownMenu(storedCart: Cart): void {
  const cartItemsList = document.querySelector('.cart-items-list');
  if (cartItemsList) {
    cartItemsList.innerHTML = storedCart.books.length
      ? storedCart.books
          .map((cartItem) => {
            const book = cartItem.book;
            return `
              <li class="cart-item-entry">
                <div class="cart-item-image">
                  <img src="img/${book.image}" alt="" />
                </div>
                <div class="cart-item-info">
                  <div class="cart-item-title">${book.title}</div>
                  <div class="cart-item-author">${book.author}</div>
                  <div class="cart-item-quantity">Quantity: ${cartItem.quantity}</div>
                  <div class="cart-item-price">$${book.price}</div>
                </div>
              </li>
            `;
          })
          .join('')
      : `<li class="cart-item-entry">Your cart is empty</li>`;
  }
}

export function initCartButtonEventListener(): void {
  const cartButton = document.querySelector('.cart-item a');
  if (cartButton) {
    cartButton.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigate('/cart');
    });
  }
}

export function getStoredCart(): Cart | null {
  const storedCart = sessionStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : null;
}
