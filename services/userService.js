const hasuraClient = require("./hasuraClient");

class UserService {
  async createUserService(name, email) {
    const mutation = {
      query: `
       mutation($name: String!, $email: String!){
        insert_Users_one(object: { name: $name, email: $email }){
            id
            name
            email
        }
      }`,
      variables: {
        name,
        email,
      },
    };

    const response = await hasuraClient.post("", mutation);
    return response.data.data.insert_Users_one;
  }

  async getUsersService() {
    const query = {
      query: `
        query {
          Users {
            id
            name
            email
          }
        }
      `,
    };

    const response = await hasuraClient.post("", query);
    return response.data.data.Users;
  }
}

module.exports = new UserService();
