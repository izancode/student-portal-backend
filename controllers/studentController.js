import studentModel from "../models/studentModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const signInStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };
    const student = await studentModel.create(studentData);

    if (student && req.file) {
      const studentId = student._id;
      const imageUrl = await uploadToCloudinary(req.body, req.file, "student");
      studentModel
        .findByIdAndUpdate(studentId, { student_profile_image: imageUrl.url })
        .then((response) => {
          student.student_profile_image = imageUrl.url;
          res.status(200).json(student);
        })
        .catch((updateError) => {
          res.status(200).json("coming from here with profile field", student);
        });
    } else {
      return next(new ErrorHandler("Image is not Uploaded by Server", 422));
    }
  } catch (error) {
    return next(error);
  }
};
