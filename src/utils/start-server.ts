import { createApp } from "../app";
import { PORT } from "../consts";
import { setUpExceptionHandlingListeners } from "./error/exception-handlers";

const app = createApp();

export const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
  });
  setUpExceptionHandlingListeners(server);
  return server;
};
