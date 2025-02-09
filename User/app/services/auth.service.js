const prisma = require("../../DB/prisma");
const { createCookie, clearCookie } = require("../../Utils/cookie");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../Utils/jwtprovider");
const MailService = require("../../Utils/email");
const mailService = new MailService();
const crypto = require("crypto");

const login = async (input, res) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credentials.");

  const token = generateToken(user.id);
  createCookie(res, token);

  return { success: true, message: "Login successful", user };
};

const register = async (input, res) => {
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
  createCookie(res, token);
  await mailService.sendWelcomeEmail(input.email, input.name);

  return {
    success: true,
    message: "Registration successful",
    user: newUser,
  };
};

const logout = async (res) => {
  await clearCookie(res);
  return true;
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

module.exports = {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
};
