import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export const test = base.extend({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]) // WCAG tags for accessibility standards
        .exclude("#commonly-reused-element-with-known-issue"); // Example of excluding elements

    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";
