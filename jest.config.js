module.exports = {
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["./config/jest/setupTests.js"],
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^(?!.*\\.(js|jsx)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\]",
  ],
  modulePaths: ["<rootDir>/src"],
  moduleFileExtensions: [
    "js",
    "jsx",
  ],
};