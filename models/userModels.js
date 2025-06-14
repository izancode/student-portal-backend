import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  phone_number: {
    type: String,
    required: [true, "Please enter your phone number"],
    unique: true,
  },

  role: {
    type: String,
    required: [true, "Please enter your role"],
  },

  otp: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
