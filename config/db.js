const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/grpc_posts");
    console.log("DB connected (POST SERVICE)");
  } catch (err) {
    console.log("DB Error:", err);
  }
};

module.exports = connectDB;
