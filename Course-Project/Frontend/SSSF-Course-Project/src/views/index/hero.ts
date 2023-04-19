// change it to the function that returns the string
export default function hero() {
  const modalHtml = `
    <section class="hero-section">
    <div class="container">
    <div class="row align-items-center">
    <div class="col-md-6">
    <h1 class="pb-4 hero-heading">
    Unleash the power of digital reading
    </h1>
    <p class="lead">
    Access favourite e-books at your fingertips. Discover and purchase
    your next great read on our user-friendly digital platform, where
    convenience meets accessibility. Experience the power of digital
    reading with eBookery.
    </p>
    <button class="btn btn-primary px-4 py-3">Get Started</button>
    </div>
    <div class="col-md-6">
    <img src="/img/logo.png" class="img-fluid" alt="Hero Image" />
    </div>
    </div>
    </div>
    </section>
  `;
  return modalHtml;
}
