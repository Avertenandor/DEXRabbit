import { test, expect } from '@playwright/test';

test.describe('Economy Content Validation', () => {
  test('required economic terms are present', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем наличие ключевых терминов экономической модели
    const bodyText = await page.textContent('body');
    
    // Обязательные термины
    const requiredTerms = [
      'USDT-вход',
      'PLEX-бонусы', 
      'USDT-выплата',
      'форс-мажор',
      'возврат тела в PLEX'
    ];
    
    for (const term of requiredTerms) {
      expect(bodyText).toContain(term);
    }
  });

  test('forbidden terms are not present', async ({ page }) => {
    await page.goto('/');
    
    const bodyText = await page.textContent('body');
    
    // Запрещенные формулировки
    const forbiddenTerms = [
      'вклад и доход — в PLEX',
      'возврат в USDT в форс-мажоре',
      'всё в PLEX',
      'Нет. Только PLEX' // Противоречивый ответ
    ];
    
    for (const term of forbiddenTerms) {
      expect(bodyText).not.toContain(term);
    }
  });

  test('economic model is consistent across sections', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем Hero
    const heroText = await page.locator('h1').textContent();
    expect(heroText).toContain('USDT-вход, ежедневные PLEX-бонусы, итоговая выплата в USDT');
    
    // Проверяем How It Works
    const howItWorksText = await page.locator('#how-it-works').textContent();
    expect(howItWorksText).toContain('USDT');
    expect(howItWorksText).toContain('PLEX');
    
    // Проверяем Guarantees
    const guaranteesText = await page.locator('section:has(h2:has-text("Сценарии выплат"))').textContent();
    expect(guaranteesText).toContain('штатная модель');
    expect(guaranteesText).toContain('форс-мажор');
  });

  test('disclaimers are present and correct', async ({ page }) => {
    await page.goto('/');
    
    const bodyText = await page.textContent('body');
    
    // Проверяем наличие дисклеймеров
    expect(bodyText).toContain('Мы не продаём и не обмениваем PLEX');
    expect(bodyText).toContain('PLEX — волатильный актив');
    expect(bodyText).toContain('оцените риски');
  });
});