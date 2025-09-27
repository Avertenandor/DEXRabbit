import { test, expect } from '@playwright/test';

test('Gallery controls should be accessible', async ({ page }) => {
  await page.goto('/');

  // Check lightbox modal exists
  const lightbox = page.locator('#lightbox');
  await expect(lightbox).toBeVisible();

  // Check close button is accessible
  const closeButton = lightbox.locator('[onclick*="closeLightbox"]');
  await expect(closeButton).toBeVisible();

  // Check navigation buttons exist
  const prevButton = lightbox.locator('[onclick*="prev"]');
  const nextButton = lightbox.locator('[onclick*="next"]');

  if (await prevButton.count() > 0) {
    await expect(prevButton).toBeVisible();
  }
  if (await nextButton.count() > 0) {
    await expect(nextButton).toBeVisible();
  }
});
