const loginQuery = `
      mutation Login($credentials: Credentials!) {
        login(credentials: $credentials) {
          token
          message
          user {
            id
            username
            email
          }
        }
      }
    `;

const userByIdQuery = `
query UserById($userByIdId: ID!) {
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
}
`;

const registerQuery = `
mutation Register($user: UserInput!) {
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
}
`;

const updateUserQuery = `
mutation UpdateUser($user: UserModify) {
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
}`;

const createOrderQuery = `
mutation CreateOrder($orderInput: OrderInput!) {
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
    }
    `;

const userOrdersQuery = `
query OrdersByUser($userId: ID!) {
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
}`;

const getUsersQuery = `
query Users {
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
`;

export {
  loginQuery,
  userByIdQuery,
  registerQuery,
  updateUserQuery,
  createOrderQuery,
  userOrdersQuery,
  getUsersQuery,
};
