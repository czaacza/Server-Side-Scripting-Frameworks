// TODO: add resolver for user
// Query: users, userById, checkToken
// Mutation: login, register, updateUser, deleteUser

import fetch from 'node-fetch';
import {User} from '../../interfaces/User';

export default {
  Query: {
    users: async () => {
      const response = await fetch(`${process.env.AUTH_URL}/users`);
      if (response.ok) {
        throw new Error(response.statusText);
      }
      const users = await response.json();
      return users;
    },

    userById: async (parent: any, args: any) => {
      const response = await fetch(`${process.env.AUTH_URL}/users/${args.id}`);
      if (response.ok) {
        throw new Error(response.statusText);
      }
      const user = await response.json();
      return user;
    },

    checkToken: async (parent: any, args: any, user: User) => {
      const response = await fetch(`${process.env.AUTH_URL}/users/token`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        throw new Error(response.statusText);
      }
      const userFromAuth = await response.json();
      return userFromAuth;
    },
  },
};
