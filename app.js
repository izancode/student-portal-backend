import express from "express";

import studentRoute from "./routes/studentRoute.js";
const app = express();
app.use(express.json());

// app.use("/", studentRoute);
app.use("/api/v1", studentRoute);

export default app;
