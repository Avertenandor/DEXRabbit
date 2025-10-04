/**
 * КРИТИЧЕСКИЙ ТЕСТ: Проверка что dropdown не уезжает за границы экрана
 * 
 * Проблема: При клике на dropdown элементы "уезжали" влево/вправо
 * Причина: transform: translateX(-50%) из desktop версии применялся на mobile
 * 
 * Исправление: Добавлены !important для position: static и transform: none в mobile
 */

import { test, expect } from '@playwright/test';

test.describe('Dropdown - Критический баг: элементы уезжают за экран', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://xn--80apagbbfxgmuj4j.site');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('Dropdown НЕ уезжает за границы viewport при открытии', async ({ page }) => {
    // Открываем бургер-меню
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500); // Ждем открытия меню
    
    // Находим первый dropdown (Инвестиции)
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    const dropdown = firstDropdown.locator('.nav-beautiful__dropdown');
    
    // Получаем размеры viewport
    const viewportSize = page.viewportSize();
    const viewportWidth = viewportSize.width;
    
    // Кликаем на кнопку dropdown
    await firstButton.click();
    await page.waitForTimeout(800); // Ждем завершения анимации
    
    // Проверяем что dropdown открылся
    const hasOpenClass = await firstDropdown.evaluate(el => el.classList.contains('open'));
    expect(hasOpenClass).toBe(true);
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА: Получаем позицию dropdown
    const dropdownBox = await dropdown.boundingBox();
    
    console.log('Viewport width:', viewportWidth);
    console.log('Dropdown position:', dropdownBox);
    
    // Проверяем что dropdown НЕ уехал за левую границу
    expect(dropdownBox.x).toBeGreaterThanOrEqual(0);
    console.log('✅ Dropdown НЕ уехал за левую границу:', dropdownBox.x, '>=', 0);
    
    // Проверяем что dropdown НЕ уехал за правую границу
    const dropdownRightEdge = dropdownBox.x + dropdownBox.width;
    expect(dropdownRightEdge).toBeLessThanOrEqual(viewportWidth);
    console.log('✅ Dropdown НЕ уехал за правую границу:', dropdownRightEdge, '<=', viewportWidth);
    
    // Проверяем что dropdown видим (не за пределами экрана)
    const isVisible = await dropdown.isVisible();
    expect(isVisible).toBe(true);
    console.log('✅ Dropdown видим на экране');
    
    // Проверяем что dropdown имеет position: static (не absolute!)
    const position = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).position;
    });
    expect(position).toBe('static');
    console.log('✅ Dropdown имеет position: static');
    
    // Проверяем что transform: none (не translateX!)
    const transform = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });
    expect(transform).toBe('none');
    console.log('✅ Dropdown имеет transform: none');
  });

  test('Все dropdown элементы остаются в пределах экрана', async ({ page }) => {
    // Открываем бургер-меню
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    const viewportSize = page.viewportSize();
    const viewportWidth = viewportSize.width;
    
    // Тестируем все 5 dropdown разделов
    const dropdowns = await page.locator('.nav-beautiful__dropdown-wrapper').all();
    
    for (let i = 0; i < dropdowns.length; i++) {
      const dropdownWrapper = dropdowns[i];
      const button = dropdownWrapper.locator('.nav-beautiful__btn');
      const dropdown = dropdownWrapper.locator('.nav-beautiful__dropdown');
      
      console.log(`\nТестируем dropdown ${i + 1}...`);
      
      // Открываем dropdown
      await button.click();
      await page.waitForTimeout(800);
      
      // Проверяем позицию
      const box = await dropdown.boundingBox();
      
      if (box) {
        // Проверяем левую границу
        expect(box.x).toBeGreaterThanOrEqual(0);
        
        // Проверяем правую границу
        const rightEdge = box.x + box.width;
        expect(rightEdge).toBeLessThanOrEqual(viewportWidth);
        
        console.log(`✅ Dropdown ${i + 1} в пределах экрана:`, {
          left: box.x,
          right: rightEdge,
          viewport: viewportWidth
        });
      }
      
      // Закрываем dropdown перед следующим
      await button.click();
      await page.waitForTimeout(400);
    }
  });

  test('Dropdown items (ссылки) кликабельны и не уезжают', async ({ page }) => {
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    // Открываем первый dropdown
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    await firstButton.click();
    await page.waitForTimeout(800);
    
    // Находим все ссылки внутри dropdown
    const dropdownLinks = firstDropdown.locator('.nav-beautiful__dropdown-item');
    const linksCount = await dropdownLinks.count();
    
    console.log(`Найдено ${linksCount} ссылок в dropdown`);
    
    const viewportWidth = page.viewportSize().width;
    
    // Проверяем каждую ссылку
    for (let i = 0; i < linksCount; i++) {
      const link = dropdownLinks.nth(i);
      const box = await link.boundingBox();
      
      if (box) {
        // Ссылка должна быть в пределах экрана
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewportWidth);
        
        // Ссылка должна быть кликабельной
        const isVisible = await link.isVisible();
        expect(isVisible).toBe(true);
        
        console.log(`✅ Ссылка ${i + 1} в пределах экрана и кликабельна`);
      }
    }
  });

  test('После очистки кэша dropdown работает корректно', async ({ page, context }) => {
    // Эмулируем очистку кэша (перезагрузка с очисткой)
    await context.clearCookies();
    await page.goto('https://xn--80apagbbfxgmuj4j.site', { 
      waitUntil: 'networkidle' 
    });
    
    // Принудительная перезагрузка (как "обновить" в браузере)
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    // Открываем dropdown
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    await firstButton.click();
    await page.waitForTimeout(800);
    
    // Проверяем что dropdown не уехал
    const dropdown = firstDropdown.locator('.nav-beautiful__dropdown');
    const box = await dropdown.boundingBox();
    const viewportWidth = page.viewportSize().width;
    
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewportWidth);
    
    console.log('✅ После очистки кэша dropdown работает корректно');
  });
});
