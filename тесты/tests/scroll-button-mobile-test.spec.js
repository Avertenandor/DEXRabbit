/**
 * 🔝 Scroll to Top Button - Mobile Test
 * Проверка что кнопка "Наверх" НЕ обрезана на мобильных
 */

import { test, expect } from '@playwright/test';

test.describe('🔝 Scroll to Top Button Tests', () => {
  
  test('Mobile (iPhone 12): Проверка что кнопка видна полностью', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📱 MOBILE TEST - Scroll Button');
    console.log('═══════════════════════════════════════\n');
    
    // Скроллим вниз чтобы кнопка появилась
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Ищем кнопку
    const scrollBtn = page.locator('.scroll-top-btn');
    await expect(scrollBtn).toBeVisible();
    console.log('✅ Кнопка найдена и видна');
    
    // Получаем размеры кнопки
    const btnBox = await scrollBtn.boundingBox();
    console.log('\n📐 Размеры кнопки:');
    console.log(`   x: ${btnBox?.x}`);
    console.log(`   y: ${btnBox?.y}`);
    console.log(`   width: ${btnBox?.width}`);
    console.log(`   height: ${btnBox?.height}`);
    
    // Получаем размеры viewport
    const viewportSize = page.viewportSize();
    console.log('\n📱 Viewport:');
    console.log(`   width: ${viewportSize?.width}`);
    console.log(`   height: ${viewportSize?.height}`);
    
    // Для FIXED элементов проверяем координаты относительно VIEWPORT
    const btnViewportPosition = await scrollBtn.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom
      };
    });
    
    console.log('\n🔍 Позиция относительно viewport:');
    console.log(`   x: ${btnViewportPosition.x}`);
    console.log(`   y: ${btnViewportPosition.y}`);
    console.log(`   right: ${btnViewportPosition.right}`);
    console.log(`   bottom: ${btnViewportPosition.bottom}`);
    
    // Проверяем что кнопка НЕ выходит за границы
    const rightEdge = btnViewportPosition.right;
    const bottomEdge = btnViewportPosition.bottom;
    
    console.log('\n🔍 Проверка границ:');
    console.log(`   Right edge: ${rightEdge} (viewport: ${viewportSize?.width})`);
    console.log(`   Bottom edge: ${bottomEdge} (viewport: ${viewportSize?.height})`);
    
    // Проверяем что кнопка полностью в viewport
    const isInsideRight = rightEdge <= (viewportSize?.width || 0);
    const isInsideBottom = bottomEdge <= (viewportSize?.height || 0);
    
    console.log(`\n❓ Внутри right: ${isInsideRight ? '✅' : '❌ ОБРЕЗАНА!'}`);
    console.log(`❓ Внутри bottom: ${isInsideBottom ? '✅' : '❌ ОБРЕЗАНА!'}`);
    
    // Проверяем CSS свойства
    const btnStyles = await scrollBtn.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        bottom: styles.bottom,
        right: styles.right,
        width: styles.width,
        height: styles.height,
        zIndex: styles.zIndex,
        overflow: styles.overflow
      };
    });
    
    console.log('\n🎨 CSS Properties:');
    console.log(`   position: ${btnStyles.position}`);
    console.log(`   bottom: ${btnStyles.bottom}`);
    console.log(`   right: ${btnStyles.right}`);
    console.log(`   width: ${btnStyles.width}`);
    console.log(`   height: ${btnStyles.height}`);
    console.log(`   z-index: ${btnStyles.zIndex}`);
    console.log(`   overflow: ${btnStyles.overflow}`);
    
    // Screenshot
    await page.screenshot({ 
      path: 'тесты/screenshots/scroll-button-mobile-before-fix.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: scroll-button-mobile-before-fix.png');
    
    // ASSERTIONS
    expect(isInsideRight).toBe(true);
    expect(isInsideBottom).toBe(true);
    expect(btnStyles.position).toBe('fixed');
    
    if (!isInsideRight || !isInsideBottom) {
      console.log('\n❌ ПРОБЛЕМА НАЙДЕНА: Кнопка обрезана!');
    } else {
      console.log('\n✅ Кнопка полностью видна!');
    }
  });
  
  test('Mobile (iPhone SE): Маленький экран', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📱 iPhone SE TEST - Scroll Button');
    console.log('═══════════════════════════════════════\n');
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    const scrollBtn = page.locator('.scroll-top-btn');
    
    // Для FIXED элементов используем getBoundingClientRect
    const btnPos = await scrollBtn.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        right: rect.right,
        bottom: rect.bottom
      };
    });
    
    const viewportSize = page.viewportSize();
    
    console.log('📐 Button position:');
    console.log(`   Right: ${btnPos.right}/${viewportSize?.width}`);
    console.log(`   Bottom: ${btnPos.bottom}/${viewportSize?.height}`);
    
    const isOk = btnPos.right <= (viewportSize?.width || 0) && 
                 btnPos.bottom <= (viewportSize?.height || 0);
    
    console.log(`\n${isOk ? '✅' : '❌'} Кнопка ${isOk ? 'видна' : 'ОБРЕЗАНА'} на iPhone SE`);
    
    await page.screenshot({ 
      path: 'тесты/screenshots/scroll-button-iphone-se.png',
      fullPage: true
    });
  });
  
  test('Android (Pixel 5): Проверка на Android', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 851 }); // Pixel 5
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🤖 ANDROID TEST - Scroll Button');
    console.log('═══════════════════════════════════════\n');
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    const scrollBtn = page.locator('.scroll-top-btn');
    
    // Для FIXED элементов используем getBoundingClientRect
    const btnPos = await scrollBtn.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        right: rect.right,
        bottom: rect.bottom
      };
    });
    
    const viewportSize = page.viewportSize();
    
    console.log('📐 Button position:');
    console.log(`   Right: ${btnPos.right}/${viewportSize?.width}`);
    console.log(`   Bottom: ${btnPos.bottom}/${viewportSize?.height}`);
    
    const isOk = btnPos.right <= (viewportSize?.width || 0) && 
                 btnPos.bottom <= (viewportSize?.height || 0);
    
    console.log(`\n${isOk ? '✅' : '❌'} Кнопка ${isOk ? 'видна' : 'ОБРЕЗАНА'} на Pixel 5`);
    
    await page.screenshot({ 
      path: 'тесты/screenshots/scroll-button-android.png',
      fullPage: true
    });
  });
  
  test('Desktop: Кнопка должна быть видна', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🖥️  DESKTOP TEST - Scroll Button');
    console.log('═══════════════════════════════════════\n');
    
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(500);
    
    const scrollBtn = page.locator('.scroll-top-btn');
    const btnBox = await scrollBtn.boundingBox();
    
    console.log('📐 Button position:');
    console.log(`   x: ${btnBox?.x}`);
    console.log(`   y: ${btnBox?.y}`);
    console.log(`   width: ${btnBox?.width}`);
    console.log(`   height: ${btnBox?.height}`);
    
    await expect(scrollBtn).toBeVisible();
    console.log('\n✅ Кнопка видна на desktop');
    
    await page.screenshot({ 
      path: 'тесты/screenshots/scroll-button-desktop.png',
      fullPage: false
    });
  });
  
  test('Functional: Кнопка работает (скролл наверх)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('⚡ FUNCTIONAL TEST - Scroll Works');
    console.log('═══════════════════════════════════════\n');
    
    // Скроллим вниз
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(500);
    
    const scrollBefore = await page.evaluate(() => window.pageYOffset);
    console.log(`📍 Scroll position BEFORE: ${scrollBefore}px`);
    
    // Кликаем на кнопку
    const scrollBtn = page.locator('.scroll-top-btn');
    await scrollBtn.click();
    await page.waitForTimeout(1000); // Ждём анимацию
    
    const scrollAfter = await page.evaluate(() => window.pageYOffset);
    console.log(`📍 Scroll position AFTER: ${scrollAfter}px`);
    
    expect(scrollAfter).toBeLessThan(100);
    console.log('\n✅ Кнопка работает! Скролл наверх успешен');
  });
  
  test('Z-Index: Кнопка поверх всех элементов', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔢 Z-INDEX TEST');
    console.log('═══════════════════════════════════════\n');
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    const scrollBtn = page.locator('.scroll-top-btn');
    const zIndex = await scrollBtn.evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });
    
    console.log(`🔢 Z-Index: ${zIndex}`);
    
    // Должен быть высокий z-index (больше 100)
    const zIndexNum = parseInt(zIndex);
    expect(zIndexNum).toBeGreaterThan(100);
    
    console.log(`\n${zIndexNum > 100 ? '✅' : '❌'} Z-Index ${zIndexNum > 100 ? 'достаточный' : 'СЛИШКОМ НИЗКИЙ'}`);
  });
});
