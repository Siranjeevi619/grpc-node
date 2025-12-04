const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/grpc_posts")
    .then(() => {
      console.log("DB started HERO");
    })
    .catch((e) => {
      console.log("ERROR OCCURED :" + e);
    });
};

module.exports = connectDB;
