require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.HASURA_GRAPHQL_JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
