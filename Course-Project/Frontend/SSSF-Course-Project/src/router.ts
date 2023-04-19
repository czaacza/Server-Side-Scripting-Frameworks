import Navigo from 'navigo';

import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import { getStoredUser } from './auth/auth';
import { fetchProducts } from './api/products';
import { initEventListeners } from './main';
import { getStoredCart, updateCartTotal } from './functions/cartButton';
import checkoutIndex from './views/checkout/checkoutIndex';
// import { initQuantityButtonsEventListeners } from './functions/cartPage';

const router = new Navigo('');

router
  .on('/', async () => {
    const storedUser = getStoredUser();
    const products = await fetchProducts();
    const storedCart = getStoredCart();

    const contentElement = document.querySelector<HTMLDivElement>('#app');

    console.log('storedCart', storedCart);

    contentElement!.innerHTML = index(storedUser, products, storedCart);
    initEventListeners();
  })

  .on('/cart', () => {
    const storedUser = getStoredUser();
    const storedCart = getStoredCart();
    // initQuantityButtonsEventListeners();

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = cartIndex(storedUser, storedCart);
    initEventListeners();
  })

  .on('/checkout', () => {
    const storedUser = getStoredUser();
    const storedCart = getStoredCart();
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    console.log('user', storedUser);
    contentElement!.innerHTML = checkoutIndex(storedUser, storedCart);
    initEventListeners();
  })

  .notFound(() => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = '404';
  })

  .resolve();

export default router;
