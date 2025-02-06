import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";

export const singleUser = async (req, res, next) => {
  try {
    const findUser =
      (await facultyModel.findOne({ _id: req.user.userId })) ||
      (await studentModel.findOne({ _id: req.user.userId }));
    res.status(200).json({
      status: true,
      data: findUser,
      message: "User details fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
