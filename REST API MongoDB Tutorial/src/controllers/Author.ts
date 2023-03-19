import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name,
  });

  return author
    .save()
    .then((author) => res.status(201).json({ author }))
    .catch((err) => res.status(500).json({ err }));
};

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  const author = Author.findById(authorId);

  return author
    .then((author) => res.status(200).json({ author }))
    .catch((err) => res.status(500).json({ err }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  const authors = Author.find();

  return authors
    .then((authors) => res.status(200).json({ authors }))
    .catch((err) => res.status(500).json({ err }));
};

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set({ name: req.body.name }); // or
        // author.name = req.body.name;
        return author
          .save()
          .then((author) => res.status(200).json({ author }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findByIdAndDelete(authorId)
    .then((author) => {
      if (author) {
        res.status(200).json({ message: 'Author deleted' });
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

export default {
  createAuthor,
  readAuthor,
  readAll,
  updateAuthor,
  deleteAuthor,
};
