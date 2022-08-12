import { Page } from "@playwright/test";

export class LandingPage{

    readonly page:Page;

    constructor(page: Page) {
        this.page = page;
    }

    inventoryItem = () => this.page.locator('.inventory_item_name');

    eleItemPrice = () => this.page.locator('.inventory_item_price');
    
    eleCartBadge = () => this.page.locator('.shopping_cart_badge');
    
    eleRemoveBtn = () => this.page.locator('#remove-sauce-labs-backpack');
    
    eleClick = async (ele: string) => await this.page.locator(ele).click();
    
    verifyItemContents = async() => await this.inventoryItem().allTextContents();
    
    public async clickCartBtn(){
        await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
    }

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