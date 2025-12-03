const mongoose = require("mongoose");

const connectDB = mongoose.connect("mongodb://127.0.0.1:27017/grpc_posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connectDB;
