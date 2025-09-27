import { test, expect } from '@playwright/test';

test('Rabbit cards should not have stray bullets', async ({ page }) => {
  await page.goto('/');

  // Check no standalone bullet points
  await expect(page.locator('text=•')).toHaveCount(0);

  // Check rabbit cards have proper tag formatting
  const rabbitCards = page.locator('[onclick*="openLightbox"]');
  const count = await rabbitCards.count();

  for (let i = 0; i < count; i++) {
    const card = rabbitCards.nth(i);
    const metaText = await card.locator('.space-y-2 p').textContent();
    // Should not contain just bullet points
    expect(metaText).not.toMatch(/^•$/);
  }
});
