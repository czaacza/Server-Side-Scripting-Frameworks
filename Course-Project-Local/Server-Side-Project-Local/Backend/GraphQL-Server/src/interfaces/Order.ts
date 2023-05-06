import {Types} from 'mongoose';
import {Book} from './Book';

interface Order {
  userId?: Types.ObjectId;
  books: {
    book: string;
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

interface OrderModify {
  id: Types.ObjectId;
  userId?: Types.ObjectId;
  books: {
    book: string;
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

interface OrderTest {
  id?: string;
  userId?: string;
  books?: {
    book: string;
    quantity: number;
  }[];
  totalPrice?: number;
  details?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comments: string;
  };
  status?: string;
}

export {Order, OrderModify, OrderTest};
