import express from "express";
import upload from "../middlewares/multer.js";

import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  userUpdate,
  userImageUpdate,
} from "../controllers/userUpdateController.js";
const router = express.Router();
router
  .route("/user-update")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin", "student"),
    upload.single("student_profile_image"),
    userUpdate
  );

router
  .route("/user-image-update")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin", "student"),
    upload.single("student_profile_image"),
    userImageUpdate
  );

export default router;
