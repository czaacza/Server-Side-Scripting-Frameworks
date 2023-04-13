import app from '../src/app';
import {
  adminDeleteUser,
  deleteUser,
  getSingleUser,
  getUser,
  loginBrute,
  loginUser,
  postUser,
  putUser,
} from './userFunctions';
import {UserTest} from '../src/interfaces/User';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';
import {
  adminDeleteCat,
  adminPutCat,
  getCat,
  getCatByBoundingBox,
  getCatByOwner,
  getSingleCat,
  postCat,
  postFile,
  userDeleteCat,
  userPutCat,
  wrongUserDeleteCat,
  wrongUserPutCat,
} from './catFunctions';

const uploadApp = process.env.UPLOAD_URL as string;

import randomstring from 'randomstring';
import UploadMessageResponse from '../src/interfaces/UploadMessageResponse';
import {CatTest} from '../src/interfaces/Cat';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import jwt from 'jsonwebtoken';

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
  let userData: LoginMessageResponse;
  let userData2: LoginMessageResponse;
  let adminData: LoginMessageResponse;

  const testUser: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const testUser2: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const adminUser: UserTest = {
    email: 'admin@metropolia.fi',
    password: '12345',
  };

  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  // create second user to try to modify someone else's cats and userdata
  it('should create second user', async () => {
    await postUser(app, testUser2);
  });

  // test login
  it('should login user', async () => {
    userData = await loginUser(app, testUser);
  });

  // test login with second user
  it('should login second user', async () => {
    userData2 = await loginUser(app, testUser2);
  });

  // test login with admin
  it('should login admin', async () => {
    adminData = await loginUser(app, adminUser);
  });

  // make sure token has role (so that we can test if user is admin or not)
  it('token should have role', async () => {
    const dataFromToken = jwt.verify(
      userData.token!,
      process.env.JWT_SECRET as string
    );
    expect(dataFromToken).toHaveProperty('role');
  });

  // test get all users
  it('should return array of users', async () => {
    await getUser(app);
  });

  // test get single user
  it('should return single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  // test update user
  it('should update user', async () => {
    await putUser(app, userData.token!);
  });

  // test cat upload
  let uploadData1: UploadMessageResponse;
  let catData1: CatTest;
  it('should upload a cat', async () => {
    uploadData1 = await postFile(uploadApp, userData.token!);
    catData1 = {
      catName: 'Test Cat' + randomstring.generate(7),
      weight: 5,
      birthdate: new Date('2022-01-01'),
      filename: uploadData1.data.filename,
      location: uploadData1.data.location,
    };
  });

  // test post cat data
  let catID1: string;
  it('should post cat data with file and location', async () => {
    console.log(catData1);
    const cat = await postCat(app, catData1, userData.token!);
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
    await getCatByOwner(app, userData.user.id!);
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

  // modify cat as second user
  it('should not modify a cat', async () => {
    const newCat: CatTest = {
      catName: 'Test Cat' + randomstring.generate(7),
    };
    await wrongUserPutCat(app, newCat, catID1, userData2.token!);
  });

  // delete cat as second user
  it('should not delete a cat', async () => {
    await wrongUserDeleteCat(app, catID1, userData2.token!);
  });

  // modify cat by id
  it('should modify a cat', async () => {
    const newCat: CatTest = {
      catName: 'Test Cat' + randomstring.generate(7),
      weight: 5,
      birthdate: new Date('2019-01-01'),
    };
    await userPutCat(app, newCat, catID1, userData.token!);
  });

  // modify cat by id as admin
  it('should modify a cat as admin', async () => {
    const newCat: CatTest = {
      catName: 'Test Cat' + randomstring.generate(7),
    };
    await adminPutCat(app, newCat, catID1, adminData.token!);
  });

  // test delete cat
  it('should delete a cat', async () => {
    await userDeleteCat(app, catID1, userData.token!);
  });

  // post another cat with same file and location
  let catID2: string;
  it('should upload another cat', async () => {
    const cat = await postCat(app, catData1, userData.token!);
    catID2 = cat.id!;
  });

  // test delete cat by id as admin
  it('should delete a cat as admin', async () => {
    await adminDeleteCat(app, catID2, adminData.token!);
  });

  // it should not delete user by id as normal user
  it('should not delete a user', async () => {
    await wrongUserDeleteCat(app, userData2.user.id!, userData.token!);
  });

  // test delete user by id as admin
  it('should delete a user as admin', async () => {
    await adminDeleteUser(app, userData2.user.id!, adminData.token!);
  });

  // test delete user based on token
  it('should delete current user', async () => {
    await deleteUser(app, userData.token!);
  });

  // test brute force protectiom
  test('Brute force attack simulation', async () => {
    const maxAttempts = 20;
    const mockUser: UserTest = {
      user_name: 'Test User ' + randomstring.generate(7),
      email: randomstring.generate(9) + '@user.fi',
      password: 'notthepassword',
    };

    try {
      // Call the mock login function until the maximum number of attempts is reached
      for (let i = 0; i < maxAttempts; i++) {
        const result = await loginBrute(app, mockUser);
        if (result) throw new Error('Brute force attack unsuccessful');
      }

      // If the while loop completes successfully, the test fails
      throw new Error('Brute force attack succeeded');
    } catch (error) {
      console.log(error);
      // If the login function throws an error, the test passes
      expect((error as Error).message).toBe('Brute force attack unsuccessful');
    }
  }, 15000);
});
