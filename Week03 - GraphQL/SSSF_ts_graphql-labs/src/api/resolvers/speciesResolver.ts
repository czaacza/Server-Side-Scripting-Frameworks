import {Animal} from '../../interfaces/Animal';
import speciesModel from '../models/speciesModel';

export default {
  Animal: {
    species: async (parent: Animal) => {
      console.log(parent);
      return await speciesModel.findById(parent.species);
    },
  },
  Mutation: {
    addSpecies: async (_: any, args: any) => {
      console.log(args);
      const species = new speciesModel(args);
      await species.save();
      return species;
    },
  },
};
