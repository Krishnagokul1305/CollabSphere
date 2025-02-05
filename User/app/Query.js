const prisma = require("../DB/prisma");

module.exports = {
  users: async (_, arg, { userId }) => {
    console.log(userId);
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users.");
    }
  },

  user: async (_, args) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: args.id },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user.");
    }
  },

  getMe: async (_, args, { userId }) => {
    try {
      if (!userId) {
        throw new Error("Invalid user id");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
      throw new Error("Failed to fetch user data.");
    }
  },
};
