import { Page } from "@playwright/test";

export default class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    eleUname = () => this.page.locator('#user-name');

    elePassword = () => this.page.locator('#password');

    eleLoginBtn = () => this.page.locator('#login-button');


    public async signInWithValidCredentials(uname: string, pword: string) {
        await this.eleUname().fill(uname);
        await this.elePassword().fill(pword);
        await this.eleLoginBtn().click();
    }

}