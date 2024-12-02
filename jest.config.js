module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/shared/$1'
  }
};