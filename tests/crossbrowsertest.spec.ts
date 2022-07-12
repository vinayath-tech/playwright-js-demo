import { test } from '@playwright/test';

test('Execute tests in saucelabs',async({page}) => {
    await page.goto('https://google.com');
    await page.waitForTimeout(5000);
});

