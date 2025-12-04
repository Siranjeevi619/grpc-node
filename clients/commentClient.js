const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(
  __dirname,
  "..",
  "..",
  "grpc-comment",
  "protos",
  "comment.proto"
);

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const commentProto = grpc.loadPackageDefinition(packageDef).comment;

const client = new commentProto.CommentService(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

module.exports = client;
