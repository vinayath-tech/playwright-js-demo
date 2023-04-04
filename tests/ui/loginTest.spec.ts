import test, { expect } from "@playwright/test";
import env from "../../utils/env";
import { faker }  from '@faker-js/faker';

test.describe('Login authentication tests', () => {

    test('Login with valid credentials', async({ page }) => {
       
        await page.goto(env.BASE_URL);
        await page.fill("[name='username']", env.USERNAME);
        await page.fill("[name='password']", env.PASSWORD);
        await page.locator("[value='Log In']").click();

        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1.title')).toHaveText('Accounts Overview');
    });


    test('Sign up a new user',async ({ page }) => {

        let fname: string = faker.name.firstName();
        let lname: string = faker.name.lastName();
        let address: string = faker.address.streetAddress();
        let city: string = faker.address.city();
        let state: string = faker.address.state();
        let zcode: string = faker.address.zipCode();
        let phNumber: string = faker.phone.number('+44 75 ### ## ##');
        let ssn: string = faker.phone.number();

        const rndInt = Math.floor(Math.random() * 500) + 1
        let uname: string = env.USERNAME + rndInt;
        let pword: string = env.PASSWORD;

        await page.goto(env.BASE_URL);
        await page.locator("'Register'").click();
        await page.waitForLoadState('networkidle');


        await page.fill("[name='customer.firstName']", fname);
        await page.fill("[name='customer.lastName']", lname);
        await page.fill("[name='customer.address.street']", address);
        await page.fill("[name='customer.address.city']", city);
        await page.fill("[name='customer.address.state']", state);
        await page.fill("[name='customer.address.zipCode']", zcode);
        await page.fill("[name='customer.phoneNumber']", phNumber);
        await page.fill("[name='customer.ssn']", ssn);
        await page.fill("[name='customer.address.zipCode']", zcode);

        await page.fill("[name='customer.username']", uname);
        await page.fill("[name='customer.password']", pword);
        await page.fill("[name='repeatedPassword']", pword);

        await page.locator("[value='Register']").click();

        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1.title')).toHaveText(`Welcome ${uname}`);
        await expect(page.locator('div#rightPanel p')).toHaveText('Your account was created successfully. You are now logged in.');

    });

    test('Incorrect login error message',async ({ page }) => {
        
        await page.goto(env.BASE_URL);
        await page.fill("[name='username']", env.USERNAME);
        await page.fill("[name='password']", env.INCORRECT_PASSWORD);
        await page.locator("[value='Log In']").click();

        const actText = await page.locator(".error").textContent();

        expect(actText).toEqual("An internal error has occurred and has been logged.");
    });
})
