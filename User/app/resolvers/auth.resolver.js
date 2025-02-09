const authService = require("../services/auth.service");

module.exports = {
  Query: {
    getMe: async (_, arg, { user }) => {
      try {
        if (!user) throw new Error("Unauthorized");
        return user;
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    login: (_, { input }, { res }) => authService.login(input, res),
    logout: (_, __, { res }) => authService.logout(res),
    register: (_, { input }, { res }) => authService.register(input, res),
    forgotPassword: (_, { email }) => authService.forgotPassword(email),
    resetPassword: (_, { email, token, newPassword }) =>
      authService.resetPassword(email, token, newPassword),
  },
};
