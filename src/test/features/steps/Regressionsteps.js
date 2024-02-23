import { After, Before, Given, Then, setDefaultTimeout } from "@cucumber/cucumber";
import {chromium} from "@playwright/test"
import {expect} from '@playwright/test';

setDefaultTimeout(60 * 1000);
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();

Given('I log into AdvantageDemo', async function () {
    await page.goto('https://advantageonlineshopping.com/#/');
    await expect(page.getByRole('link',{name: 'UserMenu'})).toBeVisible();
  });


Given('I select the {string} option', async function (string) {
    await expect(page.getByLabel('SpeakersCategory', { exact: true })).toBeVisible();
    await page.getByLabel('SpeakersCategory', { exact: true }).click();
    
  });

  Then('I am able to checkout the selected speaker', async function () {
    await expect(page.getByText('Bose SoundLink Wireless Speaker')).toBeVisible({timeout: 30000});
    await page.getByText('Bose SoundLink Wireless Speaker').click();

    await expect(page.getByText('ADD TO CART')).toBeVisible();
    await page.getByText('ADD TO CART').click();

    await expect(page.getByRole('link',{name: 'ShoppingCart'})).toBeVisible();
    await page.getByRole('link',{name: 'ShoppingCart'}).click();
    await page.getByText('Checkout').click();



    let accountHolder = await page.locator('.noUserSection');
    let username = await accountHolder.locator('input[name="usernameInOrderPayment"]');
    let password = await accountHolder.locator('input[name="passwordInOrderPayment"]');
    await username.fill('tellis.reuben@gmail.com');
    await password.fill('Advantage123');

    await page.getByText('LOGIN').click();
    //await expect(page.getByText('Incorrect user name or password.')).toBeVisible();
  });

  After(function(){
    browser.close();
  })