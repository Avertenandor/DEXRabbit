import { test, expect } from '@playwright/test';

test.describe('Hero and CTA', () => {
  test('hero section displays correct content', async ({ page }) => {
    await page.goto('/');
    
    // Check hero title contains correct economic model
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('USDT-вход');
    await expect(heroTitle).toContainText('PLEX-бонусы');
    await expect(heroTitle).toContainText('USDT');
    
    // Check subtitle
    const heroSubtitle = page.locator('p').first();
    await expect(heroSubtitle).toContainText('Форс-мажор');
    await expect(heroSubtitle).toContainText('PLEX');
  });

  test('CTA buttons are visible and clickable', async ({ page }) => {
    await page.goto('/');
    
    // Check primary CTA button
    const primaryButton = page.locator('a[href*="t.me"]').first();
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toContainText('Telegram');
    
    // Check secondary button
    const secondaryButton = page.locator('a[href*="#how"]');
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toContainText('Как это работает');
  });

  test('sticky CTA appears on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Scroll down to trigger sticky CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    
    const stickyCta = page.locator('#sticky-cta');
    await expect(stickyCta).toBeVisible();
    
    // Check sticky CTA button
    const stickyButton = stickyCta.locator('a[href*="t.me"]');
    await expect(stickyButton).toBeVisible();
    await expect(stickyButton).toContainText('Telegram');
  });
});
