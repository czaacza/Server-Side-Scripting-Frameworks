import { User } from '../../interfaces/User';

export default function accountSection(user?: User): string {
  const { id, username, email, details } = user || {};
  const { firstName, lastName, phone } = details || {};

  const modalHtml = `<div class="container account-container">
    <h2 class="text-center mt-3 mb-5">Welcome, <span id="username">${
      username || 'User'
    }</span>!</h2>
      <div class="col-md-8 mt-5">
        <h3>Edit Account Details</h3>
        <form id="accountForm">
          <div class="mb-3">
            <label for="accountFirstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="accountFirstName" value="${
              firstName || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="accountLastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="accountLastName" value="${
              lastName || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="accountEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="accountEmail" value="${
              email || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="accountPhoneNumber" class="form-label">Phone Number</label>
            <input
              type="tel"
              class="form-control"
              id="accountPhoneNumber"
              value="${phone || ''}"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary btn-save-changes" id="btn-save-changes">Save Changes</button>
        </form>
        <div id="success-message" class="success-message">
          Profile details updated successfully!
        </div>
        <div id="errory-message" class="error-message">
          Error updating profile details. Please try again.
        </div>
      </div>
  </div>
  `;
  return modalHtml;
}
