import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for stable screenshots
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    });
  });

  test('hero section - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#hero')).toHaveScreenshot('hero-mobile.png');
  });

  test('hero section - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#hero')).toHaveScreenshot('hero-tablet.png');
  });

  test('hero section - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#hero')).toHaveScreenshot('hero-desktop.png');
  });

  test('how it works section - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#how');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#how')).toHaveScreenshot('how-mobile.png');
  });

  test('guarantees section - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/#guarantees');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#guarantees')).toHaveScreenshot('guarantees-desktop.png');
  });

  test('plex ticker section - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/#plex');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for iframe to load
    
    await expect(page.locator('#plex')).toHaveScreenshot('plex-desktop.png');
  });

  test('faq section - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/#faq');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#faq')).toHaveScreenshot('faq-tablet.png');
  });

  test('gallery section - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#rabbits-gallery');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#rabbits-gallery')).toHaveScreenshot('gallery-mobile.png');
  });
});
