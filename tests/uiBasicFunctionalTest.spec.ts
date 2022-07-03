import { Browser, BrowserContext, expect, test } from '@playwright/test';

test('First plyawright test', async({browser}) => {
    
    const context:BrowserContext = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');

    await expect(page).toHaveTitle('Swag Labs');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.locator('#login-button').click();

    let titleLocator = page.locator('span.title');
    await expect(titleLocator).toContainText('Products');

    // console.log(await page.locator('.inventory_item_name').nth(3).textContent());
    console.log(await page.locator('.inventory_item_name').allTextContents());
});