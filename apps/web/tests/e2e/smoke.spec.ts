import { expect, test } from "@playwright/test";

test("landing page renders core CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Start for free")).toBeVisible();
});
