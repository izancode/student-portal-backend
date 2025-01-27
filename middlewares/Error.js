import mongoose from "mongoose";
const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    let key = Object.keys(err.keyValue)[0];
    key = key.replace(/_/g, " ");
    err.message = `The ${key} already exists`;
    err.statusCode = 400;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    let field = err.field;
    field = field.replace(/_/g, " ");
    err.message = `${field} File size exceeds the 2 MB limit. `;
    err.statusCode = 400;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors = err.errors;
    const formattedErrors = {};
    for (const [field, error] of Object.entries(validationErrors)) {
      const { message, kind, path, value } = error.properties;
      err.message = message;
      err.statusCode = 400;
    }
  }
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
  });
};

export default errorMiddleware;
