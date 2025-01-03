import express from "express";
import { singleUser } from "../controllers/userSingleController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();
router
  .route("/single-user")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "student", "faculty", "parents"),
    singleUser
  );

export default router;
