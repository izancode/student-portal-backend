import express from "express";
const app = express();

app.get("/", (req, res) =>
  res.send("Express faizan  on Vercel la la la vicenbzo")
);

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
