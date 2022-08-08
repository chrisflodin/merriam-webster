import "dotenv/config";
import { LOG_OPERATIONAL_ERRORS } from "./development";

// Environment Variables
process.env.MONGODB_URI =
  "mongodb+srv://chrisflodin:wfsCFtuPfoIDy1fM@cluster0.t1vra.mongodb.net/?retryWrites=true&w=majority";

// Remove logging when testing
if (!LOG_OPERATIONAL_ERRORS) {
  jest.mock("../middleware/error/logError.ts", () => {
    return {
      logError: jest.fn(),
    };
  });
}
