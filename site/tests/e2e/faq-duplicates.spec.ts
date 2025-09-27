import { test, expect } from '@playwright/test';

test.describe('FAQ Duplicates Check', () => {
  test('should not have duplicate FAQ questions', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    // Get all FAQ question headings
    const faqQuestions = page.locator('[data-faq-question], h3, h4').filter({ hasText: /в чём суть|чем защищены|гарантии|могу ли я получить/i });
    const questionTexts = await faqQuestions.allTextContents();
    
    // Normalize text for comparison (lowercase, trim)
    const normalizedTexts = questionTexts.map(text => text.toLowerCase().trim());
    
    // Check for duplicates
    const uniqueTexts = new Set(normalizedTexts);
    expect(uniqueTexts.size).toBe(normalizedTexts.length);
    
    // Specific checks for known duplicates
    const modelQuestions = normalizedTexts.filter(text => 
      text.includes('суть модели') || text.includes('где проходят')
    );
    expect(modelQuestions.length).toBeLessThanOrEqual(1);
    
    const protectionQuestions = normalizedTexts.filter(text => 
      text.includes('защищены') || text.includes('гарантии')
    );
    expect(protectionQuestions.length).toBeLessThanOrEqual(1);
  });

  test('FAQ should have consistent economic model messaging', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    // Check for correct economic model terms
    const pageContent = await page.textContent('body');
    
    // Should contain correct terms
    expect(pageContent).toContain('USDT-вход');
    expect(pageContent).toContain('ежедневные PLEX-бонусы');
    expect(pageContent).toContain('итоговая выплата в USDT');
    expect(pageContent).toContain('форс-мажор — возврат тела в PLEX');
    
    // Should not contain contradictory terms
    expect(pageContent).not.toContain('вклад и доход — в PLEX');
    expect(pageContent).not.toContain('прибыль в PLEX');
  });

  test('FAQ answers should be consistent with economic model', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    
    // Check specific FAQ answers
    const usdtReturnAnswer = page.locator('text=Да, в штатной модели');
    await expect(usdtReturnAnswer).toBeVisible();
    
    // Should not have contradictory "Нет. Только PLEX" answer
    const contradictoryAnswer = page.locator('text=Нет. Только PLEX');
    await expect(contradictoryAnswer).not.toBeVisible();
  });
});
