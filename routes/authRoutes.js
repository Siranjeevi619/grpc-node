const express = require("express");
const router = express.Router();
const authClient = require("../clients/authClient");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  authClient.Register({ name, email, password }, (err, response) => {
    if (err) {
      console.error("Register error:", err);
      return res.status(500).json({ message: "Auth service error" });
    }
    return res.status(response.success ? 200 : 400).json(response);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  authClient.Login({ email, password }, (err, response) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Auth service error" });
    }
    return res.status(response.success ? 200 : 400).json(response);
  });
});

module.exports = router;
