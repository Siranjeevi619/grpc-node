const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const connectDB = require("../config/db");

const {
  AddComment,
  GetCommentsByPost,
  GetCommentsByUser,
} = require("../services/commentService");

connectDB();

const PROTO_PATH = path.join(__dirname, "../protos/comment.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const commentPackage = grpcObj.comment;

const server = new grpc.Server();

server.addService(commentPackage.CommentService.service, {
  AddComment,
  GetCommentsByPost,
  GetCommentsByUser,
});

server.bindAsync(
  "0.0.0.0:50053",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Comment gRPC Service running on 50053");
    server.start();
  }
);
