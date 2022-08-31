import { Page } from "@playwright/test";

export class ItemDetailsPage {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    detailItemEle = () => this.page.locator('.inventory_details_name');

    checkoutLinkEle = () => this.page.locator('.shopping_cart_link');

    public async clickShoppingCart(){
        await this.checkoutLinkEle().click();
    }

}