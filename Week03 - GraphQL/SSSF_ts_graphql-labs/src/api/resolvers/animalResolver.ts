import {Animal} from '../../interfaces/Animal';
import animalModel from '../models/animalModel';
import speciesModel from '../models/speciesModel';
import categoryModel from '../models/categoryModel';

export default {
  Query: {
    animals: async () => {
      return await animalModel.find();
    },
    animal: async (_: undefined, args: Animal) => {
      return await animalModel.findById(args.id);
    },
  },
  Mutation: {
    addAnimal: async (_: undefined, args: Animal) => {
      console.log(args);
      const animal = new animalModel(args);
      return await animal.save();
    },

    modifyAnimal: async (_: undefined, args: Animal) => {
      console.log(args);
      const animal = await animalModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return animal;
    },

    deleteAnimal: async (_: undefined, args: Animal) => {
      console.log(args);
      const animal = await animalModel.findByIdAndDelete(args.id);
      return animal;
    },
  },
};
