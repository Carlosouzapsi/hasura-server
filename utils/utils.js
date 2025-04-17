require("dotenv").config();
const jwt = require("jsonwebtoken");
const hasuraClient = require("../services/hasuraClient");
const userQueries = require("../services/queries/userQueries");

function generateToken(userId, role = "user") {
  const payload = {
    sub: userId.toString(),
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": role,
      "x-hasura-allowed-roles": ["user", "admin"],
      "x-hasura-user-id": userId.toString(),
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = generateToken;
