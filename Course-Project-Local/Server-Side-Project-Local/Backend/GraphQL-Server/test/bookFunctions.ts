/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {BookTest} from '../src/interfaces/Book';
import ErrorResponse from '../src/interfaces/ErrorResponse';
import randomstring from 'randomstring';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';

const getBook = (url: string | Function): Promise<BookTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Books {
                  books {
                    id
                    title
                    author
                    description
                    price
                    image
                  }
                }
        `,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const books = response.body.data.books;
          expect(books).toBeInstanceOf(Array);
          expect(books[0]).toHaveProperty('id');
          expect(books[0]).toHaveProperty('title');
          expect(books[0]).toHaveProperty('author');
          resolve(response.body.data.books);
        }
      });
  });
};

const getSingleBook = (
  url: string | Function,
  id: string
): Promise<BookTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query BookById($bookByIdId: ID!) {
                  bookById(id: $bookByIdId) {
                    id
                    title
                    author
                    description
                    price
                    image
                  }
                }`,
        variables: {
          bookByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const book = response.body.data.bookById;
          expect(book.id).toBe(id);
          expect(book).toHaveProperty('title');
          expect(book).toHaveProperty('author');
          resolve(response.body.data.bookById);
        }
      });
  });
};

const postBook = (
  url: string | Function,
  book: BookTest
): Promise<BookTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation CreateBook($bookInput: BookInput) {
                  createBook(bookInput: $bookInput) {
                    id
                    title
                    author
                    description
                    price
                    image
                  }
                }`,
        variables: {
          bookInput: {
            title: book.title,
            author: book.author,
            description: 'test description',
            image: 'book.png',
            price: 10,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const bookData = response.body.data.createBook;
          console.log('bookData', bookData);
          expect(bookData).toHaveProperty('id');
          expect(bookData).toHaveProperty('title');
          expect(bookData).toHaveProperty('author');

          resolve(response.body.data.createBook);
        }
      });
  });
};

const putBook = (url: string | Function, id: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 'Updated ' + randomstring.generate(7);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation UpdateBook($bookModifyInput: BookModifyInput) {
                  updateBook(bookModifyInput: $bookModifyInput) {
                    id
                    title
                    author
                    description
                    price
                    image
                  }
                }`,
        variables: {
          bookModifyInput: {
            id: id,
            title: newValue,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const bookData = response.body.data.updateBook;
          expect(bookData).toHaveProperty('id');
          expect(bookData).toHaveProperty('title');
          expect(bookData).toHaveProperty('author');
          expect(bookData.title).toBe(newValue);
          resolve(response.body.data.updateBook);
        }
      });
  });
};

const deleteBook = (
  url: string | Function,
  id: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .send({
        query: `mutation DeleteBook($deleteBookId: ID!) {
                  deleteBook(id: $deleteBookId) {
                    id
                    title
                    author
                    description
                    price
                    image
                  }
                }`,
        variables: {
          deleteBookId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const bookData = response.body.data.deleteBook;
          expect(bookData).toHaveProperty('id');
          expect(bookData).toHaveProperty('title');
          expect(bookData).toHaveProperty('author');

          resolve(response.body.data.deleteBook);
        }
      });
  });
};

export {getBook, getSingleBook, postBook, putBook, deleteBook};
