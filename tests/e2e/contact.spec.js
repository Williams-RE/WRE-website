import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Contact Form Tests @business-logic", () => {
  test.beforeEach(async ({ page }) => {
    // Override fetch for /agents endpoint to use production API
    await page.route("**/api/v1/agents", async (route) => {
      const response = await fetch(
        "https://wre-server-production.up.railway.app/api/v1/agents",
      );
      const json = await response.json();
      await route.fulfill({ json });
    });
  });

  test("Submit Contact Form", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Wait for and click the contact button
    await page.waitForSelector("button.modal-button", {
      state: "visible",
      timeout: 30000,
    });
    await page.click("button.modal-button");

    // Wait for modal and verify agents loaded
    await page.waitForSelector(".modal-content", { state: "visible" });

    // Wait specifically for the select to be populated
    await page.waitForFunction(
      () => {
        const select = document.querySelector(
          '[data-testid="contact-form-agent"]',
        );
        return select && select.options.length > 1; // More than just the placeholder
      },
      { timeout: 30000 },
    );

    // Fill out the form
    await page.fill('[data-testid="contact-form-name"]', "Timeo Williams");
    await page.fill(
      '[data-testid="contact-form-email"]',
      "timwillie73@gmail.com",
    );

    // Select agent after verifying options
    const selectElement = page.locator('[data-testid="contact-form-agent"]');
    await selectElement.selectOption({ label: "Jacob Williams" });

    // Submit and verify
    await page.click('[data-testid="contact-form-submit"]');
    await expect(
      page.locator("text=Introduction email sent to agent!"),
    ).toBeVisible({ timeout: 30000 });
  });
});
