/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const USERNAME = process.env.TEST_USERNAME;
const PASSWORD = process.env.TEST_PASSWORD;

test.describe("Listings Tests @business-logic", () => {
  let authToken;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/login`);

    // Wait for form elements
    await Promise.all([
      page.waitForSelector('input[type="text"]', { state: "visible" }),
      page.waitForSelector('input[type="password"]', { state: "visible" }),
    ]);

    // Fill login form
    await page.getByLabel("Username").fill(USERNAME);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for login response and get token from localStorage
    await page.waitForSelector("nav", { state: "visible" });
    await page.waitForTimeout(5000);
    authToken = await page.evaluate(() => localStorage.getItem("token"));

    await context.close();
  });

  test.beforeEach(async ({ context, page }) => {
    // Initialize localStorage with token
    await context.addInitScript((token) => {
      localStorage.setItem("token", token);
    }, authToken);

    // Route API calls to production
    await page.route("**/api/v1/**", async (route) => {
      const url = route.request().url();
      const prodUrl = url.replace(
        "http://localhost:3000/api/v1",
        "https://wre-server-production.up.railway.app/api/v1",
      );

      try {
        const response = await fetch(prodUrl, {
          method: route.request().method(),
          headers: {
            ...route.request().headers(),
            Authorization: `Bearer ${authToken}`,
          },
          body: route.request().postData(),
        });

        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const json = await response.json();
          await route.fulfill({ json });
        } else {
          const body = await response.text();
          await route.fulfill({
            status: response.status,
            body: body,
            headers: {
              "content-type": contentType || "text/plain",
            },
          });
        }
      } catch (error) {
        console.error("Route handler error:", error);
        await route.continue();
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState("domcontentloaded");
  });
  test("Add and Delete listing", async ({ page }) => {
    await page.goto(`${BASE_URL}/listings`);

    // Wait for form to be ready
    await page.waitForSelector('[data-testid="mls-id-input"]', {
      state: "visible",
      timeout: 30000,
    });

    // Fill out form
    await page.fill('[data-testid="mls-id-input"]', "23");
    await page.fill('[data-testid="compensation-input"]', "1");
    await page.fill('[data-testid="address-input"]', "11 test rd");
    await page.fill('[data-testid="city-input"]', "Test");
    await page.fill('[data-testid="zip-input"]', "07231");

    // Wait for and select broker
    await page.waitForSelector('[data-testid="listing-broker-select"]', {
      state: "visible",
      timeout: 30000,
    });

    await page.selectOption(
      '[data-testid="listing-broker-select"]',
      "Jacob Williams",
    );

    // Submit form and wait for response
    const addResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/listings") &&
        response.request().method() === "POST",
    );
    await page.click('[data-testid="add-listing-button"]');
    await addResponsePromise;

    // Verify listing was added
    await page.waitForSelector('[data-testid="table-row-23"]', {
      state: "visible",
      timeout: 30000,
    });

    // Delete listing
    const deleteButton = page
      .locator('[data-testid="delete-button-23"]')
      .first();
    await expect(deleteButton).toBeVisible({ timeout: 30000 });

    const deleteResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/listings") &&
        response.request().method() === "DELETE",
    );
    await deleteButton.click();
    await deleteResponsePromise;

    // Verify deletion
    await expect(page.locator('[data-testid="table-row-23"]')).not.toBeVisible({
      timeout: 30000,
    });
  });
});
