/**
 * ДИАГНОСТИЧЕСКИЙ ТЕСТ: Детальная проверка computed styles dropdown
 */

import { test, expect } from '@playwright/test';

test.describe('Dropdown - Диагностика computed styles', () => {
  
  test('Проверка всех computed styles dropdown на mobile', async ({ page }) => {
    await page.goto('https://xn--80apagbbfxgmuj4j.site');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    // Открываем dropdown
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    const dropdown = firstDropdown.locator('.nav-beautiful__dropdown');
    
    console.log('\n=== ПРОВЕРКА ПЕРЕД ОТКРЫТИЕМ ===');
    
    // Проверяем computed styles ПЕРЕД открытием
    const stylesBefore = await dropdown.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        transform: computed.transform,
        left: computed.left,
        top: computed.top,
        maxHeight: computed.maxHeight,
        maxWidth: computed.maxWidth,
        minWidth: computed.minWidth,
        opacity: computed.opacity,
        visibility: computed.visibility,
        pointerEvents: computed.pointerEvents,
        marginTop: computed.marginTop,
      };
    });
    
    console.log('Styles BEFORE open:', JSON.stringify(stylesBefore, null, 2));
    
    // Открываем
    await firstButton.click();
    await page.waitForTimeout(800);
    
    console.log('\n=== ПРОВЕРКА ПОСЛЕ ОТКРЫТИЯ ===');
    
    // Проверяем computed styles ПОСЛЕ открытия
    const stylesAfter = await dropdown.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        transform: computed.transform,
        left: computed.left,
        top: computed.top,
        maxHeight: computed.maxHeight,
        maxWidth: computed.maxWidth,
        minWidth: computed.minWidth,
        opacity: computed.opacity,
        visibility: computed.visibility,
        pointerEvents: computed.pointerEvents,
        marginTop: computed.marginTop,
      };
    });
    
    console.log('Styles AFTER open:', JSON.stringify(stylesAfter, null, 2));
    
    // Проверяем позицию
    const box = await dropdown.boundingBox();
    console.log('\nBounding Box:', JSON.stringify(box, null, 2));
    
    // Проверяем классы
    const classes = await firstDropdown.evaluate(el => el.className);
    console.log('\nWrapper classes:', classes);
    
    // Проверяем все применённые CSS правила
    const allRules = await dropdown.evaluate(el => {
      const allStyles = [];
      const sheets = document.styleSheets;
      
      for (let sheet of sheets) {
        try {
          const rules = sheet.cssRules || sheet.rules;
          for (let rule of rules) {
            if (rule.selectorText && rule.selectorText.includes('nav-beautiful__dropdown')) {
              allStyles.push({
                selector: rule.selectorText,
                href: sheet.href || 'inline',
                cssText: rule.cssText
              });
            }
          }
        } catch (e) {
          // CORS может блокировать доступ к некоторым таблицам
        }
      }
      
      return allStyles;
    });
    
    console.log('\n=== ВСЕ CSS ПРАВИЛА ДЛЯ DROPDOWN ===');
    allRules.forEach((rule, index) => {
      console.log(`\n${index + 1}. ${rule.selector}`);
      console.log(`   From: ${rule.href}`);
      console.log(`   ${rule.cssText.substring(0, 200)}...`);
    });
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА
    if (stylesAfter.position !== 'static') {
      console.log('\n❌ ПРОБЛЕМА: position не static!');
      console.log(`   Expected: static`);
      console.log(`   Actual: ${stylesAfter.position}`);
    }
    
    if (stylesAfter.transform !== 'none') {
      console.log('\n❌ ПРОБЛЕМА: transform не none!');
      console.log(`   Expected: none`);
      console.log(`   Actual: ${stylesAfter.transform}`);
    }
    
    if (box.x < 0) {
      console.log('\n❌ КРИТИЧЕСКАЯ ПРОБЛЕМА: Dropdown уехал за левую границу!');
      console.log(`   Position X: ${box.x}px (должно быть >= 0)`);
    }
  });
});
