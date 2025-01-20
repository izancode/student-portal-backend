import express from "express";
import { userUpdate } from "../controllers/userUpdateController.js";
const router = express.Router();
router.route("/user-update").put(userUpdate);

export default router;
