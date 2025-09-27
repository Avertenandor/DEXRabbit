import { test, expect } from '@playwright/test';

test('FAQ questions should be unique', async ({ page }) => {
  await page.goto('/');

  // Get all FAQ questions
  const questions = await page.locator('h3').allTextContents();
  const faqQuestions = questions.filter(q => q.includes('?'));

  // Check for uniqueness
  const uniqueQuestions = new Set(faqQuestions.map(q => q.toLowerCase().trim()));
  expect(uniqueQuestions.size).toBe(faqQuestions.length);
});
