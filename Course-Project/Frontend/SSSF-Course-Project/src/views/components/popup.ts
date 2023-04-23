export default function popup(): string {
  const modalHtml = `
      <div class="popup-container">
        <div class="modal-content row popup" id="popup">
          <div class="modal-img-container">
            <img src="/img/popup-left.png" class="img-fluid" alt="popup image" />
          </div>
          <div class="modal-body modal-form-container">
            <h5 class="modal-title text-center" id="signupModalLabel">
              Welcome to eBookery
            </h5>
            <div class="welcome-heading d-flex justify-content-center">
              <img
                src="img/logo-no-bg-no-text.png"
                class="text-center"
                height="100"
                alt="eBookery Logo"
              />
            </div>
            <form id="signup-form">
              <div class="mb-3">
                <label for="signupName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  id="signupName"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="signupEmail" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="signupEmail"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="signupPassword" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="signupPassword"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="signupConfirmPassword" class="form-label"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="signupConfirmPassword"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary border w-100 mb-1 mt-4 btn-login"
              >
                Sign Up
              </button>
              <p class="text-center mb-1">or</p>
              <button type="button" class="btn btn-light border w-100 btn-login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                  />
                </svg>
                Sign up with Google
              </button>
            </form>
          </div>
          <div id="popup-close" class="popup-close">X</div>
        </div>
      </div>`;
  return modalHtml;
}
