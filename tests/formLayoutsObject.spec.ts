import {test, expect} from '@playwright/test';
import { FormLayouts } from '../page-objects/formLayouts'
import { Datepickers } from '../page-objects/datepickers';

test.describe("Form Layouts", () => {
    test.beforeEach(async ({page})=> {
        page.goto('http://localhost:4200')
    })
    test("Horizontal form", async ({page}) => {
        const emailExp = "oleks@gmail.com";
        const passwordExp =  "12345678";
        const isCheckedExp = true;
        const submitedBtnExp = 'ng-submitted';

        const formLayouts = new FormLayouts(page);

        const horizontalForm = await formLayouts.horizontalFormEmailPasswordRememberMeSignIn(emailExp, passwordExp, isCheckedExp);

        const emailAct = horizontalForm.getByRole('textbox', {name: 'Email'});
        const passwordAct = horizontalForm.getByRole('textbox', {name: 'Password'});
        const isCheckedAct = horizontalForm.getByRole('checkbox');
        const submitedBtnAct = horizontalForm.locator('form').getAttribute('class');

       await expect(emailAct).toHaveValue(emailExp);
       await expect(passwordAct).toHaveValue(passwordExp);
       await expect(isCheckedAct).toBeChecked();
       expect(await submitedBtnAct).toContain(submitedBtnExp)

    })

    test("Basic form", async ({page})=> {
        const emailExp = "testtesttesttest@gmail.com";
        const passwordExp =  "1233243253434245423442";
        const isCheckedExp = true;

        const formLayouts = new FormLayouts(page);

        const basicForm = await formLayouts.basicFormEmailPasswordCheckMeOutSubmit(emailExp, passwordExp, isCheckedExp);

        const emailAct = basicForm.getByRole("textbox", {name: 'Email address'});
        const passwordAct = basicForm.getByRole('textbox', {name: 'Password'});
        const isCheckedAct = basicForm.getByRole('checkbox');
        const submitedBtn = basicForm.locator('form').getAttribute('class');
        
        await expect(emailAct).toHaveValue(emailExp);
        await expect(passwordAct).toHaveValue(passwordExp);
        await expect(isCheckedAct).toBeChecked();
        expect(await submitedBtn).toContain('ng-submitted');
    })

    test('Block form', async ({page}) => {
        const formLayouts = new FormLayouts(page);
        const firstNameExp = 'Oleks';
        const lastNameExp = 'Drozhcha';
        const emailExp = 'oleks.drozhcha.test@gmail.com';
        const websiteExp = 'https://www.linkedin.com/in/oleksandr-drozhcha-5ba665b5/';

        const blockForm = await formLayouts.blockFormFirstNameLastNameEmailWebsiteSubmit(firstNameExp, lastNameExp, emailExp, websiteExp);
        
        const firstNameAct = blockForm.getByRole('textbox', {name: 'First Name'});
        const lastNameAct = blockForm.getByRole('textbox', {name: 'Last Name'});
        const emailAct = blockForm.getByRole('textbox', {name: 'Email'});
        const websiteAct = blockForm.getByRole('textbox', {name: 'Website'});

        await expect(firstNameAct).toHaveValue(firstNameExp);
        await expect(lastNameAct).toHaveValue(lastNameExp);
        await expect(emailAct).toHaveValue(emailExp);
        await expect(websiteAct).toHaveValue(websiteExp);
    })

    test('Using the Grid', async ({page}) => {
        const formLayouts = new FormLayouts(page);
        const emailExp = '12testScenario.email.Test.Tesx@get.google.com';
        const passwordExp = '$##@#@#dfgfdsgd#ds@@@dfd3423';
        const radiosExp = 'Option 1';

        const usingTheGrid = await formLayouts.usingTheGridEmailPasswordRadiosSignIn(emailExp, passwordExp, radiosExp);
        const {emailAct, passwordAct, radiosAct, btn} = usingTheGrid;

        expect(emailAct).toEqual(emailExp);
        expect(passwordAct).toEqual(passwordExp);
        expect(radiosAct).toBeTruthy();
        expect(btn).toContain('ng-submitted');
    })

})

test.describe('Datepickers', ()=> {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:4200');
    });

    test('Common Datepicker', async ({page}) => {
        const date = new Date();
        const day = date.getDay().toString();

        const numberOfDaysFromToday = 100

        const commonDatepicker = new Datepickers(page);
        await commonDatepicker.commonDatepicker(numberOfDaysFromToday);
        
    });

})