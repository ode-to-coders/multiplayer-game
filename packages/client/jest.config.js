import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src',
    '^app(.*)$': '<rootDir>/src/app$1',
    '^entities(.*)$': '<rootDir>/src/entities$1',
    '^features(.*)$': '<rootDir>/src/features$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^shared(.*)$': '<rootDir>/src/shared$1',
    '^widgets(.*)$': '<rootDir>/src/widgets$1',
  },
};
