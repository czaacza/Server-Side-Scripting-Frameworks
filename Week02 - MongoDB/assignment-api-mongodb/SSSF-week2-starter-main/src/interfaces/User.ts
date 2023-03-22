import {Document} from 'mongoose';

interface User extends Document {
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

interface LoginUser {
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

interface UserOutput {
  _id: string;
  user_name: string;
  email: string;
}

export {User, LoginUser, UserOutput};
