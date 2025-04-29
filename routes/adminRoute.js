import express from "express";
import upload from "../middlewares/multer.js";
import { signInAdmin } from "../controllers/adminController.js";
const router = express.Router();
router
  .route("/adminusersignin")
  .post(upload.single("profile_image"), signInAdmin);
export default router;
