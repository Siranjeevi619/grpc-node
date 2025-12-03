const postSchema = require("../schema/postschema.js");
module.exports = postModel = require("mongoose").model(
  "post",
  postSchema,
  "post-data"
);
