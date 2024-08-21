import mongoose from "mongoose";
const { Schema } = mongoose;
const studentSchema = new Schema(
  {
    student_school: {
      type: String,
      required: [true, "Please enter your student school"],
    },
    student_programs: {
      type: String,
      required: [true, "Please enter your student programs"],
    },
    student_degree: {
      type: String,
      required: [true, "Please enter your student degree"],
    },
    student_specialisation: {
      type: String,
      required: [true, "Please enter your student specialisation"],
    },
    student_how_did_you_hear_about_us: {
      type: String,
      required: [true, "Please enter your student how did you hear about us"],
    },
    student_profile_image: {
      type: String,
      required: [true, "Please enter your student profile image"],
    },

    student_first_name: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    student_middle_name: {
      type: String,
      required: [true, "Please enter your middle name"],
    },
    student_last_name: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    student_nationality: {
      type: String,
      required: [true, "Please enter your nationality"],
    },
    student_address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    student_apartment: {
      type: String,
      required: [true, "Please enter your apartment"],
    },
    student_country: {
      type: String,
      required: [true, "Please enter your country"],
    },
    student_state: {
      type: String,
      required: [true, "Please enter your state"],
    },
    student_city: {
      type: String,
      required: [true, "Please enter your city"],
    },
    student_postal_code: {
      type: Number,
      required: [true, "Please enter your postal code"],
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value > 0;
        },
        message: "Postal code must be a positive integer",
      },
    },
    student_phone_number: {
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
    student_email: {
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
      type: Date,
      required: [true, "Please enter your Date of Birth"],
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value.getTime());
        },
        message: "Invalid Date of Birth",
      },
    },
    student_gender: {
      type: String,
      required: [true, "Please enter your gender"],
    },
    student_blood_group: {
      type: String,
      required: [true, "Please enter your blood group"],
    },
    student_caste_category: {
      type: String,
      required: [true, "Please enter your caste category"],
    },
    student_instagram_url: {
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
    student_linkedin_url: {
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
    previous_college_grade_10_details: {
      type: String,
      required: [true, "Please enter your previous college grade 10 details"],
    },
    previous_college_percentage_grade_secured: {
      type: String,
      required: [
        true,
        "Please enter your previous college percentage grade secured",
      ],
    },
    previous_college_marks_secured: {
      type: String,
      required: [true, "Please enter your previous college marks secured"],
    },
    previous_college_marks_out_of: {
      type: String,
      required: [true, "Please enter your previous college marks out of"],
    },
    previous_college_academic_year: {
      type: String,
      required: [true, "Please enter your previous college academic year"],
    },
    previous_college_examination_board: {
      type: String,
      required: [true, "Please enter your previous college examination board"],
    },
    previous_college_state: {
      type: String,
      required: [true, "Please enter your previous college state"],
    },
    previous_college_city: {
      type: String,
      required: [true, "Please enter your previous college city"],
    },
    previous_college_grade_12th_school_details: {
      type: String,
      required: [
        true,
        "Please enter your previous college grade 12th school details",
      ],
    },
    previous_college_grade_12th_school_details: {
      type: String,
      required: [
        true,
        "Please enter your previous college grade 12th school details",
      ],
    },
    previous_college_name: {
      type: String,
      required: [true, "Please enter your previous college name"],
    },
    student_father_name: {
      type: String,
      required: [true, "Please enter your student father name"],
    },
    student_father_occupation: {
      type: String,
      required: [true, "Please enter your student father occupation"],
    },
    student_father_number: {
      type: String,
      required: [true, "Please enter your student father number"],
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value); // Assuming a 10-digit phone number
        },
        message: "Phone number must be a 10-digit number",
      },
    },
    student_father_email: {
      type: String,
      required: [true, "Please enter your student father email"],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email regex
        },
        message: "Invalid email format",
      },
    },
    student_mother_name: {
      type: String,
      required: [true, "Please enter your student mother name"],
    },
    student_mother_occupation: {
      type: String,
      required: [true, "Please enter your student mother occupation"],
    },
    student_mother_number: {
      type: String,
      required: [true, "Please enter your student mother number"],
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value); // Assuming a 10-digit phone number
        },
        message: "Phone number must be a 10-digit number",
      },
    },
    student_mother_email: {
      type: String,
      required: [true, "Please enter your student mother email"],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email regex
        },
        message: "Invalid email format",
      },
    },
    in_case_of_guardian_please_specify_the_relationship: {
      type: String,
      required: [
        true,
        "Please enter your in case of guardian please specify the relationship",
      ],
    },
    statement_of_purpose: {
      type: String,
      required: [true, "Please enter your statement of purpose"],
    },
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;
