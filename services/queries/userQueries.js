const USER_QUERIES = {
  VERIFY_EMAIL: `
      query($email: String!){
        Users(where: { email: { _eq: $email }}){
          id
        }
      }`,

  CREATE_USER: `
      mutation($name: String!, $email: String!, $password: String!){
        insert_Users_one(object: { name: $name, email: $email, password: $password }){
          id
          name
          email
        }
      }`,

  GET_USERS: `
      query {
        Users {
          id
          name
          email
        }
      }`,
};

module.exports = USER_QUERIES;
