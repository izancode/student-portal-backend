import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";
import adminModel from "../models/adminModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
export const userUpdate = async (req, res, next) => {
  try {
    const userLogin = req.user;

    const [faculty, student, admin] = await Promise.all([
      facultyModel.findOne({ _id: req.user.userId }),
      studentModel.findOne({ _id: req.user.userId }),
      adminModel.findOne({ _id: req.user.userId }),
    ]);

    const findUser = faculty || student || admin;

    const updatedField = req.body;
    const storeUpdatedfield = {};
    let skipFields = [];

    let userTable = [];
    if (userLogin.role === "student") {
      skipFields = [
        "profile_image",
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

      userTable = [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone_number",
      ];
    } else if (userLogin.role === "father") {
      skipFields = [
        "student_school",
        "student_programs",
        "student_degree",
        "student_specialisation",
        "student_how_did_you_hear_about_us",
        "profile_image",
        "first_name",
        "middle_name",
        "last_name",
        "nationality",
        "address",
        "apartment",
        "country",
        "state",
        "city",
        "postal_code",
        "phone_number",
        "email",
        "dob",
        "gender",
        "student_blood_group",
        "student_caste_category",
        "instagram_url",
        "linkedin_url",
        "previous_college_grade_10_details",
        "previous_college_percentage_grade_secured",
        "previous_college_marks_secured",
        "previous_college_academic_year",
        "previous_college_examination_board",
        "previous_college_state",
        "previous_college_city",
        "previous_college_grade_12th_school_details",
        "previous_college_name",
        "student_mother_name",
        "student_mother_occupation",
        "student_mother_number",
        "student_mother_email",
        "statement_of_purpose",
      ];

      userTable = [
        "student_father_name",
        "student_father_number",
        "student_father_email",
      ];
    } else if (userLogin.role === "mother") {
      skipFields = [
        "student_school",
        "student_programs",
        "student_degree",
        "student_specialisation",
        "student_how_did_you_hear_about_us",
        "profile_image",
        "first_name",
        "middle_name",
        "last_name",
        "nationality",
        "address",
        "apartment",
        "country",
        "state",
        "city",
        "postal_code",
        "phone_number",
        "email",
        "dob",
        "gender",
        "student_blood_group",
        "student_caste_category",
        "instagram_url",
        "linkedin_url",
        "previous_college_grade_10_details",
        "previous_college_percentage_grade_secured",
        "previous_college_marks_secured",
        "previous_college_academic_year",
        "previous_college_examination_board",
        "previous_college_state",
        "previous_college_city",
        "previous_college_grade_12th_school_details",
        "previous_college_name",
        "student_father_name",
        "student_father_occupation",
        "student_father_number",
        "student_father_email",
        "statement_of_purpose",
      ];

      userTable = [
        "student_mother_name",
        "student_mother_number",
        "student_mother_email",
      ];
    } else if (userLogin.role === "faculty") {
      skipFields = ["profile_image", "image_public_id"];
      userTable = [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone_number",
      ];
    } else if (userLogin.role === "admin") {
      skipFields = ["profile_image", "image_public_id"];
      userTable = [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone_number",
      ];
    }
    await Promise.all(
      Object.keys(updatedField).map(async (field) => {
        if (skipFields.includes(field)) {
          return;
        }

        if (findUser[field] !== updatedField[field]) {
          // if (userName.includes(field)) {
          //   if (userLogin.role === "student") {
          //     userLogin.name = `${updatedField.first_name} ${updatedField.middle_name} ${updatedField.last_name}`;
          //   }
          // }
          if (userTable.includes(field)) {
            if (
              userLogin.role === "student" ||
              userLogin.role === "faculty" ||
              userLogin.role === "admin"
            ) {
              if (
                field === "first_name" ||
                field === "middle_name" ||
                field === "last_name"
              ) {
                userLogin.name = `${updatedField.first_name} ${updatedField.middle_name} ${updatedField.last_name}`;
              }
              if (field === "email") {
                userLogin.email = updatedField.email;
              }
              if (field === "phone_number") {
                userLogin.phone_number = updatedField.phone_number;
              }
            }

            if (userLogin.role === "father") {
              if (field === "student_father_name") {
                userLogin.name = updatedField.student_father_name;
              }
              if (field === "student_father_email") {
                userLogin.email = updatedField.student_father_email;
              }
              if (field === "student_father_number") {
                userLogin.phone_number = updatedField.student_father_number;
              }
            }
            if (userLogin.role === "mother") {
              if (field === "student_mother_name") {
                userLogin.name = updatedField.student_mother_name;
              }
              if (field === "student_mother_email") {
                userLogin.email = updatedField.student_mother_email;
              }
              if (field === "student_mother_number") {
                userLogin.phone_number = updatedField.student_mother_number;
              }
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
      message: `Field is Updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const userImageUpdate = async (req, res, next) => {
  try {
    const userLogin = req.user;

    const [faculty, student, admin] = await Promise.all([
      facultyModel.findOne({ _id: req.user.userId }),
      studentModel.findOne({ _id: req.user.userId }),
      adminModel.findOne({ _id: req.user.userId }),
    ]);

    const findUser = faculty || student || admin;
    const updatedFile = req.file;

    const folderPath = userLogin.role;
    const publicId = findUser.image_public_id;

    const imageUrl = await uploadToCloudinary(
      findUser,
      updatedFile,
      folderPath,
      publicId
    );
    findUser.profile_image = imageUrl.secure_url;
    findUser.image_public_id = imageUrl.public_id;
    await findUser.save();
    res.status(200).json({
      status: true,
      message: `Profile image updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
