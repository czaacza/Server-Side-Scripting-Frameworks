/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {CatTest} from '../src/interfaces/Cat';
import UploadMessageResponse from '../src/interfaces/UploadMessageResponse';
import {UserTest} from '../src/interfaces/User';
import {locationInput} from '../src/interfaces/Location';
require('dotenv').config();

// add test for graphql query
// before testing graphql, upload image to /api/v1/upload, parameter name: cat
// the file is test/picWithGPS.JPG
// the upload route will return JSON object:
/* {
  message: 'cat uploaded',
  data: {
    filename: string,
    location: geoJSON point,
  },
}
mutation CreateCat($catName: String!, $weight: Float!, $birthdate: DateTime!, $owner: ID!, $location: LocationInput!, $filename: String!) {
  createCat(cat_name: $catName, weight: $weight, birthdate: $birthdate, owner: $owner, location: $location, filename: $filename) {
    id
    cat_name
    weight
    birthdate
    owner {
      user_name
    }
    location {
      coordinates
      type
    }
    filename
  }
}
*/

const postFile = (
  url: string | Function,
  token: string
): Promise<UploadMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('cat', 'test/picWithGPS.JPG')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const uploadMessageResponse = response.body;
          expect(uploadMessageResponse).toHaveProperty('message');
          expect(uploadMessageResponse).toHaveProperty('data');
          expect(uploadMessageResponse.data).toHaveProperty('filename');
          expect(uploadMessageResponse.data).toHaveProperty('location');
          expect(uploadMessageResponse.data.location).toHaveProperty(
            'coordinates'
          );
          expect(uploadMessageResponse.data.location).toHaveProperty('type');
          resolve(uploadMessageResponse);
        }
      });
  });
};

const postCat = (
  url: string | Function,
  cat: CatTest,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateCat($catName: String!, $weight: Float!, $birthdate: DateTime!, $location: LocationInput!, $filename: String!) {
          createCat(cat_name: $catName, weight: $weight, birthdate: $birthdate, location: $location, filename: $filename) {
            id
            cat_name
            weight
            birthdate
            owner {
              user_name
            }
            location {
              coordinates
              type
            }
            filename
          }
        }`,
        variables: cat,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const newCat = response.body.data.createCat;
          expect(newCat).toHaveProperty('id');
          expect(newCat.cat_name).toBe(cat.catName);
          expect(newCat.weight).toBe(cat.weight);
          expect(newCat).toHaveProperty('birthdate');
          expect(newCat.owner).toHaveProperty('user_name');
          expect(newCat.location).toHaveProperty('coordinates');
          expect(newCat.location).toHaveProperty('type');
          expect(newCat.filename).toBe(cat.filename);
          resolve(newCat);
        }
      });
  });
};

// add test for graphql query
/*
query Query {
  cats {
    id
    cat_name
    weight
    location {
      coordinates
      type
    }
    filename
    birthdate
    owner {
      email
      id
      user_name
    }
  }
}
*/

const getCat = (url: string | Function): Promise<CatTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Query {
          cats {
            id
            cat_name
            weight
            location {
              coordinates
              type
            }
            filename
            birthdate
            owner {
              email
              id
              user_name
            }
          }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const cats = response.body.data.cats;
          expect(cats).toBeInstanceOf(Array);
          cats.forEach((cat: CatTest) => {
            expect(cat).toHaveProperty('id');
            expect(cat).toHaveProperty('cat_name');
            expect(cat).toHaveProperty('weight');
            expect(cat).toHaveProperty('location');
            expect(cat).toHaveProperty('filename');
            expect(cat).toHaveProperty('birthdate');
            expect(cat).toHaveProperty('owner');
            expect(cat.owner).toHaveProperty('email');
            expect(cat.owner).toHaveProperty('id');
            expect(cat.owner).toHaveProperty('user_name');
          });
          resolve(cats);
        }
      });
  });
};

// add test for graphql query
/*
query CatById($catByIdId: ID!) {
  catById(id: $catByIdId) {
    birthdate
    cat_name
    filename
    id
    location {
      type
      coordinates
    }
    owner {
      email
      id
      user_name
    }
    weight
  }
}
*/

const getSingleCat = (url: string | Function, id: string): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query CatById($catByIdId: ID!) {
          catById(id: $catByIdId) {
            birthdate
            cat_name
            filename
            id
            location {
              type
              coordinates
            }
            owner {
              email
              id
              user_name
            }
            weight
          }
        }`,
        variables: {
          catByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const cat = response.body.data.catById;
          expect(cat).toHaveProperty('id');
          expect(cat).toHaveProperty('cat_name');
          expect(cat).toHaveProperty('weight');
          expect(cat).toHaveProperty('location');
          expect(cat).toHaveProperty('filename');
          expect(cat).toHaveProperty('birthdate');
          expect(cat).toHaveProperty('owner');
          expect(cat.owner).toHaveProperty('email');
          expect(cat.owner).toHaveProperty('id');
          expect(cat.owner).toHaveProperty('user_name');
          resolve(cat);
        }
      });
  });
};

// add test for graphql query
/*
mutation UpdateCat($updateCatId: ID!, $catName: String, $weight: Float, $birthdate: DateTime) {
  updateCat(id: $updateCatId, cat_name: $catName, weight: $weight, birthdate: $birthdate) {
    birthdate
    cat_name
    weight
  }
}
*/

