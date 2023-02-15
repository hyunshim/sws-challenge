import { test, expect } from "@playwright/test";

test("should navigate around company page", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/");
  await page.click("text=Stocks Page");
  await expect(page).toHaveURL("http://127.0.0.1:3000/companies");
  await expect(page.locator("h1")).toContainText("Stocks Information");
  await page.click("text=Afterpay");
  await expect(page).toHaveURL(
    "http://127.0.0.1:3000/companies/46B285BC-B25F-4814-985C-390A4BFA2023"
  );
  await expect(page.locator("h1")).toContainText("Afterpay");
});
