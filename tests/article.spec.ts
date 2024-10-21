import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ArticlePage } from '../pages/articlePage';

test('Create New Article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  await loginPage.navigate();
  await loginPage.login('user@example.com', 'password123');
  
  await articlePage.createArticle('Test Article', 'Test Description', 'Test Body', 'TestTag');

  expect(await page.locator('h1').textContent()).toBe('Test Article');
});


