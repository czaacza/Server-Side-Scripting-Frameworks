import { Cart } from '../../interfaces/Cart';
import popup from './popup';
import signin from './signin';

export default function navbar(user?: any, cart?: Cart): string {
  const navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
    <img src="/img/logo-no-bg-no-text.png" height="50" alt="Responsive image" />
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/"
          >Home <span class="sr-only">(current)</span></a
        >
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">About us</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Contact</a>
      </li>
      
      ${
        user
          ? `
      <li class="nav-item active">
        <a
          class="nav-link btn btn-account btn-primary"
          id="account-button"
          href="/account"
          >My account</a
        >
      </li>
      `
          : ''
      }

    </ul>

    <ul class="navbar-nav navbar-right">

    ${
      !user
        ? `
      <li class="nav-item active">
        <a
          class="nav-link btn signin-btn signin-button"
          id="signin-button"
          href="#"
          >Sign in</a
        >
      </li>
      <li class="nav-item active">
        <a
          class="nav-link btn btn-primary signup-btn popup-button"
          id="popup-button"
          href="#"
          >Sign up</a
        >
      </li>
      `
        : ''
    }

      ${
        user
          ? `<li class="nav-item active">
      <li class="nav-item active">
        <a
          class="nav-link btn btn-primary logout-btn"
          id="logout-button"
          href="#"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>

          Log out    
          </a
        >
        
      </li>
      `
          : ''
      }

      <li class="nav-item active cart-item">
        <a class="nav-link" href="/cart/"
          >$<span class="cart-total-price">
          ${cart && cart.total ? cart.total.toFixed(2) : '0.00'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
        </a>
        <div class="cart-dropdown">
      <ul class="cart-items-list">
        ${
          cart && cart.books && cart.books.length
            ? cart.books
                .map((cartItem) => {
                  const book = cartItem.book;
                  return `
                      <li class="cart-item-entry">
                        <div class="cart-item-image">
                          <img src="img/${book.image}" alt="book-image" />
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
            : `<li class="cart-item-entry">Your cart is empty</li>`
        }
      </ul>
      <div class="cart-total">Total: $<span class="cart-total-price">
      ${cart && cart.total ? cart.total.toFixed(2) : '0.00'}
      </span></div>
    </div>
      </li>
    </ul>
  </div>
</nav>

${popup()}
    
${signin()}

<div class="overlay"></div>


`;
  return navbar;
}
