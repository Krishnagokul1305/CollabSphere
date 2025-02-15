const prisma = require("../../../DB/prisma");
const bcrypt = require("bcryptjs");
const AppError = require("../../utils/AppError");

async function getAll() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
    },
  });
  return users;
}

async function getMultipleUsers(ids) {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids.map((id) => +id),
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
    },
  });
  return users;
}

async function getById(id) {
  const user = await prisma.user.findUnique({
    where: { id: +id },
    select: {
      id: true,
      updatedAt: true,
      email: true,
      name: true,
      avatar: true,
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

async function create(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data = { ...data, password: hashedPassword };
  const newUser = await prisma.user.create({ data });
  return newUser;
}

async function updateById(id, data) {
  if (data?.password) {
    throw new AppError("This route is not for updating password", 400);
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
}

async function deleteById(id) {
  await prisma.user.delete({
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  getMultipleUsers,
  deleteById,
};
