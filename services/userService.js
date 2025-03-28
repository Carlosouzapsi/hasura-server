const hasuraClient = require("./hasuraClient");
const USER_QUERIES = require("./queries/userQueries");
const userQueries = require("./queries/userQueries");
const { ConflictError } = require("../middlewares/apiErrors");

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
    return response.data.data.Users;
  }
}

module.exports = new UserService();
