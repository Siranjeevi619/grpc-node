const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  caption: String,
});

module.exports = postSchema;
