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
  Mutation: {
    addSpecies: async (_: any, args: Species) => {
      const image = await imageFromWikipedia(args.species_name);
      args.image = image;

      console.log(args);
      const species = new speciesModel(args);
      return await species.save();
    },
  },
};
