// import { Browser, Page, BrowserContext, expect, test } from '@playwright/test';
// import {LandingPage} from '../pages/landing.page';
import * as data from '../data/testData.json';
import test, { expect, describe } from '../fixtures/basePage';

test.describe('Sauce feature', () => {

    let webContext;
    // let page: Page;
    // let landingPage: LandingPage;


    test.beforeEach(async({ browser, page }) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        await page.goto('https://www.saucedemo.com/inventory.html');
    });

    test('First playwright test', async({ landingPage }) => {
        // landingPage = new LandingPage(page);
        console.log(await landingPage.verifyItemContents());
    });
    

    test.skip('Sort products low to high', async({ landingPage }) => {

        // landingPage = new LandingPage(page);

        let actPrice: string[] = [];

        await landingPage.sortItem('Price (low to high)');
        actPrice  = await landingPage.getItemPrice();
    
        //Asserts array
        if(JSON.stringify(actPrice) !== JSON.stringify(data.actItemPrice)) throw new Error("Uncaught typeError: the argument is not a array");
    });

});