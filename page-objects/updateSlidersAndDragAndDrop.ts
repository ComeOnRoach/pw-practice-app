import {Page} from "@playwright/test"

export class SliderMovement{

        readonly page: Page;

        constructor(page: Page){
            this.page = page;
        }

        async mouseMovement(boundingBox){
        // опускаємо палець на елемент
        await this.page.mouse.down();
        // тепер нам треба створити дві константи,
        // фінальні точки, куди ми плануємо перемістити мишку
        // важливо, що ми використовуємо boundingBox
        // тобто всі координати знаходяться всередині елемента,
        // для якого ми створили це boundingBox. x=0,y=0 це верхній
        // лівий кут цього boundingBox.
        // ми хочемо розмістити курсор миші по центру boundingBox
        const x = boundingBox.x + boundingBox.width / 2;
        const y = boundingBox.y + boundingBox.height / 2;
        const xRight = x + 50;
        const yDown = y + 100;

        // тягнемо пальцем по координатах x та y
        await this.page.mouse.move(xRight, y);
        await this.page.mouse.move(xRight, yDown);
        await this.page.mouse.up();

        }

}
