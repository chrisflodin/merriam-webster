import "dotenv/config";
import { startDb } from "./utils/db";
import { startServer } from "./utils/start-server";

startDb()
  .then(() => startServer())
  .catch((error) => console.log("Error: " + error.message));
