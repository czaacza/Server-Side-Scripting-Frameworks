import {GraphQLError} from 'graphql';
import {Cat} from '../../interfaces/Cat';
import {locationInput} from '../../interfaces/Location';
import {UserIdWithToken} from '../../interfaces/User';
import rectangleBounds from '../../utils/rectangleBounds';
import catModel from '../models/catModel';
import {Types} from 'mongoose';

// TODO: create resolvers based on cat.graphql
// note: when updating or deleting a cat, you need to check if the user is the owner of the cat
// note2: when updating or deleting a cat as admin, you need to check if the user is an admin by checking the role from the user object

export default {
  Query: {
    cats: async (
      _parent: any,
      _args: any,
      _context: any,
      _info: any
    ): Promise<Cat[]> => {
      const cats = await catModel.find();
      return cats;
    },

    catById: async (_parent: any, args: Cat, _context: any, _info: any) => {
      const cat = await catModel.findById(args.id);
      if (!cat) {
        throw new GraphQLError('Cat not found');
      }
      return cat;
    },

    catsByOwner: async (
      _parent: any,
      args: {ownerId: string},
      _context: any,
      _info: any
    ) => {
      const cats = await catModel.find({owner: args.ownerId});
      return cats;
    },

    catsByArea: async (
      _parent: any,
      args: locationInput,
      _context: any,
      _info: any
    ) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);
      return await catModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
    },
  },

  Mutation: {
    createCat: async (_parent: any, args: any, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      args.owner = user.id as unknown as Types.ObjectId;

      const cat = await catModel.create(args);
      return cat;
    },

    updateCat: async (_parent: any, args: Cat, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      const found = await catModel.findById(args.id);
      if (found!.owner.toString() !== user.id.toString()) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      const cat = await catModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return cat;
    },

    deleteCat: async (_parent: any, args: Cat, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      const found = await catModel.findById(args.id);
      if (found!.owner.toString() !== user.id.toString()) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      const cat = await catModel.findByIdAndDelete(args.id);
      return cat;
    },

    updateCatAsAdmin: async (
      _parent: any,
      args: Cat,
      user: UserIdWithToken
    ) => {
      const cat = await catModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return cat;
    },

    deleteCatAsAdmin: async (
      _parent: any,
      args: Cat,
      user: UserIdWithToken
    ) => {
      const cat = await catModel.findByIdAndDelete(args.id);
      return cat;
    },
  },
};
