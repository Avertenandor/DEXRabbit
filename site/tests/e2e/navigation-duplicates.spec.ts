import { test, expect } from '@playwright/test';

test.describe('Navigation Duplicates Check', () => {
  test('should have only one navigation menu', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    // Count navigation menu groups
    const navGroups = page.locator('nav');
    const navCount = await navGroups.count();
    
    // Should have exactly one navigation
    expect(navCount).toBe(1);
    
    // Check that navigation items are not duplicated
    const navLinks = page.locator('nav a');
    const linkTexts = await navLinks.allTextContents();
    
    // Check for duplicates in navigation text
    const uniqueTexts = new Set(linkTexts);
    expect(uniqueTexts.size).toBe(linkTexts.length);
  });

  test('should have consistent navigation items', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    const expectedNavItems = ['Курс PLEX', 'FAQ', 'Галерея', 'Правовая'];
    
    for (const item of expectedNavItems) {
      const navItem = page.locator(`nav a:has-text("${item}")`);
      await expect(navItem).toBeVisible();
      
      // Should appear only once
      const count = await navItem.count();
      expect(count).toBe(1);
    }
  });
});
