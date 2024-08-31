import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, { serverSelectionTimeoutMS: 50000 })
    .then((data) => console.log(`Nodejs Connected to MongoDB`))
    .catch((err) => console.log(err));
};

export default connectDatabase;
