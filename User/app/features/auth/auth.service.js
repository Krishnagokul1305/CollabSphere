const prisma = require("../../../DB/prisma");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generateToken } = require("../../utils/jwtprovider");
const AppError = require("../../utils/AppError");
const MailService = require("../../utils/email");
const mailService = new MailService();

const loginService = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("User not found", 404);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

  const token = generateToken(user.id, "1d");
  const refreshToken = generateToken(user.id, "7d");
  return { user, token, refreshToken };
};

const registerService = async (email, name, role, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, name, role, password: hashedPassword },
  });

  const token = generateToken(newUser.id, "1d");
  const refreshToken = generateToken(newUser.id, "7d");

  await mailService.sendWelcomeEmail(email, name);

  return { user: newUser, token, refreshToken };
};

const forgotPasswordService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("User not found", 404);

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

const resetPasswordService = async (email, token, newPassword) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password_reset_token)
    throw new AppError("Invalid or expired token", 400);
  if (new Date() > user.expiration_time)
    throw new AppError("Token has expired", 400);

  const isValid = await bcrypt.compare(token, user.password_reset_token);
  if (!isValid) throw new AppError("Invalid token", 400);

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
};

module.exports = {
  loginService,
  registerService,
  forgotPasswordService,
  resetPasswordService,
};
