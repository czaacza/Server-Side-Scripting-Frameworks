import { User } from '../interfaces/User';

export default function updateUserPanel(user: User): void {
  const userPanel = document.querySelector('.navbar-brand');
  if (userPanel) {
    userPanel.innerHTML = `Animal App, ${user.user_name} `;
  }
}
