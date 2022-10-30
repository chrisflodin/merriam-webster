module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/config/test/setupFiles.ts"],
  globalSetup: "<rootDir>/src/config/test/globalSetup.ts",
  verbose: true,
};
