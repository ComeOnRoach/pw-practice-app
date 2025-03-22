import { Page } from "@playwright/test";
import { FeaturesSelector } from './featuresSelector'
import { useAnimation } from "@angular/animations";

class FormLayouts{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async horizontalFormEmailPasswordRememberMeSignIn(email: string, password: string, checkbox: boolean){
        const pathLayouts = new FeaturesSelector(this.page);
        await pathLayouts.formsFormLayouts();

        const horizontalForm = this.page.locator('nb-card', {hasText: 'Horizontal form'});
        await horizontalForm.scrollIntoViewIfNeeded();
        await horizontalForm.getByRole('textbox', {name: 'Email'}).fill(email);
        await horizontalForm.getByRole('textbox', {name: 'Password'}).fill(password);
        if(checkbox){
            await horizontalForm.getByRole('checkbox').check({force: true});
        } else {
            await horizontalForm.getByRole('checkbox').uncheck();
        }
        await horizontalForm.getByRole('button', {name: 'SIGN IN'}).click();

        return horizontalForm;
    }

    async basicFormEmailPasswordCheckMeOutSubmit(email: string, password: string, isChecked: boolean){
        const pathLayouts = new FeaturesSelector(this.page);
        await pathLayouts.formsFormLayouts();
        
        const basicForm = this.page.locator('nb-card', {hasText: 'Basic form'});
        await basicForm.scrollIntoViewIfNeeded();
        await basicForm.getByRole('textbox', {name: "Email address"}).fill(email);
        await basicForm.getByRole('textbox', {name: 'Password'}).fill(password);
        const checkbox =  basicForm.getByRole('checkbox');
        isChecked ? await checkbox.check({force: true}) : await checkbox.uncheck({force: true});

        await basicForm.getByRole('button').click();

        return basicForm;

    }

    async blockFormFirstNameLastNameEmailWebsiteSubmit(firstName: string, lastName: string, email: string, website: string){
        const pathFeatures = new FeaturesSelector(this.page);
        pathFeatures.formsFormLayouts();

        const blockForm = this.page.locator('nb-card', {hasText: 'Block form'});
        await blockForm.scrollIntoViewIfNeeded();
        await blockForm.getByRole('textbox', {name: 'First Name'}).fill(firstName);
        await blockForm.getByRole('textbox', {name: 'Last Name'}).fill(lastName);
        await blockForm.getByRole('textbox', {name: 'Email'}).fill(email);
        await blockForm.getByRole('textbox', {name: 'Website'}).fill(website);
        await blockForm.getByRole('button').click();

        return blockForm;
    }

    async usingTheGridEmailPasswordRadiosSignIn(email: string, password: string, radios: string){
        const pathFeatures = new FeaturesSelector(this.page);
        await pathFeatures.formsFormLayouts();

        const usingTheGrid = this.page.locator('nb-card', {hasText: 'Using the Grid'});
        await usingTheGrid.scrollIntoViewIfNeeded()
        await usingTheGrid.getByRole('textbox', {name: 'Email'}).fill(email);
        await usingTheGrid.getByRole('textbox', {name: 'Password'}).fill(password);
        await usingTheGrid.getByText(radios).click();
        await usingTheGrid.getByRole('button').click();

        const emailAct = await usingTheGrid.getByRole('textbox', {name: 'Email'}).inputValue();
        const passwordAct = await usingTheGrid.getByRole('textbox', {name: 'Password'}).inputValue();
        const radiosAct = await usingTheGrid.getByText(radios).isChecked();
        const btn = await usingTheGrid.locator('form').getAttribute('class');
        
        return {emailAct, passwordAct, radiosAct, btn};
    }
}

export {FormLayouts};