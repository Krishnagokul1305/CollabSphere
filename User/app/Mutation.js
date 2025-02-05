const UserService = require("./service");

module.exports = {
  register: (_, { input }, context) => UserService.register(input, context),
  login: (_, { input }, context) => UserService.login(input, context),
  logout: (_, __, { res }) => UserService.logout(res),
  updateUser: (_, { id, name }, { userId }) =>
    UserService.updateUser(userId, id, name),
  deleteUser: (_, { id }, { userId }) => UserService.deleteUser(userId, id),
  forgotPassword: (_, { email }) => UserService.forgotPassword(email),
  resetPassword: (_, { email, token, newPassword }) =>
    UserService.resetPassword(email, token, newPassword),
};
