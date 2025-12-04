const authClient = require("../clients/authClient");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  authClient.Verify({ token }, (err, response) => {
    if (err) {
      console.error("Verify error:", err);
      return res.status(500).json({ message: "Auth service error" });
    }

    if (!response.valid) {
      return res
        .status(401)
        .json({ message: response.message || "Invalid token" });
    }

    req.user = response.user;
    next();
  });
};

module.exports = authMiddleware;
