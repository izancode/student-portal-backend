import express from "express";
import upload from "../middlewares/multer.js";
import { signInFaculty } from "../controllers/facultyController.js";

const router = express.Router();
router
  .route("/facultyusersignin")
  .post(upload.single("faculty_profile_image"), signInFaculty);
export default router;
