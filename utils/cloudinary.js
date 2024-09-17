import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (body, file, folderPath) => {
  return new Promise((resolve, reject) => {
    if (folderPath == "student") {
      folderPath = "student-portal-app/student-profile";
    } else if (folderPath == "faculty") {
      folderPath = "student-portal-app/faculty-profile";
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        public_id: `${
          body.student_first_name +
          body.student_middle_name +
          body.student_last_name
        }-${Date.now()}`,
        format: file.mimetype.split("/")[1],
      },
      (error, result) => {
        if (error) {
          console.log("Cloudinary upload error:", error);
          return reject(error);
        }

        resolve(result);
      }
    );

    if (file.buffer) {
      uploadStream.end(file.buffer);
    } else {
      reject(new Error("No file buffer available"));
    }
  });
};
