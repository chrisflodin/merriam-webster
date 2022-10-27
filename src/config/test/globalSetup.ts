import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export = async () => {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));

  // Clean db before running tests
  await mongoose.connect(`${process.env.MONGO_URI}/test`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
