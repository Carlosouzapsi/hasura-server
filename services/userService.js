const hasuraClient = require("./hasuraClient");

class UserService {
  async createUserService(name, email) {
    const mutation = {
      query: `
       mutation($name: String!, $email: String!){
        insert_users(objects: { name: $name, email: $email }){
          returning {
            id
            name
            email
          }
        }
      }`,
      variables: {
        name,
        email,
      },
    };

    const response = await hasuraClient.post("", mutation);
    return response.data.data.insert_users.returning[0];
  }

  async getUsersService() {
    const query = {
      query: `
        query {
          users {
            id
            name
            email
          }
        }
      `,
    };

    const response = await hasuraClient.post("", query);
    return response.data.data.users;
  }
}

module.exports = new UserService();
