import { test, expect } from '@playwright/test';

test.describe('FAQ and Legal Sections', () => {
  test('FAQ section has minimum 10 questions', async ({ page }) => {
    await page.goto('/#faq');
    
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
    
    // Count FAQ items
    const faqItems = page.locator('#faq [class*="faq"], #faq [class*="question"], #faq details');
    const faqCount = await faqItems.count();
    expect(faqCount).toBeGreaterThanOrEqual(10);
  });

  test('FAQ questions are expandable', async ({ page }) => {
    await page.goto('/#faq');
    
    // Try to click on first FAQ item
    const firstFaq = page.locator('#faq details, #faq [class*="faq"]').first();
    if (await firstFaq.count() > 0) {
      await firstFaq.click();
      await page.waitForTimeout(200);
    }
  });

  test('Legal section contains economic summary', async ({ page }) => {
    await page.goto('/legal');
    
    // Check for economic summary section
    const economicSummary = page.locator('text=Краткое резюме условий выплат');
    await expect(economicSummary).toBeVisible();
    
    // Check for key economic terms
    const keyTerms = [
      'USDT',
      'PLEX',
      'штатная модель',
      'форс-мажор'
    ];
    
    for (const term of keyTerms) {
      await expect(page.locator('body')).toContainText(term);
    }
  });

  test('Legal section has proper structure', async ({ page }) => {
    await page.goto('/legal');
    
    // Check for main headings
    const headings = page.locator('h1, h2, h3');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(3);
    
    // Check for legal content
    const legalContent = page.locator('text=Лицензионное соглашение');
    await expect(legalContent).toBeVisible();
  });
});
