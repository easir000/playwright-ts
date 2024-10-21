import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ArticlePage } from '../pages/articlePage';

test('Create New Article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  await loginPage.navigate();
  await loginPage.login('easir956@gmail.com', '123456');
  
  await articlePage.createArticle('Hello Easir', 'Describe yourself', 'Lorem ipsum dolor sit amet,', 'xyz');

  expect(await page.locator('h1').textContent()).toBe('Test Article');
});
