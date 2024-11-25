import { test, expect } from "@playwright/test";

test("Super Admin successfully creates Estate", async ({ page }) => {
  // await page.goto("https://trybzportal.azurewebsites.net/");
  await page.goto("https://8dd7ng3d-3000.euw.devtunnels.ms/");
  await page.getByPlaceholder("Type Your Email Address").click();
  await page
    .getByPlaceholder("Type Your Email Address")
    .fill("trybz_admin@yopmail.com");
  await page.getByPlaceholder("Type Your Email Address").press("Tab");
  await page.getByPlaceholder("Type Your Password").fill("Secure@123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator("a").filter({ hasText: "Estates" }).click();
  await page.getByRole("button", { name: "Create Estate" }).click();
  await page.getByLabel("Estate name").click();
  await page.getByLabel("Estate name").fill("Automated Test Estate");
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).fill("+234 1 234 5683");
  await page
    .locator(
      "body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(2) > div:nth-child(2) > div.d-flex.capitalize.justify-content-between.border-bottom.mb-4.mt-2 > svg"
    )
    .click();
  await page.getByLabel("Manager's name").click();
  await page.getByLabel("Manager's name").fill("Automated Test Manager");
  await page.getByLabel("Manager's email").click();
  await page
    .getByLabel("Manager's email")
    .fill("automated_test_manager@yopmail.com");
  await page.getByRole("textbox").nth(2).click();
  await page.getByRole("textbox").nth(2).fill("+234 1 234 5683");
  await page
    .getByText(
      "Provide details of the primary Estate Manager. Note that other manager roles can"
    )
    .click();
  await page
    .locator(
      "body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(2) > div:nth-child(3) > div.d-flex.capitalize.justify-content-between.border-bottom.mb-4.mt-2 > svg"
    )
    .click();
  await page.getByPlaceholder("Enter a location").click();
  await page.getByPlaceholder("Enter a location").fill("Lapaz");
  await page
    .locator("body > div.pac-container.pac-logo > div:nth-child(1)")
    .click();
  //   await page.getByRole('button', { name: 'Create Estate' }).click();
});
