import mongoose from "mongoose";
import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModels.js";
import adminModel from "../models/adminModels.js";
import userModels from "../models/userModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
export const userUpdate = async (req, res, next) => {
  try {
    const userLogin = req.user;
    const userQuery = req.query;

    let handleTwo = "";
    if (Object.keys(userQuery).length > 0 && req.user.role === "admin") {
      const userFindQuery = await userModels.findOne({
        userId: userQuery.userId,
        role: userQuery.role,
      });

      handleTwo = userFindQuery;
    } else {
      handleTwo = userLogin;
    }

    const [faculty, student, admin] = await Promise.all([
      facultyModel.findOne({
        _id: handleTwo.userId,
      }),
      studentModel.findOne({
        _id: handleTwo.userId,
      }),
      adminModel.findOne({
        _id: handleTwo.userId,
      }),
    ]);

    const findUser = faculty || student || admin;
    const updatedField = req.body;
    const storeUpdatedfield = {};
    let skipFields = [];

    let userTable = [];
    if (handleTwo.role === "student") {
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
    } else if (handleTwo.role === "father") {
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
    } else if (handleTwo.role === "mother") {
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
    } else if (handleTwo.role === "faculty") {
      skipFields = ["profile_image", "image_public_id"];
      userTable = [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone_number",
      ];
    } else if (handleTwo.role === "admin") {
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
              handleTwo.role === "student" ||
              handleTwo.role === "faculty" ||
              handleTwo.role === "admin"
            ) {
              if (
                field === "first_name" ||
                field === "middle_name" ||
                field === "last_name"
              ) {
                handleTwo.name = `${updatedField.first_name} ${updatedField.middle_name} ${updatedField.last_name}`;
              }
              if (field === "email") {
                handleTwo.email = updatedField.email;
              }
              if (field === "phone_number") {
                handleTwo.phone_number = updatedField.phone_number;
              }
            }

            if (handleTwo.role === "father") {
              if (field === "student_father_name") {
                handleTwo.name = updatedField.student_father_name;
              }
              if (field === "student_father_email") {
                handleTwo.email = updatedField.student_father_email;
              }
              if (field === "student_father_number") {
                handleTwo.phone_number = updatedField.student_father_number;
              }
            }
            if (handleTwo.role === "mother") {
              if (field === "student_mother_name") {
                handleTwo.name = updatedField.student_mother_name;
              }
              if (field === "student_mother_email") {
                handleTwo.email = updatedField.student_mother_email;
              }
              if (field === "student_mother_number") {
                handleTwo.phone_number = updatedField.student_mother_number;
              }
            }
          }
          storeUpdatedfield[field] = updatedField[field];
        }
      })
    );

    await handleTwo.save();
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

    const userQuery = req.query;

    let handleTwo = "";
    if (Object.keys(userQuery).length > 0 && req.user.role === "admin") {
      const userFindQuery = await userModels.findOne({
        userId: userQuery.userId,
        role: userQuery.role,
      });

      handleTwo = userFindQuery;
    } else {
      handleTwo = userLogin;
    }
    console.log(handleTwo);
    const [faculty, student, admin] = await Promise.all([
      facultyModel.findOne({ _id: handleTwo.userId }),
      studentModel.findOne({ _id: handleTwo.userId }),
      adminModel.findOne({ _id: handleTwo.userId }),
    ]);

    const findUser = faculty || student || admin;

    const folderPath = handleTwo.role;
    let publicIdField = "";
    let updatedFileField = "";
    if (folderPath === "father") {
      publicIdField = "father_image_public_id";
      updatedFileField = "father_profile_image";
    } else if (folderPath === "mother") {
      publicIdField = "mother_image_public_id";
      updatedFileField = "mother_profile_image";
    } else {
      publicIdField = "image_public_id";
      updatedFileField = "profile_image";
    }

    const publicId = findUser[publicIdField];
    const updatedFile = req.files[updatedFileField]?.[0];

    const imageUrl = await uploadToCloudinary(
      findUser,
      updatedFile,
      folderPath,
      publicId
    );

    findUser[updatedFileField] = imageUrl.secure_url;
    findUser[publicIdField] = imageUrl.public_id;

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
