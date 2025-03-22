import { test, expect } from "@playwright/test";
import {FeaturesSelector} from '../page-objects/featuresSelector'

// test.beforeEach("BeforeEach section", async ({ page }) => {
//   await page.goto("http://uitestingplayground.com/ajax");
//   await page
//     .getByRole("button", { name: "Button Triggering AJAX Request" })
//     .click();
// });

test("Click on BTN", async ({ page }) => {
  const message = await page.locator(".bg-success").textContent();
  expect(message).toEqual("Data loaded with AJAX get request.");
});

test('check', async({page})=> {
  await page.goto('http://localhost:4200')
  const featureSelector = new FeaturesSelector(page);
  await featureSelector.formsDatepicker();
  await page.waitForTimeout(100);
  await featureSelector.formsFormLayouts();
    await featureSelector.formsFormLayouts();
      await featureSelector.formsFormLayouts();
})
