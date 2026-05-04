import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("all major sections are visible", async ({ page }) => {
    // Hero section
    await expect(
      page.getByRole("heading", { name: /making a difference, one belt at a time/i }),
    ).toBeVisible();

    // Programs section
    await expect(page.getByRole("heading", { name: "Find your path" })).toBeVisible();

    // Testimonials section
    await expect(page.getByRole("heading", { name: "Real people, real results" })).toBeVisible();
  });

  test("navigation to programs works", async ({ page }) => {
    await page.getByRole("link", { name: "Programs" }).first().click();
    await expect(page).toHaveURL("/programs");
  });

  test("navigation to special offer works", async ({ page }) => {
    await page.getByRole("link", { name: "Special Offer" }).first().click();
    await expect(page).toHaveURL("/special-offer");
  });

  test("hero CTA navigates to special offer", async ({ page }) => {
    await page.getByRole("link", { name: "Request Info" }).click();
    await expect(page).toHaveURL("/special-offer");
  });
});
