const hasuraClient = require("./hasuraClient");
const bcrypt = require("bcryptjs");
const USER_QUERIES = require("./queries/userQueries");
const userQueries = require("./queries/userQueries");
const { ConflictError, ApiError } = require("../middlewares/apiErrors");
const generateToken = require("../utils/utils");

class UserService {
  async createUserService(name, email, password) {
    const verifyEmailQuery = {
      query: USER_QUERIES.VERIFY_EMAIL,
      variables: {
        email,
      },
    };

    const checkResponse = await hasuraClient.post("", verifyEmailQuery);

    if (checkResponse.data.data.Users.length > 0) {
      throw new ConflictError("Email already exists");
    }
    const mutation = {
      query: userQueries.CREATE_USER,
      variables: {
        name,
        email,
        password,
      },
    };

    const response = await hasuraClient.post("", mutation);
    const newUser = response.data.data.insert_Users_one;

    const token = generateToken(newUser.id, "user");

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    };
  }

  async getUsersService() {
    try {
      const query = {
        query: USER_QUERIES.GET_USERS,
      };
      const response = await hasuraClient.post("", query);
      const users = response.data.data.Users;
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  async userLoginService(email, password) {
    const query = {
      query: userQueries.GET_USERS_BY_EMAIL,
      variables: { email },
    };
    const response = await hasuraClient.post("", query);
    const users = response.data.data.Users;

    if (!users || users.length === 0) {
      throw new ApiError(404, "user not found.");
    }
    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new ApiError(401, "unauthorized");
    }

    const token = generateToken(user.id, "user");

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

module.exports = new UserService();
