import { test } from '../pages/fixtures/basePage';

test('login, check title and logout', async ({ loginPage }) => {
    await loginPage.login();
});

test('test search', async ({ searchPage }) => {
    await searchPage.search("Putin", 'Sankey V2 06', "07/01/2021", "17/12/2022");
});
