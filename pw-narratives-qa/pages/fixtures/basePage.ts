import { test as base } from "@playwright/test";
import SearchPage from "../searchPage";
import LoginPage from "../loginPage";

export const test = base.extend<{
        searchPage: SearchPage; 
        loginPage: LoginPage;
    }>({
    //define the fixtures
    searchPage: async({ page }, use) => {
        await use(new SearchPage(page));
    },
    loginPage: async({ page }, use) => {
        await use(new LoginPage(page));
    }
})
