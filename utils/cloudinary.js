import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUploadedImageUrl = async (req) => {
  let fileUrl = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);

    const optimizedUrl = cloudinary.url(result.public_id, {
      transformation: [
        { width: 500, height: 500, crop: "auto", gravity: "auto" },
        { fetch_format: "auto", quality: "auto" },
      ],
      format: "png",
    });

    fileUrl = optimizedUrl;
  }

  return fileUrl;
};
