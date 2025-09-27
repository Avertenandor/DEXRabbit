import { test, expect } from '@playwright/test';

test('PLEX ticker should have iframe and no placeholder', async ({ page }) => {
  await page.goto('/');

  // Check PLEX section exists
  const plexSection = page.locator('#plex-ticker');
  await expect(plexSection).toBeVisible();

  // Check iframe is present
  const iframe = plexSection.locator('iframe');
  await expect(iframe).toBeVisible();

  // Check no exclamation mark placeholder
  await expect(plexSection.locator('text=!')).toHaveCount(0);
});