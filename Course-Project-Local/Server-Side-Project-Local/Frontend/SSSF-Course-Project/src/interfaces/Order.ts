import { Types } from 'mongoose';
import { Book } from './Book';

interface Order {
  userId: Types.ObjectId;
  books: {
    book: Book | string;
    quantity: number;
  }[];
  totalPrice: number;
  address: string;
  status: string;
}

export type { Order };
