import {Animal} from '../../interfaces/Animal';
import animalModel from '../models/animalModel';
import rectangleBounds from '../../utils/rectangleBounds';
import {locationInput} from '../../interfaces/Location';

export default {
  Query: {
    animals: async () => {
      return await animalModel.find();
    },
    animalById: async (_parent: undefined, args: Animal) => {
      return await animalModel.findById(args.id);
    },
    animalsByArea: async (_parent: undefined, args: locationInput) => {
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
    addAnimal: async (_parent: undefined, args: Animal) => {
      const animal = new animalModel(args);
      return await animal.save();
    },
    modifyAnimal: async (_parent: undefined, args: Animal) => {
      console.log(args);
      return await animalModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteAnimal: async (_parent: undefined, args: Animal) => {
      return await animalModel.findByIdAndDelete(args.id);
    },
  },
};
