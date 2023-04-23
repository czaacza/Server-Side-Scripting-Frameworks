import { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  details?: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}

interface UserOutput {
  username: string;
  email: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserFromToken {
  id: string;
  isAdmin: boolean;
}

export type { User, UserOutput, UserLogin, UserFromToken };
