import { Book } from '../../interfaces/Book';

export default function ordersSection(orders: any, products: any): string {
  const findBookById = (books: Book[], bookId: string) => {
    return books.find((book: Book) => book._id === bookId);
  };

  const ordersHtml = orders
    .map((order: any, index: any) => {
      const { books, totalPrice, details, status } = order;
      const { firstName, lastName, phone, email, comments } = details;

      const booksHtml = books
        .map((book: any) => {
          const foundBook: Book | undefined = findBookById(products, book.book);
          return `
      <div class="book-info">
        <img src="img/${foundBook?.image}" alt="${
            foundBook?.title
          }" class="card-img order-history-img" />
        <div class="book-details">
          <p>Title: ${foundBook?.title}</p>
          <p>Author: ${foundBook?.author}</p>
          <p>Price: $${foundBook?.price.toFixed(2)}</p>
          <p>Quantity: ${book.quantity}</p>
        </div>
      </div>
    `;
        })
        .join('');

      return `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${booksHtml}</td>
          <td>${firstName} ${lastName}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${totalPrice.toFixed(2)}</td>
          <td>${status}</td>
        </tr>
      `;
    })
    .join('');

  const modalHtml = `
  <div class="container account-container" >
      <div class="col-md-12 mt-5 mb-5">
        <h3>Order History</h3>
        <table class="table table-striped table-responsive mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Books</th>
              <th scope="col">Customer</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
           </thead>
        <tbody>
         ${ordersHtml}
       </tbody>
      </table>
    </div>
  </div>
</div>
`;

  return modalHtml;
}
