import {GraphQLError} from 'graphql';
import imageFromWikipedia from '../../functions/imageFromWikipedia';
import {Animal} from '../../interfaces/Animal';
import {Species} from '../../interfaces/Species';
import {UserIdWithToken} from '../../interfaces/User';
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
    addSpecies: async (
      _parent: undefined,
      args: Species,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      const image = await imageFromWikipedia(args.species_name);
      args.image = image;
      const species = new speciesModel(args);
      return await species.save();
    },
    modifySpecies: async (
      _parent: undefined,
      args: Species,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      const species = await speciesModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });

      return species;
    },
    deleteSpecies: async (
      _parent: undefined,
      args: Species,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await speciesModel.findByIdAndDelete(args.id);
    },
  },
};