const userPutCat = (
  url: string | Function,
  cat: CatTest,
  id: string,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateCat($updateCatId: ID!, $catName: String, $weight: Float, $birthdate: DateTime) { 
          updateCat(id: $updateCatId, cat_name: $catName, weight: $weight, birthdate: $birthdate) {
            birthdate
            cat_name
            weight
          }
        }`,
        variables: {
          ...cat,
          updateCatId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedCat = response.body.data.updateCat;
          expect(updatedCat.cat_name).toBe(cat.catName);
          expect(updatedCat.weight).toBe(cat.weight);
          expect(updatedCat).toHaveProperty('birthdate');
          resolve(updatedCat);
        }
      });
  });
};

const wrongUserPutCat = (
  url: string | Function,
  cat: CatTest,
  id: string,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateCat($updateCatId: ID!, $catName: String, $weight: Float, $birthdate: DateTime) { 
          updateCat(id: $updateCatId, cat_name: $catName, weight: $weight, birthdate: $birthdate) {
            birthdate
            cat_name
            weight
          }
        }`,
        variables: {
          ...cat,
          updateCatId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedCat = response.body.data.updateCat;
          expect(updatedCat).toBe(null);
          resolve(updatedCat);
        }
      });
  });
};

const adminPutCat = (
  url: string | Function,
  cat: CatTest,
  id: string,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateCatAsAdmin($updateCatAsAdminId: ID!, $catName: String) {
          updateCatAsAdmin(id: $updateCatAsAdminId, cat_name: $catName) {
            cat_name
          }
        }`,
        variables: {
          catName: cat.catName,
          updateCatAsAdminId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedCat = response.body.data.updateCatAsAdmin;
          expect(updatedCat.cat_name).toBe(cat.catName);
          resolve(updatedCat);
        }
      });
  });
};

// add test for graphql query
/*
mutation DeleteCat($deleteCatId: ID!) {
  deleteCat(id: $deleteCatId) {
    id
  }
}
*/

const userDeleteCat = (
  url: string | Function,
  id: string,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteCat($deleteCatId: ID!) {
          deleteCat(id: $deleteCatId) {
            id
          }
        }`,
        variables: {
          deleteCatId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedCat = response.body.data.deleteCat;
          expect(deletedCat.id).toBe(id);
          resolve(deletedCat);
        }
      });
  });
};

const adminDeleteCat = (
  url: string | Function,
  id: string,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteCatAsAdmin($deleteCatAsAdminId: ID!) {
          deleteCatAsAdmin(id: $deleteCatAsAdminId) {
            id
          }
        }`,
        variables: {
          deleteCatAsAdminId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedCat = response.body.data.deleteCatAsAdmin;
          expect(deletedCat.id).toBe(id);
          resolve(deletedCat);
        }
      });
  });
};

const wrongUserDeleteCat = (
  url: string | Function,
  id: string,
  token: string
): Promise<CatTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteCat($deleteCatId: ID!) {
          deleteCat(id: $deleteCatId) {
            id
          }
        }`,
        variables: {
          deleteCatId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedCat = response.body.data.deleteCat;
          expect(deletedCat).toBe(null);
          resolve(deletedCat);
        }
      });
  });
};

// add test for graphql query
/*
query CatsByOwner($ownerId: ID!) {
  catsByOwner(ownerId: $ownerId) {
    birthdate
    cat_name
    filename
    id
    location {
      coordinates
      type
    }
    owner {
      user_name
      id
      email
    }
    weight
  }
}
*/

const getCatByOwner = (
  url: string | Function,
  id: string
): Promise<CatTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query CatsByOwner($ownerId: ID!) {
          catsByOwner(ownerId: $ownerId) {
            birthdate
            cat_name
            filename
            id
            location {
              coordinates
              type
            }
            owner {
              user_name
              id
              email
            }
            weight
          }
        }`,
        variables: {
          ownerId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const cats = response.body.data.catsByOwner;
          cats.forEach((cat: CatTest) => {
            expect(cat).toHaveProperty('id');
            expect(cat).toHaveProperty('cat_name');
            expect(cat).toHaveProperty('weight');
            expect(cat).toHaveProperty('location');
            expect(cat).toHaveProperty('filename');
            expect(cat).toHaveProperty('birthdate');
            expect(cat).toHaveProperty('owner');
            expect(cat.owner).toHaveProperty('email');
            expect((cat.owner as UserTest).id).toBe(id);
            expect(cat.owner).toHaveProperty('id');
            expect(cat.owner).toHaveProperty('user_name');
          });
          resolve(cats);
        }
      });
  });
};

// add test for graphql query
/*
query CatsByArea($topRight: Coordinates!, $bottomLeft: Coordinates!) {
  catsByArea(topRight: $topRight, bottomLeft: $bottomLeft) {
    cat_name
    location {
      coordinates
      type
    }
  }
}
*/

const getCatByBoundingBox = (
  url: string | Function,
  location: locationInput
): Promise<CatTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query CatsByArea($topRight: Coordinates!, $bottomLeft: Coordinates!) {
          catsByArea(topRight: $topRight, bottomLeft: $bottomLeft) {
            cat_name
            location {
              coordinates
              type
            }
          }
        }`,
        variables: location,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const cats = response.body.data.catsByArea;
          cats.forEach((cat: CatTest) => {
            expect(cat).toHaveProperty('cat_name');
            expect(cat).toHaveProperty('location');
            expect(cat.location).toHaveProperty('coordinates');
            expect(cat.location).toHaveProperty('type');
          });
          resolve(cats);
        }
      });
  });
};

export {
  postFile,
  getCat,
  getSingleCat,
  postCat,
  userPutCat,
  userDeleteCat,
  wrongUserDeleteCat,
  wrongUserPutCat,
  adminDeleteCat,
  adminPutCat,
  getCatByOwner,
  getCatByBoundingBox,
};
