import { test, expect } from '@playwright/test';

test('Economic model should be consistent', async ({ page }) => {
  await page.goto('/');

  // Check key economic statements are present
  await expect(page.locator('text=USDT-вход')).toBeVisible();
  await expect(page.locator('text=ежедневные PLEX-бонусы')).toBeVisible();
  await expect(page.locator('text=USDT-выплата')).toBeVisible();
  await expect(page.locator('text=форс-мажор — возврат тела в PLEX')).toBeVisible();

  // Check forbidden phrases are absent
  await expect(page.locator('text=прибыль в PLEX')).toHaveCount(0);
  await expect(page.locator('text=только PLEX')).toHaveCount(0);
});
