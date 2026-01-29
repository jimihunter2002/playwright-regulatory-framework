import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  retries: 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.BASE_API_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'x-api-key': process.env.REQUEST_API_KEY || '',
    },
  },
});
