import express from "express";
import upload from "../middlewares/multer.js";

import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  userUpdate,
  userImageUpdate,
} from "../controllers/userUpdateController.js";
const router = express.Router();
router.route("/user-update").patch(
  isAuthenticatedUser,
  authorizeRoles("admin", "student", "father", "mother", "faculty"),
  upload.fields([
    { name: "father_profile_image", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
    { name: "mother_profile_image", maxCount: 1 },
  ]),
  userUpdate
);

router.route("/user-image-update").patch(
  isAuthenticatedUser,
  authorizeRoles("admin", "student", "father", "mother", "faculty"),
  upload.fields([
    { name: "father_profile_image", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
    { name: "mother_profile_image", maxCount: 1 },
  ]),
  userImageUpdate
);

export default router;
