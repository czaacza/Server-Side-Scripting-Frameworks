/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {UserTest} from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';

// get user from graphql query users
const getUser = (url: string | Function): Promise<UserTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: '{users{id user_name email}}',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body.data.users;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty('id');
          expect(users[0]).toHaveProperty('user_name');
          expect(users[0]).toHaveProperty('email');
          resolve(response.body.data.users);
        }
      });
  });
};

/* test for graphql query
query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    user_name
    id
    email
  }
}
*/
const getSingleUser = (
  url: string | Function,
  id: string
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query UserById($userByIdId: ID!) {
          userById(id: $userByIdId) {
            user_name
            id
            email
          }
        }`,
        variables: {
          userByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body.data.userById;
          expect(user.id).toBe(id);
          expect(user).toHaveProperty('user_name');
          expect(user).toHaveProperty('email');
          resolve(response.body.data.userById);
        }
      });
  });
};

/* test for graphql query
mutation CreateUser($userName: String!, $email: String!) {
  createUser(user_name: $userName, email: $email) {
    email
    id
    user_name
  }
}
*/
const postUser = (
  url: string | Function,
  user: UserTest
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation CreateUser($userName: String!, $email: String!) {
          createUser(user_name: $userName, email: $email) {
            email
            id
            user_name
          }
        }`,
        variables: {
          userName: user.user_name,
          email: user.email,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body.data.createUser;
          expect(user.user_name).toBe(user.user_name);
          expect(user.email).toBe(user.email);
          expect(user).toHaveProperty('id');
          resolve(response.body.data.createUser);
        }
      });
  });
};

/* test for graphql query
mutation CreateUser($userName: String!, $email: String!) {
  createUser(user_name: $userName, email: $email) {
    email
    id
    user_name
  }
}
*/
const putUser = (url: string | Function, id: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 'Test User ' + new Date().toISOString();
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation UpdateUser($userName: String, $updateUserId: ID!) {
          updateUser(user_name: $userName, id: $updateUserId) {
            email
            id
            user_name
          }
        }`,
        variables: {
          userName: newValue,
          updateUserId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body.data.updateUser;
          expect(user.user_name).toBe(newValue);
          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('email');
          resolve(response.body.data.updateUser);
        }
      });
  });
};

/* test for graphql query
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    email
    id
    user_name
  }
}
*/

const deleteUser = (
  url: string | Function,
  id: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation DeleteUser($deleteUserId: ID!) {
          deleteUser(id: $deleteUserId) {
            email
            id
            user_name
          }
        }`,
        variables: {
          deleteUserId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body.data.deleteUser;
          expect(user.id).toBe(id);
          resolve(response.body.data.deleteUser);
        }
      });
  });
};

export {getUser, getSingleUser, postUser, putUser, deleteUser};
