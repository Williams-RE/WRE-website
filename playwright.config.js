import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    headless: true,
    viewport: null,
    video: "on",
    actionTimeout: 15000,
    navigationTimeout: 15000,
    // Wait for animations to complete
    hasTouch: true,
    launchOptions: {
      slowMo: 100,
    },
  },
  timeout: 120000,
  expect: {
    timeout: 60000,
  },
  workers: 1,
  reporter: "html",
  webServer: {
    command: "pnpm dev2", // Use pnpm dev2 to start the server
    url: "http://localhost:3000", // Use port 3000
    reuseExistingServer: false,
    timeout: 120000, // Increase timeout if needed
  },
});
