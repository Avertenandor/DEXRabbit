import { test, expect } from '@playwright/test';

test.describe('Hero Section Constraints', () => {
  test('hero image should be properly constrained', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    // Check hero image container
    const heroImage = page.locator('section img[alt="Кролик в вольере"]');
    await expect(heroImage).toBeVisible();
    
    // Check aspect ratio constraint
    const box = await heroImage.boundingBox();
    expect(box).not.toBeNull();
    
    if (box) {
      const aspectRatio = box.width / box.height;
      expect(aspectRatio).toBeCloseTo(16/9, 1); // 16:9 aspect ratio
    }
    
    // Check container constraints
    const heroContainer = page.locator('section .container');
    await expect(heroContainer).toBeVisible();
    
    // Check that image doesn't overflow
    const containerBox = await heroContainer.boundingBox();
    const imageBox = await heroImage.boundingBox();
    
    if (containerBox && imageBox) {
      expect(imageBox.width).toBeLessThanOrEqual(containerBox.width);
    }
  });

  test('hero image height should not exceed 80% of viewport', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    const heroImage = page.locator('section img[alt="Кролик в вольере"]');
    await expect(heroImage).toBeVisible();
    
    const imageBox = await heroImage.boundingBox();
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    if (imageBox) {
      expect(imageBox.height).toBeLessThanOrEqual(viewportHeight * 0.8);
    }
  });

  test('no horizontal scroll should be present', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});
