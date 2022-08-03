import { Server } from "http";

export const setUpExceptionHandlingListeners = (server: Server) => {
  process.on("uncaughtException", (err) => shutDownServer(err, server));
  process.on("unhandledRejection", (err) => shutDownServer(err, server));
};

export const shutDownServer = (err: any, server: Server) => {
  console.error(err);

  server.close(() => {
    process.exit(1);
  });
  setTimeout(() => {
    process.abort();
  }, 1000).unref();
};
