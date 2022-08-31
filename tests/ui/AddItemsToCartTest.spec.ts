import test, { expect } from '@lib/BaseTest';
import env from '../../utils/env';

test.describe('Add Items to cart tests', () => {

    //Run test functions in parallel mode
    test.describe.configure({ mode: 'parallel'});

    let testData:string = 'Sauce Labs Backpack';

    test.beforeEach(async({loginPage, page}) => {

        await page.goto(env.BASE_URL);
        await expect(page).toHaveTitle('Swag Labs');
        await loginPage.signInWithValidCredentials(env.USERNAME,env.PASSWORD);
        await page.waitForTimeout(5000);
    });


    test('Add item to cart from landing page', async({ landingPage }) => {
        
        await landingPage.eleClick('#add-to-cart-sauce-labs-backpack');
        await expect(landingPage.eleCartBadge()).toHaveText('1');
        await expect(landingPage.eleRemoveBtn()).toHaveText('Remove');
    });


    test('Add item from item details page', async({ landingPage }) => {

        await landingPage.eleClick(`text=${testData}`);
        await landingPage.eleClick('#add-to-cart-sauce-labs-backpack');
        await expect(landingPage.eleCartBadge()).toHaveText('1');
        await expect(landingPage.eleRemoveBtn()).toHaveText('Remove');
    });


});