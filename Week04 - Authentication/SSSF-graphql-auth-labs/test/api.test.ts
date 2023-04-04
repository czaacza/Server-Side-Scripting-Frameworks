import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import mongoose from 'mongoose';
import {TestCategory} from '../src/interfaces/Category';
import randomstring from 'randomstring';
import {getCategoryById, postCategory} from './categoryFunctions';
import {getAnimals, modifyAnimal} from './animalFunctions';
import {TestAnimal} from '../src/interfaces/Animal';

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

  // tests for animal queries
  let animals: TestAnimal[];
  it('should get all animals', async () => {
    animals = await getAnimals(app);
  });

  // tests for animal mutations
  it('should modify an animal', async () => {
    const animal: TestAnimal = {
      id: animals[0].id,
      animal_name: 'test animal' + randomstring.generate(7),
      birthdate: new Date(),
    };
    await modifyAnimal(app, animal);
  });
});
