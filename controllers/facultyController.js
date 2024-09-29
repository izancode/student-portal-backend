import facultyModel from "../models/facultyModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const signInFaculty = async (req, res, next) => {
  try {
    const facultyData = { ...req.body };
    const faculty = await facultyModel.create(facultyData);

    if (faculty && req.file) {
      const facultyId = faculty._id;
      const imageUrl = await uploadToCloudinary(req.body, req.file, "faculty");
      facultyModel
        .findByIdAndUpdate(facultyId, { faculty_profile_image: imageUrl.url })
        .then((response) => {
          faculty.faculty_profile_image = imageUrl.url;
          res.status(200).json({
            status: true,
            message: "Faculty has been registered successfully",
          });
        })
        .catch((updateError) => {
          res.status(200).json("coming from here with profile field", faculty);
        });
    } else {
      return next(new ErrorHandler("Image is not Uploaded by Server", 422));
    }
  } catch (error) {
    return next(error);
  }
};
