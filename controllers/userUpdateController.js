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
        "student_first_name",
        "student_middle_name",
        "student_last_name",
        "student_email",
        "student_phone_number",
      ];
    } else if (userLogin.role === "father") {
      skipFields = [
        "student_school",
        "student_programs",
        "student_degree",
        "student_specialisation",
        "student_how_did_you_hear_about_us",
        "profile_image",
        "student_first_name",
        "student_middle_name",
        "student_last_name",
        "student_nationality",
        "student_address",
        "student_apartment",
        "student_country",
        "student_state",
        "student_city",
        "student_postal_code",
        "student_phone_number",
        "student_email",
        "dob",
        "student_gender",
        "student_blood_group",
        "student_caste_category",
        "student_instagram_url",
        "student_linkedin_url",
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
        "student_first_name",
        "student_middle_name",
        "student_last_name",
        "student_nationality",
        "student_address",
        "student_apartment",
        "student_country",
        "student_state",
        "student_city",
        "student_postal_code",
        "student_phone_number",
        "student_email",
        "dob",
        "student_gender",
        "student_blood_group",
        "student_caste_category",
        "student_instagram_url",
        "student_linkedin_url",
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
      userTable = [
        "faculty_first_name",
        "faculty_middle_name",
        "faculty_last_name",
        "faculty_email",
        "faculty_phone_number",
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
          //     userLogin.name = `${updatedField.student_first_name} ${updatedField.student_middle_name} ${updatedField.student_last_name}`;
          //   }
          // }
          if (userTable.includes(field)) {
            if (userLogin.role === "student") {
              if (
                field === "student_first_name" ||
                field === "student_middle_name" ||
                field === "student_last_name"
              ) {
                userLogin.name = `${updatedField.student_first_name} ${updatedField.student_middle_name} ${updatedField.student_last_name}`;
              }
              if (field === "student_email") {
                userLogin.email = updatedField.student_email;
              }
              if (field === "student_phone_number") {
                userLogin.phone_number = updatedField.student_phone_number;
              }
            }

            if (userLogin.role === "faculty") {
              if (
                field === "faculty_first_name" ||
                field === "faculty_middle_name" ||
                field === "faculty_last_name"
              ) {
                userLogin.name = `${updatedField.faculty_first_name} ${updatedField.faculty_middle_name} ${updatedField.faculty_last_name}`;
              }
              if (field === "faculty_email") {
                userLogin.email = updatedField.faculty_email;
              }
              if (field === "faculty_phone_number") {
                userLogin.phone_number = updatedField.faculty_phone_number;
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
