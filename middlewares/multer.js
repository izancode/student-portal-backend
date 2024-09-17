import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
   
    const allowedFormats = ["image/jpeg", "image/png"];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only jpg and png formats are allowed."),
        false
      );
    }
  },
});
export default upload;
