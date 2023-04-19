export default function productSection(books?: any): string {
  const modalHtml = `
    <section class="product-section">
          <div class="container">
            <h2 class="text-center mb-5">Products</h2>
            <div class="row products-row gx-4">

            ${books
              .map((book: any) => {
                const bookData = JSON.stringify(book).replace(/'/g, '&#39;');
                return `
              <div class="col-md-4">
                <div class="card mb-4">
                  <img class="card-img-top" src="/img/book.png" alt="Book Cover" />
                  <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                    <p class="card-text">$${book.price}</p>
                    <button class="btn btn-primary add-to-cart-btn" data-book='${bookData}'>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              `;
              })
              .join('')}


            </div>
          </div>
        </section>
    `;
  return modalHtml;
}
