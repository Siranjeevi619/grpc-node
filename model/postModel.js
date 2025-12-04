const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  caption: String,
  userId: String,
});

module.exports = mongoose.model("Post", postSchema);
