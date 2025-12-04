const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/grpc_comments");
    console.log("Comment Service DB Connected");
  } catch (err) {
    console.log("DB Error:", err);
  }
};
