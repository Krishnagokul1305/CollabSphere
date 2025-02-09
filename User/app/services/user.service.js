const prisma = require("../../DB/prisma");
const bcrypt = require("bcryptjs");

const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};

const getUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return user ? user : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
};

const createUser = async (input) => {
  try {
    const data = {
      ...input,
      password: await bcrypt.hash(input.password, 10),
    };
    return await prisma.user.create({ data });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
};

const updateUser = async (user, id, name) => {
  if (!user.id || user.id !== id) {
    throw new Error("Unauthorized access: You can only update your own data.");
  }

  return await prisma.user.update({ where: { id }, data: { name } });
};

const deleteUser = async (user, id) => {
  console.log(user, id);
  if (!user) {
    throw new Error("Unauthorized Access: Please log in.");
  }
  if (user.id !== id) {
    throw new Error("Unauthorized access: You can delete only your account.");
  }

  await prisma.user.delete({ where: { id } });
  return true;
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
};
