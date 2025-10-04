/**
 * 🔍 DEBUG ТЕСТ - смотрим что происходит при клике
 */

import { test, expect } from '@playwright/test';

test.describe('🔍 DEBUG - ЧТО ПРОИСХОДИТ', () => {
  
  test('Проверяем JavaScript загружен и работает', async ({ page }) => {
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔍 ПРОВЕРКА JAVASCRIPT');
    console.log('═══════════════════════════════════════\n');
    
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(1000);
    
    // Находим первый dropdown wrapper
    const wrapper = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const button = wrapper.locator('.nav-beautiful__btn');
    
    console.log('1️⃣ ДО КЛИКА:');
    const classListBefore = await wrapper.evaluate(el => Array.from(el.classList));
    console.log('   classList:', classListBefore);
    
    // Проверяем что JS обработчик установлен
    const hasClickListener = await button.evaluate(el => {
      // Проверяем есть ли event listeners
      return typeof el.onclick === 'function' || el.getAttribute('onclick') !== null;
    });
    console.log('   hasClickListener:', hasClickListener);
    
    // КЛИК
    console.log('\n2️⃣ КЛИК FORCE...');
    await button.click({ force: true });
    await page.waitForTimeout(1000);
    
    console.log('\n3️⃣ ПОСЛЕ КЛИКА:');
    const classListAfter = await wrapper.evaluate(el => Array.from(el.classList));
    console.log('   classList:', classListAfter);
    
    // Проверяем console.log из JS
    const logs = [];
    page.on('console', msg => logs.push(msg.text()));
    
    await button.click({ force: true });
    await page.waitForTimeout(500);
    
    console.log('\n4️⃣ CONSOLE LOGS:');
    logs.forEach(log => console.log('   ', log));
    
    // Проверяем что классы ДОБАВЛЯЮТСЯ
    const hasOpenOrIsOpen = classListAfter.includes('open') || classListAfter.includes('is-open');
    console.log('\n✅ Результат:', hasOpenOrIsOpen ? 'РАБОТАЕТ' : '❌ НЕ РАБОТАЕТ');
    
    expect(hasOpenOrIsOpen).toBe(true);
  });
});
