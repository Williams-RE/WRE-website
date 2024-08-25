/* eslint-disable testing-library/prefer-screen-queries */
const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const USERNAME = process.env.TEST_USERNAME || "jacobwilliams2040@gmail.com";
const PASSWORD = process.env.TEST_PASSWORD || "Happy2006!";

test.describe("Listings Tests", () => {
  let authToken;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    await page.getByRole("link", { name: "Login" }).click();
    await page.getByLabel("Username").fill(USERNAME);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForFunction(() => localStorage.getItem("token") !== null);
    authToken = await page.evaluate(() => localStorage.getItem("token"));
    await context.close();
  });

  test.beforeEach(async ({ context, page }) => {
    await context.addInitScript((token) => {
      localStorage.setItem("token", token);
    }, authToken);

    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000); // Wait for any additional animations
  });

  test("Add and Delete listing", async ({ page }) => {
    await page.goto(`${BASE_URL}/listings`);
    // Wait for the add listing form to be visible
    await page.waitForSelector('[data-testid="mls-id-input"]', {
      state: "visible",
      timeout: 30000,
    });

    // Fill out the form
    await page.fill('[data-testid="mls-id-input"]', "23");
    await page.fill('[data-testid="compensation-input"]', "1");
    await page.fill('[data-testid="address-input"]', "11 test rd");
    await page.fill('[data-testid="city-input"]', "Test");
    await page.fill('[data-testid="zip-input"]', "07231");
    await page.selectOption(
      '[data-testid="listing-broker-select"]',
      "Jacob Williams",
    );

    // Submit the form
    await page.click('[data-testid="add-listing-button"]');

    // Wait for the listing to appear in the table
    await page.waitForSelector('[data-testid="buyer-broker-table"]', {
      state: "visible",
      timeout: 30000,
    });
    await page.waitForSelector('[data-testid="table-row-23"]', {
      state: "visible",
      timeout: 10000,
    });

    // Verify the listing is visible
    const addedListing = page.locator('[data-testid="table-row-23"]');
    await expect(addedListing).toBeVisible();

    // Find and click the delete button
    const deleteButton = page.locator('[data-testid="delete-button-23"]');
    await expect(deleteButton).toBeVisible({ timeout: 10000 });
    await deleteButton.click();

    // Verify the listing is removed
    await expect(addedListing).not.toBeVisible({ timeout: 10000 });
  });
});
