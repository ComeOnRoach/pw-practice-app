import { test, expect } from "@playwright/test";
import { delay } from "rxjs-compat/operator/delay";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });
    await usingTheGridEmailInput.pressSequentially("Test@addTest.com", {
      delay: 100,
    });

    const inputValue = await usingTheGridEmailInput.inputValue();
  });

  test("radio buttons", async ({ page }) => {
    // test.setTimeout(6000);
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    const isRadioBtnChecked_OptionOne = await usingTheGridForm
      .locator("label", { hasText: "Option 1" })
      .isChecked();
    const radioBtnStatus = await usingTheGridForm.getByText("Option 1"); // перевірка буде у зоні assert zone
    const isRadioBtnChecked_OptionTwo = await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .isChecked();
    const isRadioBtnChecked_DisabledOption = await usingTheGridForm
      .getByRole("radio", { name: "Disabled Option" })
      .isChecked();

    expect(isRadioBtnChecked_OptionOne).toBeTruthy();
    await expect(usingTheGridForm.getByLabel("Option 1")).toBeChecked();
    await expect(radioBtnStatus).toBeChecked();
    expect(isRadioBtnChecked_OptionTwo).toBeFalsy();
    expect(isRadioBtnChecked_DisabledOption).toBeFalsy();
  });
});

test.describe("Toastr page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("link", { name: "Modal & Overlays" }).click();
    await page.getByRole("link", { name: "Toastr" }).click({ force: true });
  });

  test("Toaster configuration checkboxes", async ({ page }) => {
    // const checkboxes = page.locator(".col-md-6", { hasText: "Toast type:" });
    // await checkboxes.getByRole("checkbox", {
    //   name: "Prevent arising of duplicate toast",
    // }).check({force: true});

    // await checkboxes.getByRole("checkbox", { name: "Hide on click" }).uncheck({force: true});
    // await checkboxes.getByRole("checkbox", { name: "Show toast with icon"}).uncheck({force: true});
    // await page.getByRole("link", { name: "Toastr" }).click({ force: true });
    const allCheckboxes = page.getByRole('checkbox');

    for (const chBox of await allCheckboxes.all()) {
      await chBox.uncheck({ force: true });
      expect(await chBox.isChecked()).toBeFalsy();
    }

    // expect(
    // await  checkboxes.getByRole("checkbox", {
    //     name: "Prevent arising of duplicate toast",
    //   }).isChecked()).toBeTruthy();
  });
});

test("List selecting", async ({ page }) => {
  // my solution:
  // await page.getByRole('button', {name: 'Light'}).click();
  // const dark = page.locator("#nb-option-7");
  // await dark.click();
  // expect( await page.getByRole('button', {name: 'Dark'}).textContent()).toContain('Dark');

  //course solution:
  const dropDown = page.locator("ngx-header nb-select");
  await dropDown.click();
  const selectFromDropDownList = page.locator("nb-option-list nb-option");
  // await selectFromDropDownList.getByText('Cosmic').click();

  await expect(selectFromDropDownList).toHaveText([
    " Light",
    " Dark",
    " Cosmic",
    " Corporate",
  ]);

  await selectFromDropDownList.getByText("Cosmic").click();

  await expect( page.locator("nb-layout-header")).toHaveCSS(
    "background-color",
    "rgb(50, 50, 89)"
  );

  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
  };

  for(const color in colors){
      await dropDown.click();
    await selectFromDropDownList.filter({hasText: color}).click();
    await expect(await page.locator("nb-layout-header")).toHaveCSS(
      "background-color",
      colors[color]
    );
  }
});

test("dialog box", async({page}) => {
    await page.getByRole("link", { name: "Tables & Data" }).click();
    await page.getByRole("link", { name: "Smart Table" }).click();
    await page
      .locator("table tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();

})
