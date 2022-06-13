import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/user";
import { MONGODB_URI } from "./config/db-config";
import { returnError } from "./middleware/error/return-error";
import { logError } from "./middleware/error/log-error";

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);
app.use(logError);
app.use(returnError);

const connection = mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("App is running on port: " + PORT);
    });
  })
  .catch((error) => console.log("Error: " + error.message));
