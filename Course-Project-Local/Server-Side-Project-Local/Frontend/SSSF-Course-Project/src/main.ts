// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import '../public/css/style.css';
import '../public/css/testimonials.css';
import '../public/css/products.css';
import '../public/css/popup.css';
import '../public/css/signin.css';
import '../public/css/cart.css';
import '../public/css/account.css';
import '../public/css/order-confirmation.css';

import { initPopupEventListeners } from './functions/popup';
import { initSigninEventListeners } from './functions/signin';
import { initLogoutEventListener } from './functions/logout';

import {
  initAddToCartButtons,
  updateCartTotal,
  initCartButtonEventListener,
} from './functions/cartButton';
import initAccountButtonEventListeners from './functions/accountButton';
import { initCartEventListeners } from './functions/cartPage';
import { initCheckoutEventListeners } from './functions/checkout';
import { initAdminEventListeners } from './functions/admin';

export function initEventListeners(): void {
  initPopupEventListeners();
  initSigninEventListeners();
  initLogoutEventListener();
  initAddToCartButtons();
  initCartButtonEventListener();
  initAccountButtonEventListeners();
  initCartEventListeners();
  initCheckoutEventListeners();
  initAdminEventListeners();
}

async function initApp(): Promise<void> {
  initEventListeners();
  updateCartTotal();
}

initApp();
