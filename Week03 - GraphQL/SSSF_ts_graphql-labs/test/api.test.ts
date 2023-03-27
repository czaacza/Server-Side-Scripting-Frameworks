import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import mongoose from 'mongoose';
import {TestCategory} from '../src/interfaces/Category';
import randomstring from 'randomstring';
import {getCategoryById, postCategory} from './categoryFunctions';

describe('GET /graphql', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let newCategory: TestCategory;
  const testCategory: TestCategory = {
    category_name: 'test category' + randomstring.generate(7),
  };

  it('should create a new category', async () => {
    newCategory = await postCategory(app, testCategory);
  });

  it('should get a category by id', async () => {
    await getCategoryById(app, newCategory.id!);
  });
});
