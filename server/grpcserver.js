const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const connectDB = require("../config/db");
const {
  CreatePost,
  GetPostById,
  GetAllPosts,
  UpdatePost,
  DeletePost,
} = require("../services/postService");

connectDB();

const packageDef = protoLoader.loadSync("protos/post.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const postPackage = grpcObject.post;

const server = new grpc.Server();

server.addService(postPackage.PostService.service, {
  CreatePost,
  GetPostById,
  GetAllPosts,
  UpdatePost,
  DeletePost,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC Server Running on port 50051");
    server.start();
  }
);
