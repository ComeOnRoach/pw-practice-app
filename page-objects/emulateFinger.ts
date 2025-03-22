import { Page } from '@playwright/test';

export class FingerEmulation {
           readonly page: Page;

            constructor(page: Page){
                this.page = page;
            }

            async hoverAPoint(){
                return this.page.locator('nb-card [tabtitle="Temperature"]').hover()                
            }

            async moveFinger(x = 0, y = 0) { 
                await this.hoverAPoint();
                const horizontal = this.page;
                await this.page.mouse.down();
                await this.page.mouse.move(x, y);
                await this.page.mouse.up();
            }
        }