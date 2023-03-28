import {Animal} from '../../interfaces/Animal';
import animalModel from '../models/animalModel';
import speciesModel from '../models/speciesModel';
import categoryModel from '../models/categoryModel';

export default {
  Query: {
    animals: async () => {
      return await animalModel.find();
    },
    species: async () => {
      return await speciesModel.find();
    },
    categories: async () => {
      return await categoryModel.find();
    },
  },
};
