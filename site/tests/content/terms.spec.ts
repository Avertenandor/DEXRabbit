import { test, expect } from '@playwright/test';

test.describe('Content Terms Validation', () => {
  test('economy wording is correct', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    
    // Проверяем правильные формулировки
    expect(html).toMatch(/вход .*USDT/i);
    expect(html).toMatch(/ежедневные .*PLEX/i);
    expect(html).toMatch(/итоговая .*USDT/i);
    expect(html).toMatch(/форс-?мажор.*PLEX/i);
    
    // Проверяем, что нет неправильных формулировок
    expect(html).not.toMatch(/вклад и доход — в PLEX/i);
    expect(html).not.toMatch(/возврат в USDT в форс-мажоре/i);
  });

  test('disclaimers are present', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем наличие дисклеймеров
    await expect(page.getByText(/не продаём и не обмениваем PLEX/i)).toBeVisible();
    await expect(page.getByText(/волатильность/i)).toBeVisible();
    await expect(page.getByText(/Telegram-боте/i)).toBeVisible();
  });

  test('economic model is clearly explained', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем, что экономическая модель объяснена
    await expect(page.getByText(/штатная модель/i)).toBeVisible();
    await expect(page.getByText(/форс-мажор/i)).toBeVisible();
    await expect(page.getByText(/ежедневные начисления/i)).toBeVisible();
  });
});
