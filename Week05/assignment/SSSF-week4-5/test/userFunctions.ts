/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {UserTest} from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';
import randomstring from 'randomstring';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';

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
mutation Mutation($user: UserInput!) {
  register(user: $user) {
    message
    user {
      id
      user_name
      email
    }
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
        query: `mutation Mutation($user: UserInput!) {
          register(user: $user) {
            message
            user {
              id
              user_name
              email
            }
          }
        }`,
        variables: {
          user: {
            user_name: user.user_name,
            email: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.register;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.user_name).toBe(user.user_name);
          expect(userData.user.email).toBe(user.email);
          resolve(response.body.data.register);
        }
      });
  });
};

/* test for graphql query
mutation Login($credentials: Credentials!) {
  login(credentials: $credentials) {
    message
    token
    user {
      email
      id
      user_name
    }
  }
}
*/

const loginUser = (
  url: string | Function,
  user: UserTest
): Promise<LoginMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Login($credentials: Credentials!) {
          login(credentials: $credentials) {
            message
            token
            user {
              email
              id
              user_name
            }
          }
        }`,
        variables: {
          credentials: {
            username: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log('login response', response.body);
          const userData = response.body.data.login;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('token');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.email).toBe(user.email);
          resolve(response.body.data.login);
        }
      });
  });
};

const loginBrute = (
  url: string | Function,
  user: UserTest
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Login($credentials: Credentials!) {
          login(credentials: $credentials) {
            message
            token
            user {
              email
              id
              user_name
            }
          }
        }`,
        variables: {
          credentials: {
            username: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          if (
            response.body.errors?.[0]?.message ===
            "You are trying to access 'login' too often"
          ) {
            console.log('brute blocked', response.body.errors[0].message);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
  });
};

/* test for graphql query
mutation UpdateUser($user: UserModify!) {
  updateUser(user: $user) {
    token
    message
    user {
      id
      user_name
      email
    }
  }
}
*/
const putUser = (url: string | Function, token: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 'Test Loser ' + randomstring.generate(7);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation UpdateUser($user: UserModify!) {
          updateUser(user: $user) {
            message
            user {
              id
              user_name
              email
            }
          }
        }`,
        variables: {
          user: {
            user_name: newValue,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.user_name).toBe(newValue);
          resolve(response.body.data.updateUser);
        }
      });
  });
};

/* test for graphql query
mutation DeleteUser {
  deleteUser {
    message
    user {
      id
      user_name
      email
    }
  }
}
*/

const deleteUser = (
  url: string | Function,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation DeleteUser {
          deleteUser {
            message
            user {
              id
              user_name
              email
            }
          }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.deleteUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          resolve(response.body.data.deleteUser);
        }
      });
  });
};

const adminDeleteUser = (
  url: string | Function,
  id: string,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation DeleteUserAsAdmin($deleteUserAsAdminId: ID!) {
          deleteUserAsAdmin(id: $deleteUserAsAdminId) {
            user {
              id
            }
          }
        }`,
        variables: {
          deleteUserAsAdminId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.deleteUserAsAdmin;
          expect(userData.user.id).toBe(id);
          resolve(response.body.data.deleteUser);
        }
      });
  });
};

const wrongUserDeleteUser = (
  url: string | Function,
  id: string,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation DeleteUserAsAdmin($deleteUserAsAdminId: ID!) {
          deleteUserAsAdmin(id: $deleteUserAsAdminId) {
            user {
              id
            }
          }
        }`,
        variables: {
          deleteUserAsAdminId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.deleteUserAsAdmin;
          expect(userData).toBe(null);
          resolve(response.body.data.deleteUser);
        }
      });
  });
};

export {
  getUser,
  getSingleUser,
  postUser,
  putUser,
  deleteUser,
  loginUser,
  loginBrute,
  adminDeleteUser,
  wrongUserDeleteUser,
};
