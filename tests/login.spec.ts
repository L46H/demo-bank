import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';


test.describe('user login to demobank', () => {
  test('successful login with valid credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });
});