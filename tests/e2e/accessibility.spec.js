import { test, expect } from "./axe-test"; // Import the custom test with Axe

test.describe("Listings Tests with Accessibility @accessibility", () => {
  test("Add and Delete listing with accessibility check", async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto("http://localhost:3000/listings");

    // Perform test actions (fill out a form, add/delete a listing, etc.)
    await page.fill('[data-testid="mls-id-input"]', "23");
    await page.fill('[data-testid="compensation-input"]', "1");
    await page.fill('[data-testid="address-input"]', "11 test rd");
    await page.fill('[data-testid="city-input"]', "Test");
    await page.fill('[data-testid="zip-input"]', "07231");
    await page.selectOption(
      '[data-testid="listing-broker-select"]',
      "Jacob Williams",
    );
    // Run the Axe accessibility test
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // Assert that there are no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
