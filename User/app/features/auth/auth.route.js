const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const authMiddleware = require("../../middlewares/authentication");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh-token", authController.refreshToken);
router.get("/logout", authController.logout);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/resetpassword/:resetToken", authController.resetPassword);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
