import app from "../app";
import { PORT } from "../consts";
import { setUpExceptionHandlingListeners } from "./error/exception-handlers";

export const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
  });
  setUpExceptionHandlingListeners(server);
  return server;
};
