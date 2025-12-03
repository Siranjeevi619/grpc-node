const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/grpc_posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


