import { test, expect } from '@playwright/test';

test('Header should be unique and without placeholders', async ({ page }) => {
  await page.goto('/');

  // Check there's exactly one nav element
  const navs = page.locator('nav[role="navigation"]');
  await expect(navs).toHaveCount(1);

  // Check no "R DEXRabbit" placeholder text
  await expect(page.locator('text=R DEXRabbit')).toHaveCount(0);

  // Check logo is present
  const logo = page.locator('img[src="/logo.svg"]');
  await expect(logo).toBeVisible();
});
