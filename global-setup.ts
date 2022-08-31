import { chromium, expect, BrowserContext } from '@playwright/test';
import { LoginPage } from '@pages/ui/login.page';
import * as data from './data/testData.json';
import * as dotenv  from 'dotenv';

// let login: LoginPage;

// async function globalSetup() {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     login = new LoginPage(page);
//     await page.goto('https://www.saucedemo.com');

//     await expect(page).toHaveTitle('Swag Labs');
//     await login.signInWithValidCredentials(data.username,data.password);

//     await page.waitForLoadState('networkidle', {timeout: 10000});
//     await page.context().storageState({path:'state.json'});
// }

async function globalSetup() {

    if(process.env.test_env){
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override: true
        });
    }
}

export default globalSetup;