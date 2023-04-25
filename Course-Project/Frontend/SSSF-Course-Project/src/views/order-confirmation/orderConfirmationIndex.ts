import { User } from '../../interfaces/User';

export default function index(user?: User): string {
  const modalHtml = `
  <div class="container order-confirmation-container">
    <div class="order-confirmation">
    <div class="circle-container">
      <div class="circle">
      <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="70" stroke="#28a745" stroke-width="8" fill="none" class="circle-path" />
      </svg>
      </div>
      <div class="tick"></div>
    </div>
    <h2 class="mt-4">Order Successfully Placed</h2>
    <p class="mt-3">Thank you for your purchase! Your order has been received and is being processed.</p>
    <a href="/" class="btn btn-primary mt-4 order-confirmation-btn">Return to Homepage</a>
  </div>
</div>
`;
  return modalHtml;
}
