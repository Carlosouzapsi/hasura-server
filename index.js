const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const config = require("./config/enviroment");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
