import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SettingsPage } from '../pages/settingsPage';

test('Update User Settings', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const settingsPage = new SettingsPage(page);

  await loginPage.navigate();
  await loginPage.login('easir956@gmail.com', '123456');
  

  
  await settingsPage.updateSettings('NewUsername', 'Updated bio', 'https://new-image-url.com');
  
  expect(await page.locator('input[placeholder="Username"]').inputValue()).toBe('NewUsername');
});
