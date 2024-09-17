import express from "express";
import upload from "../middlewares/multer.js";
import { signInStudent } from "../controllers/studentController.js";
const router = express.Router();
router
  .route("/studentusers")
  .post(upload.single("student_profile_image"), signInStudent);
export default router;
