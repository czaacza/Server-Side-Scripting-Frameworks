import {Animal} from '../../interfaces/Animal';
const animalData = [
  {
    id: '1',
    animal_name: 'Frank',
    species: '1',
  },
];

const speciesData = [
  {
    id: '1',
    species_name: 'Cat',
    category: '1',
  },
];

const categoryData = [
  {
    id: '1',
    category_name: 'Mammal',
  },
];

export default {
  Query: {
    animals: (_parent: undefined, args: Animal) => {
      return animalData;
    },
  },
  Animal: {
    species: (parent: any) => {
      console.log(parent);
      return speciesData.find((species) => species.id === parent.species);
    },
  },
  Species: {
    category: (parent: any) => {
      return categoryData.find((category) => category.id === parent.category);
    },
  },
};
