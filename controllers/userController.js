const userService = require("../services/userService");

class UserController {
  async fetchUsers(req, res, next) {
    try {
      const users = await userService.getUsersService();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const user = await userService.createUserService(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
