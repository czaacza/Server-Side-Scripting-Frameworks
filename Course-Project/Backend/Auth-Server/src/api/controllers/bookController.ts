import { Request, Response, NextFunction } from 'express';
import CustomError from '../../classes/CustomError';
import Book from '../models/bookModel';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    if (!books) {
      throw new CustomError('Could not find books', 404);
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new CustomError('Could not find book', 404);
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = new Book(req.body);

    const result = await book.save();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      throw new CustomError('Could not find book', 404);
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw new CustomError('Could not find book', 404);
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };
