import imageFromWikipedia from '../../functions/imageFromWikipedia';
import {Animal} from '../../interfaces/Animal';
import {Species} from '../../interfaces/Species';
import speciesModel from '../models/speciesModel';

export default {
  Query: {
    species: async () => {
      return await speciesModel.find();
    },
    speciesById: async (_: undefined, args: Species) => {
      return await speciesModel.findById(args.id);
    },
  },
  Animal: {
    species: async (parent: Animal) => {
      console.log(parent);
      return await speciesModel.findById(parent.species);
    },
  },
  Mutation: {
    addSpecies: async (_: any, args: Species) => {
      const image = await imageFromWikipedia(args.species_name);
      args.image = image;

      console.log(args);
      const species = new speciesModel(args);
      return await species.save();
    },

    modifySpecies: async (_: undefined, args: Species) => {
      console.log(args);
      const species = speciesModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return species;
    },

    deleteSpecies: async (_: undefined, args: Species) => {
      console.log(args);
      const species = speciesModel.findByIdAndDelete(args.id);
      return species;
    },
  },
};
