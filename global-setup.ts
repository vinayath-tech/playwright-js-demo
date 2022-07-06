import { chromium, expect, BrowserContext } from '@playwright/test';


async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.saucedemo.com');

    await expect(page).toHaveTitle('Swag Labs');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.locator('#login-button').click();

    await page.waitForLoadState('networkidle');
    await page.context().storageState({path:'state.json'});
}

export default globalSetup;