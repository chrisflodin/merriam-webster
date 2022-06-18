import { Server } from "http";

export const setUpExceptionHandlingListeners = (server: Server) => {
  process.on("uncaughtException", (err) => listener(err, server));
  process.on("unhandledRejection", (err) => listener(err, server));
};

const listener = (err: any, server: Server) => {
  // if (err instanceof Error) console.error(err);

  server.close(() => {
    process.exit(1);
  });
  setTimeout(() => {
    process.abort();
  }, 1000).unref();
};
