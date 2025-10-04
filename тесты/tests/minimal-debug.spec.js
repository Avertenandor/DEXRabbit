/**
 * 🔬 MINIMAL DEBUG - смотрим порядок events
 */

import { test, expect } from '@playwright/test';

test.describe('🔬 MINIMAL DEBUG', () => {
  
  test('Порядок выполнения event handlers', async ({ page }) => {
    // Слушаем ВСЕ console logs
    const logs = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('DEBUG')) {
        logs.push(text);
        console.log('   ', text);
      }
    });
    
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔬 МИНИМАЛЬНЫЙ ТЕСТ');
    console.log('═══════════════════════════════════════\n');
    
    // Открываем бургер
    console.log('1️⃣ Открываем бургер...');
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(1000);
    
    // Находим первый dropdown
    const wrapper = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const button = wrapper.locator('.nav-beautiful__btn');
    
    console.log('\n2️⃣ Кликаем на dropdown...');
    console.log('   (Смотрим console logs)\n');
    
    // КЛИК
    await button.click({ force: true });
    await page.waitForTimeout(2000); // Даём время на все handlers
    
    // Проверяем состояние ПОСЛЕ всех handlers
    console.log('\n3️⃣ Состояние ПОСЛЕ всех handlers:');
    const classList = await wrapper.evaluate(el => Array.from(el.classList));
    console.log('   classList:', classList);
    
    const hasOpen = classList.includes('open') || classList.includes('is-open');
    console.log('   hasOpenClass:', hasOpen);
    
    // SUMMARY
    console.log('\n4️⃣ SUMMARY:');
    console.log('   Console logs count:', logs.length);
    if (logs.length === 0) {
      console.log('   ❌ JavaScript НЕ загружен или НЕ работает!');
    }
    
    // Assert
    expect(hasOpen).toBe(true);
  });
});
