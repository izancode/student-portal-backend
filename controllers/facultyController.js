import facultyModel from "../models/facultyModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import userModel from "../models/userModels.js";

export const signInFaculty = async (req, res, next) => {
  try {
    const facultyData = { ...req.body };
    console.log("facultyData", facultyData);
    const faculty = await facultyModel.create(facultyData);
    if (faculty) {
      try {
        await userModel.create({
          userId: faculty._id,

          name:
            facultyData.first_name +
            " " +
            facultyData.middle_name +
            " " +
            facultyData.last_name,
          email: facultyData.email,
          phone_number: facultyData.phone_number,
          role: "faculty",
        });
      } catch (error) {
        console.log("signInFaculty 1", error);
        await facultyModel.findByIdAndDelete(faculty._id);
        return next(error);
      }
    }
    if (faculty && req.file) {
      const facultyId = faculty._id;
      const imageUrl = await uploadToCloudinary(req.body, req.file, "faculty");
      facultyModel
        .findByIdAndUpdate(facultyId, {
          profile_image: imageUrl.secure_url,
          image_public_id: imageUrl.public_id,
        })
        .then((response) => {
          faculty.profile_image = imageUrl.secure_url;
          faculty.image_public_id = imageUrl.public_id;
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
    console.log("signInFaculty 2", error);

    return next(error);
  }
};
