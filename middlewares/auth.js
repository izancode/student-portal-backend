import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findOne({ userId: decodeToken.id });

    next();
  } catch (error) {
    return next(error);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
