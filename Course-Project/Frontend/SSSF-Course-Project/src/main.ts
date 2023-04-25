// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';

import { initPopupEventListeners } from './functions/popup';
import { initSigninEventListeners } from './functions/signin';
import { initLogoutEventListener } from './functions/logout';
import { fetchProducts } from './api/products';
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
