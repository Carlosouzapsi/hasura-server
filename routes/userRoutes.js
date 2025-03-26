const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userController = new UserController();

router.get("/users", userController.fetchUsers);
router.post("/users", userController.createUser);

module.exports = router;
