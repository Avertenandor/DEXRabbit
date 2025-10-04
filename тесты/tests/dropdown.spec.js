const { test, expect } = require('@playwright/test');

test.describe('Dropdown функционал - Мобильное меню', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Открываем мобильное меню
    const mobileToggle = page.locator('.nav-beautiful__mobile-toggle');
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
      await page.waitForTimeout(500); // Ждем анимацию
    }
  });

  test('Все dropdown wrappers найдены', async ({ page }) => {
    const dropdownWrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const count = await dropdownWrappers.count();
    
    console.log(`Найдено dropdown wrappers: ${count}`);
    expect(count).toBeGreaterThan(0);
    expect(count).toBe(5); // Инвестиции, Партнёрство, Услуги, Породы, О нас
  });

  test('Dropdown открывается при клике на кнопку', async ({ page }) => {
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    const dropdown = firstDropdown.locator('.nav-beautiful__dropdown');
    
    // Проверяем начальное состояние (закрыто)
    const initialMaxHeight = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).maxHeight;
    });
    console.log('Начальный max-height:', initialMaxHeight);
    expect(initialMaxHeight).toBe('0px');
    
    // Кликаем на кнопку
    await firstButton.click();
    await page.waitForTimeout(400); // Ждем анимацию
    
    // Проверяем что dropdown открылся
    const hasOpenClass = await firstDropdown.evaluate(el => el.classList.contains('open'));
    expect(hasOpenClass).toBe(true);
    
    // Проверяем computed styles
    const openMaxHeight = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).maxHeight;
    });
    console.log('Max-height после открытия:', openMaxHeight);
    expect(openMaxHeight).toBe('1000px');
    
    const opacity = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).opacity;
    });
    expect(opacity).toBe('1');
    
    const visibility = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).visibility;
    });
    expect(visibility).toBe('visible');
    
    const pointerEvents = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).pointerEvents;
    });
    expect(pointerEvents).toBe('auto');
  });

  test('Dropdown закрывается при повторном клике', async ({ page }) => {
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    
    // Открываем
    await firstButton.click();
    await page.waitForTimeout(400);
    
    let hasOpenClass = await firstDropdown.evaluate(el => el.classList.contains('open'));
    expect(hasOpenClass).toBe(true);
    
    // Закрываем
    await firstButton.click();
    await page.waitForTimeout(400);
    
    hasOpenClass = await firstDropdown.evaluate(el => el.classList.contains('open'));
    expect(hasOpenClass).toBe(false);
  });

  test('Открытие одного dropdown закрывает другие', async ({ page }) => {
    const dropdowns = page.locator('.nav-beautiful__dropdown-wrapper');
    const firstButton = dropdowns.nth(0).locator('.nav-beautiful__btn');
    const secondButton = dropdowns.nth(1).locator('.nav-beautiful__btn');
    
    // Открываем первый
    await firstButton.click();
    await page.waitForTimeout(400);
    
    let firstHasOpen = await dropdowns.nth(0).evaluate(el => el.classList.contains('open'));
    expect(firstHasOpen).toBe(true);
    
    // Открываем второй
    await secondButton.click();
    await page.waitForTimeout(400);
    
    // Проверяем что первый закрылся
    firstHasOpen = await dropdowns.nth(0).evaluate(el => el.classList.contains('open'));
    expect(firstHasOpen).toBe(false);
    
    // А второй открыт
    const secondHasOpen = await dropdowns.nth(1).evaluate(el => el.classList.contains('open'));
    expect(secondHasOpen).toBe(true);
  });

  test('Все элементы dropdown видны после раскрытия', async ({ page }) => {
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    const dropdownItems = firstDropdown.locator('.nav-beautiful__dropdown-item');
    
    // Открываем dropdown
    await firstButton.click();
    await page.waitForTimeout(400);
    
    // Проверяем количество элементов
    const itemsCount = await dropdownItems.count();
    expect(itemsCount).toBeGreaterThan(0);
    
    // Проверяем что все элементы видны
    for (let i = 0; i < itemsCount; i++) {
      const item = dropdownItems.nth(i);
      await expect(item).toBeVisible();
      
      // Проверяем что элемент кликабелен
      const isClickable = await item.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      expect(isClickable).toBe(true);
    }
  });

  test('Touch targets достаточно большие', async ({ page }) => {
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    
    // Открываем dropdown
    await firstButton.click();
    await page.waitForTimeout(400);
    
    const dropdownItems = firstDropdown.locator('.nav-beautiful__dropdown-item');
    const itemsCount = await dropdownItems.count();
    
    for (let i = 0; i < itemsCount; i++) {
      const item = dropdownItems.nth(i);
      const box = await item.boundingBox();
      
      if (box) {
        console.log(`Item ${i}: ${box.width}x${box.height}`);
        expect(box.height).toBeGreaterThanOrEqual(44); // Минимум 44px высота
      }
    }
  });

  test('Dropdown имеет плавную анимацию', async ({ page }) => {
    const firstDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const firstButton = firstDropdown.locator('.nav-beautiful__btn');
    const dropdown = firstDropdown.locator('.nav-beautiful__dropdown');
    
    // Проверяем transition свойства
    const transition = await dropdown.evaluate(el => {
      return window.getComputedStyle(el).transition;
    });
    
    console.log('Transition:', transition);
    expect(transition).toContain('max-height');
    expect(transition).toContain('opacity');
    expect(transition).toContain('0.3s');
  });

  test('Dropdown работает на всех 5 секциях', async ({ page }) => {
    const dropdowns = page.locator('.nav-beautiful__dropdown-wrapper');
    const count = await dropdowns.count();
    
    for (let i = 0; i < count; i++) {
      const dropdown = dropdowns.nth(i);
      const button = dropdown.locator('.nav-beautiful__btn');
      const buttonText = await button.textContent();
      
      console.log(`Тестируем dropdown: ${buttonText?.trim()}`);
      
      // Открываем
      await button.click();
      await page.waitForTimeout(400);
      
      const hasOpen = await dropdown.evaluate(el => el.classList.contains('open'));
      expect(hasOpen).toBe(true);
      
      // Закрываем для следующей итерации
      await button.click();
      await page.waitForTimeout(400);
    }
  });

  test('DEBUG логи выводятся в консоль', async ({ page }) => {
    const consoleLogs = [];
    
    page.on('console', msg => {
      if (msg.text().includes('DEBUG')) {
        consoleLogs.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    const mobileToggle = page.locator('.nav-beautiful__mobile-toggle');
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
      await page.waitForTimeout(500);
    }
    
    const firstButton = page.locator('.nav-beautiful__btn').first();
    await firstButton.click();
    await page.waitForTimeout(500);
    
    console.log('Собрано DEBUG логов:', consoleLogs.length);
    consoleLogs.forEach(log => console.log(log));
    
    expect(consoleLogs.length).toBeGreaterThan(0);
  });
});
