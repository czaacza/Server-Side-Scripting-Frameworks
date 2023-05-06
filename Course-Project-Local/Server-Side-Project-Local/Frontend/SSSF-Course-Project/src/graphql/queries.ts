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

const addUserAsAdminQuery = `
mutation AddUserAsAdmin($user: AddUserInput!) {
  addUserAsAdmin(user: $user) {
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

const updateUserAsAdminQuery = `
mutation UpdateUserAsAdmin($user: UserModify!, $updateUserAsAdminId: ID!) {
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
}
`;

const deleteUserAsAdminQuery = `
mutation DeleteUserAsAdmin($deleteUserAsAdminId: ID!) {
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
}
`;

const getProductsQuery = `
query Books {
  books {
    id
    title
    author
    description
    price
    image
  }
}
`;

const addProductAsAdminQuery = `
mutation CreateBook($bookInput: BookInput) {
  createBook(bookInput: $bookInput) {
    id
    title
    author
    description
    price
    image
  }
}
`;

const updateProductAsAdminQuery = `
mutation UpdateBook($bookModifyInput: BookModifyInput) {
  updateBook(bookModifyInput: $bookModifyInput) {
    id
    title
    author
    description
    price
    image
  }
}
`;

const deleteProductAsAdminQuery = `
mutation DeleteBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId) {
    id
    title
    author
    description
    price
    image
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
  updateUserAsAdminQuery,
  deleteUserAsAdminQuery,
  addUserAsAdminQuery,
  getProductsQuery,
  addProductAsAdminQuery,
  updateProductAsAdminQuery,
  deleteProductAsAdminQuery,
};
