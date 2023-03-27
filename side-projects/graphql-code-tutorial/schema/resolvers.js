const { userList } = require('../fakeData.js');

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
  },
};

module.exports = { resolvers };
