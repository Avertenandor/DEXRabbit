import { test, expect } from '@playwright/test';

test.describe('Hero Visual Tests', () => {
  test('hero snapshot mobile/desktop', async ({ page }) => {
    await page.goto('/');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Mobile snapshot
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('hero-mobile.png');
    
    // Desktop snapshot
    await page.setViewportSize({ width: 1280, height: 800 });
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('hero-desktop.png');
  });

  test('hero buttons are visible and clickable', async ({ page }) => {
    await page.goto('/');
    
    const telegramButton = page.getByRole('link', { name: /Открыть Telegram-бот/i });
    const howItWorksButton = page.getByRole('link', { name: /Как это работает/i });
    
    await expect(telegramButton).toBeVisible();
    await expect(howItWorksButton).toBeVisible();
    
    // Проверяем, что кнопки имеют правильные размеры для мобильных устройств
    const telegramBox = await telegramButton.boundingBox();
    const howItWorksBox = await howItWorksButton.boundingBox();
    
    expect(telegramBox?.height).toBeGreaterThanOrEqual(44); // Минимальный размер для touch targets
    expect(howItWorksBox?.height).toBeGreaterThanOrEqual(44);
  });
});
