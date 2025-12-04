const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "..", "protos", "post.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const postProto = grpc.loadPackageDefinition(packageDefinition).post;

const client = new postProto.PostService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
