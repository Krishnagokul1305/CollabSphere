const { Prisma } = require("@prisma/client");

const errorHandler = (err, req, res, next) => {
  console.error(err.name, err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "PrismaClientKnownRequestError") {
    if (err.message.includes("Unique constraint failed")) {
      statusCode = 400;
      message = `Duplicate Entry`;
    }
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid input data.";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid Token.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please log in again.";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.isOperational) {
    statusCode = err.statusCode || 400;
    message = err.message;
  }
  console.log(message, statusCode);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
