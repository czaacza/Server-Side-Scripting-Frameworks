import { getStoredUser } from '../api/users';
import { doGraphQLFetch } from '../graphql/fetch';
import { updateUserQuery } from '../graphql/queries';

async function saveChanges(
  firstName: string,
  lastName: string,
  email: string,
  phone: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  const user = await getStoredUser();
  const token = sessionStorage.getItem('token')?.slice(1, -1);

  if (email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    return { success: false, error: 'Email is required' };
  }

  if (!user || !token) {
    return { success: false, error: 'User not logged in' };
  }

  const variables = {
    user: {
      id: user.id,
      email: email,
      details: {
        firstName,
        lastName,
        phone,
      },
    },
  };
  console.log('variables:', variables);
  console.log('token:', token);

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    updateUserQuery,
    variables,
    token
  );
  if (data.updateUser) {
    return { success: true, user: data.updateUser };
  }
  return { success: false, error: 'Update failed. Please try again.' };
}

export default async function initAccountButtonEventListeners() {
  const accountButton = document.querySelector('#btn-save-changes');

  accountButton?.addEventListener('click', async (event: any) => {
    event.preventDefault();
    const firstName =
      document.querySelector<HTMLInputElement>('#accountFirstName')?.value ||
      '';
    const lastName =
      document.querySelector<HTMLInputElement>('#accountLastName')?.value || '';
    const email =
      document.querySelector<HTMLInputElement>('#accountEmail')?.value || '';
    const phone =
      document.querySelector<HTMLInputElement>('#accountPhoneNumber')?.value ||
      '';

    const save = await saveChanges(firstName, lastName, email, phone);
    if (save.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(save.error);
    }
  });
}

function showSuccessMessage() {
  const successElement = document.getElementById('success-message');
  if (successElement) {
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

function showErrorMessage(error: string | undefined) {
  const errorElement = document.getElementById('errory-message');
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
