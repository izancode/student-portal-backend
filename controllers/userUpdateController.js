import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";

export const userUpdate = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const findUser =
      (await facultyModel.findOne({ _id: decodeToken.id })) ||
      (await studentModel.findOne({ _id: decodeToken.id }));
    res.status(200).json({
      status: true,
      data: findUser,
      message: "User details fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};
