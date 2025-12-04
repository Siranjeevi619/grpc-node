const express = require("express");
const router = express.Router();
const commentClient = require("../clients/commentClient");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:postId", authMiddleware, (req, res) => {
  const { text } = req.body;

  const data = {
    postId: req.params.postId,
    userId: req.user.id,
    text,
  };

  commentClient.AddComment(data, (err, response) => {
    if (err) return res.status(500).json({ message: "Comment service error" });

    res.json(response.comment);
  });
});

router.get("/:postId", (req, res) => {
  commentClient.GetCommentsByPost(
    { postId: req.params.postId },
    (err, response) => {
      if (err)
        return res.status(500).json({ message: "Comment service error" });

      res.json(response.comments);
    }
  );
});

router.get("/user/:userId", (req, res) => {
  commentClient.GetCommentsByUser(
    { userId: req.params.userId },
    (err, response) => {
      if (err)
        return res.status(500).json({ message: "Comment service error" });

      res.json(response.comments);
    }
  );
});

module.exports = router;
