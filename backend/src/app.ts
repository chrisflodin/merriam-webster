import "dotenv/config";
import "express-async-errors";
import express from "express";
import { returnError } from "./middleware/error/returnError";
import { logError } from "./middleware/error/logError";
import rootRouter from "./routes/rootRouter";
import bodyParser from "body-parser";

export const createApp = () => {
  const cors = require("cors");
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(rootRouter);
  app.use(logError);
  app.use(returnError);
  return app;
};
