import {test, expect} from "@playwright/test";
import { SliderMovement } from "../page-objects/updateSlidersAndDragAndDrop";
import { ifError } from "assert";

test.describe('sliders update v1', () => {
    test.beforeEach( async ({page}) => {
        await page.goto('http://localhost:4200');
    })

    test('sliders mouse movement', async({page}) => {

        const temperatureSection = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
        let moveSlider = new SliderMovement(page);
        await temperatureSection.scrollIntoViewIfNeeded();
        // створюємо та зберігаємо boundingBox з координатами
        // потім будемо його використовувати для маніпуляцій
        // імітації мишки
        // наводимось на елемент, на який хочемо натиснути
        await temperatureSection.hover();
        const boundingBox = await temperatureSection.boundingBox();
        await moveSlider.mouseMovement(boundingBox);
        await expect(temperatureSection).toContainText('30');

    })
})

test.describe(() => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://globalsqa.com/demo-site/draganddrop/');
        await page.locator('.fc-consent-root').getByRole('button', {name: 'Consent'}).click();
    })

    test('drag and drop', async ({page}) => {
        const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe');
        const trash = iframe.locator('#trash');
        await iframe.getByText('High Tatras', {exact: true}).dragTo(trash);
        await expect(trash).toContainText('High Tatras');
        await expect(trash).not.toContainText('High Tatras 2');
        await iframe.locator('[alt="The chalet at the Green mountain lake"]').dragTo(trash);
        await expect(trash).toContainText('High Tatras 2');
        await expect(trash).not.toContainText('High Tatras 3');
        await iframe.locator('[alt="On top of Kozi kopka"]').dragTo(trash);
        await expect(trash).not.toContainText('High Tatras 3');
        await expect(trash).toContainText('High Tatras 4');
        await iframe.getByText('High Tatras 3', {exact: true}).dragTo(trash);
        await expect(trash).toContainText('High Tatras 3')
    })
})