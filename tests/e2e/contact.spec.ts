import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("form renders with all fields", async ({ page }) => {
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Phone")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send Message" }),
    ).toBeVisible();
  });

  test("shows validation errors for invalid values", async ({ page }) => {
    await page.getByLabel("Name").fill("J");
    await page.getByLabel("Email").fill("parent@example.com");
    await page.getByLabel("Message").fill("Hi");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(
      page.getByText("Name must be at least 2 characters"),
    ).toBeVisible();
    await expect(
      page.getByText("Message must be at least 10 characters"),
    ).toBeVisible();
  });
});
