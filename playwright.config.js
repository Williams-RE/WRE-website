// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  use: {
    headless: false,
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"],
    },
    ignoreHTTPSErrors: true,
  },
  timeout: 60000, //
  expect: {
    timeout: 30000,
  },
  workers: 3,
  fullyParallel: true,
  retries: 0,
  reporter: [["html"], ["list"]],
});
