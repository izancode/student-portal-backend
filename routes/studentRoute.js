import express from "express";
import { signInStudent } from "../controllers/studentController.js";

const router = express.Router();

router.route("/studentusers").post(signInStudent);

export default router;
