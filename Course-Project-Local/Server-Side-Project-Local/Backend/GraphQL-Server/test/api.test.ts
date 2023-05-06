import app from '../src/app';
import {
  deleteUser,
  deleteUserAsAdmin,
  getSingleUser,
  getUser,
  loginUser,
  postUser,
  putUser,
  putUserAsAdmin,
} from './userFunctions';

import {
  getBook,
  getSingleBook,
  postBook,
  putBook,
  deleteBook,
} from './bookFunctions';

import {
  getOrder,
  getOrderByUser,
  postOrder,
  putOrder,
  deleteOrder,
} from './orderFunctions';

import {UserTest} from '../src/interfaces/User';
import mongoose from 'mongoose';

import randomstring from 'randomstring';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import {BookTest} from '../src/interfaces/Book';
import {OrderTest} from '../src/interfaces/Order';

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test create user
  let userData: LoginMessageResponse;
  let userData2: LoginMessageResponse;
  let adminData: LoginMessageResponse;

  const testUser: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const testUser2: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const adminUser: UserTest = {
    email: 'mati@metropolia.fi',
    password: '1234',
  };

  it('should register a user', async () => {
    await postUser(app, testUser);
  });

  it('should register second user', async () => {
    await postUser(app, testUser2);
  });

  it('should login as a user', async () => {
    userData = await loginUser(app, testUser);
  });

  it('should login as a second user', async () => {
    userData2 = await loginUser(app, testUser2);
  });

  it('should login as an admin', async () => {
    adminData = await loginUser(app, adminUser);
  });

  it('should get all users', async () => {
    await getUser(app);
  });

  it('should get a single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  it('should update the current user', async () => {
    await putUser(app, userData.token!, userData.user.id);
  });

  it('should update a user as an admin', async () => {
    await putUserAsAdmin(app, adminData.token!, userData.user.id);
  });

  let orderData: any;

  const testOrder: OrderTest = {
    totalPrice: 100,
    status: 'placed',
  };

  it('should create an order', async () => {
    orderData = await postOrder(app, testOrder);
    console.log('orderData22', orderData);
  });

  it('should get all orders', async () => {
    await getOrder(app);
  });

  it('should get a single order', async () => {
    await getOrderByUser(app);
  });

  it('should update an order', async () => {
    await putOrder(app, orderData.id!);
  });

  it('should delete an order', async () => {
    await deleteOrder(app, orderData.id!);
  });

  // book functions

  let bookData: any;

  const testBook: BookTest = {
    title: 'Test Book ' + randomstring.generate(7),
    author: 'Test Author ' + randomstring.generate(7),
  };

  it('should create a book', async () => {
    bookData = await postBook(app, testBook);
    console.log('bookData', bookData);
  });

  it('should get all books', async () => {
    await getBook(app);
  });

  it('should get a single book', async () => {
    await getSingleBook(app, bookData.id!);
  });

  it('should update a book', async () => {
    await putBook(app, bookData.id!);
  });

  it('should delete a book', async () => {
    await deleteBook(app, bookData.id!);
  });

  // delete users

  it('should delete current user', async () => {
    await deleteUser(app, userData2.token!, userData2.user.id!);
  });

  it('should delete user as an admin', async () => {
    await deleteUserAsAdmin(app, adminData.token!, userData.user.id!);
  });
});
