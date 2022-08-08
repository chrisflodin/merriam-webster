import mongoose from "mongoose";
import { MONGODB_URI } from "../consts";

export const startDb = () => {
  mongoose.connect(MONGODB_URI);
};

export const shutDownDb = () => {
  mongoose.connection.close();
};
