import "dotenv/config";
import { startDb } from "./utils/db";
import { startServer } from "./utils/startServer";

startDb()
  .then(() => startServer())
  .catch((error) => console.log("Error: " + error.message));
