/**
 * 🔍 COMPREHENSIVE MOBILE NAVIGATION TEST
 * 
 * Этот тест ВИДИТ сайт глазами пользователя!
 * Проверяет ВСЕ визуальные проблемы:
 * - Наезжание элементов
 * - Открытие/закрытие dropdown
 * - Горизонтальный скролл
 * - Позиционирование кнопок
 * 
 * ЦЕЛЬ: Найти ВСЕ проблемы ДО того как их увидит пользователь!
 */

import { test, expect } from '@playwright/test';

test.describe('🔍 ПОЛНАЯ ПРОВЕРКА МОБИЛЬНОЙ НАВИГАЦИИ', () => {
  
  test.beforeEach(async ({ page }) => {
    // Открываем production сайт
    await page.goto('https://xn--80apagbbfxgmuj4j.site');
    await page.waitForLoadState('networkidle');
    
    // Ждем загрузки
    await page.waitForTimeout(1000);
    
    console.log('\n═══════════════════════════════════════');
    console.log('🌐 Открыт сайт, начинаем проверку...');
    console.log('═══════════════════════════════════════\n');
  });

  test('🎯 КРИТИЧЕСКИЙ: Кнопка "Открыть бот" НЕ наезжает на другие элементы', async ({ page }) => {
    const viewportWidth = page.viewportSize().width;
    const viewportHeight = page.viewportSize().height;
    
    console.log('📱 Viewport:', viewportWidth, 'x', viewportHeight);
    
    // Открываем бургер
    console.log('\n1️⃣ Открываем бургер-меню...');
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    // Делаем screenshot СРАЗУ после открытия
    await page.screenshot({ 
      path: 'тесты/test-results/nav-opened-initial.png',
      fullPage: false 
    });
    console.log('📸 Screenshot сохранен: nav-opened-initial.png');
    
    // Находим кнопку "Открыть бот"
    const openBotButton = page.locator('.nav-beautiful__cta, a[href*="t.me/dexrabbit_bot"]').first();
    const openBotBox = await openBotButton.boundingBox();
    
    console.log('\n🔍 Позиция кнопки "Открыть бот":');
    console.log('   x:', openBotBox.x);
    console.log('   y:', openBotBox.y);
    console.log('   width:', openBotBox.width);
    console.log('   height:', openBotBox.height);
    console.log('   bottom:', openBotBox.y + openBotBox.height);
    
    // Находим все dropdown кнопки
    const dropdownButtons = page.locator('.nav-beautiful__btn');
    const dropdownCount = await dropdownButtons.count();
    
    console.log(`\n🔍 Найдено ${dropdownCount} dropdown кнопок`);
    
    // Проверяем каждую кнопку на наезжание
    let overlaps = [];
    
    for (let i = 0; i < dropdownCount; i++) {
      const button = dropdownButtons.nth(i);
      const buttonBox = await button.boundingBox();
      const buttonText = await button.innerText();
      
      console.log(`\n   Кнопка ${i + 1}: "${buttonText.trim()}"`);
      console.log(`   y: ${buttonBox.y}, bottom: ${buttonBox.y + buttonBox.height}`);
      
      // Проверка на overlap (наезжание)
      const isOverlapping = (
        openBotBox.y < buttonBox.y + buttonBox.height &&
        openBotBox.y + openBotBox.height > buttonBox.y &&
        openBotBox.x < buttonBox.x + buttonBox.width &&
        openBotBox.x + openBotBox.width > buttonBox.x
      );
      
      if (isOverlapping) {
        overlaps.push({
          button: buttonText.trim(),
          openBotBottom: openBotBox.y + openBotBox.height,
          buttonTop: buttonBox.y,
          overlap: (openBotBox.y + openBotBox.height) - buttonBox.y
        });
        console.log(`   ❌ НАЕЗЖАНИЕ! Overlap: ${(openBotBox.y + openBotBox.height) - buttonBox.y}px`);
      } else {
        console.log(`   ✅ Не наезжает`);
      }
    }
    
    // ASSERT: Не должно быть наезжаний
    if (overlaps.length > 0) {
      console.log('\n❌ НАЙДЕНО НАЕЗЖАНИЕ ЭЛЕМЕНТОВ:');
      overlaps.forEach(o => {
        console.log(`   - "Открыть бот" наезжает на "${o.button}"`);
        console.log(`     Overlap: ${o.overlap}px`);
      });
      
      // Делаем screenshot проблемы
      await page.screenshot({ 
        path: 'тесты/test-results/PROBLEM-button-overlap.png',
        fullPage: false 
      });
    }
    
    expect(overlaps.length).toBe(0);
  });

  test('🔄 КРИТИЧЕСКИЙ: Dropdown открываются и ЗАКРЫВАЮТСЯ по клику', async ({ page }) => {
    console.log('\n1️⃣ Открываем бургер...');
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    const dropdownWrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const count = await dropdownWrappers.count();
    
    console.log(`\n🔍 Тестируем ${count} dropdown разделов\n`);
    
    const sectionNames = ['Инвестиции', 'Партнёрство', 'Услуги', 'Породы', 'О нас'];
    
    for (let i = 0; i < count; i++) {
      const wrapper = dropdownWrappers.nth(i);
      const button = wrapper.locator('.nav-beautiful__btn');
      const dropdown = wrapper.locator('.nav-beautiful__dropdown');
      
      console.log(`\n═══ Тестируем: ${sectionNames[i]} ═══`);
      
      // ПЕРВЫЙ КЛИК - должен открыть
      console.log('   1️⃣ Первый клик - ОТКРЫВАЕМ...');
      await button.click();
      await page.waitForTimeout(800);
      
      // Проверяем что открылся
      const isVisibleAfterOpen = await dropdown.isVisible();
      const hasOpenClass = await wrapper.evaluate(el => el.classList.contains('open'));
      
      console.log(`   Видим dropdown: ${isVisibleAfterOpen}`);
      console.log(`   Класс 'open': ${hasOpenClass}`);
      
      // Screenshot после открытия
      await page.screenshot({ 
        path: `тесты/test-results/dropdown-${i}-opened.png`,
        fullPage: false 
      });
      
      expect(isVisibleAfterOpen).toBe(true);
      expect(hasOpenClass).toBe(true);
      
      // ВТОРОЙ КЛИК - должен закрыть
      console.log('   2️⃣ Второй клик - ЗАКРЫВАЕМ...');
      await button.click();
      await page.waitForTimeout(800);
      
      // Проверяем что закрылся
      const isVisibleAfterClose = await dropdown.isVisible();
      const hasOpenClassAfterClose = await wrapper.evaluate(el => el.classList.contains('open'));
      
      console.log(`   Видим dropdown: ${isVisibleAfterClose}`);
      console.log(`   Класс 'open': ${hasOpenClassAfterClose}`);
      
      // Screenshot после закрытия
      await page.screenshot({ 
        path: `тесты/test-results/dropdown-${i}-closed.png`,
        fullPage: false 
      });
      
      // ASSERT: Должен быть закрыт!
      if (isVisibleAfterClose || hasOpenClassAfterClose) {
        console.log(`   ❌ ПРОБЛЕМА: ${sectionNames[i]} НЕ ЗАКРЫЛСЯ!`);
        await page.screenshot({ 
          path: `тесты/test-results/PROBLEM-dropdown-${i}-not-closing.png`,
          fullPage: false 
        });
      }
      
      expect(isVisibleAfterClose).toBe(false);
      expect(hasOpenClassAfterClose).toBe(false);
      
      console.log(`   ✅ ${sectionNames[i]} работает корректно`);
    }
  });

  test('📍 КРИТИЧЕСКИЙ: Все dropdown В ПРЕДЕЛАХ экрана (нет горизонтального скролла)', async ({ page }) => {
    const viewportWidth = page.viewportSize().width;
    
    console.log('\n📱 Viewport width:', viewportWidth);
    console.log('\n1️⃣ Открываем бургер...');
    
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    const dropdownWrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const count = await dropdownWrappers.count();
    
    const sectionNames = ['Инвестиции', 'Партнёрство', 'Услуги', 'Породы', 'О нас'];
    let problems = [];
    
    for (let i = 0; i < count; i++) {
      const wrapper = dropdownWrappers.nth(i);
      const button = wrapper.locator('.nav-beautiful__btn');
      const dropdown = wrapper.locator('.nav-beautiful__dropdown');
      
      console.log(`\n═══ ${sectionNames[i]} ═══`);
      
      // Открываем
      await button.click();
      await page.waitForTimeout(800);
      
      // Проверяем позицию
      const box = await dropdown.boundingBox();
      
      if (box) {
        const rightEdge = box.x + box.width;
        
        console.log(`   x: ${box.x}`);
        console.log(`   width: ${box.width}`);
        console.log(`   right edge: ${rightEdge}`);
        console.log(`   viewport: ${viewportWidth}`);
        
        // Проверяем левую границу
        if (box.x < 0) {
          console.log(`   ❌ УЕХАЛ ВЛЕВО на ${Math.abs(box.x)}px!`);
          problems.push({
            section: sectionNames[i],
            issue: 'left_overflow',
            value: box.x
          });
        }
        
        // Проверяем правую границу
        if (rightEdge > viewportWidth) {
          console.log(`   ❌ УЕХАЛ ВПРАВО на ${rightEdge - viewportWidth}px!`);
          problems.push({
            section: sectionNames[i],
            issue: 'right_overflow',
            value: rightEdge - viewportWidth
          });
          
          // Screenshot проблемы
          await page.screenshot({ 
            path: `тесты/test-results/PROBLEM-${i}-horizontal-overflow.png`,
            fullPage: true 
          });
        }
        
        if (box.x >= 0 && rightEdge <= viewportWidth) {
          console.log(`   ✅ В пределах экрана`);
        }
      }
      
      // Закрываем перед следующим
      await button.click();
      await page.waitForTimeout(400);
    }
    
    // ASSERT: Не должно быть проблем
    if (problems.length > 0) {
      console.log('\n❌ НАЙДЕНЫ ПРОБЛЕМЫ С OVERFLOW:');
      problems.forEach(p => {
        console.log(`   ${p.section}: ${p.issue} = ${p.value}px`);
      });
    }
    
    expect(problems.length).toBe(0);
  });

  test('🎨 ВИЗУАЛЬНЫЙ: Полный screenshot-тест навигации', async ({ page }) => {
    console.log('\n📸 Создаем визуальные screenshots для сравнения...\n');
    
    // 1. Закрытое меню
    await page.screenshot({ 
      path: 'тесты/test-results/visual-01-menu-closed.png',
      fullPage: false 
    });
    console.log('✅ 01: Меню закрыто');
    
    // 2. Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    await page.screenshot({ 
      path: 'тесты/test-results/visual-02-menu-opened.png',
      fullPage: true 
    });
    console.log('✅ 02: Меню открыто');
    
    // 3-7. Каждый dropdown
    const dropdownWrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const count = await dropdownWrappers.count();
    const sections = ['Инвестиции', 'Партнёрство', 'Услуги', 'Породы', 'О нас'];
    
    for (let i = 0; i < count; i++) {
      const wrapper = dropdownWrappers.nth(i);
      const button = wrapper.locator('.nav-beautiful__btn');
      
      await button.click();
      await page.waitForTimeout(800);
      
      await page.screenshot({ 
        path: `тесты/test-results/visual-0${3 + i}-${sections[i]}.png`,
        fullPage: true 
      });
      console.log(`✅ 0${3 + i}: ${sections[i]} открыт`);
      
      // Не закрываем - оставляем открытым для следующего screenshot
    }
    
    console.log('\n📁 Все screenshots сохранены в тесты/test-results/');
    console.log('   Используйте их для визуального сравнения!');
  });

  test('🔍 ДИАГНОСТИКА: Проверка Z-INDEX и наложения элементов', async ({ page }) => {
    console.log('\n1️⃣ Открываем бургер...');
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(800);
    
    // Проверяем все элементы навигации
    const elements = {
      'Открыть бот': '.nav-beautiful__cta, a[href*="t.me"]',
      'Инвестиции': '.nav-beautiful__dropdown-wrapper:nth-child(1) .nav-beautiful__btn',
      'Партнёрство': '.nav-beautiful__dropdown-wrapper:nth-child(2) .nav-beautiful__btn',
      'Услуги': '.nav-beautiful__dropdown-wrapper:nth-child(3) .nav-beautiful__btn',
      'Породы': '.nav-beautiful__dropdown-wrapper:nth-child(4) .nav-beautiful__btn',
      'О нас': '.nav-beautiful__dropdown-wrapper:nth-child(5) .nav-beautiful__btn'
    };
    
    console.log('\n📊 Z-INDEX всех элементов:\n');
    
    for (const [name, selector] of Object.entries(elements)) {
      const element = page.locator(selector).first();
      
      const zIndex = await element.evaluate(el => {
        return window.getComputedStyle(el).zIndex;
      });
      
      const position = await element.evaluate(el => {
        return window.getComputedStyle(el).position;
      });
      
      const box = await element.boundingBox();
      
      console.log(`${name}:`);
      console.log(`   z-index: ${zIndex}`);
      console.log(`   position: ${position}`);
      console.log(`   y: ${box?.y.toFixed(1)}`);
      console.log(`   height: ${box?.height.toFixed(1)}`);
      console.log(``);
    }
  });
});
