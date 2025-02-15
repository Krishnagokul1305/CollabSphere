const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const { clearCookie, createCookie } = require("../../utils/cookie");
const { generateToken } = require("../../utils/jwtprovider");
const {
  loginService,
  registerService,
  forgotPasswordService,
  resetPasswordService,
  updatePasswordService,
} = require("./auth.service");
const prisma = require("../../../DB/prisma");

const register = asyncHandler(async (req, res) => {
  const { email, name, role, password } = req.body;
  const { user, token, refreshToken } = await registerService(
    email,
    name,
    role,
    password
  );
  createCookie(res, "token", token);
  createCookie(res, "refreshToken", refreshToken);
  res.status(201).json({ success: true, user, token });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token, refreshToken } = await loginService(email, password);
  console.log(token, refreshToken);
  createCookie(res, "token", token);
  createCookie(res, "refreshToken", refreshToken);
  res.status(200).json({ success: true, user, token });
});

const logout = asyncHandler(async (req, res) => {
  await clearCookie(res, "token");
  await clearCookie(res, "refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const message = await forgotPasswordService(email);
  res.status(200).json({ success: true, message });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const { resetToken } = req.params;
  const message = await resetPasswordService(resetToken, newPassword);
  res.status(200).json({ success: true, message });
});

const getMe = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw new AppError("Unauthorized", 401);

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  const newAccessToken = generateToken(user.id, "1d");
  createCookie(res, "token", newAccessToken);
  res.status(200).json({ success: true, accessToken: newAccessToken });
});

const googleLogin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  const token = generateToken(user.id, "1d");
  const refreshToken = generateToken(user.id, "7d");

  createCookie(res, "token", token);
  createCookie(res, "refreshToken", refreshToken);

  res.redirect(process.env.FRONTEND_URL);
});

const updatePassword = asyncHandler(async (req, res) => {
  throw new AppError("Not implemented", 501);
  const { user } = req;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new AppError("Please provide all the required fields", 400);
  }
  await updatePasswordService(currentPassword, newPassword, user);
  const token = generateToken(user.id, "1d");
  const refreshToken = generateToken(user.id, "7d");

  createCookie(res, "token", token);
  createCookie(res, "refreshToken", refreshToken);

  res.status(200).json({ success: true, message: "Password updated" });
});

module.exports = {
  updatePassword,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  refreshToken,
  googleLogin,
};
