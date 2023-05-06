import { Book } from './Book';

interface Cart {
  userId?: string;
  books: {
    book: Book;
    quantity: number;
  }[];
  total: number;
}

export type { Cart };
