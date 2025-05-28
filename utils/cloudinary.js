import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (body, files, folderPath, deletePublicId) => {

  

  return new Promise((resolve, reject) => {
    if (folderPath == "student") {
      folderPath = "student-portal-app/student-profile";
    } else if (folderPath == "father") {
      folderPath = "student-portal-app/father-profile";
    } else if (folderPath == "mother") {
      folderPath = "student-portal-app/mother-profile";
    } else if (folderPath == "faculty") {
      folderPath = "student-portal-app/faculty-profile";
    } else if (folderPath == "admin") {
      folderPath = "student-portal-app/admin-profile";
    }

    if (deletePublicId) {
      cloudinary.uploader.destroy(deletePublicId, (error, result) => {
        if (error) {
          console.log("not delete image error", error);
        }
      });
    }

    
    let imageName = "";
    if (folderPath === "student-portal-app/father-profile") {
      imageName = `${body.student_father_name
        .replace(/\s+/g, "")
        .toLowerCase()}-${Date.now()}`;
    } else if (folderPath === "student-portal-app/mother-profile") {
      imageName = `${body.student_mother_name
        .replace(/\s+/g, "")
        .toLowerCase()}-${Date.now()}`;
    } else {
      imageName = `${
        body.first_name.toLowerCase() +
        body.middle_name.toLowerCase() +
        body.last_name.toLowerCase()
      }-${Date.now()}`;
    }
  
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        public_id: imageName,
        format: files.mimetype.split("/")[1],
      },
      (error, result) => {
        if (error) {
          console.log("Cloudinary upload error:", error);
          return reject(error);
        }

        resolve(result);
      }
    );

    if (files.buffer) {
      uploadStream.end(files.buffer);
    } else {
      reject(new Error("No file buffer available"));
    }
  });
};
