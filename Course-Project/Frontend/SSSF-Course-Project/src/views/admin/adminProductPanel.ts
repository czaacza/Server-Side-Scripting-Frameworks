import { generateProductsList } from '../../functions/adminProductsPanel';
import { Book } from '../../interfaces/Book';

export default function adminProductPanel(books?: Book[]): string {
  const modalHtml = `
    <div class="container product-panel-container">
      <div class="row mt-5">
        <div class="col-md-4">
          <h3>Products</h3>
          <input type="text" class="form-control mb-3" id="search-products" placeholder="Search products...">
          <ul class="list-group products-list">
            ${generateProductsList(books)}
          </ul>
          <button class="btn btn-primary mt-3 btn-squared" id="btn-add-product">Add New Product</button>
        </div>
        <div class="col-md-8">
          <h3>Product Details</h3>
          <form id="product-details-form" class="d-none">
            <input type="hidden" id="product-id">
            <div class="mb-3" id="title-field-container">
              <label for="product-title" class="form-label">Title</label>
              <input type="text" class="form-control" id="product-title" required>
            </div>
            <div class="mb-3">
              <label for="product-author" class="form-label">Author</label>
              <input type="author" class="form-control" id="product-author" required>
            </div>
            <div class="mb-3">
              <label for="product-description" class="form-label">Description</label>
              <input type="text" class="form-control" id="product-description" required>
            </div>
            <div class="mb-3">
              <label for="product-price" class="form-label">Price</label>
              <input type="text" class="form-control" id="product-price" required>
            </div>
            <div class="mb-3">
              <label for="product-image" class="form-label">Image</label>
              <input type="tel" class="form-control" id="product-image" required>
            </div>
            <button type="submit" class="btn btn-primary btn-squared btn-danger" id="btn-update-product">Update Product</button>
            <button type="button" class="btn btn-danger btn-squared" id="btn-delete-product">Delete Product</button>
            <button type="submit" class="btn btn-primary btn-squared" id="btn-add-product-form">Add new Product</button>
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
