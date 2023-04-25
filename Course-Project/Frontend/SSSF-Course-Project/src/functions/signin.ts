import { login } from '../auth/auth';
import index from '../views/index/index';

// Function to show signin window
export function showSignin(): void {
  const signin = document.getElementById('signin');
  if (signin) {
    signin.style.display = 'block';
    document.querySelector('.overlay')?.classList.add('active');
  }
}

// Function to close signin window
export function closeSignin(): void {
  const signin = document.getElementById('signin');
  if (signin) {
    signin.style.display = 'none';
    document.querySelector('.overlay')?.classList.remove('active');
  }
}

export async function submitSigninForm(event: Event): Promise<void> {
  event.preventDefault();

  const usernameInput =
    document.querySelector<HTMLInputElement>('#signinEmail');
  const passwordInput =
    document.querySelector<HTMLInputElement>('#signinPassword');

  if (usernameInput && passwordInput) {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const result = await login(username, password);
    console.log(result);

    if (result.success) {
      closeSignin();
      // Set up the logged-in user's screen here, e.g., by displaying the user's name
      console.log('User logged in', result.user);
      location.reload();
    } else {
      // Show an error message to the user, e.g., by displaying it in the signin form
      console.log('Login failed', result.error);
      displayLoginError();
    }
  }
}

function displayLoginError() {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = `Invalid user credentials`;
    errorElement.classList.add('visible');

    setTimeout(() => {
      errorElement.classList.remove('visible');
    }, 3000);
  }
}

export function initSigninEventListeners(): void {
  document
    .querySelector('.signin-button')
    ?.addEventListener('click', showSignin);
  document
    .getElementById('signin-close')
    ?.addEventListener('click', closeSignin);

  const overlay = document.querySelector('.overlay');
  overlay?.addEventListener('click', (event: any) => {
    if (event.target === overlay) {
      closeSignin();
    }
  });

  const signinForm = document.querySelector<HTMLFormElement>('#signin-form');
  signinForm?.addEventListener('submit', submitSigninForm);
}
