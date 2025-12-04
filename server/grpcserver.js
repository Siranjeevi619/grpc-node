const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const connectDB = require("../config/db");

const {
  CreatePost,
  GetPostsByUser,
  GetPostById,
  GetAllPost,
  UpdatePost,
  DeletePost,
} = require("../services/postService");

connectDB();

const PROTO_PATH = path.join(__dirname, "../protos/post.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(packageDef);
const postPackage = grpcObj.post;

const server = new grpc.Server();

server.addService(postPackage.PostService.service, {
  CreatePost,
  GetPostById,
  GetAllPost,
  UpdatePost,
  DeletePost,
  GetPostsByUser,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Post gRPC Service running on port 50051");
    server.start();
  }
);
