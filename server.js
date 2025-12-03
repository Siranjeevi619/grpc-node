const grpc = require("@grpc/grpc-js");

const protoLoader = require("@grpc/proto-loader");

const connectDb = require("./config/db");
connectDb();

const packageDef = protoLoader.loadSync("protos/post.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const postPackage = grpcObject.post;
