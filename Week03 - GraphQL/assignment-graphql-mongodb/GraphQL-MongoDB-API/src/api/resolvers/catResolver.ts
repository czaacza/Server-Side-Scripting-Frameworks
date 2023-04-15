// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

import {Cat} from '../../interfaces/Cat';
import rectangleBounds from '../../utils/rectangleBounds';
import CatModel from '../models/catModel';
import {locationInput} from '../../interfaces/Location';

export default {
  Query: {
    cats: async () => {
      return await CatModel.find();
    },
    catById: async (parent: any, args: Cat) => {
      return await CatModel.findById(args.id);
    },
    catsByOwner: async (parent: any, args: Cat) => {
      return await CatModel.find({owner: args.owner});
    },
    catsByArea: async (parent: any, args: locationInput) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);
      return await CatModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
    },
  },

  Mutation: {
    createCat: async (parent: any, args: Cat) => {
      console.log('args', args);
      const cat = new CatModel(args);
      console.log('cat', cat);
      return await cat.save();
    },
    updateCat: async (parent: any, args: Cat) => {
      const cat = await CatModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return cat;
    },
    deleteCat: async (parent: any, args: Cat) => {
      const cat = await CatModel.findByIdAndDelete(args.id);
      return cat;
    },
  },
};
