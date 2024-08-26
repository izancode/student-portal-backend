import express from "express";
import cors from "cors";
import studentRoute from "./routes/studentRoute.js";
import homeRoute from "./routes/homeRouts.js";
const app = express();
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());

app.use("/", homeRoute);
app.use("/api/v1", studentRoute);

export default app;
