const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("protos/post.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const PostService = grpcObj.post.PostService;

const client = new PostService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

client.CreatePost(
  { title: "Hello gRPC", caption: "This is a new post!" },
  (err, response) => {
    if (err) console.error(err);
    console.log("Created:", response);
  }
);
