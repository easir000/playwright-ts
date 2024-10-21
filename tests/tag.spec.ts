import { test, expect } from '@playwright/test';

test('Filter Articles by Tag', async ({ page }) => {
  await page.goto('/');
  await page.click('text="TestTag"');
  
  const articleTitles = await page.$$eval('.article-preview h1', articles => articles.map(article => article.textContent));
  expect(articleTitles).toContain('Test Article');
});
