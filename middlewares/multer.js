import multer from "multer";
import ErrorHandler from "../utils/errorHandler.js";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // console.log(file);
    const allowedFormats = ["image/jpeg", "image/png"];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ErrorHandler("Only jpg and png formats are allowed.", 422), false);
    }
  },
});
export default upload;
