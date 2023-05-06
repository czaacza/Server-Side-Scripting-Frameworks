export default function testimonials(): string {
  const modalHtml = `
    <!-- testimonials section -->
        <section class="testimonials-section">
          <div class="container">
            <h2 class="text-center mb-5">What Our Customers Say</h2>
            <div class="row d-flex align-items-stretch">
              <div class="col-md-4">
                <div class="card mb-4">
                  <div class="img-container">
                    <img
                      class="card-img-top testimonial-img"
                      src="img/person1.jpg"
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body">
                    <p class="card-text">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat."
                    </p>
                    <p class="font-weight-bold text-right">- John Doe</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-4">
                  <div class="img-container">
                    <img
                      class="card-img-top testimonial-img"
                      src="img/person2.jpg"
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body">
                    <p class="card-text">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat."
                    </p>
                    <p class="font-weight-bold text-right">- Jane Doe</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-4">
                  <div class="img-container">
                    <img
                      class="card-img-top testimonial-img"
                      src="img/person3.jpg"
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body">
                    <p class="card-text">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat."
                    </p>
                    <p class="font-weight-bold text-right">- John Smith</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
`;
  return modalHtml;
}
