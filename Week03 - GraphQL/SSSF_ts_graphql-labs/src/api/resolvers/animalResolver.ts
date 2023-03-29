import {Animal} from '../../interfaces/Animal';
import animalModel from '../models/animalModel';
import speciesModel from '../models/speciesModel';
import categoryModel from '../models/categoryModel';
import rectangleBounds from '../../utils/rectangleBounds';
import {LocationInput} from '../../interfaces/Location';

export default {
  Query: {
    animals: async () => {
      return await animalModel.find();
    },
    animalById: async (_: undefined, args: Animal) => {
      return await animalModel.findById(args.id);
    },
    animalByArea: async (_: undefined, args: LocationInput) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);
      return await animalModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
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
