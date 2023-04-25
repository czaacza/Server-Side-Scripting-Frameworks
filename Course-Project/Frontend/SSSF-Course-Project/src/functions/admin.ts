import { doGraphQLFetch } from '../graphql/fetch';
import { getUsersQuery } from '../graphql/queries';
import { User } from '../interfaces/User';
import router from '../router';

export const initAdminEventListeners = (): void => {
  initAdminButtonEventListener();
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

export const checkIfAdminAllowed = () => {
  if (sessionStorage.getItem('adminAllowed') !== 'true') {
    return false;
  } else {
    sessionStorage.removeItem('adminAllowed');
    return true;
  }
};

export async function fetchUsers() {
  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    getUsersQuery,
    {}
  );
  if (data && data.users) {
    return data.users;
  }

  return undefined;
}

export const usersClickHandler = (users: User[]) => {
  document.addEventListener('DOMContentLoaded', () => {
    const userList = document.querySelector('.users-list') as HTMLElement;
    const userDetailsForm = document.querySelector(
      '#user-details-form'
    ) as HTMLFormElement;

    const displayUserDetails = (user: User) => {
      userDetailsForm.classList.remove('d-none');

      (document.querySelector('#user-id') as HTMLInputElement).value = user.id;
      (document.querySelector('#user-username') as HTMLInputElement).value =
        user.username;
      (document.querySelector('#user-email') as HTMLInputElement).value =
        user.email;
      (document.querySelector('#user-first-name') as HTMLInputElement).value =
        user.details.firstName;
      (document.querySelector('#user-last-name') as HTMLInputElement).value =
        user.details.lastName;
      (document.querySelector('#user-phone') as HTMLInputElement).value =
        user.details.phone;
    };

    userList.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('user-list-item')) {
        const userId = target.dataset.userId as string;
        const user = users.find((user) => user.id === userId);
        if (user) {
          displayUserDetails(user);
        }
      }
    });
  });
};
