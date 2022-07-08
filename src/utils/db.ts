import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const startDb = async () => {
  return await mongoose.connect(MONGODB_URI, {}).then(() => console.log("Databse connected"));
};

export const shutDownDb = async () => {
  await mongoose.connection.close();
};
