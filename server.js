const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
