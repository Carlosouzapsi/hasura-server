const userService = require("../services/userService");

class UserController {
  async fetchUsers(req, res) {
    try {
      const users = await userService.getUsersService();
      res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      const user = await userService.createUserService(name, email);
      res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = UserController;
