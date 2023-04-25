import { Types } from 'mongoose';
import { Book } from './Book';

interface Order {
  userId?: Types.ObjectId;
  books: {
    book: Book | string;
    quantity: number;
  }[];
  totalPrice: number;
  details: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comments: string;
  };
  status: string;
}

export { Order };
