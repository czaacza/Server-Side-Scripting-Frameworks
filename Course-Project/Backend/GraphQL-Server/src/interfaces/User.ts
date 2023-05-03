import {Document} from 'mongoose';
interface User extends Document {
  username: string;
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
  username?: string; // returned from graphql is snake_case
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
