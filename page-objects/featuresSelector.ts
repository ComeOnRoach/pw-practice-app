import { Page } from "@playwright/test";

class FeaturesSelector {
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async formsFormLayouts(){
    this.link();
    await this.menuExpandedChecker("Forms")
    await this.page.getByText("Form Layouts").click();
    }

    async formsDatepicker(){
    this.link();
    await this.menuExpandedChecker("Forms");
    await this.page.getByRole('link',{name:"Datepicker"}).click();
    }

    async modalAndOverlaysToastr(){
    this.link();
    await this.page.getByRole("link", { name: "Modal & Overlays" }).click();
    await this.page.getByRole("link", { name: "Toastr" }).click({ force: true });
    }

    private async link(){
        await this.page.goto('http://localhost:4200');
    };

    private async menuExpandedChecker(menuName: string) {
        const selectedPage = this.page.getByRole("link", { name: menuName });
        const isPageExpanded = await selectedPage.getAttribute('aria-expanded');

        if (isPageExpanded == "false"){
            await selectedPage.click();
        }
    }


}

export {FeaturesSelector};