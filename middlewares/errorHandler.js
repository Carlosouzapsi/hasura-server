const { ApiError } = require("./apiErrors");

function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Erro interno do servidor:", err);
  return res.status(500).json({ error: "Erro interno do servidor" });
}

module.exports = errorHandler;
