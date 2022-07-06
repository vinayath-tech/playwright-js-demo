import {test, BrowserContext, Page, expect} from "@playwright/test";

test.describe('Navigation tests', () => {

    let page: Page;
    let testData:string = 'Sauce Labs Backpack';
    let webContext;
    
    test.beforeEach(async({browser}) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        await page.goto('https://www.saucedemo.com/inventory.html');
    });


    test('Navigate to item details page', async() => {
        await page.click(`text=${testData}`);

        const itemText = page.locator('.inventory_details_name');
        await expect(itemText).toContainText(testData);
    });

    test('Navigate to checkout page', async() => {
        await page.locator('.shopping_cart_link').click();

        const checkOutBtn = page.locator('#checkout');
        await expect(checkOutBtn).toBeVisible();
    })
});