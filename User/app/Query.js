const prisma = require("../DB/prisma");
module.exports = {
  users: async (_, arg, context) => {
    console.log(arg, context);
    return await prisma.user.findMany();
  },
  user: async (_, args) => {
    return await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
