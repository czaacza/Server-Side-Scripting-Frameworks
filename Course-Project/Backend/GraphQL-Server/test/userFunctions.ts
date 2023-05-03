/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {UserTest} from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';
import randomstring from 'randomstring';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';

const getUser = (url: string | Function): Promise<UserTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Users {
                  users {
                    id
                    username
                    email
                    details {
                      firstName
                      lastName
                      phone
                    }
                  }
                 }
        `,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body.data.users;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty('id');
          expect(users[0]).toHaveProperty('username');
          expect(users[0]).toHaveProperty('email');
          resolve(response.body.data.users);
        }
      });
  });
};

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
                    id
                    username
                    email
                    details {
                      firstName
                      lastName
                      phone
                    }
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
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('email');
          resolve(response.body.data.userById);
        }
      });
  });
};

const postUser = (
  url: string | Function,
  user: UserTest
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Register($user: UserInput!) {
                  register(user: $user) {
                    token
                    message
                    user {
                      id
                      username
                      email
                      details {
                        firstName
                        lastName
                        phone
                      }
                    }
                  }
                }`,
        variables: {
          user: {
            username: user.username,
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
          expect(userData.user.username).toBe(user.username);
          expect(userData.user.email).toBe(user.email);
          resolve(response.body.data.register);
        }
      });
  });
};

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
                    token
                    message
                    user {
                      id
                      username
                      email
                      details {
                        firstName
                        lastName
                        phone
                      }
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

const putUser = (url: string | Function, token: string, id: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 'Updated ' + randomstring.generate(7);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation UpdateUser($user: UserModify) {
                  updateUser(user: $user) {
                    token
                    message
                    user {
                      id
                      username
                      email
                      details {
                        firstName
                        lastName
                        phone
                      }
                    }
                  }
                }`,
        variables: {
          user: {
            id: id,
            username: newValue,
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
          expect(userData.user.username).toBe(newValue);
          resolve(response.body.data.updateUser);
        }
      });
  });
};

const putUserAsAdmin = (url: string | Function, token: string, id: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 'Updated ' + randomstring.generate(7);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation UpdateUserAsAdmin($user: UserModify!, $updateUserAsAdminId: ID!) {
                  updateUserAsAdmin(user: $user, id: $updateUserAsAdminId) {
                    token
                    message
                    user {
                      id
                      username
                      email
                      details {
                        firstName
                        lastName
                        phone
                      }
                    }
                  }
                }`,
        variables: {
          user: {
            id: id,
            username: newValue,
          },
          updateUserAsAdminId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUserAsAdmin;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.username).toBe(newValue);
          resolve(response.body.data.updateUserAsAdmin);
        }
      });
  });
};

const deleteUserAsAdmin = (
  url: string | Function,
  token: string,
  id: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation DeleteUserAsAdmin($deleteUserAsAdminId: ID!) {
                  deleteUserAsAdmin(id: $deleteUserAsAdminId) {
                    token
                    message
                    user {
                      id
                      username
                      email
                      details {
                        firstName
                        lastName
                        phone
                      }
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
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          resolve(response.body.data.deleteUserAsAdmin);
        }
      });
  });
};

const deleteUser = (
  url: string | Function,
  token: string,
  id: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation DeleteUser($deleteUserId: ID!) {
                  deleteUser(id: $deleteUserId) {
                    token
                    message
                    user {
                      id
                      username
                      email
                      details {
                        firstName
                        lastName
                        phone
                      }
                    }
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
          const userData = response.body.data.deleteUser;
          expect(userData.user.id).toBe(id);
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
  putUserAsAdmin,
  deleteUserAsAdmin,
  loginUser,
  deleteUser,
};
