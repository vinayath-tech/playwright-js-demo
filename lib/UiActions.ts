import { Page } from "@playwright/test";
import { expect } from "./BaseTest";


export class UiActions {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    //To click on element
    eleClick = async (ele: string): Promise<void> => await this.page.locator(ele).click();

    //To enter text
    enterElementText = async (ele:string, testData:string) => await this.page.locator(ele).fill(testData);

    //To assert text on element
    async verifyElementText(locator: string, text:string) {
        const textValue = await this.page.textContent(locator);
        expect(textValue).toBe(text);
    }

    //To assert element contains text
    async verifyElementContainsText(locator: string, text: string) {
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async verifyNthElementContainsText(locator: string, n: number, text: string) {
        await expect(this.page.locator(locator).nth(n)).toContainText(text);
    }

    //To assert element have the text
    async verifyElementHaveText(locator: string, text: string) {
        await expect(this.page.locator(locator)).toHaveText(text);
    }

    //To wait for element to display on page
    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.locator(locator).isVisible()
        .catch(() => { throw new Error(`${errorMessage}`); });
    }


}