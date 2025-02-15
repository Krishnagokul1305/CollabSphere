const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const authMiddleware = require("../../middlewares/authentication");
const passport = require("../../utils/passport");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh-token", authController.refreshToken);
router.get("/logout", authController.logout);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/resetpassword/:resetToken", authController.resetPassword);
router.get("/me", authMiddleware, authController.getMe);
router.post("/updatePassword", authMiddleware, authController.updatePassword);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res, next) => authController.googleLogin(req, res, next)
);

module.exports = router;
