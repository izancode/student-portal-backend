import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import path from "path";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folderPath = "student-portal-app/student-profile"; // Cloudinary folder
    const fileExtension = path.extname(file.originalname).substring(1);
    const publicId = `${file.fieldname}-${Date.now()}`;

    return {
      folder: folderPath,
      public_id: publicId,
      format: fileExtension,
    };
  },
});

export const multerUpload = multer({ storage });
