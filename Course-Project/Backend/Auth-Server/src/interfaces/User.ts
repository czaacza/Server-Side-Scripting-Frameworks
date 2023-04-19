import { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface UserOutput {
  username: string;
  email: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export { User, UserOutput, UserLogin };
