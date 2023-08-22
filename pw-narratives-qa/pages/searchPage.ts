import { Page } from "@playwright/test";
import data from '../test-data/login-data.json';

export default class SearchPage {
    
    constructor(public page: Page) {}

    async search(searchTerm: string, dataset: string, start_date: string, end_date: string){
        await this.page.goto(data.url);
        await this.page.getByPlaceholder('Search for a word or phrase to see how it’s trending').fill(searchTerm);
        await this.page.getByRole('button', { name: 'Bigger Datasets Rank 1 News' }).click();
        await this.page.getByRole('menuitem', { name: dataset }).click();
        await this.date_range(start_date, end_date);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    private async date_range(start_date: string, end_date: string) {
        await this.page.getByTestId('daterangepicker-button').click();
        
        let start_year = start_date.slice(-4)
        await this.page.getByRole('combobox').nth(1).selectOption(start_year);
        
        let start_month = (Number(start_date.slice(start_date.indexOf('/')+1,start_date.indexOf('/', start_date.indexOf('/')+1)))-1).toString();
        await this.page.getByRole('combobox').first().selectOption(start_month); //0=Jan to 11=Dec
        //await this.page.getByRole('combobox').first().click();
        
        let start_day = Number(start_date.slice(0, start_date.indexOf('/'))).toString();
        await this.page.getByRole('cell', { name: start_day, exact: true }).first().click();
        
        let end_year = end_date.slice(-4)
        await this.page.getByRole('combobox').nth(3).selectOption(end_year);

        let end_month = (Number(end_date.slice(end_date.indexOf('/')+1,end_date.indexOf('/', end_date.indexOf('/')+1)))-1).toString();
        await this.page.getByRole('combobox').nth(2).selectOption(end_month); //0=Jan to 11=Dec
        
        let end_day = Number(end_date.slice(0, end_date.indexOf('/'))).toString();
        await this.page.getByRole('cell', { name: end_day, exact: true }).nth(1).click();

        await this.page.getByRole('button', { name: 'Apply' }).click();

    }
}