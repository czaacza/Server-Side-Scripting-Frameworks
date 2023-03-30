import app from '../src/app';
import {
  deleteUser,
  getSingleUser,
  getUser,
  postUser,
  putUser,
} from './userFunctions';
import {UserTest} from '../src/interfaces/User';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';
import {
  getCat,
  getCatByBoundingBox,
  getCatByOwner,
  getSingleCat,
  postCat,
  postFile,
  userDeleteCat,
  userPutCat,
} from './catFunctions';

import randomstring from 'randomstring';
import UploadMessageResponse from '../src/interfaces/UploadMessageResponse';
import {locationInput} from '../src/interfaces/Location';
import {CatTest} from '../src/interfaces/Cat';

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  // test create user
  let user: UserTest;
  const testUser: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
  };

  it('should create a new user', async () => {
    user = await postUser(app, testUser);
  });

  // test get all users
  it('should return array of users', async () => {
    await getUser(app);
  });

  // test get single user
  it('should return single user', async () => {
    console.log('singleuser', user);
    await getSingleUser(app, user.id!);
  });

  // test update user
  it('should update user', async () => {
    await putUser(app, user.id!);
  });

  // test cat upload
  let uploadData1: UploadMessageResponse;
  let catData1: any;
  it('should upload a cat', async () => {
    uploadData1 = await postFile(app);
    catData1 = {
      catName: 'Test Cat' + randomstring.generate(7),
      weight: 5,
      birthdate: new Date('2022-01-01'),
      filename: uploadData1.data.filename,
      location: uploadData1.data.location,
      owner: user.id,
    };
  });

  // test post cat data
  let catID1: string;
  it('should post all cat data', async () => {
    console.log(catData1);
    const cat = await postCat(app, catData1);
    catID1 = cat.id!;
  });

  // test get all cats
  it('should return array of cats', async () => {
    await getCat(app);
  });

  // test get single cat
  it('should return single cat', async () => {
    await getSingleCat(app, catID1);
  });

  // get cats by user id
  it('should return cats by current user', async () => {
    await getCatByOwner(app, user.id!);
  });

  // get cats by bounding box
  it('should return cats by bounding box', async () => {
    const location = {
      topRight: {
        lat: 70.1,
        lng: 30.8,
      },
      bottomLeft: {
        lat: 60.1,
        lng: 19.8,
      },
    };

    await getCatByBoundingBox(app, location);
  });

  // modify cat by id
  it('should modify a cat', async () => {
    const newCat: CatTest = {
      catName: 'Test Cat' + randomstring.generate(7),
      weight: 5,
      birthdate: new Date('2019-01-01'),
    };
    await userPutCat(app, newCat, catID1);
  });

  // test delete cat
  it('should delete a cat', async () => {
    await userDeleteCat(app, catID1);
  });

  // test delete user based on id
  it('should delete current user', async () => {
    await deleteUser(app, user.id!);
  });
});
