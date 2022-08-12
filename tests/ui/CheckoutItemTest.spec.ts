import  test, { expect } from '@lib/BaseTest';
import env from '../../utils/env';
import { faker } from '@faker-js/faker';

test.describe('Checkout an item successfully', () => {

    const fname = faker.name.firstName();
    const lname = faker.name.lastName();
    const zcode = faker.address.zipCode();

    test.beforeEach(async({page, loginPage}) => {
        
        await page.goto(env.BASE_URL);
        await expect(page).toHaveTitle('Swag Labs');
        await loginPage.signInWithValidCredentials(env.USERNAME,env.PASSWORD);
        await page.waitForTimeout(5000);
    });

    test('Add Item to cart and checkout', async({landingPage, checkoutPage}) => {
        
        await landingPage.eleClick('#add-to-cart-sauce-labs-backpack');
        await landingPage.eleCartBadge().click();

        await checkoutPage.verifyItemNameText('Sauce Labs Backpack');
        await checkoutPage.clickCheckoutBtn();
        await checkoutPage.enterFirstName(fname);
        await checkoutPage.enterLastName(lname);
        await checkoutPage.enterPostCode(zcode);

        await checkoutPage.clickContinueBtn();
        await checkoutPage.verifyItemNameText('Sauce Labs Backpack');
        await checkoutPage.verifyInfoText('Shipping Information');
        await checkoutPage.clickFinishBtn();
        await checkoutPage.verifyConfirmationIsDisplayed();
    });
}) 

