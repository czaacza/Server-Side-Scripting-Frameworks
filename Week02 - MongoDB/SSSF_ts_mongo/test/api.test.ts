/* eslint-disable @typescript-eslint/no-loss-of-precision */
import DBMessageResponse from '../src/interfaces/DBMessageResponse';
import mongoose from 'mongoose';
import app from '../src/app';
import {Types} from 'mongoose';
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory,
} from './testCategory';
import {ICategory} from '../src/interfaces/Category';
import {
  ISpecies,
  ISpeciesObject,
  ISpeciesTest,
} from '../src/interfaces/Species';
import {deleteSpecies, getAllSpecies, postSpecies} from './testSpecies';
// const app = 'http://localhost:3000';

describe('GET /api/v1', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test succesful category routes
  let categoryMessage: DBMessageResponse;
  let sentCategory: ICategory;

  it('Should post a category', async () => {
    categoryMessage = await postCategory(app, 'test category');
    sentCategory = categoryMessage.data as ICategory;
  });

  it('Should get array of categories', async () => {
    await getCategories(app);
  });

  it('Should get a category', async () => {
    console.log(sentCategory._id!);
    await getCategory(app, sentCategory._id!);
  });

  it('Should put a category', async () => {
    await putCategory(app, sentCategory._id!, 'test category');
  });

  //   // test succesful species routes

  let speciesMessage: DBMessageResponse;
  let sentSpecies: ISpecies;

  it('Should post a species', async () => {
    const newSpecies: ISpeciesObject = {
      species_name: 'test species',
      category: sentCategory._id!,
      image: '',
      location: {
        type: 'Point',
        coordinates: [48.7563158, 11.2006231],
      },
    };
    speciesMessage = await postSpecies(app, newSpecies);
    console.log(speciesMessage);
    sentSpecies = speciesMessage.data as ISpecies;
  });

  it('Should get array of species', async () => {
    await getAllSpecies(app);
  });

  //   it('Should get a species', async () => {
  //     await getSpecies(app, speciesMessage.data._id!);
  //   });

  //   it('Should get species within a bounding box', async () => {
  //     const area = {
  //       topRight: '58.05,17.22',
  //       bottomLeft: '49.10,10.32',
  //     };
  //     await getSpeciesFromArea(app, area);
  //   });

  //   it('Should modify a species', async () => {
  //     const newSpecies: Species = {
  //       species_name: 'test species 2',
  //     };
  //     await putSpecies(app, speciesMessage.data._id!, newSpecies);
  //   });

  //   // test succesful animal routes

  // let animalMessage: DBMessageResponse;
  // it('Should post an animal', async () => {
  //   const testAnimal: Animal = {
  //     animal_name: 'test animal',
  //     species: speciesMessage.data._id!,
  //     birthdate: '2020-01-01' as unknown as Date,
  //   };
  //   animalMessage = await postAnimal(app, testAnimal);
  // });

  //   it('Should get array of animals', async () => {
  //     await getAllAnimals(app);
  //   });

  //   it('Should get an animal', async () => {
  //     await getAnimal(app, animalMessage.data._id!);
  //   });

  //   it('Should put an animal', async () => {
  //     const testAnimal: Animal = {
  //       animal_name: 'test animal 2',
  //     };
  //     await putAnimal(app, animalMessage.data._id!, testAnimal);
  //   });

  //   // delete test data

  //   it('Should delete an animal', async () => {
  //     await deleteAnimal(app, animalMessage.data._id!);
  //   });

  // it('Should delete a species', async () => {
  //   await deleteSpecies(app, sentSpecies._id!);
  // });

  it('Should delete a category', async () => {
    await deleteCategory(app, sentCategory._id!);
  });
});
