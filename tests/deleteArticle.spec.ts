import { test, expect } from '@playwright/test';
import { login, createArticle, deleteArticle } from '../utils/api';
import { ArticlePage } from '../pages/articlePage';

test('Delete Article', async ({ page }) => {
 
  const token = await login('easir956@gmail.com', '123456');

  const article = await createArticle(token, 'Article to Delete', 'Delete Description', 'Delete Body', ['DeleteTag']);
  
  const articlePage = new ArticlePage(page);

  await page.goto(`/articles/${article.slug}`);
  await articlePage.deleteArticle();

  expect(await page.locator('h1').textContent()).not.toBe('Article to Delete');
});
