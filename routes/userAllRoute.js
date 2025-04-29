import express from "express";
import { allUser } from "../controllers/userAllController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();
router
  .route("/all-user")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUser);

export default router;
