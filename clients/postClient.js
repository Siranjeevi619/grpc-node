const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(
  __dirname,
  "..",
  "..",
  "grpc-post",
  "protos",
  "post.proto"
);

const pkgDef = protoLoader.loadSync(PROTO_PATH, {
  includeDirs: [path.join(__dirname, "../../grpc-post/protos")],
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
