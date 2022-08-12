import { LandingPage }  from "@pages/ui/landing.page";
import { ItemDetailsPage } from "@pages/ui/itemDetails.page";
import { LoginPage } from "@pages/ui/login.page";
import { CheckoutPage } from "@pages/ui/checkout.page";
import { test as baseTest } from "@playwright/test";

// type MyFixtures = {
//     landingPage: LandingPage;
//     itemDetailsPage: ItemDetailsPage;
//     loginPage: LoginPage;
//     checkoutPage: CheckoutPage;
// };

const test = baseTest.extend<{
    landingPage: LandingPage;
    itemDetailsPage: ItemDetailsPage;
    loginPage: LoginPage;
    checkoutPage: CheckoutPage;
}>({
    landingPage: async ({ page }, use) => {
        await use(new LandingPage(page));
    },
    itemDetailsPage: async ({ page }, use) => {
        await use(new ItemDetailsPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    checkoutPage:async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
});

export default test;
export const expect = test.expect;