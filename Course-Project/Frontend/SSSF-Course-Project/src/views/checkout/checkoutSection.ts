export default function checkoutSection(user?: any, cart?: any): string {
  const modalHtml = `<section class="checkout-section">
    <div class="container">
      <h2 class="text-center mb-5">Checkout</h2>
      <div class="row">
        <div class="col-md-7">
          <form>
            <h4 class="mb-4">Personal Information</h4>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" value="${
                user ? user.firstName : ''
              }" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" value="${
                user ? user.lastName : ''
              }" required />
            </div>
            <div class="form-group mt-5">
              <label for="country">Country</label>
              <input type="text" class="form-control" id="country" value="${
                user ? user.country : ''
              }" required />
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input type="tel" class="form-control" id="phoneNumber" value="${
                user ? user.phoneNumber : ''
              }" required />
            </div>
            <div class="form-group">
              <label for="emailAddress">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="emailAddress"
                value="${user ? user.email : ''}"
                required
              />
            </div>
            <div class="form-group mt-5">
              <label for="emailAddress">Comments to the order</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              ${
                cart && cart.books && cart.books.length
                  ? cart.books
                      .map((cartItem: any) => {
                        const book = cartItem.book;
                        return `
                          <div class="row mb-3">
                            <img class="col-md-3" src="${book.image}" alt="" />
                            <div>
                              <p class="card-text">${book.title}</p>
                              <p class="card-text">${book.author}</p>
                              <p class="card-text">Quantity: ${cartItem.quantity}</p>
                            </div>
                          </div>
                          <hr />
                        `;
                      })
                      .join('')
                  : `<p class="card-text">No items in the cart.</p>`
              }
              <h6 class="card-text">Total: $${
                cart && cart.total ? cart.total.toFixed(2) : '0.00'
              }</h6>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Payment Information</h5>
              <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardNumber"
                  required
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="expirationDate">Expiration Date</label>
                  <input
                    type="text"
                    class="form-control"
                    id="expirationDate"
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="cvv">CVV</label>
                  <input type="text" class="form-control" id="cvv" required />
                </div>
              </div>
              <div class="form-group">
                <label for="paymentMethod">Payment Method</label>
                <select class="form-control" id="paymentMethod" required>
                  <option value="">Choose...</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-5">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
  `;
  return modalHtml;
}
