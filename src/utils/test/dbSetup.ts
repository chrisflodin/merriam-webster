import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection } from "mongoose";

export class TestDB {
  mongod: undefined | MongoMemoryServer;
  connection: null | Connection = null;

  startInMemoryDB = async () => {
    this.mongod = (await MongoMemoryServer.create()) as MongoMemoryServer;
    const uri = this.mongod.getUri();
    if (this.mongod) this.connection = await mongoose.createConnection(uri);
    console.log("Database started");
  };

  dropInMemoryDB = async () => {
    if (this.mongod && this.connection) {
      await this.connection.dropDatabase();
      await this.connection.close();
      await this.mongod.stop();
      console.log("Database stopped");
    }
  };

  dropCollections = async () => {
    if (this.mongod && this.connection) {
      const collections = await this.connection.db.collections();
      for (let collection of collections) {
        await collection.drop();
      }
    }
  };
}
