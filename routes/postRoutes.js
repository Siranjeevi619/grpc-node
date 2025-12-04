const express = require("express");
const router = express.Router();
const postClient = require("../clients/postClient");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, (req, res) => {
  const { title, caption } = req.body;

  const createReq = { title, caption };

  postClient.CreatePost(createReq, (err, response) => {
    if (err) {
      console.error("CreatePost gRPC Error:", err);
      return res.status(500).json({ message: "Post service error" });
    }

    if (!response || !response.post) {
      return res
        .status(500)
        .json({ message: "Invalid response from Post Service" });
    }

    res.json(response.post);
  });
});

router.get("/:id", (req, res) => {
  postClient.GetPostById({ id: req.params.id }, (err, response) => {
    if (err) {
      console.error(" GetPostById Error:", err);
      return res.status(500).json({ message: "Post service error" });
    }

    if (!response.post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(response.post);
  });
});

router.get("/", (req, res) => {
  postClient.GetAllPost({}, (err, response) => {
    if (err) {
      console.error("GetAllPost Error:", err);
      return res.status(500).json({ message: "Post service error" });
    }
    res.json(response.posts || []);
  });
});

module.exports = router;
