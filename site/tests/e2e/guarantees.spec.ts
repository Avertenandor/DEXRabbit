import { test, expect } from '@playwright/test';

test.describe('Guarantees Section', () => {
  test('tabs switch with keyboard', async ({ page }) => {
    await page.goto('/#guarantees');
    const tabs = page.getByRole('tablist');
    await page.keyboard.press('Tab'); 
    await page.keyboard.press('Enter');
    await expect(page.getByText(/USDT.*PLEX.*USDT/i)).toBeVisible(); // штатная
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText(/возврат.*PLEX/i)).toBeVisible();   // форс-мажор
  });

  test('guarantees content is correct', async ({ page }) => {
    await page.goto('/#guarantees');
    
    // Проверяем наличие ключевых терминов
    await expect(page.getByText(/штатная модель/i)).toBeVisible();
    await expect(page.getByText(/форс-мажор/i)).toBeVisible();
    await expect(page.getByText(/USDT/i)).toBeVisible();
    await expect(page.getByText(/PLEX/i)).toBeVisible();
  });
});