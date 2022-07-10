import { chromium, expect, BrowserContext } from '@playwright/test';
import LoginPage from './pages/login.page';
import * as data from './data/testData.json';

let login: LoginPage;

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    login = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');

    await expect(page).toHaveTitle('Swag Labs');
    await login.signInWithValidCredentials(data.username,data.password);

    await page.waitForLoadState('networkidle');
    await page.context().storageState({path:'state.json'});
}

export default globalSetup;