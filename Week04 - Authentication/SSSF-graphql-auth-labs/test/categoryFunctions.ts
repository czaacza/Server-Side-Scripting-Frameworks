/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {TestCategory} from '../src/interfaces/Category';

const postCategory = async (
  url: string | Function,
  newCategory: TestCategory
): Promise<TestCategory> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($categoryName: String!) {
          addCategory(category_name: $categoryName) {
            category_name
            id
          }
        }`,
        variables: {
          categoryName: newCategory.category_name,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const category = response.body.data.addCategory as TestCategory;
          expect(category.category_name).toBe(newCategory.category_name);
          resolve(category);
        }
      });
  });
};

const getCategoryById = async (
  url: string | Function,
  id: string
): Promise<TestCategory> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query CategoryById($categoryByIdId: ID!) {
          categoryById(id: $categoryByIdId) {
            category_name
            id
          }
        }`,
        variables: {
          categoryByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const category = response.body.data.categoryById as TestCategory;
          expect(category.id).toBe(id);
          resolve(category);
        }
      });
  });
};

export {postCategory, getCategoryById};
