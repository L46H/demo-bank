import { test, expect } from '@playwright/test';

test.describe('user login to demobank', () => {
  test('successful login with valid credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('testerhk');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('Password');
    await page.getByTestId('login-button').click();
  });
});