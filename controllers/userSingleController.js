import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";
import adminModel from "../models/adminModels.js";

export const singleUser = async (req, res, next) => {
  try {
    const [faculty, student, admin] = await Promise.all([
      facultyModel.findOne({ _id: req.query.userId || req.user.userId }),
      studentModel.findOne({ _id: req.query.userId || req.user.userId }),
      adminModel.findOne({ _id: req.query.userId || req.user.userId }),
    ]);

    const findUser = faculty || student || admin;

    res.status(200).json({
      status: true,
      data: findUser,
      role: req.user.role,
      message: "User details fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
