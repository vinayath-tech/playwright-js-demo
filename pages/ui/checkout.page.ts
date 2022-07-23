import { Page } from "@playwright/test";

export class CheckoutPage {

    readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }
  
    checkoutBtn = () => this.page.locator('#checkout');
}