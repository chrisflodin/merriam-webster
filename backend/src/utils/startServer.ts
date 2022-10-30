import { createApp } from "../app";
import { PORT } from "../consts";
import { setUpExceptionHandlingListeners } from "./error/exceptionHandlers";

const app = createApp();

export const startServer = async () => {
  const server = await app.listen(PORT);
  console.log("App is running on port: " + PORT);
  setUpExceptionHandlingListeners(server);
  return server;
};
