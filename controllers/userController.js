import userModel from "../models/userModels.js";
import { senderService } from "../utils/senderService.js";

import ErrorHandler from "../utils/errorHandler.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

export const userLogIn = async (req, res, next) => {
  const { login_with_email_phone } = req.body;

  try {
    const user = await userModel.findOne({
      $or: [
        { email: login_with_email_phone },
        { phone_number: login_with_email_phone },
      ],
    });

    if (!user) {
      return next(new ErrorHandler("User does not exist!", 401));
    }
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const otpExpiry = Date.now() + 2 * 60 * 1000;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await senderService(user, otp, otpExpiry);
    res.status(200).json({
      status: true,
      message: `OTP has been sent to your emai-id ${user.email}`,
      identifier: user.email,
    });
  } catch (error) {
    return next(error);
  }
};
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Cookies expire day:", process.env.COOKIE_EXPIRE);
console.log("secure", process.env.NODE_ENV === "production");
export const userLogInVerifyOtp = async (req, res, next) => {
  try {
    const { finding_with_email, login_verify_otp } = req.body;

    const user = await userModel.findOne({
      email: finding_with_email,
    });
    if (!user) {
      return next(new ErrorHandler("Sorry! User not found.", 404));
    }

    if (Date.now() > user.otpExpiry && user.otp === login_verify_otp) {
      return next(
        new ErrorHandler("Your OTP has expired. Please request a new one", 400)
      );
    }

    if (user.otp !== login_verify_otp) {
      return next(new ErrorHandler("Incorrect OTP. Please try again", 401));
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
      domain: ".vercel.app",
    };
    return res.status(200).cookie("token", token, options).json({
      status: true,
      message: "Login successful! Welcome to the portal",
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};

export const userLogOut = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      status: true,
      message: "Sucessfully Logged Out",
    });
  } catch (error) {
    return next(error);
  }
};
