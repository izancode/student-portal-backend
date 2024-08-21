import app from "../app.js";
import connectDatabase from "../config/database.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
