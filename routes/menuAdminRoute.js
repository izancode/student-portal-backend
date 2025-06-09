import express from "express";
const router = express.Router();
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

import {
  menuAdminController,
  allMenus,
  allMenusAdmin,
} from "../controllers/menuAdminController.js";
router
  .route("/create-menu-admin")
  .post(isAuthenticatedUser, authorizeRoles("admin"), menuAdminController);
router
  .route("/all-menu")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "student", "faculty", "father", "mother"),
    allMenus
  );

router
  .route("/all-menu-admin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allMenusAdmin);
export default router;
