import imageFromWikipedia from '../../functions/imageFromWikipedia';
import {Animal} from '../../interfaces/Animal';
import {Species} from '../../interfaces/Species';
import speciesModel from '../models/speciesModel';

export default {
  Animal: {
    species: async (parent: Animal) => {
      console.log(parent);
      return await speciesModel.findById(parent.species);
    },
  },
  Query: {
    species: async () => {
      return await speciesModel.find();
    },
    speciesById: async (_parent: undefined, args: Species) => {
      return await speciesModel.findById(args.id);
    },
  },
  Mutation: {
    addSpecies: async (_parent: undefined, args: Species) => {
      console.log(args);
      const image = await imageFromWikipedia(args.species_name);
      args.image = image;
      const species = new speciesModel(args);
      return await species.save();
    },
  },
};
