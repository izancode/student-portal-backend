import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/Error.js";
import homeRoute from "./routes/homeRouts.js";
import studentRoute from "./routes/studentRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import userLoginRoute from "./routes/userLoginRoute.js";
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-portal-frontend-phi.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", homeRoute);
app.use("/api/v1", studentRoute);
app.use("/api/v1", facultyRoute);
app.use("/api/v1", userLoginRoute);
app.use(errorMiddleware);

export default app;
