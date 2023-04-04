import test, { expect } from "@playwright/test";
import env from "../../utils/env";

test.describe('Accounts overview', () => {

    let accntNo: string;
    let balance: string;
    let availAmount: string;

    test('Create a new account', async({ page }) => {
       
        await page.goto(env.BASE_URL);
        await page.fill("[name='username']", env.USERNAME);
        await page.fill("[name='password']", env.PASSWORD);
        await page.locator("[value='Log In']").click();

        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1.title')).toHaveText('Accounts Overview');

        await page.locator("'Open New Account'").click();
        await page.waitForLoadState('networkidle');
        await page.locator("select#fromAccountId").selectOption({ index: 0});
        await page.locator("[value='Open New Account']").click();

        await expect(page.locator('h1.title')).toHaveText('Account Opened!');

        accntNo = await page.locator('#newAccountId').textContent();
    });

    test('Verify new account details @new-test',async ({page}) => {
        let accntIdLocator = "tr:nth-child(1) td a";
        
        await page.goto(env.BASE_URL);
        await page.fill("[name='username']", env.USERNAME);
        await page.fill("[name='password']", env.PASSWORD);
        await page.locator("[value='Log In']").click();

        await page.waitForLoadState('networkidle');

        await page.locator("#leftPanel li:nth-child(2) a").click();
        await expect(page.locator(accntIdLocator)).toBeVisible();

        balance = await page.locator('tr:nth-child(1) td:nth-child(2)').textContent();
        availAmount = await page.locator('tr:nth-child(1) td:nth-child(3)').textContent();

        await page.locator(accntIdLocator).click();
        await page.waitForLoadState('networkidle');

        await expect(page.locator('#balance')).toHaveText(balance);
        await expect(page.locator('#availableBalance')).toHaveText(availAmount);

    })

});