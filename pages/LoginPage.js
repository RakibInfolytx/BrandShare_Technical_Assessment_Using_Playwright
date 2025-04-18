import { expect } from '@playwright/test';

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[name="userName"]');
    this.nextButton = page.locator('button.chakra-button ');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async TypeEmail(email) {
    await this.emailField.fill(email);
  }

  async ClickNext() {
    await this.nextButton.click();
  }

  async TypePassword(password) {
    await this.passwordField.fill(password);
  }

  async ClickLogin() {
    await this.loginButton.click();
  }
  
}
