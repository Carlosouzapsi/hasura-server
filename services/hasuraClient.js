const axios = require("axios");
const config = require("../config/enviroment");

const hasuraClient = axios.create({
  baseURL: config.hasuraUrl,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": config.hasuraSecret,
  },
});

module.exports = hasuraClient;
