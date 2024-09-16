import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Contact Form Tests @business-logic", () => {
  test("Submit Contact Form", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Wait for and click the contact button
    await page.waitForSelector("button.modal-button", {
      state: "visible",
      timeout: 30000,
    });
    await page.click("button.modal-button");

    // Wait for the modal to appear
    await page.waitForSelector(".modal-content", {
      state: "visible",
      timeout: 30000,
    });

    // Fill out the form
    await page.fill('[data-testid="contact-form-name"]', "Timeo Williams");
    await page.fill(
      '[data-testid="contact-form-email"]',
      "timwillie73@gmail.com",
    );
    await page.selectOption(
      '[data-testid="contact-form-agent"]',
      "Jacob Williams",
    );

    // Submit the form
    await page.click('[data-testid="contact-form-submit"]');

    // Wait for and check the toast message
    const toastMessage = await page.waitForSelector(
      "text=Introduction email sent to agent!",
      { state: "visible", timeout: 15000 },
    );
    expect(toastMessage).toBeTruthy();
  });
});
