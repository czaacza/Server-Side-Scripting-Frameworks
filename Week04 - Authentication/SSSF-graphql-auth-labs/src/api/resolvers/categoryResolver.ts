import {GraphQLError} from 'graphql';
import {Category} from '../../interfaces/Category';
import {Species} from '../../interfaces/Species';
import categoryModel from '../models/categoryModel';

export default {
  Species: {
    category: async (parent: Species) => {
      return await categoryModel.findById(parent.category);
    },
  },
  Query: {
    categories: async () => {
      return await categoryModel.find();
    },
    categoryById: async (_parent: undefined, args: Category) => {
      return await categoryModel.findById(args.id);
    },
  },
  Mutation: {
    addCategory: async (_parent: undefined, args: Category) => {
      const category = new categoryModel(args);
      return await category.save();
    },
    modifyCategory: async (_parent: undefined, args: Category) => {
      return await categoryModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteCategory: async (_parent: undefined, args: Category) => {
      return await categoryModel.findByIdAndDelete(args.id);
    },
  },
};
