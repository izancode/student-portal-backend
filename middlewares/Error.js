const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  console.log("coning from error.js : ", err);
  if (err.code === 11000) {
    let key = Object.keys(err.keyValue)[0];
    key = key.replace(/_/g, " ");
    err.message = `The ${key} already exists`;
    err.statusCode = 400;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
