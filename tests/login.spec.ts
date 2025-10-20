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

  test('unsuccessful login with too short username', async ({ page }) => {
    const invalidUserId = 'hk';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    await page.goto('/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(invalidUserId);
    await page.getByTestId('password-input').click();
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const invalidPassword = 'hk';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    await page.goto('/');
    await page.getByTestId('password-input').fill(invalidPassword);
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage
    );
  });
});