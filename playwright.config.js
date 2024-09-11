// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  use: {
    headless: true,
    viewport: null,
    use: {
      video: "on",
    },
  },
  timeout: 120000,
  expect: {
    timeout: 60000,
  },
  workers: 3,
  fullyParallel: true,
  retries: 0,
  reporter: "html",
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
  },
});
