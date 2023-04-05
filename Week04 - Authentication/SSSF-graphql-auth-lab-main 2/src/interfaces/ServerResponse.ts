import {Animal} from './Animal';
import {Species} from './Species';
import Category from './Category';

export default interface ServerResponse extends Record<string, unknown> {
  data: {
    animals: Animal[];
    allSpecies: Species[];
    categories: Category[];
    animalById: Animal;
    speciesById: Species;
    categoryById: Category;
    speciesByCategory: Species[];
    animalsBySpecies: Animal[];
    animalsByCategory: Animal[];
    addCategory: Category;
    addSpecies: Species;
    addAnimal: Animal;
    updateCategory: Category;
    updateSpecies: Species;
    updateAnimal: Animal;
    deleteCategory: Category;
    deleteSpecies: Species;
    deleteAnimal: Animal;
  };
}
