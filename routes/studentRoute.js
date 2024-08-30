import express from "express";
import { signInStudent } from "../controllers/studentController.js";
import { multerUpload } from "../middlewares/multer.js";
const router = express.Router();

router
  .route("/studentusers")
  .post(multerUpload.single("student_profile_image"), signInStudent);

export default router;
