import express from "express";
import cors from "cors";
import studentRoute from "./routes/studentRoute.js";
import homeRoute from "./routes/homeRouts.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", homeRoute);
app.use("/api/v1", studentRoute);

export default app;
