import mongoose from "mongoose";
import { MONGODB_URI } from "../consts";

export const startDb = async () => {
  await mongoose.connect(MONGODB_URI);
};

export const shutDownDb = async () => {
  await mongoose.connection.close();
};
