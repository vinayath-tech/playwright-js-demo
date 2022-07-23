import * as data from '../../data/testData.json';
import env from '../../utils/env';
import test, { expect } from '@fixtures/BaseTest';

test.describe('Sauce feature', () => {

    //Run test functions in parallel mode
    test.describe.configure({ mode: 'parallel'});

    test.beforeEach(async({ loginPage, page }) => {

        await page.goto(env.BASE_URL);
        await expect(page).toHaveTitle('Swag Labs');
        await loginPage.signInWithValidCredentials(env.USERNAME,env.PASSWORD);
        await page.waitForTimeout(5000);
    });

    test('First playwright test', async({ landingPage }) => {
        console.log(await landingPage.verifyItemContents());
    });
    

    test('Sort products low to high', async({ landingPage }) => {
       
        let actPrice: string[] = [];

        await landingPage.sortItem('Price (low to high)');
        actPrice  = await landingPage.getItemPrice();
    
        //Asserts array
        if(JSON.stringify(actPrice) !== JSON.stringify(data.actItemPrice)) throw new Error("Uncaught typeError: the argument is not a array");
    });

});