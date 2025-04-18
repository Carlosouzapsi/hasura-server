const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userController = new UserController();

router.post("/users/login", userController.userLogin);
router.post("/users", userController.createUser);
router.get("/users", userController.fetchUsers);

module.exports = router;
