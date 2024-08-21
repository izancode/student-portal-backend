import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, { serverSelectionTimeoutMS: 50000 })
    .then((data) =>
      console.log(`Connected to DataBase mongodb atlas ${data.connection.host}`)
    )
    .catch((err) => console.log(err));
};

export default connectDatabase;
