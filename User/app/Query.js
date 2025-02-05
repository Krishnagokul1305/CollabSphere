const prisma = require("../DB/prisma");
module.exports = {
  users: async (_, arg, { userId }) => {
    console.log("user id:", userId);
    return await prisma.user.findMany();
  },
  user: async (_, args) => {
    return await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },
  getMe: async (_, args, { userId }) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};
