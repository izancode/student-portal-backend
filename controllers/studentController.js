import studentModel from "../models/studentModel.js";

export const signInStudent = async (req, res) => {
  try {
    const student = await studentModel.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error.errorResponse);
  }
};
