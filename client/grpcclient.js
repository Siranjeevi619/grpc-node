const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("protos/post.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const PostService = grpcObj.post.PostService;

const client = new PostService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.CreatePost(
  { title: "Hello gRPC", content: "This is a new post!" },
  (err, response) => {
    if (err) console.error(err);
    console.log("Created:", response);
  }
);
