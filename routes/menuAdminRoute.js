import express from "express";
const router = express.Router();
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

import {
  menuAdminController,
  allMenus,
  allMenusAdmin,
  updateMenusAdmin,
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

router
  .route("/update-menu-admin")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateMenusAdmin);

export default router;
