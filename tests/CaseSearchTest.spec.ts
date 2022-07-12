import { test, Page, expect} from "@playwright/test";
import { injectAxe } from 'axe-playwright';
import { runPa11y, getViolation } from '../utils/runPa11y';

test.describe('Manage case - Search case test', () => {

    let page: Page;
    let testData:string = '1657100083848293';
    let webContext;

    test.beforeEach(async({browser}) => {
        webContext = await browser.newContext({storageState:'state.json'});
        page = await webContext.newPage();
        page.goto('https://manage-case.aat.platform.hmcts.net/cases');
        await page.waitForTimeout(10000);
    });

    test.afterEach(async({browser}) => {
        await browser.close();
    });

    test('Execute pa11y scan on landing page @pa11y', async() => {
        await injectAxe(page);
        await runPa11y(page);
        await getViolation(page);
    });

    test('Search a case and verify case details', async() => {

        //Click Find-case link
        const findCaseLocator = page.locator('text=Find case');
        await findCaseLocator.click();

        //Enter case reference in search field
        const caseRefFieldLocator = page.locator('[id="[CASE_REFERENCE]"]');
        await caseRefFieldLocator.type(testData);

        //Submit search
        const applyBtn = page.locator('[title="Apply filter"]')
        await applyBtn.click();

        //Assert search result count
        const searchResultsTable = page.locator('ccd-search-result:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr');
        await expect(searchResultsTable).toHaveCount(1);

        // click into the case
        const caseIDLink = page.locator(`[href='/cases/case-details/${testData}']`);
        await caseIDLink.click();

        await page.waitForSelector('#summaryCreatedInGapsFrom h2');
        const summaryLocator = page.locator('#summaryCreatedInGapsFrom h2');
        await expect(summaryLocator).toHaveText('Is a new digital case? Yes');
        
    });
});