// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import {User} from '../../interfaces/User';
import UserModel from '../models/userModel';

export default {
  Query: {
    users: async () => {
      return await UserModel.find();
    },
    userById: async (parent: any, args: User) => {
      return await UserModel.findById(args.id);
    },
  },
  Cat: {
    owner: async (parent: any) => {
      return await UserModel.findById(parent.owner);
    },
  },
  Mutation: {
    createUser: async (parent: any, args: User) => {
      return await UserModel.create(args);
    },
    updateUser: async (parent: any, args: User) => {
      const user = await UserModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return user;
    },
    deleteUser: async (parent: any, args: User) => {
      const user = await UserModel.findByIdAndDelete(args.id);
      return user;
    },
  },
};
