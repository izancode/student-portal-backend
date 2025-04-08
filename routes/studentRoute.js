import express from "express";
import upload from "../middlewares/multer.js";
import { signInStudent } from "../controllers/studentController.js";
const router = express.Router();
router
  .route("/studentusersignin")
  .post(upload.single("profile_image"), signInStudent);

export default router;
