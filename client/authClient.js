const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "..", "protos", "auth.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const client = new authProto.AuthService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

client.Register(
  { name: "Test User", email: "test@example.com", password: "123456" },
  (err, response) => {
    if (err) {
      console.error("Register error:", err);
    } else {
      console.log("Register response:", response);
    }
  }
);

module.exports = client;
