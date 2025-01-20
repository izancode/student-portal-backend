import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/Error.js";
import allowCors from "./middlewares/cors.js";
import homeRoute from "./routes/homeRouts.js";
import studentRoute from "./routes/studentRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import userLoginRoute from "./routes/userLoginRoute.js";
import userSingleRoute from "./routes/userSingleRoute.js";
import userUpdateRoute from "./routes/userUpdateRoute.js";
const app = express();

app.use(cookieParser());
app.use(allowCors);
app.use(express.json());
app.use("/", homeRoute);
app.use("/api/v1", studentRoute);
app.use("/api/v1", facultyRoute);
app.use("/api/v1", userLoginRoute);
app.use("/api/v1", userSingleRoute);
app.use("/api/v1", userUpdateRoute);
app.use(errorMiddleware);

export default app;
