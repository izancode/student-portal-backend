import adminModel from "../models/adminModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import userModel from "../models/userModels.js";

export const signInAdmin = async (req, res, next) => {
  try {
    const adminData = { ...req.body };
    const admin = await adminModel.create(adminData);
    if (admin) {
      try {
        await userModel.create({
          userId: admin._id,

          name:
            adminData.first_name +
            " " +
            adminData.middle_name +
            " " +
            adminData.last_name,
          email: adminData.email,
          phone_number: adminData.phone_number,
          role: "admin",
        });
      } catch (error) {
        await adminModel.findByIdAndDelete(admin._id);
        return next(error);
      }
    }
    if (admin && req.file) {
      const adminId = admin._id;
      const imageUrl = await uploadToCloudinary(req.body, req.file, "admin");
      adminModel
        .findByIdAndUpdate(adminId, {
          profile_image: imageUrl.secure_url,
          image_public_id: imageUrl.public_id,
        })
        .then((response) => {
          admin.profile_image = imageUrl.secure_url;
          admin.image_public_id = imageUrl.public_id;
          res.status(200).json({
            status: true,
            message: "admin has been registered successfully",
          });
        })
        .catch((updateError) => {
          res.status(200).json("coming from here with profile field", admin);
        });
    } else {
      return next(new ErrorHandler("Image is not Uploaded by Server", 422));
    }
  } catch (error) {
    return next(error);
  }
};
