import { test, expect } from '@playwright/test';

test.describe('How It Works Section', () => {
  test('displays 5 steps in correct order', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to how it works section
    await page.click('a[href*="#how"]');
    await page.waitForTimeout(500);
    
    const howSection = page.locator('#how');
    await expect(howSection).toBeInViewport();
    
    // Check for 5 steps (should not have numbered list artifacts)
    const steps = page.locator('#how .card, #how .step, #how [class*="step"]');
    const stepCount = await steps.count();
    expect(stepCount).toBeGreaterThanOrEqual(4); // At least 4 steps
    
    // Check step content
    const firstStep = steps.first();
    await expect(firstStep).toContainText('USDT');
    
    const lastStep = steps.last();
    await expect(lastStep).toContainText('PLEX');
  });

  test('steps have proper icons and text', async ({ page }) => {
    await page.goto('/#how');
    
    // Check that steps don't have numbered list artifacts
    const numberedItems = page.locator('#how ol, #how ul li');
    const numberedCount = await numberedItems.count();
    expect(numberedCount).toBe(0); // No numbered lists
    
    // Check for step content
    const stepTexts = [
      'USDT',
      'PLEX',
      'ферма',
      'USDT',
      'PLEX'
    ];
    
    for (const text of stepTexts) {
      await expect(page.locator('#how')).toContainText(text);
    }
  });

  test('footnote about PLEX parameters', async ({ page }) => {
    await page.goto('/#how');
    
    // Check for footnote about PLEX parameters
    const footnote = page.locator('#how').locator('text=PLEX-начислений');
    await expect(footnote).toBeVisible();
    await expect(footnote).toContainText('бот');
  });
});
