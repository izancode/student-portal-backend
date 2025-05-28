import studentModel from "../models/studentModel.js";
import userModel from "../models/userModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const signInStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };

    // Create student
    const student = await studentModel.create(studentData);
    if (!student) {
      return next(new ErrorHandler("Failed to create student", 500));
    }

    const studentId = student._id;

    // Create user entries (student, father, mother)
    await userModel.create([
      {
        userId: studentId,
        name: `${studentData.first_name} ${studentData.middle_name} ${studentData.last_name}`,
        email: studentData.email,
        phone_number: studentData.phone_number,
        role: "student",
      },
      {
        userId: studentId,
        name: studentData.student_father_name,
        email: studentData.student_father_email,
        phone_number: studentData.student_father_number,
        role: "father",
      },
      {
        userId: studentId,
        name: studentData.student_mother_name,
        email: studentData.student_mother_email,
        phone_number: studentData.student_mother_number,
        role: "mother",
      },
    ]);

    // ✅ Upload and update images
    if (req.files) {
      const uploadPromises = [];

      Object.keys(req.files).forEach((key) => {
        req.files[key].forEach((element) => {
          uploadPromises.push(
            (async () => {
              let textEnd = element.fieldname.split("_")[0];
              if (textEnd === "profile") textEnd = "student";

              const imageUrl = await uploadToCloudinary(
                req.body,
                element,
                textEnd
              );

              const updateData = {};

              if (
                imageUrl.asset_folder === "student-portal-app/mother-profile"
              ) {
                updateData.mother_profile_image = imageUrl.secure_url;
                updateData.mother_image_public_id = imageUrl.public_id;
              } else if (
                imageUrl.asset_folder === "student-portal-app/father-profile"
              ) {
                updateData.father_profile_image = imageUrl.secure_url;
                updateData.father_image_public_id = imageUrl.public_id;
              } else {
                updateData.profile_image = imageUrl.secure_url;
                updateData.image_public_id = imageUrl.public_id;
              }

              await studentModel.findByIdAndUpdate(studentId, updateData);
              return updateData; // optional
            })()
          );
        });
      });

      await Promise.all(uploadPromises);

      // ✅ Only one final response
      res.status(200).json({
        status: true,
        message: "Student has been registered successfully",
      });
    } else {
      return next(new ErrorHandler("Image is not uploaded by the server", 422));
    }
  } catch (error) {
    console.log("SignIn Error:", error);
    return next(error);
  }
};
