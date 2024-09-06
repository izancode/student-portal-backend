import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folderPath =
      req.originalUrl === "/api/v1/studentusers"
        ? "student-portal-app/student-profile"
        : "student-portal-app/faculty-profile";
    const fileExtension = path.extname(file.originalname).substring(1);
    const publicId = `${file.fieldname}-${
      req.body.student_first_name +
      req.body.student_middle_name +
      req.body.student_last_name
    }-${Date.now()}`;

    return {
      folder: folderPath,
      public_id: publicId,
      format: fileExtension,
    };
  },
});

export const multerUpload = multer({ storage });
