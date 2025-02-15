const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorization");

router.get("/", userController.getAlluser);
router.get("/get-users", userController.getMultipleUsers);
router.get("/:id", userController.getuserById);

router.use(authMiddleware);
router.put("/:id", userController.updateuser);

router.use(authorize("ADMIN"));
router.post("/", userController.createuser);
router.delete("/:id", userController.deleteuser);

module.exports = router;
