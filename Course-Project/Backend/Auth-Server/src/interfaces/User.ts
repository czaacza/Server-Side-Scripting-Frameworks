import { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  details?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

interface UserOutput {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

interface UserLogin {
  email: string;
  password: string;
}

export { User, UserOutput, UserLogin };
