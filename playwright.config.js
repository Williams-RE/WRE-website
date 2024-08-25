// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  use: {
    headless: true,
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"],
    },
    ignoreHTTPSErrors: true,
  },
  timeout: 600000,
  expect: {
    timeout: 600000,
  },
  workers: 1,
  fullyParallel: false,
  retries: 0,
  reporter: [["html"], ["list"]],
});
