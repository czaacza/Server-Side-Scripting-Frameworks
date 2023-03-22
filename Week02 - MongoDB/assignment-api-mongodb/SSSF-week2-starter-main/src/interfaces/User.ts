import {Document} from 'mongoose';

interface User extends Document {
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

export {User};
