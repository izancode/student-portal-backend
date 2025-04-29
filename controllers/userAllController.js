import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";
import adminModel from "../models/adminModels.js";
import userModel from "../models/userModels.js";

export const allUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const students = await studentModel.find({});
    const faculties = await facultyModel.find({});
    const admin = await adminModel.find({});

    const only_Login_User_length = await userModel.find({});

    const only_Login_User = await userModel.find({}).skip(skip).limit(limit);

    const all_Model_Users = [...students, ...faculties, ...admin];

    res.status(200).json({
      full_User_Data: all_Model_Users,
      login_User_Data: only_Login_User,
      number_Of_Login_User: only_Login_User_length.length,
      message: "All User details fetched successfully",
      status: true,
    });
  } catch (error) {
    // console.log(error);
    return next(error);
  }
};
