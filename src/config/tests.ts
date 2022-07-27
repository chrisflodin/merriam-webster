import "dotenv/config";

// Environment Variables
process.env.MONGODB_URI =
  "mongodb+srv://chrisflodin:wfsCFtuPfoIDy1fM@cluster0.t1vra.mongodb.net/?retryWrites=true&w=majority";

// Remove logging when testing
jest.mock("../middleware/error/log-error.ts", () => {
  return {
    logError: jest.fn(),
  };
});
