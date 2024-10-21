import { Page } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async updateSettings(username: string, bio: string, image: string) {
    await this.page.click('text="Settings"');
    await this.page.fill('input[placeholder="Username"]', username);
    await this.page.fill('textarea[placeholder="Short bio about you"]', bio);
    await this.page.fill('input[placeholder="URL of profile picture"]', image);
    await this.page.click('text="Update Settings"');
    await this.page.waitForNavigation();
  }
}
