import {test, BrowserContext, Page, expect} from "@playwright/test";
import ItemDetailsPage from "../pages/itemDetails.page";
import LandingPage from "../pages/landing.page";
import CheckoutPage from "../pages/checkout.page";

test.describe('Navigation tests', () => {

    let page: Page;
    let testData:string = 'Sauce Labs Backpack';
    let webContext;
    let landingPage: LandingPage;
    let itemDetailsPage: ItemDetailsPage;
    let checkOutPage: CheckoutPage;
    
    test.beforeEach(async({browser}) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        await page.goto('https://www.saucedemo.com/inventory.html');
    });


    test('Navigate to item details page', async() => {
        landingPage = new LandingPage(page);
        itemDetailsPage = new ItemDetailsPage(page);

        await landingPage.eleClick(`text=${testData}`);
        await expect(itemDetailsPage.detailItemEle()).toContainText(testData);
    });

    test('Navigate to checkout page', async() => {
        itemDetailsPage = new ItemDetailsPage(page);
        checkOutPage = new CheckoutPage(page);

        await itemDetailsPage.clickShoppingCart();
        await expect(checkOutPage.checkoutBtn()).toBeVisible();
    })
});