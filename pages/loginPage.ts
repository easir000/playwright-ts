import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[placeholder="Email"]', username);
    await this.page.fill('input[placeholder="Password"]', password);
    await this.page.click('button[type="submit"]');
    await this.page.waitForNavigation();
  }
}
