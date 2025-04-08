import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (body, file, folderPath, deletePublicId) => {
  return new Promise((resolve, reject) => {
    let imageName;
    if (folderPath == "student") {
      folderPath = "student-portal-app/student-profile";
      imageName = `${
        body.student_first_name +
        body.student_middle_name +
        body.student_last_name
      }-${Date.now()}`;
    } else if (folderPath == "faculty") {
      folderPath = "student-portal-app/faculty-profile";
      imageName = `${
        body.faculty_first_name +
        body.faculty_middle_name +
        body.faculty_last_name
      }-${Date.now()}`;
    }

    if (deletePublicId) {
      cloudinary.uploader.destroy(deletePublicId, (error, result) => {
        if (error) {
          console.log("not delete image error", error);
        }
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        public_id: imageName,
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
