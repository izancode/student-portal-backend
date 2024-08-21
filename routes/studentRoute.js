import express from "express";
import { home, signInStudent } from "../controllers/studentController.js";

const router = express.Router();

router.route("").get(home);
router.route("/studentusers").post(signInStudent);

export default router;
