/**
 * 🧪 ЛОКАЛЬНЫЙ ТЕСТ - проверка исправлений на localhost
 */

import { test, expect } from '@playwright/test';

test.describe('🧪 ЛОКАЛЬНЫЙ ТЕСТ ИСПРАВЛЕНИЙ', () => {
  
  test.beforeEach(async ({ page }) => {
    // Тестируем ЛОКАЛЬНУЮ версию!
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    console.log('\n═══════════════════════════════════════');
    console.log('🏠 Открыт ЛОКАЛЬНЫЙ сайт (localhost:5500)');
    console.log('═══════════════════════════════════════\n');
  });

  test('🔄 КРИТИЧЕСКИЙ: Dropdown ЗАКРЫВАЮТСЯ по второму клику (localhost)', async ({ page }) => {
    console.log('1️⃣ Открываем бургер...');
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    const dropdownWrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const count = await dropdownWrappers.count();
    
    console.log(`\n🔍 Тестируем ${count} dropdown разделов\n`);
    
    const sectionNames = ['Инвестиции', 'Партнёрство', 'Услуги', 'Породы', 'О нас'];
    let failedSections = [];
    
    for (let i = 0; i < count; i++) {
      const wrapper = dropdownWrappers.nth(i);
      const button = wrapper.locator('.nav-beautiful__btn');
      const dropdown = wrapper.locator('.nav-beautiful__dropdown');
      
      console.log(`\n═══ ${sectionNames[i]} ═══`);
      
      // ПЕРВЫЙ КЛИК - открыть
      console.log('   1️⃣ Первый клик...');
      await button.click({ force: true }); // FORCE клик игнорируя overlap
      await page.waitForTimeout(800);
      
      const isVisibleAfterOpen = await dropdown.isVisible();
      const hasOpenClass = await wrapper.evaluate(el => 
        el.classList.contains('open') || el.classList.contains('is-open')
      );
      
      console.log(`   Видим: ${isVisibleAfterOpen}, Класс: ${hasOpenClass}`);
      
      if (!isVisibleAfterOpen || !hasOpenClass) {
        failedSections.push({
          section: sectionNames[i],
          issue: 'not_opening',
          visible: isVisibleAfterOpen,
          hasClass: hasOpenClass
        });
        console.log(`   ❌ НЕ ОТКРЫЛСЯ!`);
        continue;
      }
      
      console.log(`   ✅ Открылся`);
      
      // ВТОРОЙ КЛИК - закрыть
      console.log('   2️⃣ Второй клик...');
      await button.click({ force: true }); // FORCE клик игнорируя overlap
      await page.waitForTimeout(800);
      
      const isVisibleAfterClose = await dropdown.isVisible();
      const hasOpenClassAfterClose = await wrapper.evaluate(el => 
        el.classList.contains('open') || el.classList.contains('is-open')
      );
      
      console.log(`   Видим: ${isVisibleAfterClose}, Класс: ${hasOpenClassAfterClose}`);
      
      if (isVisibleAfterClose || hasOpenClassAfterClose) {
        failedSections.push({
          section: sectionNames[i],
          issue: 'not_closing',
          visible: isVisibleAfterClose,
          hasClass: hasOpenClassAfterClose
        });
        console.log(`   ❌ НЕ ЗАКРЫЛСЯ!`);
      } else {
        console.log(`   ✅ Закрылся корректно`);
      }
    }
    
    // ASSERT
    if (failedSections.length > 0) {
      console.log('\n❌ ПРОБЛЕМЫ С РАЗДЕЛАМИ:');
      failedSections.forEach(f => {
        console.log(`   ${f.section}: ${f.issue}`);
        console.log(`      visible: ${f.visible}, hasClass: ${f.hasClass}`);
      });
    }
    
    expect(failedSections.length).toBe(0);
  });

  test('📍 КРИТИЧЕСКИЙ: "О нас" В ПРЕДЕЛАХ экрана (localhost)', async ({ page }) => {
    const viewportWidth = page.viewportSize().width;
    
    console.log('\n📱 Viewport:', viewportWidth);
    console.log('1️⃣ Открываем бургер...');
    
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    const dropdownWrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const aboutWrapper = dropdownWrappers.nth(4); // Последний = "О нас"
    const aboutButton = aboutWrapper.locator('.nav-beautiful__btn');
    const aboutDropdown = aboutWrapper.locator('.nav-beautiful__dropdown');
    
    console.log('\n═══ О нас ═══');
    
    // Открываем "О нас"
    await aboutButton.click();
    await page.waitForTimeout(800);
    
    // Проверяем позицию
    const box = await aboutDropdown.boundingBox();
    
    console.log(`   x: ${box.x}`);
    console.log(`   width: ${box.width}`);
    console.log(`   right edge: ${box.x + box.width}`);
    console.log(`   viewport: ${viewportWidth}`);
    
    // ASSERT: левая граница
    expect(box.x).toBeGreaterThanOrEqual(0);
    console.log(`   ✅ Не уехал влево`);
    
    // ASSERT: правая граница
    const rightEdge = box.x + box.width;
    if (rightEdge > viewportWidth) {
      console.log(`   ❌ УЕХАЛ ВПРАВО на ${rightEdge - viewportWidth}px!`);
    } else {
      console.log(`   ✅ Не уехал вправо`);
    }
    
    expect(rightEdge).toBeLessThanOrEqual(viewportWidth);
  });
});
