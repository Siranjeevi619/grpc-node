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

const pkgDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(pkgDef);
const commentPackage = grpcObj.comment;

const commentClient = new commentPackage.CommentService(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

module.exports = commentClient;
