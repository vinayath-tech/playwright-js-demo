import * as data from '../../data/testData.json';
import test, { expect } from '@fixtures/BaseTest';
import env from '../../utils/env';

test.describe('Navigation tests', () => {

    //Run test functions in parallel mode
    test.describe.configure({ mode: 'parallel'});

    let testData:string = 'Sauce Labs Backpack';
    
    test.beforeEach(async({loginPage, page}) => {
        
        await page.goto(env.BASE_URL);
        await expect(page).toHaveTitle('Swag Labs');
        await loginPage.signInWithValidCredentials(env.USERNAME,env.PASSWORD);
        await page.waitForTimeout(5000);
    });


    test('Navigate to item details page', async({landingPage, itemDetailsPage}) => {

        await landingPage.eleClick(`text=${testData}`);
        await expect(itemDetailsPage.detailItemEle()).toContainText(testData);
    });

    test('Navigate to checkout page', async({itemDetailsPage, checkoutPage}) => {

        await itemDetailsPage.clickShoppingCart();
        await expect(checkoutPage.checkoutBtn()).toBeVisible();
    })
});