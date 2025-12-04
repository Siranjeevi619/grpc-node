const mongoose = require("mongoose");
const postSchema = require("../schema/postschema");

module.exports = mongoose.model("Post", postSchema);
