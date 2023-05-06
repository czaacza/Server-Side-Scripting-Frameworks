/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {OrderTest} from '../src/interfaces/Order';
import ErrorResponse from '../src/interfaces/ErrorResponse';
import randomstring from 'randomstring';

const getOrder = (url: string | Function): Promise<OrderTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query OrdersByAdmin {
                  ordersByAdmin {
                    id
                    userId
                    books {
                      book
                      quantity
                    }
                    totalPrice
                    details {
                      firstName
                      lastName
                      phone
                      email
                      comments
                    }
                    status
                  }
                }
        `,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const orders = response.body.data.ordersByAdmin;
          expect(orders).toBeInstanceOf(Array);
          expect(orders[0]).toHaveProperty('id');
          expect(orders[0]).toHaveProperty('totalPrice');
          expect(orders[0]).toHaveProperty('status');
          resolve(response.body.data.ordersByAdmin);
        }
      });
  });
};

const getOrderByUser = (url: string | Function): Promise<OrderTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query OrdersByUser($userId: ID!) {
                  ordersByUser(userId: $userId) {
                    id
                    userId
                    books {
                      book
                      quantity
                    }
                    totalPrice
                    details {
                      firstName
                      lastName
                      phone
                      email
                      comments
                    }
                    status
                  }
                }`,
        variables: {
          userId: '644645132cc2223a8d78884e',
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const orders = response.body.data.ordersByUser;
          expect(orders[0]).toHaveProperty('totalPrice');
          expect(orders[0]).toHaveProperty('status');
          resolve(response.body.data.ordersByUser);
        }
      });
  });
};

const postOrder = (
  url: string | Function,
  order: OrderTest
): Promise<OrderTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation CreateOrder($orderInput: OrderInput!) {
                  createOrder(orderInput: $orderInput) {
                    id
                    userId
                    books {
                      book
                      quantity
                    }
                    totalPrice
                    details {
                      firstName
                      lastName
                      phone
                      email
                      comments
                    }
                    status
                  }
                }`,
        variables: {
          orderInput: {
            books: {
              book: '643d1f2ea82e223cf2152d42',
              quantity: 1,
            },
            totalPrice: order.totalPrice,
            details: {
              firstName: 'Babddd2222a',
              lastName: 'Momo',
              email: 'ooo@ooo.pl',
              phone: '550550550',
            },
            status: order.status,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const orderData = response.body.data.createOrder;
          expect(orderData).toHaveProperty('id');
          expect(orderData).toHaveProperty('totalPrice');
          expect(orderData).toHaveProperty('status');

          resolve(response.body.data.createOrder);
        }
      });
  });
};

const putOrder = (url: string | Function, id: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 69;
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation UpdateOrder($orderModifyInput: OderModifyInput!) {
                  updateOrder(orderModifyInput: $orderModifyInput) {
                    id
                    userId
                    books {
                      book
                      quantity
                    }
                    totalPrice
                    details {
                      firstName
                      lastName
                      phone
                      email
                      comments
                    }
                    status
                  }
                }`,
        variables: {
          orderModifyInput: {
            id: id,
            totalPrice: newValue,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const orderData = response.body.data.updateOrder;
          expect(orderData).toHaveProperty('id');
          expect(orderData).toHaveProperty('totalPrice');
          expect(orderData).toHaveProperty('status');
          expect(orderData.totalPrice).toBe(newValue);
          resolve(response.body.data.updateOrder);
        }
      });
  });
};

const deleteOrder = (
  url: string | Function,
  id: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .send({
        query: `mutation DeleteOrder($deleteOrderId: ID!) {
                  deleteOrder(id: $deleteOrderId) {
                    id
                    userId
                    books {
                      book
                      quantity
                    }
                    totalPrice
                    details {
                      firstName
                      lastName
                      phone
                      email
                      comments
                    }
                    status
                  }
                }`,
        variables: {
          deleteOrderId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const orderData = response.body.data.deleteOrder;
          expect(orderData).toHaveProperty('id');
          expect(orderData).toHaveProperty('totalPrice');
          expect(orderData).toHaveProperty('status');

          resolve(response.body.data.deleteOrder);
        }
      });
  });
};

export {getOrder, getOrderByUser, postOrder, putOrder, deleteOrder};
