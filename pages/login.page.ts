import { Locator, Page } from "@playwright/test";

export class LoginPage {
  loginInput: Locator
  passwordInput: Locator
  loginButton: Locator
  loginError: Locator
  passwordError: Locator

  constructor(private page: Page) {
    this.loginInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.loginError = page.getByTestId('error-login-id');
    this.passwordError = page.getByTestId('error-login-password');
  }

  async login(userId: string, userPassword: string) {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}