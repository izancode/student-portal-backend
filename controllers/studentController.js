import studentModel from "../models/studentModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { senderService } from "../utils/senderService.js";
import ErrorHandler from "../utils/errorHandler.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

export const signInStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };
    const student = await studentModel.create(studentData);
    if (student && req.file) {
      const studentId = student._id;
      const imageUrl = await uploadToCloudinary(req.body, req.file, "student");
      studentModel
        .findByIdAndUpdate(studentId, { student_profile_image: imageUrl.url })
        .then((response) => {
          student.student_profile_image = imageUrl.url;
          res.status(200).json(student);
        })
        .catch((updateError) => {
          res.status(200).json("coming from here with profile field", student);
        });
    } else {
      return next(new ErrorHandler("Image is not Uploaded by Server", 422));
    }
  } catch (error) {
    return next(error);
  }
};

export const logInStudent = async (req, res, next) => {
  const { login_with_email_phone } = req.body;

  try {
    const user = await studentModel.findOne({
      $or: [
        { student_email: login_with_email_phone },
        { student_phone_number: login_with_email_phone },
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User does not exist!" });
    }
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    // const otpExpiry = Date.now() + 2 * 60 * 1000;
    const otpExpiry = Date.now() + 60000;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    senderService(user, otp, otpExpiry);
    res.status(200).json({
      status: true,
      message: `OTP has been sent to your emai-id ${user.student_email}`,
      identifier: user.student_email,
    });
  } catch (error) {
    return next(error);
  }
};

export const logInStudentVerifyOtp = async (req, res, next) => {
  try {
    const { finding_with_email, login_verify_otp } = req.body;

    const user = await studentModel.findOne({
      student_email: finding_with_email,
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        status: false,
        message: "Your OTP has expired. Please request a new one",
      });
    }

    if (user.otp !== login_verify_otp) {
      return res.status(401).json({
        status: false,
        message: "Incorrect OTP. Please try again",
      });
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Login successful! Welcome to the portal",
    });
  } catch (error) {
    return next(error);
  }
};
