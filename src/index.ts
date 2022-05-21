import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI } from "./config/db-config";

const app = express();

const PORT = process.env.PORT || 5000;

const connection = mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("App is running on port: " + PORT);
    });
  })
  .catch((error) => console.log("Error: " + error.message));
