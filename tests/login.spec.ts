import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('user login to demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with valid credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await loginPage.login(userId, userPassword);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    const invalidUserId = 'hk';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    await loginPage.loginInput.fill(invalidUserId);
    await page.getByTestId('password-input').click();
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const invalidPassword = 'hk';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    await loginPage.passwordInput.fill(invalidPassword);
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage
    );
  });
});