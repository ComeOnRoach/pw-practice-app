import { Page } from "@playwright/test";
import { FeaturesSelector } from "./featuresSelector";

class Datepickers{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async commonDatepicker(selectedDay: number){
        const pathFeatures = new FeaturesSelector(this.page);
        await pathFeatures.formsDatepicker();

        const commonDatepicker = this.page.locator('nb-card', {hasText: 'Common Datepicker'});
        commonDatepicker.getByRole('textbox', {name: 'Form Picker'}).click();

        const calendar = this.page.locator('nb-base-calendar');
        const monthOnScreen = calendar.locator('[class="day-cell ng-star-inserted"]');
        await monthOnScreen.getByText(selectedDay.toString(), {exact: true}).click();
        
    }
}

export {Datepickers};

