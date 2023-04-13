import { Category } from '../interfaces/Category';
import { Species } from '../interfaces/Species';

export default function (species: Species): string {
  const modalHtml = `
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Species: ${
        species.species_name
      }</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <p>Species: ${species.species_name}</p>
      <p>Category: ${(species.category as Category).category_name}</p>
      <img src="${species.image}" alt="${
    species.species_name
  }" style="width: 100%;" />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
  return modalHtml;
}
