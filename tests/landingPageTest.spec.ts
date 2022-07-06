import { Browser, Page, BrowserContext, expect, test } from '@playwright/test';

test.describe('Sauce feature', () => {

    let webContext;
    let page: Page;

    test.beforeEach(async({browser}) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        await page.goto('https://www.saucedemo.com/inventory.html');
    });

    test('First playwright test', async() => {
        console.log(await page.locator('.inventory_item_name').allTextContents());
    });
    

    test('Sort products low to high', async() => {

        let price: string[] = [];
        let actPrice: string[] = [ '7.99', '9.99', '15.99', '15.99', '29.99', '49.99' ];

        await page.selectOption('.product_sort_container', {label : 'Price (low to high)'});
        const itemPrice = await page.locator('.inventory_item_price').allInnerTexts();

        await itemPrice.forEach( element => {
           price.push(element.replace(/\$/g,''));
        });
    
        //Asserts array
        if(JSON.stringify(price) !== JSON.stringify(actPrice)) throw new Error("Uncaught typeError: the argument is not a array");
    });

});