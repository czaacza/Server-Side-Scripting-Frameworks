import { Types } from 'mongoose';
import { Book } from './Book';

interface Cart {
  userId?: Types.ObjectId;
  books: {
    book: Book | string;
    quantity: number;
  }[];
}

export { Cart };
