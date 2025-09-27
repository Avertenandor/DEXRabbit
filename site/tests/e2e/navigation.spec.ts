import { test, expect } from '@playwright/test';

test.describe('Navigation and Anchors', () => {
  test('menu navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test header navigation
    await expect(page.locator('header')).toBeVisible();
    
    // Test menu links
    const menuLinks = [
      { href: '/#plex', text: 'Курс PLEX' },
      { href: '/#faq', text: 'FAQ' },
      { href: '/#rabbits-gallery', text: 'Галерея' },
      { href: '/legal', text: 'Правовая' }
    ];
    
    for (const link of menuLinks) {
      const linkElement = page.locator(`a[href="${link.href}"]`);
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toContainText(link.text);
    }
  });

  test('smooth scroll to sections', async ({ page }) => {
    await page.goto('/');
    
    // Test smooth scroll to FAQ section
    await page.click('a[href="/#faq"]');
    await page.waitForTimeout(500);
    
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeInViewport();
  });

  test('mobile menu functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Test mobile menu button
    const mobileMenuButton = page.locator('#mobile-menu-button');
    await expect(mobileMenuButton).toBeVisible();
    
    // Test menu toggle
    await mobileMenuButton.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Test menu close
    await mobileMenuButton.click();
    await expect(mobileMenu).toBeHidden();
  });
});
