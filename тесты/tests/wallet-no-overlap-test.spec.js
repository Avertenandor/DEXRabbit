/**
 * 🔍 Z-Index & Overlap Prevention Test
 * Проверка что элементы НЕ перекрываются
 */

import { test, expect } from '@playwright/test';

test.describe('🛡️ Z-Index & No Overlap Tests', () => {
  
  test('Desktop: Проверка что карточки НЕ перекрываются при hover', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🛡️  Z-INDEX TEST - No Overlap');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Получаем позиции карточек ДО hover
    const trustCard = page.locator('.trust-wallet-card');
    const safepalCard = page.locator('.safepal-card');
    
    const trustBoxBefore = await trustCard.boundingBox();
    const safepalBoxBefore = await safepalCard.boundingBox();
    
    console.log('📐 Позиции ДО hover:');
    console.log(`   Trust Wallet: x=${trustBoxBefore?.x}, y=${trustBoxBefore?.y}, w=${trustBoxBefore?.width}, h=${trustBoxBefore?.height}`);
    console.log(`   SafePal: x=${safepalBoxBefore?.x}, y=${safepalBoxBefore?.y}, w=${safepalBoxBefore?.width}, h=${safepalBoxBefore?.height}`);
    
    // Вычисляем gap между карточками
    const gapX = safepalBoxBefore.x - (trustBoxBefore.x + trustBoxBefore.width);
    console.log(`\n📏 Gap между карточками: ${gapX}px`);
    
    // Hover на Trust Wallet
    await trustCard.hover();
    await page.waitForTimeout(500);
    
    const trustBoxHover = await trustCard.boundingBox();
    console.log('\n🎯 Trust Wallet при hover:');
    console.log(`   y=${trustBoxHover?.y} (сдвиг: ${(trustBoxBefore.y - trustBoxHover.y).toFixed(2)}px вверх)`);
    
    // Проверяем что карточки НЕ перекрываются
    const overlap = checkOverlap(trustBoxHover, safepalBoxBefore);
    console.log(`\n✅ Перекрытие: ${overlap ? '❌ ЕСТЬ!' : '✅ НЕТ'}`);
    expect(overlap).toBe(false);
    
    // Hover на SafePal
    await safepalCard.hover();
    await page.waitForTimeout(500);
    
    const safepalBoxHover = await safepalCard.boundingBox();
    console.log('\n🎯 SafePal при hover:');
    console.log(`   y=${safepalBoxHover?.y} (сдвиг: ${(safepalBoxBefore.y - safepalBoxHover.y).toFixed(2)}px вверх)`);
    
    // Screenshot
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-no-overlap-test.png'
    });
    console.log('\n📸 Screenshot: wallet-no-overlap-test.png');
  });
  
  test('Z-Index Hierarchy: Проверка правильной иерархии', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔢 Z-INDEX HIERARCHY TEST');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    
    // Проверяем z-index значения
    const sectionZIndex = await walletSection.evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });
    
    const cardZIndex = await page.locator('.wallet-card').first().evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });
    
    const headerZIndex = await page.locator('.wallet-card-header').first().evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });
    
    const copyBtnZIndex = await page.locator('.copy-btn-mini').first().evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });
    
    console.log('📊 Z-INDEX VALUES:');
    console.log(`   Section: ${sectionZIndex}`);
    console.log(`   Card: ${cardZIndex}`);
    console.log(`   Header: ${headerZIndex}`);
    console.log(`   Copy Button: ${copyBtnZIndex}`);
    
    // Проверяем isolation
    const sectionIsolation = await walletSection.evaluate(el => {
      return window.getComputedStyle(el).isolation;
    });
    
    const cardIsolation = await page.locator('.wallet-card').first().evaluate(el => {
      return window.getComputedStyle(el).isolation;
    });
    
    console.log('\n🔒 ISOLATION:');
    console.log(`   Section: ${sectionIsolation}`);
    console.log(`   Card: ${cardIsolation}`);
    
    expect(sectionIsolation).toBe('isolate');
    expect(cardIsolation).toBe('isolate');
    console.log('\n✅ Isolation правильно установлен!');
  });
  
  test('Touch Action: Проверка оптимизации для mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📱 TOUCH ACTION TEST');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    
    // Проверяем touch-action
    const cardTouchAction = await page.locator('.wallet-card').first().evaluate(el => {
      return window.getComputedStyle(el).touchAction;
    });
    
    const copyBtnTouchAction = await page.locator('.copy-btn-mini').first().evaluate(el => {
      return window.getComputedStyle(el).touchAction;
    });
    
    console.log('👆 TOUCH-ACTION VALUES:');
    console.log(`   Card: ${cardTouchAction}`);
    console.log(`   Copy Button: ${copyBtnTouchAction}`);
    
    expect(cardTouchAction).toBe('manipulation');
    expect(copyBtnTouchAction).toBe('manipulation');
    console.log('\n✅ Touch optimization активна!');
  });
  
  test('Overflow Check: Проверка что overflow правильный', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📦 OVERFLOW CHECK');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    
    // Проверяем overflow
    const sectionOverflow = await walletSection.evaluate(el => {
      return window.getComputedStyle(el).overflow;
    });
    
    const cardOverflow = await page.locator('.wallet-card').first().evaluate(el => {
      return window.getComputedStyle(el).overflow;
    });
    
    console.log('📦 OVERFLOW VALUES:');
    console.log(`   Section: ${sectionOverflow}`);
    console.log(`   Card: ${cardOverflow}`);
    
    // Section должен быть visible для hover эффектов
    expect(sectionOverflow).toBe('visible');
    // Cards тоже visible для shadow
    expect(cardOverflow).toBe('visible');
    console.log('\n✅ Overflow правильно настроен!');
  });
  
  test('Console Check: Проверка отсутствия warnings', async ({ page }) => {
    const consoleMessages = [];
    const consoleWarnings = [];
    
    page.on('console', msg => {
      const text = msg.text();
      consoleMessages.push(text);
      
      if (msg.type() === 'warning' && text.includes('passive')) {
        consoleWarnings.push(text);
      }
    });
    
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔍 CONSOLE WARNINGS CHECK');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Симулируем touch события
    await page.locator('.wallet-card').first().tap();
    await page.waitForTimeout(500);
    
    console.log(`📝 Console messages: ${consoleMessages.length}`);
    console.log(`⚠️  Passive warnings: ${consoleWarnings.length}`);
    
    if (consoleWarnings.length > 0) {
      console.log('\n❌ Найдены passive warnings:');
      consoleWarnings.forEach(warning => console.log(`   - ${warning}`));
    } else {
      console.log('\n✅ Passive warnings отсутствуют!');
    }
    
    expect(consoleWarnings.length).toBe(0);
  });
});

/**
 * Проверка перекрытия двух прямоугольников
 */
function checkOverlap(box1, box2) {
  return !(
    box1.x + box1.width < box2.x ||
    box2.x + box2.width < box1.x ||
    box1.y + box1.height < box2.y ||
    box2.y + box2.height < box1.y
  );
}
