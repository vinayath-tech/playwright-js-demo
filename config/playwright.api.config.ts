import { expect, PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: '../tests/api',
    testMatch: ['GetBookingsTest.spec.ts'],
    use: {
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            'Accept': 'application/json' 
        }
    }
}

export default config;