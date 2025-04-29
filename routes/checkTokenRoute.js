import express from "express";

const router = express.Router();
router.route("/check-token").get((req, res) => {
  const { token } = req.cookies;

  // If no token, send response and stop further execution
  if (!token) {
    return res.status(200).json({
      status: false,
      message: "Please login to access this resource",
    });
  }

  res.status(200).json({
    status: true,
    message: "Welcome to the protected route",
  });
});

export default router;
