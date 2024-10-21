import { Page } from '@playwright/test';

export async function loginUser(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.fill('input[type="email"]', username);
  await page.fill('input[type="password"]', password);
  await page.click('text=Sign in');
}
