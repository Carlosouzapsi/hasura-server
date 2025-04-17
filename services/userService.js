const hasuraClient = require("./hasuraClient");
const USER_QUERIES = require("./queries/userQueries");
const userQueries = require("./queries/userQueries");
const { ConflictError } = require("../middlewares/apiErrors");
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
    return response.data.data.insert_Users_one;
  }

  async getUsersService() {
    const query = {
      query: USER_QUERIES.GET_USERS,
    };

    const response = await hasuraClient.post("", query);
    const newUser = response.data.data.Users;
    return newUser;
    // Generates user token
    const token = generateToken(newUser.id, "user");
  }

  async userLoginService(email, password) {
    const query = {
      query: userQueries.VERIFY_EMAIL,
      variables: { email },
    };
  }
}

module.exports = new UserService();
