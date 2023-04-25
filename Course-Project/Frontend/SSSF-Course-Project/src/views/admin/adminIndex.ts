import { usersClickHandler } from '../../functions/admin';
import { Cart } from '../../interfaces/Cart';
import { User } from '../../interfaces/User';
import navbar from '../components/navbar';

export default function index(
  adminUser?: User,
  cart?: Cart,
  users?: User[]
): string {
  usersClickHandler(users as User[]);

  const modalHtml = `
    ${navbar(adminUser, cart)}

    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4">
          <h3>Users</h3>
          <input type="text" class="form-control mb-3" id="search-users" placeholder="Search users...">
          <ul class="list-group users-list">
            ${generateUsersList(users)}
          </ul>
          <button class="btn btn-primary mt-3" id="btn-add-user">Add New User</button>
        </div>
        <div class="col-md-8">
          <h3>User Details</h3>
          <form id="user-details-form" class="d-none">
            <input type="hidden" id="user-id">
            <div class="mb-3">
              <label for="user-username" class="form-label">Username</label>
              <input type="text" class="form-control" id="user-username" required>
            </div>
            <div class="mb-3">
              <label for="user-email" class="form-label">Email</label>
              <input type="email" class="form-control" id="user-email" required>
            </div>
            <div class="mb-3">
              <label for="user-first-name" class="form-label">First Name</label>
              <input type="text" class="form-control" id="user-first-name" required>
            </div>
            <div class="mb-3">
              <label for="user-last-name" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="user-last-name" required>
            </div>
            <div class="mb-3">
              <label for="user-phone" class="form-label">Phone</label>
              <input type="tel" class="form-control" id="user-phone" required>
            </div>
            <button type="submit" class="btn btn-primary" id="btn-update-user">Update User</button>
            <button type="button" class="btn btn-danger" id="btn-delete-user">Delete User</button>
          </form>
        </div>
      </div>
    </div>
  `;

  return modalHtml;
}

function generateUsersList(users: User[] | undefined) {
  if (!users) {
    return '';
  }

  return users
    .map(
      (user) => `
        <li class="list-group-item user-list-item" data-user-id="${user.id}">
          <span class="user-name">${user.username}</span> - <span class="user-email">${user.email}</span>
        </li>
      `
    )
    .join('');
}
