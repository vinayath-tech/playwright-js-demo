import {test, expect, BrowserContext, Page} from '@playwright/test';

test.describe('Add Items to cart tests', () => {

    let page: Page;
    let testData:string = 'Sauce Labs Backpack';
    let webContext;

    test.beforeEach(async({browser}) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        await page.goto('https://www.saucedemo.com/inventory.html');
    });


    test('Add item to cart from landing page', async() => {
        await page.click('#add-to-cart-sauce-labs-backpack');

        const checkoutTotal = page.locator('.shopping_cart_badge');
        await expect(checkoutTotal).toHaveText('1');

        await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');
    });


    test('Add item from item details page', async() => {
        await page.click(`text=${testData}`);
        await page.click('#add-to-cart-sauce-labs-backpack');

        const checkoutTotal = page.locator('.shopping_cart_badge');
        await expect(checkoutTotal).toHaveText('1');

        await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');
    });


});