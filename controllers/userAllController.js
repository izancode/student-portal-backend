import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";
import adminModel from "../models/adminModels.js";
import userModel from "../models/userModels.js";

export const allUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search;

    const students = await studentModel.find({});
    const faculties = await facultyModel.find({});
    const admin = await adminModel.find({});

    const only_Login_User_length = (await userModel.find({})).length;
    let only_Login_User;

    if (searchQuery && searchQuery.trim() !== "") {
      const regex = new RegExp(searchQuery, "i");
      only_Login_User = await userModel.find({ name: { $regex: regex } });
    } else {
      only_Login_User = await userModel.find({}).skip(skip).limit(limit);
    }

    const all_Model_Users = [...students, ...faculties, ...admin];

    const login_Data_with_image = only_Login_User?.map((login_User, index) => {
      const all_role_image = all_Model_Users.find(
        (item) => login_User.userId.toString() === item._id.toString()
      );

      const { profile_image, mother_profile_image, father_profile_image } =
        all_role_image || {};

      return {
        login_User,
        profile_image,
        mother_profile_image,
        father_profile_image,
      };
    });

    res.status(200).json({
      login_Data_with_image,
      only_Login_User_length,
      message: "All User details fetched successfully",
      status: true,
    });
  } catch (error) {
    return next(error);
  }
};
