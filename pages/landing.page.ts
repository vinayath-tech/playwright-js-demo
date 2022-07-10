import { Page } from "@playwright/test";

export default class LandingPage {

    readonly page:Page;

    constructor(page: Page) {
        this.page = page;
    }

    inventoryItem = () => this.page.locator('.inventory_item_name');

    eleItemPrice = () => this.page.locator('.inventory_item_price');
    
    eleCartBadge = () => this.page.locator('.shopping_cart_badge');
    
    eleRemoveBtn = () => this.page.locator('#remove-sauce-labs-backpack');
    
    eleClick = (locator: string) => this.page.locator(locator).click();
    
    verifyItemContents = async() => await this.inventoryItem().allTextContents();

    public async sortItem(optionValue: string) {
        await this.page.selectOption('.product_sort_container', { label: optionValue});
    }

    public async getItemPrice() {
        let price: string[] = [];
        const itemPrice = await this.eleItemPrice().allInnerTexts();

        await itemPrice.forEach( element => {
           price.push(element.replace(/\$/g,''));
        });

        return price;
    }
}