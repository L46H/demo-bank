import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';

test.describe('pulpit tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('quick payment with valid data', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const receiverId = '1';
    const transferAmount = '100';
    const transferTitle = 'uber';
    const expectedReceiverTransfer = 'Jan Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedReceiverTransfer} - ${transferAmount},00PLN - ${transferTitle}`;

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#widget_1_transfer_title').click();
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
