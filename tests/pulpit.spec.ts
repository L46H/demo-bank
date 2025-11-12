import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('pulpit tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('quick payment with valid data', async ({ page }) => {
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('testerhk');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('Password123*');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('1');
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill('100');
    await page.locator('#widget_1_transfer_title').fill('uber');
    await page.locator('#widget_1_transfer_title').click();
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Jan Demobankowy - 100,00PLN - uber');
  });
});
