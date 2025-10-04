/**
 * ✅ ФИНАЛЬНЫЙ ТЕСТ - с очисткой кэша
 */

import { test, expect } from '@playwright/test';

test.describe('✅ ФИНАЛЬНЫЙ ТЕСТ - NO CACHE', () => {
  
  test('Dropdown ЗАКРЫВАЕТСЯ (NO CACHE)', async ({ page, context }) => {
    // ОЧИЩАЕМ ВЕСЬ КЭШ!
    await context.clearCookies();
    
    // Добавляем timestamp чтобы обойти кэш
    const timestamp = Date.now();
    await page.goto(`http://localhost:5500?nocache=${timestamp}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Даём время на JS
    
    console.log('\n═══════════════════════════════════════');
    console.log('✅ ФИНАЛЬНЫЙ ТЕСТ - NO CACHE');
    console.log('═══════════════════════════════════════\n');
    
    // Открываем бургер
    console.log('1️⃣ Открываем бургер...');
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(1000);
    
    // Находим ПЕРВЫЙ dropdown
    const wrapper = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const button = wrapper.locator('.nav-beautiful__btn');
    const dropdown = wrapper.locator('.nav-beautiful__dropdown');
    
    console.log('\n═══ ПЕРВЫЙ DROPDOWN (Инвестиции) ═══\n');
    
    // ПЕРВЫЙ КЛИК - открыть
    console.log('1️⃣ Первый клик (ОТКРЫТЬ)...');
    await button.click({ force: true });
    await page.waitForTimeout(1000);
    
    const isVisibleAfterOpen = await dropdown.isVisible();
    const hasOpenAfterOpen = await wrapper.evaluate(el => 
      el.classList.contains('open') || el.classList.contains('is-open')
    );
    
    console.log(`   isVisible: ${isVisibleAfterOpen}`);
    console.log(`   hasOpenClass: ${hasOpenAfterOpen}`);
    
    expect(isVisibleAfterOpen).toBe(true);
    expect(hasOpenAfterOpen).toBe(true);
    console.log('   ✅ Открылся!\n');
    
    // ВТОРОЙ КЛИК - закрыть
    console.log('2️⃣ Второй клик (ЗАКРЫТЬ)...');
    await button.click({ force: true });
    await page.waitForTimeout(1000);
    
    const isVisibleAfterClose = await dropdown.isVisible();
    const hasOpenAfterClose = await wrapper.evaluate(el => 
      el.classList.contains('open') || el.classList.contains('is-open')
    );
    
    console.log(`   isVisible: ${isVisibleAfterClose}`);
    console.log(`   hasOpenClass: ${hasOpenAfterClose}`);
    
    if (!isVisibleAfterClose && !hasOpenAfterClose) {
      console.log('   ✅ ЗАКРЫЛСЯ! ВСЁ РАБОТАЕТ! 🎉\n');
    } else {
      console.log('   ❌ НЕ ЗАКРЫЛСЯ!\n');
    }
    
    expect(isVisibleAfterClose).toBe(false);
    expect(hasOpenAfterClose).toBe(false);
  });
});
