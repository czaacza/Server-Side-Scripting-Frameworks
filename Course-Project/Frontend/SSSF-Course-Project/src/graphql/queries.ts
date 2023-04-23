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

export { loginQuery, userByIdQuery, registerQuery, updateUserQuery };
