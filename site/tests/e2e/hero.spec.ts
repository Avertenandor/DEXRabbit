import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test('hero layout & CTA', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toContainText('USDT-вход, ежедневные PLEX-бонусы, итоговая выплата в USDT');
    await expect(page.getByRole('link', { name: /Открыть Telegram-бот/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Как это работает/i })).toBeVisible();
    
    // Изображение не должно быть выше 80% вьюпорта
    const heroImg = page.locator('section >> img');
    const h = await heroImg.evaluate(el => el.getBoundingClientRect().height);
    const vh = await page.evaluate(() => window.innerHeight);
    expect(h).toBeLessThanOrEqual(vh * 0.8);
  });

  test('hero image has proper aspect ratio', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    const heroImage = page.locator('img[alt="Кролик в вольере"]');
    await expect(heroImage).toBeVisible();
    
    // Проверяем, что изображение имеет правильные размеры
    const box = await heroImage.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      const aspectRatio = box.width / box.height;
      expect(aspectRatio).toBeCloseTo(16/9, 1); // 16:9 aspect ratio
    }
  });
});
