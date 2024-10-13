import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/Error.js";
import homeRoute from "./routes/homeRouts.js";
import studentRoute from "./routes/studentRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", homeRoute);
app.use("/api/v1", studentRoute);
app.use("/api/v1", facultyRoute);
app.use("/api/v1", userRoute);
app.use(errorMiddleware);

export default app;
