import mongoose from "mongoose";
const { Schema } = mongoose;
const facultySchema = new Schema(
  {
    faculty_id: {
      type: String,
      required: [true, "Please enter your faculty id"],
    },
    department: {
      type: String,
      required: [true, "Please enter your faculty department"],
    },
    designation_position: {
      type: String,
      required: [true, "Please enter your faculty designation position"],
    },
    qualification: {
      type: String,
      required: [true, "Please enter your faculty qualification"],
    },
    experience_in_year: {
      type: String,
      required: [true, "Please enter your faculty experience in year"],
    },
    courses_subjects_taught: {
      type: String,
      required: [true, "Please enter your faculty courses subjects taught"],
    },

    profile_image: {
      type: String,
      // required: [true, "Please Upload your faculty profile image"],
      required: false,
    },
    image_public_id: {
      type: String,
      // required: [true, "Please Upload your student profile image"],
      required: false,
    },
    faculty_first_name: {
      type: String,
      required: [true, "Please enter your faculty first name"],
    },
    faculty_middle_name: {
      type: String,
      required: [true, "Please enter your faculty middle name"],
    },
    faculty_last_name: {
      type: String,
      required: [true, "Please enter your faculty last name"],
    },
    faculty_nationality: {
      type: String,
      required: [true, "Please enter your nationality"],
    },
    faculty_address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    faculty_apartment: {
      type: String,
      required: [true, "Please enter your apartment"],
    },
    faculty_country: {
      type: String,
      required: [true, "Please enter your country"],
    },
    faculty_state: {
      type: String,
      required: [true, "Please enter your state"],
    },
    faculty_city: {
      type: String,
      required: [true, "Please enter your City"],
    },
    faculty_postal_code: {
      type: String,
      required: [true, "Please enter your postal code"],
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9\s]+$/.test(value);
        },
        message: "Postal code must be a positive integer",
      },
    },
    faculty_phone_number: {
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
    faculty_email: {
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
    dob: {
      type: String,
      required: [true, "Please enter your Date of Birth"],
    },
    faculty_gender: {
      type: String,
      required: [true, "Please enter your gender"],
    },

    faculty_instagram_url: {
      type: String,
      required: [true, "Please enter your Instagram URL"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%+-]+\/?$/.test(
            value
          );
        },
        message: "Invalid Instagram URL",
      },
    },
    faculty_linkedin_url: {
      type: String,
      required: [true, "Please enter your LinkedIn URL"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+\/?$/.test(
            value
          );
        },
        message: "Invalid LinkedIn URL",
      },
    },
    research_interests_if_applicable: {
      type: String,
      required: [true, "Please enter your previous college grade 10 details"],
    },
    publications_if_applicable: {
      type: String,
      required: [
        true,
        "Please enter your previous college percentage grade secured",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const facultyModel = mongoose.model("faculty", facultySchema);

export default facultyModel;
