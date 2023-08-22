import { Page, Browser, chromium, expect } from "@playwright/test";
import data from './test-data/login-data.json';

async function globalSetup() {
    const browser: Browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto(data.url);
    await page.fill('input[autocomplete="username"]', data.username);
    await page.fill('input[autocomplete="current-password"]', data.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(10000);
    await expect(page).toHaveTitle(/Dashboard/);
    await expect(page.locator('h3')).toContainText('Discover what narratives are trending worldwide');
    //Save the state of the webpage - means we are logged in.
    await page.context().storageState({ path: './loginAuth.json' });
    await browser.close();   
}

export default globalSetup;