import facultyModel from "../models/facultyModels.js";

export const signInFaculty = async (req, res) => {
  try {
    const fileUrl = req.file.path;

    const facultyData = { ...req.body, faculty_profile_image: fileUrl };
    const faculty = await facultyModel.create(facultyData);
    console.log(faculty);
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.errorResponse });
  }
};
