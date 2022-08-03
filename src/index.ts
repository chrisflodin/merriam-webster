import "dotenv/config";
import { startDb } from "./utils/db";
import { startServer } from "./utils/startServer";

const init = async () => {
  try {
    await startDb();
    await startServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

init();
