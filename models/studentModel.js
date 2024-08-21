import mongoose from "mongoose";
const { Schema } = mongoose;
const studentSchema = new Schema(
  {
    student_first_name: {
      type: String,
      // required: [true, "Please enter your name"],
    },
    student_middle_name: {
      type: String,
      // required: [true, "Please enter your middle name"],
    },
    student_last_name: {
      type: String,
      // required: [true, "Please enter your last name"],
    },
    student_nationality: {
      type: String,
      // required: [true, "Please enter your nationality"],
    },
    student_address: {
      type: String,
      // required: [true, "Please enter your address"],
    },
    student_apartment: {
      type: String,
      // required: [true, "Please enter your apartment"],
    },
    student_country: {
      type: String,
      // required: [true, "Please enter your country"],
    },
    student_state: {
      type: String,
      // required: [true, "Please enter your state"],
    },
    student_city: {
      type: String,
      // required: [true, "Please enter your city"],
    },
    student_postal_code: {
      type: Number,
      // required: [true, "Please enter your postal code"],
    },
    student_phone_number: {
      type: Number,
      // required: [true, "Please enter your phone number"],
    },
    student_email: {
      type: String,
      // required: [true, "Please enter your email"],
    },
    dob: {
      type: String,
      // required: [true, "Please enter your Date of Birth"],
    },
    student_gender: {
      type: String,
      // required: [true, "Please enter your gender"],
    },
    student_blood_group: {
      type: String,
      // required: [true, "Please enter your blood group"],
    },
    student_caste_category: {
      type: String,
      // required: [true, "Please enter your caste category"],
    },
    student_instagram_url: {
      type: String,
      // required: [true, "Please enter your instagram url"],
    },
    student_linkedin_url: {
      type: String,
      // required: [true, "Please enter your linkedin url"],
    },
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;
