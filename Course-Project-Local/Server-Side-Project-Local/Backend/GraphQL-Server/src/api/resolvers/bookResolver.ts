// book resolver for the book schema
// type Book {
//   id: ID!
//   title: String!
//   author: String!
//   description: String!
//   price: Float!
//   image: String!
// }

// input BookInput {
//   title: String!
//   author: String!
//   description: String!
//   price: Float!
//   image: String!
// }

// input BookModifyInput {
//   title: String
//   author: String
//   description: String
//   price: Float
//   image: String
// }

// type Query {
//   books: [Book]
//   bookById(id: ID!): Book
// }

// type Mutation {
//   addBook(bookInput: BookInput): Book
//   updateBook(bookModifyInput: BookModifyInput): Book
//   deleteBook(id: ID!): Book
// }

import {GraphQLError} from 'graphql';
import {Book} from '../../interfaces/Book';
import bookModel from '../models/bookModel';

export default {
  Query: {
    books: async (parent: any, args: any, {Book}: {Book: any}) => {
      const books = await bookModel.find();

      return books;
    },

    bookById: async (parent: any, args: any, {Book}: {Book: any}) => {
      const book = await bookModel.findById(args.id);
      return book;
    },
  },
  Mutation: {
    createBook: async (parent: any, args: any, {Book}: {Book: any}) => {
      const book = await new bookModel(args.bookInput);
      return book.save();
    },

    updateBook: async (parent: any, args: any, {Book}: {Book: any}) => {
      const book = await bookModel.findById(args.bookModifyInput.id);
      if (!book) {
        throw new GraphQLError('Book not found');
      }
      const updatedBook = await bookModel.findByIdAndUpdate(
        args.bookModifyInput.id,
        args.bookModifyInput,
        {new: true}
      );

      return updatedBook;
    },

    deleteBook: async (parent: any, args: any, {Book}: {Book: any}) => {
      const book = await bookModel.findById(args.id);
      if (!book) {
        throw new GraphQLError('Book not found');
      }
      const deletedBook = await bookModel.findByIdAndDelete(args.id);
      return deletedBook;
    },
  },
};
