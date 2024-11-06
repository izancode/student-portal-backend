import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/Error.js";
import homeRoute from "./routes/homeRouts.js";
import studentRoute from "./routes/studentRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
const app = express();
const allowedOrigins = [
  "http://localhost:5173", // Local development frontend
  "https://student-portal-frontend-phi.vercel.app", // Live frontend
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // If the origin matches one of the allowed origins, allow it.
        callback(null, true);
      } else {
        // If the origin is not in the allowed list, reject the request.
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // To allow cookies/credentials in requests
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
