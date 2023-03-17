import request from 'supertest';
import expect from 'expect';
import {User} from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';

interface UserWithToken {
  user: User;
  token: string;
}

const getUser = (url: string | Function): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/user')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users: User[] = response.body;
          users.forEach((user) => {
            expect(user).toHaveProperty('user_id');
            expect(user).toHaveProperty('user_name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('role');
          });
          resolve(users);
        }
      });
  });
};

const getSingleUser = (url: string | Function, id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/user/' + id)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body;
          expect(user).toHaveProperty('user_id');
          expect(user).toHaveProperty('user_name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          resolve(response.body);
        }
      });
  });
};

const postUser = (
  url: string | Function,
  user: Omit<User, 'user_id' | 'role'>
): Promise<UserWithToken> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/user/')
      .set('Content-type', 'application/json')
      .send({
        user_name: user.user_name,
        email: user.email,
        password: user.password,
        role: 'admin',
      })
      .expect('Content-Type', /json/)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(response.body);
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('id');
          resolve(response.body);
        }
      });
  });
};

const putUser = (url: string | Function, token: string) => {
  return new Promise((resolve, reject) => {
    request(url)
      .put('/api/v1/user/')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        user_name: 'Test User ' + new Date().toISOString(),
      })
      .expect('Content-Type', /json/)
      .expect(200, {message: 'User updated', id: null}, (err, response) => {
        if (err) {
          console.log(response.body);
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getCurrentUser = (
  url: string | Function,
  token: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/user/token')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body;
          expect(user).toHaveProperty('user_id');
          expect(user).toHaveProperty('user_name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          resolve(response.body);
        }
      });
  });
};

const postAuthLogin = (
  url: string | Function,
  user: {username: string; password: string}
): Promise<UserWithToken> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          expect(response.body).toHaveProperty('user');
          expect(response.body).toHaveProperty('token');
          const user: User = response.body.user;
          expect(user).toHaveProperty('user_name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          expect(user).toHaveProperty('user_id');
          resolve(response.body);
        }
      });
  });
};

const postAuthLoginError = (url: string | Function): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/auth/login')
      .send({
        username: 'wrong@example.com',
        password: 'wrongpassword',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('stack');
          resolve(response.body);
        }
      });
  });
};

const deleteUser = (
  url: string | Function,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete('/api/v1/user')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, {message: 'user deleted'}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

export {
  getUser,
  getSingleUser,
  getCurrentUser,
  postUser,
  putUser,
  postAuthLogin,
  postAuthLoginError,
  deleteUser,
};
