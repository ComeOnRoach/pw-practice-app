import { waitForAsync } from "@angular/core/testing";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.crowdfinder.be");
});

test.only("extract text", async ({page}) => {
    const boardGame = await page.getByRole("link", {name: 'Board games'}).nth(1).textContent();
    expect(boardGame).toEqual('Board games');

    const allNavBarValues = await page.locator(".nav-item").allTextContents();
    expect(allNavBarValues).toContain('Board games');

    const search = page.getByRole('textbox', {name: 'Search'});
    await search.fill('Final Girl');
    const inpValue = await search.inputValue();

    expect(inpValue).toEqual("Final Girl");

    const placeholderValue = await search.getAttribute('placeholder');

    expect(placeholderValue).toEqual('Search');


});

test("Add 3 items to cart", async ({ page }) => {
  const cart = page.locator('[class="badge badge-secondary"]');
  await page.locator(".nav-link", { hasText: "Board games" }).last().click();
  await page.getByText("Evacuation").click();
  await page
    .locator('[class="btn d-flex buttonHeight position-relative btn-primary"]')
    .click();
  await page.locator('[data-icon="shopping-cart"]').click();
  await page.getByText("Continue shopping").click();

  // await page.locator(".mr-sm-3").fill("Final Girl");
  // await page.locator("[href='/product/4470-final-girl']").getByText("Final Girl").click();
  // await page.locator('[class="btn d-flex buttonHeight position-relative btn-primary"]').click();
  // await page.locator('[data-icon="shopping-cart"]').click();
  // await page.getByText("Continue shopping").click();

  // await page.locator(".mr-sm-3").fill("Colt Express: 10th Anniversary");
  // await page.getByText("Colt Express: 10th Anniversary").first().click();
  // await page.locator('[class="btn d-flex buttonHeight position-relative btn-primary"]').click();
  // await page.locator('[data-icon="shopping-cart"]').click();

  await expect(cart).toHaveValue("1");
});

test("Search the Final Girl", async ({ page }) => {
  await page.locator(".mr-sm-3").fill("Final Girl");
  await page
    .locator("[href='/product/4470-final-girl']")
    .getByText("Final Girl")
    .click();
  await page
    .locator('[class="btn d-flex buttonHeight position-relative btn-primary"]')
    .click();
  await page.locator('[data-icon="shopping-cart"]').click();
  await page.getByText("Continue shopping").click();
});

test("Search", async ({ page }) => {
  await page.locator(".mr-sm-3").fill("Colt Express: 10th Anniversary");
  await page.getByText("Colt Express: 10th Anniversary").click();
  await page
    .locator('[class="btn d-flex buttonHeight position-relative btn-primary"]')
    .click();
  await page.locator('[data-icon="shopping-cart"]').click();
});
