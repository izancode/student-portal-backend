import studentModel from "../models/studentModel.js";
import cloudinary from "../utils/cloudinary.js";

export const signInStudent = async (req, res) => {
  try {
    let fileUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fileUrl = result.secure_url;
      console.log(fileUrl);
    }
    const studentData = { ...req.body, student_profile_image: fileUrl };
    const student = await studentModel.create(studentData);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.errorResponse });
  }
};
