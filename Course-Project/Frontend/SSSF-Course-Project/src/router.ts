import Navigo from 'navigo';

import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import { getStoredUser } from './api/users';
import { fetchProducts } from './api/products';
import { initEventListeners } from './main';
import { getStoredCart, updateCartTotal } from './functions/cartButton';
import checkoutIndex from './views/checkout/checkoutIndex';
import accountIndex from './views/account/accountIndex';
import { checkIfCheckoutAllowed } from './functions/checkout';
import orderConfirmationIndex from './views/order-confirmation/orderConfirmationIndex';
import getUserOrders from './api/orders';
import { checkIfAdminAllowed } from './functions/admin';
import {
  fetchUsers,
  initSearchUsers,
  usersClickHandler,
} from './functions/adminUserPanel';
import adminIndex from './views/admin/adminIndex';
import { productsClickHandler } from './functions/adminProductsPanel';

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
    if (!checkIfCheckoutAllowed()) {
      router.navigate('/cart');
    }
    const storedUser = await getStoredUser();
    const storedCart = getStoredCart();
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = checkoutIndex(storedUser, storedCart);
    initEventListeners();
  })

  .on('/account', async () => {
    const storedUser = await getStoredUser();
    const userOrders = await getUserOrders(storedUser);
    const products = await fetchProducts();
    const storedCart = getStoredCart();

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = accountIndex(
      storedUser,
      userOrders,
      products,
      storedCart
    );
    initEventListeners();
  })

  .on('/account/admin', async () => {
    if (!checkIfAdminAllowed()) {
      // router.navigate('/account');
    }
    const storedUser = await getStoredUser();
    const storedCart = getStoredCart();
    const products = await fetchProducts();
    const users = await fetchUsers();

    const contentElement = document.querySelector<HTMLDivElement>('#app');

    contentElement!.innerHTML = adminIndex(
      storedUser,
      storedCart,
      products,
      users
    );

    initEventListeners();
    usersClickHandler(users);
    productsClickHandler(products);
    initSearchUsers(users);
  })

  .on('/order-confirmation', async () => {
    const storedUser = await getStoredUser();
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = orderConfirmationIndex(storedUser);
    initEventListeners();
  })

  .notFound(() => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = '404';
  })

  .resolve();

export default router;
