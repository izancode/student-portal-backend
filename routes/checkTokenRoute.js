import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();
router.route("/check-token").get(isAuthenticatedUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the protected route",
  });
});

export default router;
