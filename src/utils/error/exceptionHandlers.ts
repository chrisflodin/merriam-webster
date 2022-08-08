import { Server } from "http";
import { BaseError } from "../../types/errors";

export const setUpExceptionHandlingListeners = (server: Server) => {
  process.on("uncaughtException", (err: Error | BaseError) => shutDownServer(err, server));
  process.on("unhandledRejection", (err: Error | BaseError) => shutDownServer(err, server));
};

const shutDownServer = (err: Error, server: Server) => {
  console.error(err);
  console.error("shutting down yall");

  server.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort();
  }, 1000).unref();
};
