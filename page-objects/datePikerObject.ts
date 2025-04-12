import { expect, Page } from "@playwright/test";
import { FeaturesSelector } from "./featuresSelector";


class Datepicker {
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async commonDatepicer(numberOfDaysSelectedFromToday: number){
        const datepickerCardName = "Common Datepicker"
        const menuSelector = new FeaturesSelector(this.page);
        await menuSelector.formsDatepicker();
        const commonDatepicer = this.page.locator('nb-card', {hasText: 'Common Datepicker'});
        await commonDatepicer.getByRole('textbox', {name: 'Form Picker'}).click();

        const selectedDay = await this.daySelector(numberOfDaysSelectedFromToday);
        const dayFromInputField = await commonDatepicer.getByRole('textbox', {name: 'Form Picker'}).inputValue(); 

        expect(selectedDay).toContain(dayFromInputField);
    }

    async datepickerWithRange(startDay: number, endDay: number){
        const datepickerCardName = "Datepicker With Range"
        const menuSelector = new FeaturesSelector(this.page);
        await menuSelector.formsDatepicker();

        const datepickerWithRange = this.page.locator('nb-card').getByPlaceholder('Range Picker');
        await datepickerWithRange.click();

        const startDayValueInputField = await this.daySelector(startDay);
        
        const endDayValueInputField = await this.daySelector(endDay);

        const rangeValue = `${startDayValueInputField} - ${endDayValueInputField}`;
        const rangeFromInputField = await datepickerWithRange.inputValue();
        
        expect(rangeValue).toEqual(rangeFromInputField);

    }

    private async daySelector(numberOfDaysSelectedFromToday: number){
        const currentDay = new Date();
        const selectedDayCalendar = new Date();
        selectedDayCalendar.setDate(currentDay.getDate() + numberOfDaysSelectedFromToday);
        const day = selectedDayCalendar.getDate();
        const monthLong = selectedDayCalendar.toLocaleDateString('en-us', {month: 'long'});
        const monthShort = selectedDayCalendar.toLocaleDateString('en-us', {month: 'short'});
        const year = selectedDayCalendar.getFullYear();
        const selectedMonthAndYear = ` ${monthLong} ${year} `;
        let sliderMonthAndYear: string;
        await this.page.waitForTimeout(500);
        
        const calendar = this.page.locator('nb-overlay-container');
        sliderMonthAndYear = await calendar.locator('nb-calendar-view-mode button').textContent();
        
        while ( selectedMonthAndYear !== sliderMonthAndYear ) {
            if (numberOfDaysSelectedFromToday > 0) {
                await calendar.locator('[data-name="chevron-right"]').click();
                
                sliderMonthAndYear = await calendar.locator('nb-calendar-view-mode button').textContent();
            } 
            if (numberOfDaysSelectedFromToday < 0) {
                await calendar.locator('[data-name="chevron-left"]').click();
                
                sliderMonthAndYear = await calendar.locator('nb-calendar-view-mode button').textContent();
            } 
        }
        
        await calendar.locator('.day-cell.ng-star-inserted').getByText(day.toString(), {exact: true}).click(); 

        return `${monthShort} ${day}, ${year}`;
    }

}

export {Datepicker};