import {Page} from '@playwright/test'

class NavigationPage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async ToastrTab() {
        await this.page.getByRole('link', {name: "Modal & Overlays"}).click();
        await this.page.getByRole('link', {name: "Toastr"}).click();
    }

    async formLayouts() {
        await this.page.getByRole('link', {name: 'Forms'}).click();
        await this.page.getByRole('link', { name: 'Form Layouts'}).click();
    }

    
}

export { NavigationPage }