const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/authentication");

router.use(authMiddleware);
router.get("/", userController.getAlluser);
router.get("/:id", userController.getuserById);
router.post("/", userController.createuser);
router.put("/:id", userController.updateuser);
router.delete("/:id", userController.deleteuser);

module.exports = router;
