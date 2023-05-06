import router from '../router';
import { initUserSectionEventListeners } from './adminUserPanel';
import { initProductSectionEventListeners } from './adminProductsPanel';
import { getStoredUser } from '../api/users';
import { User } from '../interfaces/User';

export const initAdminEventListeners = (): void => {
  initAdminButtonEventListener();
  initUserSectionEventListeners();
  initProductSectionEventListeners();
};

export const checkIfAdminAllowed = (isAdmin: boolean) => {
  if (sessionStorage.getItem('adminAllowed') !== 'true') {
    return false;
  }

  if (!isAdmin) {
    sessionStorage.removeItem('adminAllowed');
    return false;
  }

  sessionStorage.removeItem('adminAllowed');
  return true;
};

const initAdminButtonEventListener = (): void => {
  const adminButton =
    document.querySelector<HTMLButtonElement>('#btn-admin-panel');

  adminButton?.addEventListener('click', async (event: any) => {
    event.preventDefault();
    sessionStorage.setItem('adminAllowed', 'true');
    router.navigate('/account/admin');
  });
};

export function showSuccessMessage(message?: string) {
  const successElement = document.getElementById('admin-success-message');
  if (successElement) {
    if (message) {
      successElement.innerText = message;
    }
    successElement.style.display = 'block';
    successElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      successElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      successElement.style.opacity = '0';
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}

export function showErrorMessage(error: string | undefined) {
  const errorElement = document.getElementById('admin-error-message');
  errorElement!.innerText = error || 'An error occurred';

  console.log(errorElement);

  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      errorElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      errorElement.style.opacity = '0';
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}
