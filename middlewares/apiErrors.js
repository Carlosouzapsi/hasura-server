class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

class ConflictError extends ApiError {
  constructor(message) {
    super(409, message);
  }
}

module.exports = { ApiError, BadRequestError, ConflictError };
