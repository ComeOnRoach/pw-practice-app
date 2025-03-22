import { waitForAsync } from "@angular/core/testing";
import { test, expect } from "@playwright/test";
import { Row } from "ng2-smart-table/lib/lib/data-set/row";
import { root } from "rxjs/internal-compatibility";
import { NavigationPage } from "../page-objects/navigationPage";
import { FingerEmulation } from "../page-objects/emulateFinger"

test.describe("UI Components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
  });

  test("checkboxes", async ({ page }) => {
    const navPage = new NavigationPage(page);
    navPage.ToastrTab();

    const allcheckboxes = page.getByRole("checkbox");
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    await allcheckboxes.last().uncheck({ force: true });
    for (const box of await allcheckboxes.all()) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBeTruthy();
    }
  });

  test("radio btns", async ({ page }) => {
    const path = new NavigationPage(page);
    path.formLayouts();

    const radiobtns = page.locator("nb-radio-group");

    const radioBtnOption2 = radiobtns.getByRole("radio", {
      name: "Option 2",
    });

    const radioBtnDisabledOption = radiobtns.getByRole("radio", {
      name: "Disabled Option",
    });

    await radiobtns
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    expect(await radioBtnOption2.isChecked()).toBeTruthy();
    expect(await radioBtnOption2.isEnabled()).toBeTruthy();

    await radioBtnDisabledOption.click({ force: true });

    expect(await radioBtnDisabledOption.isChecked()).toBeFalsy();
    expect(await radioBtnDisabledOption.isDisabled()).toBeTruthy();
  });

  test("input fields", async ({ page }) => {
    await page.getByRole("link", { name: "Forms" }).click();
    await page.getByRole("link", { name: "Form Layouts" }).click();

    const emailAddress = "oleks@gmail.com";
    const password = "123Oleks123";
    const basicForm = page.locator("nb-card", {
      hasText: "Basic form",
    });
    const emailAddressField = basicForm.getByLabel("Email address");
    const passwordField = basicForm.locator("#exampleInputPassword1");

    await emailAddressField.fill(emailAddress);
    await passwordField.fill(password);
    expect(await emailAddressField.inputValue()).toEqual(emailAddress);
    expect(await passwordField.inputValue()).toEqual(password);

    await basicForm.getByRole("checkbox").check({ force: true });

    expect(basicForm.getByRole("checkbox").isChecked()).toBeTruthy();

    await basicForm.getByRole("button", { name: "SUBMIT" }).click();
  });

  test("Lists and DropDowns", async ({ page }) => {
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Light" }).click();
    const listOfOptions = page.locator("nb-option-list nb-option");

    const list = ["Dark", "Cosmic", "Corporate", "Light"];
    let index = 0;
    for (const option of await listOfOptions.all()) {
      await page.waitForTimeout(1000);
      await listOfOptions.getByText(list[index]).click();
      await page.waitForTimeout(1500);
      const currentTheme = page
        .getByRole("button", { name: list[index] })
        .innerText();
      expect(await currentTheme).toEqual(list[index]);
      if (index < 3) {
        await page.getByRole("button", { name: list[index] }).click();
      }
      index++;
    }
  });

  test("Colored tooltip text value", async ({ page }) => {
    await page.getByRole("link", { name: "Modal & Overlays" }).click();
    await page.getByRole("link", { name: "Tooltip" }).click();
    const coloredTooltips = page.locator("nb-card", {
      hasText: "Colored Tooltips",
    });
    const coloredTooltipDefault = page.locator("#cdk-overlay-0", {
      hasText: "This is a tooltip",
    });
    await coloredTooltips.getByRole("button", { name: "Default" }).hover();
    const tooltipValue = coloredTooltipDefault.textContent();
    console.log(`this is tooltip content: ${await tooltipValue}`);
    await expect(coloredTooltipDefault).toHaveText("This is a tooltip");
  });

  test("colored tooltip color value", async ({ page }) => {
    await page.getByRole("link", { name: "Modal & Overlays" }).click();
    await page.getByRole("link", { name: "Tooltip" }).click();
    const colloredTooltip = page.locator("ngx-tooltip", {
      hasText: "Colored Tooltips",
    });
    const coloredTooltipBtnSuccess = colloredTooltip.getByRole("button", {
      name: "SUCCESS",
    });

    await coloredTooltipBtnSuccess.hover();

    await expect(page.locator("nb-tooltip")).toHaveCSS(
      "background-color",
      "rgb(0, 214, 143)"
    );
  });

  test("Dialog boxes", async ({ page }) => {
    await page.getByRole("link", { name: "Tables & Data" }).click();
    await page.getByRole("link", { name: "Smart Table" }).click();

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });

    const firstRow = page
      .getByRole("table")
      .locator("tr", { hasText: "mdo@gmail.com" });
    await expect(firstRow).toContainText("mdo@gmail.com");
    await firstRow.locator(".nb-trash").click();
    await expect(page.locator("table tr").first()).not.toHaveText(
      "mdo@gmail.com"
    );
  });

  // test('Web Tables', async ({page}) => {
  //   await page.getByRole("link", { name: "Tables & Data" }).click();
  //   await page.getByRole("link", { name: "Smart Table" }).click();

  //   page.on('dialog', dialog => {
  //     dialog.accept();
  //   })

  //   await page
  //     .locator("table tr", { hasText: "twitter@outlook.com" })
  //     .locator(".nb-edit")
  //     .click();

  //   await page.getByRole('row', {name: "twitter@outlook.com"}).getByRole('textbox', {name: "Age"}).click();

  //   await page
  //     .getByRole("row", { name: "twitter@outlook.com" })
  //     .getByRole("textbox", { name: "Age" })
  //     .fill("39");

  //   await page.getByRole( 'row', { name: 'twitter@outlook.com'}).locator('.nb-checkmark').click();

  // })

  // test("Web Tables selectig by id", async ({ page }) => {
  //   await page.getByRole("link", { name: "Tables & Data" }).click();
  //   await page.getByRole("link", { name: "Smart Table" }).click();

  //   await page.locator(".ng2-smart-pagination-nav li", {hasText: '2'}).click();
  //   const rowSelectedById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
  //   await rowSelectedById.locator(".nb-edit").click();
  //   await rowSelectedById.locator("input-editor").clear();
  //   await page.getByRole("textbox", { name: "email" }).fill("olex@gmail.com");
  //   await rowSelectedById.locator("nb-checkmark").click();
  // });

  test.describe("Web Tables", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "Tables & Data" }).click();
      await page.getByRole("link", { name: "Smart Table" }).click();
    });

    test("Web Tables update One Field (updated verison)", async ({ page }) => {
      const ageUpd = "38";

      const selectedRow = page.locator("table tr", {
        hasText: "twitter@outlook.com",
      });

      await selectedRow.locator(".nb-edit").click();
      await page
        .locator("table tr input-editor")
        .getByRole("textbox", { name: "Age" })
        .clear();

      await page
        .locator("table tr input-editor")
        .getByRole("textbox", { name: "Age" })
        .fill(ageUpd);

      await page.locator(".nb-checkmark").click();

      expect(
        await selectedRow.getByRole("cell", { name: ageUpd }).textContent()
      ).toEqual(ageUpd);
    });

    test("Web Tables: Select Row By ID", async ({ page }) => {
      const expectedEmail = "test@gmail.com";
      await page.locator("ng2-smart-table-pager li", { hasText: "2" }).click();
      const targetedRow = page
        .getByRole("row", { name: "11" })
        .filter({ has: page.locator("td").nth(1).getByText("11") });
      await targetedRow.locator(".nb-edit").click();
      await page.locator("td").getByPlaceholder("E-mail").clear();
      await page.locator("td").getByPlaceholder("E-mail").fill(expectedEmail);
      await page.locator(".nb-checkmark").click();
      await expect(page.locator("td", { hasText: expectedEmail })).toHaveText(
        expectedEmail
      );
    });

    test("Loop through table", async ({ page }) => {
      const ages = ["11", "15", "20","25", "30", "32", "40", "45", "55", "99"];
      for (const age of ages) {
        await page
          .locator(".ng2-smart-filters input-filter")
          .getByPlaceholder("Age")
          .fill(age);
        await page.waitForTimeout(1200);
        const twenties = page.locator("tbody tr");
        for (const twenty of await twenties.all()) {
          if (age === "99") {
            expect(await page.locator("tbody").textContent()).toContain(" No data found ");
          } else {
            expect(await twenty.locator("td").nth(6).textContent()).toEqual(
              age
            );
          }
        }
      }
    });
  });


  test.describe("Datepickers", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "Forms" }).click();
      await page.getByRole("link", { name: "Datepicker" }).click();
    });

    test("Datepicker", async({page})=> {
      const commonDatepicker = page.locator("nb-card", { hasText: "Common Datepicker" });
      const pickerForm = commonDatepicker.getByPlaceholder("Form Picker");
      await pickerForm.click();
      await page.waitForTimeout(500);
      await page
        .locator('nb-calendar-picker [class="day-cell ng-star-inserted"]')
        .getByText("1", {exact: true})
        .click();
      await expect(pickerForm).toHaveValue("Mar 1, 2025");
    });

    test('Datepicker with DATE JS', async ({page}) => {
      const commonDatepicker = page.locator("nb-card", {hasText: 'Common Datepicker'});
      await commonDatepicker.getByPlaceholder('Form Picker').click();
      await page.waitForTimeout(500);

      const currentDay = new Date();
      let day = new Date();
      day.setDate(day.getDate() + 1000);
      const selectedDay = day.getDate().toString();
      const expectedMonthShort = day.toLocaleString('EN-US', {month: "short"});
      const expectedMonthLong = day.toLocaleString('EN-US', {month: "long"});
      const year = day.getFullYear();
      let expectedMonthAndYear = ` ${expectedMonthLong} ${year} `;
      const expectedResult = `${expectedMonthShort} ${selectedDay}, ${year}`;

      let selectedMonthAndYear = await page.locator('nb-card nb-calendar-view-mode').textContent();
      
      while(expectedMonthAndYear !== selectedMonthAndYear){
        if(day.getFullYear() >= currentDay.getFullYear()){
            if( day.getMonth() > currentDay.getMonth() ){
              await page.locator('nb-card-header [ng-reflect-icon="chevron-right-outline"]').click();
              await page.waitForTimeout(500);
              selectedMonthAndYear = await page.locator('nb-card nb-calendar-view-mode').textContent();

            } else {
              await page.locator('nb-card-header [data-name="chevron-left"]').click();
              selectedMonthAndYear = await page.locator('nb-card nb-calendar-view-mode').textContent();
            }
          }
        if(day.getFullYear() < currentDay.getFullYear()) {
              await page.locator('nb-card-header [data-name="chevron-left"]').click();
              await page.waitForTimeout(200);
              selectedMonthAndYear = await page.locator('nb-card nb-calendar-view-mode').textContent();
        }


      }
      

      await page.locator('[class="day-cell ng-star-inserted"]').getByText(selectedDay, {exact: true}).click();
      await expect(commonDatepicker.getByPlaceholder('Form Picker')).toHaveValue(expectedResult);

    });
  });

  test.describe('Sliders', () => {
    test.beforeEach( async ({page}) => {
      
    })

    test('slider mouse movement', async ({page}) => {
      const finger = new FingerEmulation(page);
      const sliderBox = page.locator('[ng-reflect-tab-title="Temperature"]');
      await sliderBox.scrollIntoViewIfNeeded();
      const boundBox = await sliderBox.boundingBox();
      const x = boundBox.x + (boundBox.width - 100) / 2;
      const у = boundBox.y + (boundBox.height - 100) / 2;
      await finger.moveFinger(x, у);

    })
  })
});
