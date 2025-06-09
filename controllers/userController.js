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

  async userLogin(req, res, next) {
    const { email, password } = await req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are mandatory" });
      }
      const user = await userService.userLoginService(email, password);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
