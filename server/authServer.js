const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const authService = require("../services/authService");

dotenv.config();

connectDB();

const PROTO_PATH = path.join(__dirname, "..", "protos", "auth.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const serverImpl = {
  Register: async (call, callback) => {
    try {
      const { name, email, password } = call.request;
      const result = await authService.register({ name, email, password });

      callback(null, {
        success: result.success,
        message: result.message,
        token: result.token,
        user: result.user || undefined,
      });
    } catch (err) {
      console.error("Register error:", err);
      callback(null, {
        success: false,
        message: "Internal server error",
        token: "",
        user: null,
      });
    }
  },

  Login: async (call, callback) => {
    try {
      const { email, password } = call.request;
      const result = await authService.login({ email, password });

      callback(null, {
        success: result.success,
        message: result.message,
        token: result.token,
        user: result.user || undefined,
      });
    } catch (err) {
      console.error("Login error:", err);
      callback(null, {
        success: false,
        message: "Internal server error",
        token: "",
        user: null,
      });
    }
  },

  Verify: async (call, callback) => {
    try {
      const { token } = call.request;
      const result = await authService.verify({ token });

      callback(null, {
        valid: result.valid,
        message: result.message,
        user: result.user || undefined,
      });
    } catch (err) {
      console.error("Verify error:", err);
      callback(null, {
        valid: false,
        message: "Internal server error",
        user: null,
      });
    }
  },
};

const startServer = () => {
  const server = new grpc.Server();

  server.addService(authProto.AuthService.service, serverImpl);

  const port = process.env.PORT || 50052;
  const address = `0.0.0.0:${port}`;

  server.bindAsync(
    address,
    grpc.ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) {
        console.error("gRPC server binding error:", err);
        return;
      }
      console.log(`Auth gRPC Service running on ${address}`);
      server.start();
    }
  );
};

startServer();
