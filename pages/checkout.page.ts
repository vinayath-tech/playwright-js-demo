import { Page } from "@playwright/test";

export default class CheckoutPage {

    readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }
  
    checkoutBtn = () => this.page.locator('#checkout');
}