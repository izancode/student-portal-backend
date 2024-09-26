import express from "express";
import upload from "../middlewares/multer.js";
import {
  logInStudent,
  logInStudentVerifyOtp,
  signInStudent,
} from "../controllers/studentController.js";
const router = express.Router();
router
  .route("/studentusersignin")
  .post(upload.single("student_profile_image"), signInStudent);

router.route("/studentuserlogin").post(logInStudent);

router.route("/studentuserverifyotp").post(logInStudentVerifyOtp);

export default router;
