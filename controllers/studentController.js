import studentModel from "../models/studentModel.js";
import { cloudinaryUploadedImageUrl } from "../utils/cloudinary.js";

export const signInStudent = async (req, res) => {
  try {
    const fileUrl = await cloudinaryUploadedImageUrl(req);

    const studentData = { ...req.body, student_profile_image: fileUrl };
    const student = await studentModel.create(studentData);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.errorResponse });
  }
};
