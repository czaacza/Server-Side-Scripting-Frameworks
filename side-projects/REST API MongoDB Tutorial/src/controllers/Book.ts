import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  return book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((err) => res.status(500).json({ err }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  const book = Book.findById(bookId).populate('author').select('-__v');

  return book
    .then((book) => res.status(200).json({ book }))
    .catch((err) => res.status(500).json({ err }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  const books = Book.find().populate('author').select('-__v');
  return books
    .then((books) => res.status(200).json({ books }))
    .catch((err) => res.status(500).json({ err }));
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findById(bookId)
    .then((book) => {
      if (book) {
        book.set({ title: req.body.title, author: req.body.author }); // or
        // book.title, author = req.body.title, author;
        return book
          .save()
          .then((book) => res.status(200).json({ book }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findByIdAndDelete(bookId)
    .then((book) => {
      if (book) {
        res.status(200).json({ message: 'Book deleted' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

export default {
  createBook,
  readBook,
  readAll,
  updateBook,
  deleteBook,
};
