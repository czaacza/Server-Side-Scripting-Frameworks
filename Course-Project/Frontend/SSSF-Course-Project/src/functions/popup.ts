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

export function initPopupEventListeners(): void {
  document.querySelector('.popup-button')?.addEventListener('click', showPopup);
  document.getElementById('popup-close')?.addEventListener('click', closePopup);

  const overlay = document.querySelector('.overlay');
  overlay?.addEventListener('click', (event: any) => {
    if (event.target === overlay) {
      closePopup();
    }
  });
}
