import facultyModel from "../models/facultyModels.js";
import { cloudinaryUploadedImageUrl } from "../utils/cloudinary.js";
import { multerValidation } from "../middlewares/multer.js";

export const signInFaculty = async (req, res) => {
  try {
    const fileUrl = await cloudinaryUploadedImageUrl(req);

    const facultyData = { ...req.body, faculty_profile_image: fileUrl };
    const faculty = await facultyModel.create(facultyData);
    console.log(faculty);
    res.status(200).json(faculty);
  } catch (error) {
    multerValidation(error);
    res.status(500).json({ message: error.errorResponse });
  }
};
