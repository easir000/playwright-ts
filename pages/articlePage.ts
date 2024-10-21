import { Page } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createArticle(title: string, description: string, body: string, tag: string) {
    await this.page.click('text="New Article"');
    await this.page.fill('input[placeholder="Article Title"]', title);
    await this.page.fill('input[placeholder="What\'s this article about?"]', description);
    await this.page.fill('textarea[placeholder="Write your article (in markdown)"]', body);
    await this.page.fill('input[placeholder="Enter tags"]', tag);
    await this.page.click('text="Publish Article"');
    await this.page.waitForNavigation();
  }

  async editArticle(newTitle: string) {
    await this.page.click('text="Edit Article"');
    await this.page.fill('input[placeholder="Article Title"]', newTitle);
    await this.page.click('text="Publish Article"');
    await this.page.waitForNavigation();
  }

  async deleteArticle() {
    await this.page.click('text="Delete Article"');
    await this.page.waitForNavigation();
  }
}
