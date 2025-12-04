const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// LOAD proto FROM grpc-post service
const PROTO_PATH = path.join(
  __dirname,
  "..",
  "..",
  "grpc-post",
  "protos",
  "post.proto"
);

const pkgDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const postProto = grpc.loadPackageDefinition(pkgDef).post;

const client = new postProto.PostService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
