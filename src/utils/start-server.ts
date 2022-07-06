import app from "../app";
import { setUpExceptionHandlingListeners } from "./error/exception-handlers";

const PORT = process.env.PORT;

export const startServer = () => {
    const server = app.listen(PORT, () => {
      console.log("App is running on port: " + PORT);
    });
    setUpExceptionHandlingListeners(server);
    return server;
}