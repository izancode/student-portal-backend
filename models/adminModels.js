import mongoose from "mongoose";
const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    department: {
      type: String,
      required: [true, "Please enter your department"],
    },

    profile_image: {
      type: String,
      required: false,
    },
    image_public_id: {
      type: String,
      required: false,
    },
    first_name: {
      type: String,
      required: [true, "Please enter your  first name"],
    },
    middle_name: {
      type: String,
      required: [true, "Please enter your  middle name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your  last name"],
    },

    phone_number: {
      type: String,
      required: [true, "Please enter your phone number"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value); // Assuming a 10-digit phone number
        },
        message: "Phone number must be a 10-digit number",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email regex
        },
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
