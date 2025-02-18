import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
export const userUpdate = async (req, res, next) => {
  try {
    const userLogin = req.user;
    const findUser =
      (await facultyModel.findOne({ _id: userLogin.userId })) ||
      (await studentModel.findOne({ _id: userLogin.userId }));
    const updatedField = req.body;
    const storeUpdatedfield = {};
    const skipFields = [
      "student_profile_image",
      "image_public_id",
      "student_father_name",
      "student_father_number",
      "student_father_email",
      "student_mother_name",
      "student_mother_number",
      "student_mother_email",
      "student_father_occupation",
      "student_mother_occupation",
      "in_case_of_guardian_please_specify_the_relationship",
    ];
    const userName = [
      "student_first_name",
      "student_middle_name",
      "student_last_name",
    ];
    const userTable = ["student_email", "student_phone_number"];
    await Promise.all(
      Object.keys(updatedField).map(async (field) => {
        if (skipFields.includes(field)) {
          return;
        }
        if (findUser[field] !== updatedField[field]) {
          if (userName.includes(field)) {
            userLogin.name = `${updatedField.student_first_name} ${updatedField.student_middle_name} ${updatedField.student_last_name}`;
          }
          if (userTable.includes(field)) {
            if (field === "student_email") {
              userLogin.email = updatedField.student_email;
            }
            if (field === "student_phone_number") {
              userLogin.phone_number = updatedField.student_phone_number;
            }
          }
          storeUpdatedfield[field] = updatedField[field];
        }
      })
    );

    await userLogin.save();
    if (Object.keys(storeUpdatedfield).length > 0) {
      Object.assign(findUser, storeUpdatedfield);
      await findUser.save();
    } else {
      return next(new ErrorHandler("Data is Already Updated", 200));
    }
    res.status(200).json({
      status: true,
      data: storeUpdatedfield,
      message: ` Field is Updated successfully`,
    });
  } catch (error) {
    return next(error);
  }
};
export const userImageUpdate = async (req, res, next) => {
  try {
    const userLogin = req.user;
    const findUser =
      (await facultyModel.findOne({ _id: userLogin.userId })) ||
      (await studentModel.findOne({ _id: userLogin.userId }));
    const updatedFile = req.file;
    const publicId = findUser.image_public_id;
    const folderPath = req.file.fieldname.split("_")[0];
    const imageUrl = await uploadToCloudinary(
      findUser,
      updatedFile,
      folderPath,
      publicId
    );
    findUser.student_profile_image = imageUrl.secure_url;
    findUser.image_public_id = imageUrl.public_id;
    await findUser.save();
    res.status(200).json({
      status: true,
      message: `Profile image updated successfully`,
    });
  } catch (error) {
    return next(error);
  }
};
