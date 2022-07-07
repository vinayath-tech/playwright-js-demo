import { chromium, expect, BrowserContext } from '@playwright/test';


async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://manage-case.aat.platform.hmcts.net/');

    await expect(page).toHaveTitle('Sign in - HMCTS Access - GOV.UK');
    await page.fill('#username', 'sscs.superuser@mailinator.com');
    await page.fill('#password', 'Testing123');
    await page.click("[name='save']");

    await page.waitForLoadState('domcontentloaded', {timeout: 60000});
    await page.context().storageState({path:'state.json'});
}

export default globalSetup;