import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";
import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";

export const singleUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log("only token", token);
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodeToken", decodeToken);
    /*

     */
    const findUser =
      (await facultyModel.findOne({ _id: decodeToken.id })) ||
      (await studentModel.findOne({ _id: decodeToken.id }));
    console.log("findUser", findUser);
    res.status(200).json({
      status: true,
      data: findUser,
      message: "User details fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};
