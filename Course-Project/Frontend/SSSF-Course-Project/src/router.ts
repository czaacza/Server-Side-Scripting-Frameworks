import Navigo from 'navigo';

import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import { getStoredUser } from './auth/auth';
import { fetchProducts } from './api/products';
import { initEventListeners } from './main';
import { getStoredCart, updateCartTotal } from './functions/cartButton';
import checkoutIndex from './views/checkout/checkoutIndex';
import accountIndex from './views/account/accountIndex';

const router = new Navigo('');

router
  .on('/', async () => {
    const storedUser = await getStoredUser();
    const products = await fetchProducts();
    const storedCart = getStoredCart();

    const contentElement = document.querySelector<HTMLDivElement>('#app');

    console.log('storedUser', storedUser);

    contentElement!.innerHTML = index(storedUser, products, storedCart);
    initEventListeners();
  })

  .on('/cart', async () => {
    const storedUser = await getStoredUser();
    const storedCart = getStoredCart();
    // initQuantityButtonsEventListeners();

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = cartIndex(storedUser, storedCart);
    initEventListeners();
  })

  .on('/checkout', async () => {
    const storedUser = await getStoredUser();
    const storedCart = getStoredCart();
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = checkoutIndex(storedUser, storedCart);
    initEventListeners();
  })

  .on('/account', async () => {
    const storedUser = await getStoredUser();
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = accountIndex(storedUser);
    initEventListeners();
  })

  .notFound(() => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = '404';
  })

  .resolve();

export default router;
