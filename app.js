import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middlewares/Error.js";
import homeRoute from "./routes/homeRouts.js";
import studentRoute from "./routes/studentRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import userLoginRoute from "./routes/userLoginRoute.js";
import userSingleRoute from "./routes/userSingleRoute.js";
import userAllRoute from "./routes/userAllRoute.js";
import userUpdateRoute from "./routes/userUpdateRoute.js";
import adminRoute from "./routes/adminRoute.js";
import checkTokenRoute from "./routes/checkTokenRoute.js";
import menuAdminRoute from "./routes/menuAdminRoute.js";

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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", homeRoute);
app.use("/api/v1", studentRoute);
app.use("/api/v1", facultyRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", userLoginRoute);
app.use("/api/v1", userSingleRoute);
app.use("/api/v1", userAllRoute);
app.use("/api/v1", userUpdateRoute);
app.use("/api/v1", checkTokenRoute);
app.use("/api/v1", menuAdminRoute);
app.use(errorMiddleware);

export default app;
