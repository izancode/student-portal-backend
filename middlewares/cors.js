// CORS middleware function
const allowCors = (req, res, next) => {
  const allowedOrigin = "https://student-portal-frontend-phi.vercel.app/"; // Allowed origin

  const origin = req.headers.origin;

  // Check if the request's origin matches the allowed origin
  if (origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin); // Allow specific origin
  } else {
    res.setHeader("Access-Control-Allow-Origin", ""); // Deny other origins
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Handle preflight requests
    return;
  }

  next(); // Pass control to the next middleware or route handler
};

export default allowCors; // Export the middleware
