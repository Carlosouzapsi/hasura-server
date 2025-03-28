const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const config = require("./config/enviroment");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", userRoutes);

// Middleware of errors always in the end
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
