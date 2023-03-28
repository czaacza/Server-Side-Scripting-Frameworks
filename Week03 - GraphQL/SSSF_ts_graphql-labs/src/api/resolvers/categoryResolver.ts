import {Category} from '../../interfaces/Category';
import {Species} from '../../interfaces/Species';
import categoryModel from '../models/categoryModel';

export default {
  Query: {
    categories: async () => {
      return await categoryModel.find();
    },
    category: async (_: undefined, args: Category) => {
      return await categoryModel.findById(args.id);
    },
  },
  Species: {
    category: async (parent: Species) => {
      return await categoryModel.findById(parent.category);
    },
  },
  Mutation: {
    addCategory: async (parent: undefined, args: Category) => {
      console.log(args);
      const category = new categoryModel(args);
      return await category.save();
    },

    modifyCategory: async (parent: undefined, args: Category) => {
      console.log(args);
      const category = await categoryModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return category;
    },

    deleteCategory: async (parent: undefined, args: Category) => {
      console.log(args);
      const category = await categoryModel.findByIdAndDelete(args.id);
      return category;
    },
  },
};
