import express from "express";
import upload from "../middlewares/multer.js";
import { signInStudent } from "../controllers/studentController.js";
const router = express.Router();
router.route("/studentusersignin").post(
  upload.fields([
    { name: "father_profile_image", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
    { name: "mother_profile_image", maxCount: 1 },
  ]),

  signInStudent
);

export default router;
