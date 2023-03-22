// TODO: Add tests for the following:
// 1. Get all categories
// 2. Get category by id
// 3. Post category
// 4. Put category
// 5. Delete category

/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {ICategory} from '../src/interfaces/Category';
import DBMessageResponse from '../src/interfaces/DBMessageResponse';

const getCategories = (url: string | Function): Promise<ICategory[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/categories')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const categories: ICategory[] = response.body;
          categories.forEach((category) => {
            expect(category._id).not.toBe('');
            expect(category.category_name).not.toBe('');
          });
          resolve(categories);
        }
      });
  });
};

const getCategory = (
  url: string | Function,
  id: number
): Promise<ICategory> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/categories/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const category: ICategory = response.body;
          expect(category._id).toBe(id);
          expect(category.category_name).not.toBe('');
          resolve(category);
        }
      });
  });
};

const postCategory = (
  url: string | Function,
  category_name: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/categories')
      .send({category_name: category_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          expect(message.message).not.toBe('');
          expect((message.data as ICategory).category_name).toBe(category_name);
          resolve(message);
        }
      });
  });
};

const putCategory = (
  url: string | Function,
  id: number,
  category_name: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/categories/${id}`)
      .send({category_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          expect(message.message).not.toBe('');
          expect((message.data as ICategory)._id).toBe(id);
          expect((message.data as ICategory).category_name).toBe(category_name);
          resolve(message);
        }
      });
  });
};

const deleteCategory = (
  url: string | Function,
  id: number
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/categories/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          expect(message.message).not.toBe('');
          expect((message.data as ICategory)._id).toBe(id);
          resolve(message);
        }
      });
  });
};

export {getCategories, getCategory, postCategory, putCategory, deleteCategory};
