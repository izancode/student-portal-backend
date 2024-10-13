import express from "express";
import { home } from "../controllers/homeController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();
router.route("/").get(isAuthenticatedUser, authorizeRoles("student"), home);

export default router;
