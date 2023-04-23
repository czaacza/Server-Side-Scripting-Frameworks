import { register } from '../auth/auth';

// Function to show popup window
export function showPopup(): void {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.style.display = 'block';
    document.querySelector('.overlay')?.classList.add('active');
  }
}

// Function to close popup window
export function closePopup(): void {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.style.display = 'none';
    document.querySelector('.overlay')?.classList.remove('active');
  }
}

export async function submitSignupForm(event: Event): Promise<void> {
  event.preventDefault();

  const usernameInput = document.querySelector<HTMLInputElement>('#signupName');
  const passwordInput =
    document.querySelector<HTMLInputElement>('#signinPassword');
  const emailInput = document.querySelector<HTMLInputElement>('#signupEmail');

  if (usernameInput && passwordInput && emailInput) {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    const result = await register(username, password, email);

    if (result.success) {
      closePopup();
      // Set up the logged-in user's screen here, e.g., by displaying the user's name
      console.log('User logged in', result.user);
      // location.reload();
    } else {
      // Show an error message to the user, e.g., by displaying it in the signin form
      console.log('Login failed', result.error);
      // displayLoginError();
    }
  }
}

export function initPopupEventListeners(): void {
  document.querySelector('.popup-button')?.addEventListener('click', showPopup);
  document.getElementById('popup-close')?.addEventListener('click', closePopup);
  document
    .getElementById('signup-form')
    ?.addEventListener('submit', submitSignupForm);

  const overlay = document.querySelector('.overlay');
  overlay?.addEventListener('click', (event: any) => {
    if (event.target === overlay) {
      closePopup();
    }
  });
}
