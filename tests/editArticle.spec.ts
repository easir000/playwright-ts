import { test, expect } from '@playwright/test';
import { login, createArticle } from '../utils/api';
import { ArticlePage } from '../pages/articlePage';

test('Edit Article', async ({ page }) => {
  const token = await login('easir956@gmail.com', '123456');
  

  const article = await createArticle(token, 'Article to Edit', 'Edit Description', 'Edit Body', ['EditTag']);
  
  const articlePage = new ArticlePage(page);

  await page.goto(`/articles/${article.slug}`);
  await articlePage.editArticle('Updated Article Title');
  
  expect(await page.locator('h1').textContent()).toBe('Updated Article Title');
});
