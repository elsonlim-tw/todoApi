module.exports = {
  preset: "@shelf/jest-mongodb",
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  setupFilesAfterEnv: ["./src/utils/db-test-setup.js"]
};
