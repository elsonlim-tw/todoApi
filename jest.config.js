module.exports = {
  preset: "@shelf/jest-mongodb",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ["./src/test-init/db-test-setup.js"],
  testResultsProcessor: "jest-sonar-reporter",
};
