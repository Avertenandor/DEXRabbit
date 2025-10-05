/**
 * 🔍 Wallet Cards & Step Numbers - Overlap & Visibility Test
 * Проверка перекрытия цифр и правильности отображения
 */

import { test, expect } from '@playwright/test';

test.describe('🔍 Overlap & Visibility Tests', () => {
  
  test('Desktop: Wallet Cards - проверка перекрытия цифр с контентом', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('💼 WALLET CARDS - Overlap Test');
    console.log('═══════════════════════════════════════\n');
    
    // Scroll to wallet section
    await page.locator('.wallet-instructions-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Проверяем layout карточек
    const grid = page.locator('.wallet-cards-grid');
    const gridStyles = await grid.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns
      };
    });
    
    console.log('📊 Grid Layout:');
    console.log(`   Display: ${gridStyles.display}`);
    console.log(`   Columns: ${gridStyles.gridTemplateColumns}`);
    
    // Считаем количество колонок
    const columnsCount = gridStyles.gridTemplateColumns.split(' ').length;
    console.log(`\n📐 Количество колонок: ${columnsCount}`);
    
    // Screenshot
    await page.locator('.wallet-instructions-section').screenshot({
      path: 'тесты/screenshots/wallet-cards-layout-desktop.png'
    });
    
    console.log('\n📸 Screenshot: wallet-cards-layout-desktop.png');
  });
  
  test('Mobile: Wallet Cards - layout должен быть вертикальным', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📱 MOBILE - Wallet Cards Layout');
    console.log('═══════════════════════════════════════\n');
    
    await page.locator('.wallet-instructions-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    const grid = page.locator('.wallet-cards-grid');
    const gridColumns = await grid.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    
    console.log(`📐 Grid Columns: ${gridColumns}`);
    
    // На mobile должна быть 1 колонка
    const isSingleColumn = gridColumns.split(' ').length === 1;
    console.log(`\n${isSingleColumn ? '✅' : '❌'} ${isSingleColumn ? 'Одна колонка' : 'НЕСКОЛЬКО КОЛОНОК!'}`);
    
    expect(isSingleColumn).toBe(true);
    
    await page.locator('.wallet-instructions-section').screenshot({
      path: 'тесты/screenshots/wallet-cards-layout-mobile.png'
    });
  });
  
  test('Step Numbers - проверка что цифры НЕ обрезаны карточками', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔢 STEP NUMBERS - Visibility Test');
    console.log('═══════════════════════════════════════\n');
    
    // Scroll to "How it works" section
    await page.locator('#how-it-works').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Проверяем все step-numbers
    const stepNumbers = page.locator('.step-number');
    const count = await stepNumbers.count();
    
    console.log(`📊 Найдено step-numbers: ${count}`);
    
    for (let i = 0; i < count; i++) {
      const stepNumber = stepNumbers.nth(i);
      const number = await stepNumber.textContent();
      
      // Проверяем позицию
      const position = await stepNumber.evaluate(el => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.getBoundingClientRect();
        
        return {
          top: styles.top,
          right: styles.right,
          position: styles.position,
          rectTop: rect.top,
          rectBottom: rect.bottom,
          parentTop: parentRect.top,
          parentBottom: parentRect.bottom,
          isClipped: rect.top < parentRect.top
        };
      });
      
      console.log(`\n🔢 Step ${number}:`);
      console.log(`   Position: ${position.position}`);
      console.log(`   Top: ${position.top}`);
      console.log(`   Right: ${position.right}`);
      console.log(`   Rect Top: ${position.rectTop.toFixed(2)}`);
      console.log(`   Parent Top: ${position.parentTop.toFixed(2)}`);
      console.log(`   ${position.isClipped ? '❌ ОБРЕЗАНА!' : '✅ Видна полностью'}`);
      
      // Проверяем overflow родителя
      const parentOverflow = await stepNumber.evaluate(el => {
        return window.getComputedStyle(el.parentElement).overflow;
      });
      
      console.log(`   Parent overflow: ${parentOverflow}`);
    }
    
    // Screenshot
    await page.locator('#how-it-works').screenshot({
      path: 'тесты/screenshots/step-numbers-visibility.png',
      fullPage: false
    });
    
    console.log('\n📸 Screenshot: step-numbers-visibility.png');
  });
  
  test('Step Card - проверка overflow настроек', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📦 STEP CARD - Overflow Settings');
    console.log('═══════════════════════════════════════\n');
    
    await page.locator('#how-it-works').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    const stepCard = page.locator('.step-card').first();
    const overflow = await stepCard.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        overflow: styles.overflow,
        overflowX: styles.overflowX,
        overflowY: styles.overflowY,
        position: styles.position
      };
    });
    
    console.log('📦 Step Card Overflow:');
    console.log(`   overflow: ${overflow.overflow}`);
    console.log(`   overflowX: ${overflow.overflowX}`);
    console.log(`   overflowY: ${overflow.overflowY}`);
    console.log(`   position: ${overflow.position}`);
    
    if (overflow.overflow === 'hidden' || overflow.overflowY === 'hidden') {
      console.log('\n❌ ПРОБЛЕМА: overflow: hidden обрезает step-number!');
    } else {
      console.log('\n✅ Overflow настроен правильно');
    }
  });
  
  test('Wallet Step Numbers - проверка z-index и перекрытия', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('💼 WALLET STEP NUMBERS - Z-Index');
    console.log('═══════════════════════════════════════\n');
    
    await page.locator('.wallet-instructions-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Проверяем step-item (шаги инструкции)
    const stepItems = page.locator('.step-item');
    const count = await stepItems.count();
    
    if (count > 0) {
      const firstStep = stepItems.first();
      const stepNumber = firstStep.locator('.step-number');
      
      const zIndex = await stepNumber.evaluate(el => {
        return window.getComputedStyle(el).zIndex;
      });
      
      console.log(`🔢 Wallet step-number z-index: ${zIndex}`);
      
      // Проверяем перекрытие с текстом
      const stepText = firstStep.locator('.step-text');
      const overlap = await page.evaluate(({ stepNumSelector, stepTextSelector }) => {
        const stepNum = document.querySelector(stepNumSelector);
        const stepText = document.querySelector(stepTextSelector);
        
        if (!stepNum || !stepText) return { hasOverlap: false };
        
        const numRect = stepNum.getBoundingClientRect();
        const textRect = stepText.getBoundingClientRect();
        
        const hasOverlap = !(
          numRect.right < textRect.left ||
          textRect.right < numRect.left ||
          numRect.bottom < textRect.top ||
          textRect.bottom < numRect.top
        );
        
        return {
          hasOverlap,
          numRect: {
            x: numRect.x,
            y: numRect.y,
            width: numRect.width,
            height: numRect.height
          },
          textRect: {
            x: textRect.x,
            y: textRect.y,
            width: textRect.width,
            height: textRect.height
          }
        };
      }, {
        stepNumSelector: '.step-item:first-child .step-number',
        stepTextSelector: '.step-item:first-child .step-text'
      });
      
      console.log(`\n${overlap.hasOverlap ? '❌' : '✅'} ${overlap.hasOverlap ? 'ПЕРЕКРЫТИЕ ЕСТЬ!' : 'Перекрытия нет'}`);
      
      if (overlap.hasOverlap) {
        console.log('   Number rect:', overlap.numRect);
        console.log('   Text rect:', overlap.textRect);
      }
    }
  });
});
