import mongoose from "mongoose";
const { Schema } = mongoose;
const menuSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  imgSrc: {
    type: String,
    required: false,
  },
  role: [String],
});

const menuModel = mongoose.model("menu", menuSchema);

export default menuModel;
