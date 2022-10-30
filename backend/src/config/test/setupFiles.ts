import mongoose from "mongoose";
import { dropCollections } from "../../utils/test/dropCollections";

beforeAll(async () => {
  if (!process.env["MONGO_URI"]) throw Error("MONGO_URI not set");
  mongoose.connect(process.env["MONGO_URI"]);
});

afterAll(async () => {
  await dropCollections();
  await mongoose.disconnect();
});
