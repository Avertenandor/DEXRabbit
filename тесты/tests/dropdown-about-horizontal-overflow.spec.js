/**
 * ТЕСТ: Проверка что раздел "О нас" НЕ уезжает вправо
 * 
 * Проблема: Раздел "О нас" уезжает вправо за границы экрана
 * Остальные разделы работают корректно
 */

import { test, expect } from '@playwright/test';

test.describe('Dropdown "О нас" - проблема с горизонтальным overflow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://xn--80apagbbfxgmuj4j.site');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('Раздел "О нас" НЕ уезжает вправо за границы экрана', async ({ page }) => {
    const viewportWidth = page.viewportSize().width;
    console.log('Viewport width:', viewportWidth);
    
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    // Находим раздел "О нас" (последний dropdown)
    const dropdowns = await page.locator('.nav-beautiful__dropdown-wrapper').all();
    console.log(`Найдено ${dropdowns.length} dropdown разделов`);
    
    const aboutDropdown = dropdowns[dropdowns.length - 1]; // Последний = "О нас"
    const aboutButton = aboutDropdown.locator('.nav-beautiful__btn');
    const aboutMenu = aboutDropdown.locator('.nav-beautiful__dropdown');
    
    // Получаем текст кнопки для подтверждения
    const buttonText = await aboutButton.innerText();
    console.log('Тестируем раздел:', buttonText.trim());
    
    // Открываем "О нас"
    await aboutButton.click();
    await page.waitForTimeout(800); // Ждем анимацию
    
    // Проверяем boundingBox dropdown
    const dropdownBox = await aboutMenu.boundingBox();
    console.log('Dropdown "О нас" position:', dropdownBox);
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА: не уехал ли за левую границу
    expect(dropdownBox.x).toBeGreaterThanOrEqual(0);
    console.log('✅ Dropdown НЕ уехал за левую границу');
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА: не уехал ли за правую границу
    const rightEdge = dropdownBox.x + dropdownBox.width;
    expect(rightEdge).toBeLessThanOrEqual(viewportWidth);
    console.log('✅ Dropdown НЕ уехал за правую границу');
    
    // Проверяем каждую ссылку внутри dropdown
    const links = aboutMenu.locator('.nav-beautiful__dropdown-item');
    const linksCount = await links.count();
    console.log(`Проверяем ${linksCount} ссылок в "О нас"`);
    
    for (let i = 0; i < linksCount; i++) {
      const link = links.nth(i);
      const linkBox = await link.boundingBox();
      const linkText = await link.innerText();
      
      if (linkBox) {
        // Проверяем что ссылка в пределах viewport
        expect(linkBox.x).toBeGreaterThanOrEqual(0);
        expect(linkBox.x + linkBox.width).toBeLessThanOrEqual(viewportWidth);
        
        console.log(`✅ Ссылка "${linkText.split('\\n')[0]}" в пределах экрана`);
      }
    }
    
    // Проверяем overflow menu
    const menu = page.locator('.nav-beautiful__menu');
    const menuOverflow = await menu.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        overflowX: computed.overflowX,
        overflowY: computed.overflowY,
        width: computed.width,
        paddingRight: computed.paddingRight
      };
    });
    
    console.log('Menu overflow:', menuOverflow);
    
    // Menu должен иметь overflow-x: hidden
    expect(menuOverflow.overflowX).toBe('hidden');
    console.log('✅ Menu имеет overflow-x: hidden');
  });

  test('ВСЕ dropdown разделы (включая "О нас") в пределах экрана', async ({ page }) => {
    const viewportWidth = page.viewportSize().width;
    
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    // Тестируем ВСЕ разделы
    const dropdowns = await page.locator('.nav-beautiful__dropdown-wrapper').all();
    const sectionNames = ['Инвестиции', 'Партнёрство', 'Услуги', 'Породы', 'О нас'];
    
    for (let i = 0; i < dropdowns.length; i++) {
      const dropdown = dropdowns[i];
      const button = dropdown.locator('.nav-beautiful__btn');
      const menu = dropdown.locator('.nav-beautiful__dropdown');
      
      console.log(`\\n=== Тестируем раздел ${i + 1}: ${sectionNames[i]} ===`);
      
      // Открываем dropdown
      await button.click();
      await page.waitForTimeout(800);
      
      // Проверяем позицию
      const box = await menu.boundingBox();
      
      if (box) {
        const rightEdge = box.x + box.width;
        
        console.log(`Позиция: x=${box.x}, width=${box.width}, right=${rightEdge}`);
        
        // Проверки
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(rightEdge).toBeLessThanOrEqual(viewportWidth);
        
        console.log(`✅ ${sectionNames[i]} в пределах экрана`);
      }
      
      // Закрываем dropdown
      await button.click();
      await page.waitForTimeout(400);
    }
  });

  test('Проверка ширины всех элементов в "О нас"', async ({ page }) => {
    const viewportWidth = page.viewportSize().width;
    
    // Открываем бургер
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    await burger.click();
    await page.waitForTimeout(500);
    
    // Находим "О нас"
    const dropdowns = await page.locator('.nav-beautiful__dropdown-wrapper').all();
    const aboutDropdown = dropdowns[dropdowns.length - 1];
    const aboutButton = aboutDropdown.locator('.nav-beautiful__btn');
    const aboutMenu = aboutDropdown.locator('.nav-beautiful__dropdown');
    
    // Открываем
    await aboutButton.click();
    await page.waitForTimeout(800);
    
    // Проверяем ВСЕ элементы внутри dropdown
    const allElements = await aboutMenu.locator('*').all();
    
    console.log(`Проверяем ${allElements.length} элементов в "О нас"`);
    
    let problemElements = [];
    
    for (let i = 0; i < Math.min(allElements.length, 20); i++) { // Первые 20
      const element = allElements[i];
      const box = await element.boundingBox();
      
      if (box && (box.x < 0 || box.x + box.width > viewportWidth)) {
        const tagName = await element.evaluate(el => el.tagName);
        const className = await element.evaluate(el => el.className);
        
        problemElements.push({
          tag: tagName,
          class: className,
          x: box.x,
          width: box.width,
          right: box.x + box.width
        });
      }
    }
    
    if (problemElements.length > 0) {
      console.log('\\n❌ НАЙДЕНЫ ПРОБЛЕМНЫЕ ЭЛЕМЕНТЫ:');
      problemElements.forEach((el, idx) => {
        console.log(`${idx + 1}. <${el.tag} class="${el.class}">`);
        console.log(`   x: ${el.x}, width: ${el.width}, right: ${el.right}`);
      });
    } else {
      console.log('✅ Все элементы в пределах viewport');
    }
    
    expect(problemElements.length).toBe(0);
  });
});
