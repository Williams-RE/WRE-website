/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("Desktop and Mobile Navigation", async ({ page }) => {
  // Set a desktop viewport size explicitly
  await page.setViewportSize({ width: 1200, height: 800 });

  await page.goto(BASE_URL);

  // Wait for any initial animations and delays
  // This accounts for the showDelay prop and fade-in animation
  await page.waitForTimeout(2500);

  // Wait for the navbar to be present
  await page.waitForSelector("nav.navbar", {
    state: "visible",
    timeout: 15000,
  });

  // Try different selector strategies
  const aboutLink = page.locator('a[href="/about"]');
  // OR alternatively:
  // const aboutLink = page.getByText('About Us', { exact: true });

  await expect(aboutLink).toBeVisible({ timeout: 15000 });
  await aboutLink.click();

  // Wait for navigation to complete
  await expect(page).toHaveURL(/\/about$/);
});

// Test mobile navigation separately
test("Mobile Navigation", async ({ page }) => {
  // Set a mobile viewport size
  await page.setViewportSize({ width: 800, height: 600 });

  await page.goto(BASE_URL);
  await page.waitForTimeout(2500); // Wait for delay and animations

  // Click the hamburger menu
  const menuButton = page.locator("button.hamburger");
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  // Wait for menu animation
  await page.waitForTimeout(500);

  // Now try to find the About Us link
  const aboutLink = page.locator('a[href="/about"]');
  await expect(aboutLink).toBeVisible({ timeout: 15000 });
  await aboutLink.click();

  await expect(page).toHaveURL(/\/about$/);
});
