import {Document} from 'mongoose';
interface User extends Document {
  user_name: string;
  email: string;
}

interface UserTest {
  id?: string;
  user_name?: string; // returned from graphql is snake_case
  userName?: string; // graphql variables are camelCase
  email?: string;
}

export {User, UserTest};
