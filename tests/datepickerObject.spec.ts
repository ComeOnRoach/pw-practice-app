import {test, expect} from "@playwright/test"
import {Datepicker} from "../page-objects/datePikerObject"

test.describe('Datepickers', () => {

    test('Common Datepicker', async ({page}) => {
        const numberOfDaysSelectedFromToday = -4;

        const commonDatepicers = new Datepicker(page);
        await commonDatepicers.commonDatepicer(numberOfDaysSelectedFromToday);
    })  

    test('Datepicker With Range', async ({page}) => {
        const startDayFromToday = -255;
        const endDayFromToday = 601;
        
        const datepickerWithRange = new Datepicker(page);
        await datepickerWithRange.datepickerWithRange(startDayFromToday, endDayFromToday);


    })
})