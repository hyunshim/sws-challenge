import { test, expect } from "@playwright/test";

test("score filter", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/companies");
  await expect(page.locator("tbody > tr")).toHaveCount(12);

  // Set score range to 10-14
  for (let i = 0; i < 10; i++)
    await page.getByTestId("min-score-range").press("ArrowRight");
  for (let i = 0; i < 6; i++)
    await page.getByTestId("max-score-range").press("ArrowLeft");

  await expect(page.locator("tbody > tr")).toHaveCount(6);
});

test("ticker filter", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/companies");
  await expect(page.locator("tbody > tr")).toHaveCount(12);

  // Set ticker filter to "n"
  await page.getByTestId("ticker-filter").press("N");
  await expect(page.locator("tbody > tr")).toHaveCount(9);
});
