// import {test, expect, BrowserContext, Page} from '@playwright/test';
// import LandingPage from '../pages/landing.page';

import test, {expect} from '../fixtures/basePage';

test.describe('Add Items to cart tests', () => {

    // let page: Page;
    let testData:string = 'Sauce Labs Backpack';
    let webContext;
    // let landingPage: LandingPage;

    test.beforeEach(async({browser, page}) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        await page.goto('https://www.saucedemo.com/inventory.html');
    });


    test('Add item to cart from landing page', async({ landingPage }) => {

        // landingPage = new LandingPage(page);
        await landingPage.eleClick('#add-to-cart-sauce-labs-backpack');
        await expect(landingPage.eleCartBadge()).toHaveText('1');
        await expect(landingPage.eleRemoveBtn()).toHaveText('Remove');
    });


    test('Add item from item details page', async({ landingPage }) => {

        // landingPage = new LandingPage(page);
        await landingPage.eleClick(`text=${testData}`);
        await landingPage.eleClick('#add-to-cart-sauce-labs-backpack');
        await expect(landingPage.eleCartBadge()).toHaveText('1');
        await expect(landingPage.eleRemoveBtn()).toHaveText('Remove');
    });


});