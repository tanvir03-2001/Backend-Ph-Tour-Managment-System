import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connect to DB");
    server = app.listen(5000, () => {
      console.log("Server is listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal is received, Server is shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal is received, Server is shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection is detected, Server is shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("Uncaught Exception is detected, Server is shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
