import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const senderService = async (user, otp, otpExpiry) => {
  try {
    user.otpExpiry = otpExpiry;
    await user.save();

    const subject = "Your OTP Code";

    const templatePath = path.join(__dirname, "../html-mailer/otp.ejs");
    const mailHTML = await ejs.renderFile(templatePath, {
      otp: otp,
      name: user.name,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject,
      html: mailHTML,
    });
  } catch (error) {
    console.log(error);
  }
};
