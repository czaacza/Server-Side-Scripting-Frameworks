import { generateUsersList } from '../../functions/adminUserPanel';
import { User } from '../../interfaces/User';

export default function adminUserPanel(users?: User[]): string {
  const modalHtml = `
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4">
          <h3>Users</h3>
          <input type="text" class="form-control mb-3" id="search-users" placeholder="Search users...">
          <ul class="list-group users-list">
            ${generateUsersList(users)}
          </ul>
          <button class="btn btn-primary mt-3 btn-squared" id="btn-add-user">Add New User</button>
        </div>
        <div class="col-md-8">
          <h3>User Details</h3>
          <form id="user-details-form" class="d-none">
            <input type="hidden" id="user-id">
            <div class="mb-3" id="username-field-container">
              <label for="user-username" class="form-label">Username</label>
              <input type="text" class="form-control" id="user-username" required>
            </div>
            <div class="mb-3" id="password-field-container">
              <label for="user-password" class="form-label">Password</label>
              <input type="password" class="form-control" id="user-password" required>
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
            <button type="submit" class="btn btn-primary btn-squared btn-danger" id="btn-update-user">Update User</button>
            <button type="button" class="btn btn-danger btn-squared" id="btn-delete-user">Delete User</button>
            <button type="submit" class="btn btn-primary btn-squared" id="btn-add-user-form">Add new User</button>
          </form>
            <div id="admin-success-message" class="success-message">
            Profile details updated successfully!
          </div>
          <div id="admin-error-message" class="error-message">
            Error updating profile details. Please try again.
          </div>  
        </div>
      </div>
    </div>
  `;

  return modalHtml;
}
