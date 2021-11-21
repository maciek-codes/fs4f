module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    "<rootDir>/dist/"  
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/dist/"
  ]
};