const prisma = require("../DB/prisma");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generateToken } = require("../Utils/jwtprovider");
const { signInUser, clearCookie } = require("../Utils/cookie");
const { AuthenticationError } = require("apollo-server-express");
const MailService = require("../Utils/email");

const mailService = new MailService();

const updateUser = async (userId, id, name) => {
  if (!userId || userId !== id) {
    throw new AuthenticationError(
      "Unauthorized access: You can only update your own data."
    );
  }

  return await prisma.user.update({ where: { id }, data: { name } });
};

const deleteUser = async (userId, id) => {
  if (!userId) {
    throw new AuthenticationError("Unauthorized Access: Please log in.");
  }
  if (userId !== id) {
    throw new AuthenticationError(
      "Unauthorized access: You can delete only your account."
    );
  }

  await prisma.user.delete({ where: { id } });
  return true;
};

const register = async (input, context) => {
  if (!context || !context.res) {
    throw new Error("Missing response object in context.");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      role: input.role,
      password: hashedPassword,
    },
  });

  const token = generateToken(newUser.id);
  signInUser(context, token);
  await mailService.sendWelcomeEmail(input.email, input.name);

  return {
    success: true,
    message: "Registration successful",
    user: newUser,
  };
};

const login = async (input, context) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AuthenticationError("Invalid credentials.");

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) throw new AuthenticationError("Invalid credentials.");

  const token = generateToken(user.id);
  signInUser(context, token);

  return { success: true, message: "Login successful", user };
};

const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(resetToken, 10);
  const expirationTime = new Date(Date.now() + 15 * 60 * 1000);
  await prisma.user.update({
    where: { email },
    data: {
      password_reset_token: hashedToken,
      expiration_time: expirationTime,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}?token=${resetToken}&email=${email}`;
  await mailService.sendResetPasswordEmail(email, resetLink);

  return "Password reset email sent.";
};

const resetPassword = async (email, token, newPassword) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password_reset_token)
      throw new Error("Invalid or expired token.");
    if (new Date() > user.expiration_time)
      throw new Error("Token has expired.");

    const isValid = await bcrypt.compare(token, user.password_reset_token);
    if (!isValid) throw new Error("Invalid token.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        password_reset_token: null,
        expiration_time: null,
      },
    });

    return "Password successfully reset.";
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const logout = async (res) => {
  await clearCookie(res);
  return true;
};

module.exports = {
  updateUser,
  deleteUser,
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
