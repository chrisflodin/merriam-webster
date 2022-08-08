import "dotenv/config";
import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import { returnError } from "./middleware/error/returnError";
import { logError } from "./middleware/error/logError";
import rootRouter from "./routes/rootRouter";

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
