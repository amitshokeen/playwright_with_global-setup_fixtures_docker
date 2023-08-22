import { Page } from "@playwright/test";
import { expect } from '@playwright/test';
import data from '../test-data/login-data.json';

export default class LoginPage {
    constructor(public page: Page) {}

    async login(){
        await this.page.goto(data.url);
        await expect(this.page).toHaveTitle(/Dashboard/);
        await this.page.click('button>svg');
        await this.page.click('div[role="menuitem"]:has-text("Sign out")');
        await expect(this.page.locator('button[aria-selected="true"]')).toContainText("Sign In");
        await expect(this.page.locator('button[aria-selected="false"]')).toContainText("Create Account");
    }
}