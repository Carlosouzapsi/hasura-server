const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const userController = new UserController();

router.post("/users/login", userController.userLogin);
router.post("/users", userController.createUser);
router.get("/users", authMiddleware, userController.fetchUsers);

module.exports = router;
