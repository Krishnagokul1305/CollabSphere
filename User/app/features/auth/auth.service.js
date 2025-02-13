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
  if (user.password == null && password != null) {
    throw new AppError("Invalid credentials", 401);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

  const token = generateToken(user.id, "1d");
  const refreshToken = generateToken(user.id, "7d");
  return { user, token, refreshToken };
};

const registerService = async (email, name, role, password) => {
  if (!email || !name || !role || !password)
    throw new AppError("Please provide all required fields", 400);
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

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      password_reset_token: hashedToken,
      expiration_time: expirationTime,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  await mailService.sendResetPasswordEmail(email, resetLink);

  return "Password reset email sent.";
};

const resetPasswordService = async (token, newPassword) => {
  if (!token) throw new AppError("Token not found", 400);

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findUnique({
    where: { password_reset_token: hashedToken },
  });

  if (!user || !user.expiration_time || new Date() > user.expiration_time) {
    throw new AppError("Invalid or expired token", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
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
