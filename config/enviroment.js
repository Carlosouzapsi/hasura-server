const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  hasuraUrl: process.env.HASURA_GRAPHQL_URL,
  hasuraSecret: process.env.HASURA_ADMIN_SECRET,
  port: process.env.PORT || 3000,
};
