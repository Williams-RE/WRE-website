/* eslint-disable testing-library/prefer-screen-queries */
const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Navigation Tests", () => {
  test("Desktop and Mobile Navigation", async ({ page }) => {
    await page.goto(BASE_URL);

    // Set viewport to a desktop size
    await page.setViewportSize({ width: 1280, height: 720 });

    // Wait for the navbar to appear (accounting for the potential delay)
    await page.waitForSelector("nav", { state: "visible", timeout: 30000 });

    // Test desktop navigation
    for (const [name, path] of [
      ["Home", "/"],
      ["About Us", "/about"],
      ["Buyer Broker Compensation", "/buyer-broker-compensation"],
      ["Resources", "/resources"],
    ]) {
      const link = page.getByRole("link", { name });
      await expect(link).toBeVisible({ timeout: 10000 });
      await link.click();
      await expect(page).toHaveURL(new RegExp(path + "$"));
    }

    // Test mobile navigation
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 Pro size

    // Wait for the hamburger menu to appear
    const hamburgerButton = page.locator("button.hamburger");
    await expect(hamburgerButton).toBeVisible({ timeout: 10000 });

    for (const [name, path] of [
      ["Home", "/"],
      ["About Us", "/about"],
      ["Buyer Broker Compensation", "/buyer-broker-compensation"],
      ["Resources", "/resources"],
    ]) {
      await hamburgerButton.click();
      const link = page.getByRole("link", { name });
      await expect(link).toBeVisible({ timeout: 10000 });
      await link.click();
      await expect(page).toHaveURL(new RegExp(path + "$"));
    }
  });
});
