const userService = require("../services/user.service");

module.exports = {
  Query: {
    users: () => userService.getUsers(),
    user: (_, { id }) => userService.getUser(id),
  },
  Mutation: {
    createUser: (_, { input }) => userService.createUser(input),
    updateUser: (_, { id, name }, { user }) =>
      userService.updateUser(user, id, name),
    deleteUser: (_, { id }, { user }) => userService.deleteUser(user, id),
  },
};
