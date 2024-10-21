import { defineConfig } from '@playwright/test';
import allure from 'allure-playwright';

export default defineConfig({
  timeout: 60000,
  retries: 1,
  testDir: './tests',
  use: {
    baseURL: 'https://conduit.bondaracademy.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  reporter: [
    ['list'], // Console output
    ['allure-playwright'], // Allure reporter for detailed reports
  ],
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
  workers: 4, // Parallel execution
});
