import express from "express";
import { signInFaculty } from "../controllers/facultyController.js";
import { multerUpload } from "../middlewares/multer.js";
const router = express.Router();
router
  .route("/facultyusers")
  .post(multerUpload.single("faculty_profile_image"), signInFaculty);
export default router;