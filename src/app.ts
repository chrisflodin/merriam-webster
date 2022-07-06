import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/user";
import { returnError } from "./middleware/error/return-error";
import { logError } from "./middleware/error/log-error";

const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);
app.use(logError);
app.use(returnError);

export default app;