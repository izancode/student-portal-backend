import studentModel from "../models/studentModel.js";
import userModel from "../models/userModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const signInStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };

    const student = await studentModel.create(studentData);
    if (student) {
      await userModel.create([
        {
          userId: student._id,
          name:
            studentData.student_first_name +
            " " +
            studentData.student_middle_name +
            " " +
            studentData.student_last_name,
          email: studentData.student_email,
          phone_number: studentData.student_phone_number,
          role: "student",
        },
        {
          userId: student._id,
          name: studentData.student_father_name,
          email: studentData.student_father_email,
          phone_number: studentData.student_father_number,
          role: "parents",
        },
        {
          userId: student._id,
          name: studentData.student_mother_name,
          email: studentData.student_mother_email,
          phone_number: studentData.student_mother_number,
          role: "parents",
        },
      ]);
    }
    if (student && req.file) {
      const studentId = student._id;

      const imageUrl = await uploadToCloudinary(req.body, req.file, "student");
      studentModel
        .findByIdAndUpdate(studentId, { student_profile_image: imageUrl.url })
        .then((response) => {
          student.student_profile_image = imageUrl.url;
          res.status(200).json({
            status: true,
            message: "Student has been registered successfully",
          });
        })
        .catch((updateError) => {
          res.status(200).json("coming from here with profile field", student);
        });
    } else {
      return next(new ErrorHandler("Image is not Uploaded by Server", 422));
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
