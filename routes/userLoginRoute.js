import express from "express";
import {
  userLogIn,
  userLogInVerifyOtp,
  userLogOut,
} from "../controllers/userLoginController.js";
const router = express.Router();

router.route("/userlogin").post(userLogIn);

router.route("/userverifyotp").post(userLogInVerifyOtp);
router.route("/userlogOut").get(userLogOut);

export default router;
