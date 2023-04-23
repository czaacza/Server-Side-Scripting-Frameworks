import {Document} from 'mongoose';
interface User extends Document {
  user_name: string;
  email: string;
  password: string;
  details?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

interface UserTest {
  id?: string;
  user_name?: string; // returned from graphql is snake_case
  userName?: string; // graphql variables are camelCase
  email?: string;
  password?: string;
  token?: string;
}

interface UserIdWithToken {
  id: string;
  token: string;
  isAdmin: boolean;
}

export {User, UserTest, UserIdWithToken};
