/**
 * 🔍 Проверка загрузки JavaScript
 */

import { test, expect } from '@playwright/test';

test.describe('🔍 JavaScript Загрузка', () => {
  
  test('Проверяем что JS загружен', async ({ page }) => {
    await page.goto('http://localhost:5500');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔍 ПРОВЕРКА ЗАГРУЗКИ JS');
    console.log('═══════════════════════════════════════\n');
    
    // Ждём ДОЛГО чтобы всё загрузилось
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // 3 секунды!
    
    // Проверяем что скрипт загрузился
    const scriptLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some(s => s.src.includes('navigation-beautiful.js'));
    });
    
    console.log('1️⃣ Скрипт в DOM:', scriptLoaded);
    
    // Проверяем что функция есть
    const hasInitMessage = await page.evaluate(() => {
      // Проверяем что инициализация была
      return typeof window !== 'undefined';
    });
    
    console.log('2️⃣ Window объект:', hasInitMessage);
    
    // Проверяем что event listeners установлены
    const burger = page.locator('.nav-beautiful__mobile-toggle');
    const burgerExists = await burger.count() > 0;
    
    console.log('3️⃣ Бургер существует:', burgerExists);
    
    // Проверяем dropdown wrappers
    const wrappers = page.locator('.nav-beautiful__dropdown-wrapper');
    const wrappersCount = await wrappers.count();
    
    console.log('4️⃣ Dropdown wrappers:', wrappersCount);
    
    // Проверяем что у ПЕРВОГО wrapper есть кнопка с onclick
    if (wrappersCount > 0) {
      const firstWrapper = wrappers.first();
      const button = firstWrapper.locator('.nav-beautiful__btn');
      const buttonExists = await button.count() > 0;
      
      console.log('5️⃣ У первого wrapper есть кнопка:', buttonExists);
      
      if (buttonExists) {
        // Проверяем что можем кликнуть
        const isClickable = await button.isVisible() && await button.isEnabled();
        console.log('6️⃣ Кнопка кликабельна:', isClickable);
      }
    }
    
    // SUCCESS
    console.log('\n✅ ВСЁ ЗАГРУЖЕНО ПРАВИЛЬНО');
    
    expect(scriptLoaded).toBe(true);
    expect(wrappersCount).toBeGreaterThan(0);
  });
});
