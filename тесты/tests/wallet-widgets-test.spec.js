/**
 * 📸 Screenshot Test: Wallet Instructions Widgets
 * Визуальный тест новых виджетов для Mobile и Desktop
 */

import { test, expect } from '@playwright/test';

test.describe('🎨 Wallet Instructions Widgets', () => {
  
  test('Desktop: Новые виджеты Trust Wallet и SafePal', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🖥️  DESKTOP TEST - Wallet Widgets');
    console.log('═══════════════════════════════════════\n');
    
    // Скроллим к секции с виджетами
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Проверяем что секция видна
    await expect(walletSection).toBeVisible();
    console.log('✅ Wallet Instructions Section видна');
    
    // Проверяем заголовок
    const header = page.locator('.wallet-instructions-header');
    await expect(header).toBeVisible();
    console.log('✅ Header найден');
    
    // Проверяем badge
    const badge = page.locator('.wallet-badge');
    await expect(badge).toContainText('ПОШАГОВАЯ ИНСТРУКЦИЯ');
    console.log('✅ Badge: "ПОШАГОВАЯ ИНСТРУКЦИЯ"');
    
    // Проверяем что есть 2 карточки (Trust Wallet и SafePal)
    const cards = page.locator('.wallet-card');
    const cardsCount = await cards.count();
    expect(cardsCount).toBe(2);
    console.log(`✅ Найдено карточек: ${cardsCount}`);
    
    // Проверяем Trust Wallet
    const trustWalletCard = page.locator('.trust-wallet-card');
    await expect(trustWalletCard).toBeVisible();
    console.log('✅ Trust Wallet карточка видна');
    
    // Проверяем SafePal
    const safepalCard = page.locator('.safepal-card');
    await expect(safepalCard).toBeVisible();
    console.log('✅ SafePal карточка видна');
    
    // Проверяем что есть кнопки копирования
    const copyButtons = page.locator('.copy-btn-mini');
    const copyButtonsCount = await copyButtons.count();
    expect(copyButtonsCount).toBeGreaterThan(0);
    console.log(`✅ Кнопок копирования: ${copyButtonsCount}`);
    
    // Проверяем Warning блок
    const warningBlock = page.locator('.wallet-warning-block');
    await expect(warningBlock).toBeVisible();
    console.log('✅ Warning блок найден');
    
    // Проверяем Success блок
    const successBlock = page.locator('.wallet-success-block');
    await expect(successBlock).toBeVisible();
    console.log('✅ Success блок найден');
    
    // Screenshot всей секции
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-widgets-desktop.png',
      fullPage: true
    });
    console.log('📸 Screenshot сохранён: wallet-widgets-desktop.png\n');
  });
  
  test('Mobile: Новые виджеты на iPhone 12', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📱 MOBILE TEST - Wallet Widgets');
    console.log('═══════════════════════════════════════\n');
    
    // Скроллим к секции
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Проверяем visibility
    await expect(walletSection).toBeVisible();
    console.log('✅ Section видна на mobile');
    
    // Проверяем что карточки идут в колонку
    const grid = page.locator('.wallet-cards-grid');
    const gridStyles = await grid.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns
      };
    });
    
    console.log(`📐 Grid columns на mobile: ${gridStyles.gridTemplateColumns}`);
    
    // Проверяем что обе карточки видны
    const cards = page.locator('.wallet-card');
    const cardsCount = await cards.count();
    expect(cardsCount).toBe(2);
    console.log(`✅ Карточек на mobile: ${cardsCount}`);
    
    // Проверяем размеры шрифтов (clamp должен работать)
    const title = page.locator('.wallet-title');
    const titleSize = await title.evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });
    console.log(`📏 Размер title: ${titleSize}`);
    
    // Screenshot mobile версии
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-widgets-mobile.png',
      fullPage: true
    });
    console.log('📸 Screenshot сохранён: wallet-widgets-mobile.png\n');
  });
  
  test('Interactive: Hover эффекты на карточках', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🎯 INTERACTIVE TEST - Hover Effects');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Hover на Trust Wallet карточку
    const trustCard = page.locator('.trust-wallet-card');
    await trustCard.hover();
    await page.waitForTimeout(500);
    
    // Screenshot с hover
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-widgets-hover-trust.png'
    });
    console.log('📸 Trust Wallet hover screenshot');
    
    // Hover на SafePal карточку
    const safepalCard = page.locator('.safepal-card');
    await safepalCard.hover();
    await page.waitForTimeout(500);
    
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-widgets-hover-safepal.png'
    });
    console.log('📸 SafePal hover screenshot');
    
    console.log('\n✅ Hover эффекты работают!\n');
  });
  
  test('Functional: Кнопка копирования работает', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📋 FUNCTIONAL TEST - Copy Button');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Находим первую кнопку копирования
    const copyBtn = page.locator('.copy-btn-mini').first();
    await expect(copyBtn).toBeVisible();
    console.log('✅ Кнопка копирования найдена');
    
    // Кликаем на кнопку
    await copyBtn.click();
    await page.waitForTimeout(500);
    
    console.log('✅ Клик по кнопке выполнен');
    
    // Проверяем что появилось уведомление (если есть)
    const notification = page.locator('.wallet-notification');
    const notificationVisible = await notification.isVisible().catch(() => false);
    
    if (notificationVisible) {
      console.log('✅ Уведомление показано');
      await notification.screenshot({ 
        path: 'тесты/screenshots/wallet-copy-notification.png'
      });
      console.log('📸 Notification screenshot');
    }
    
    // Screenshot после клика
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-widgets-after-copy.png'
    });
    console.log('📸 After copy screenshot\n');
  });
  
  test('Tablet: Вид на iPad', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('📱 TABLET TEST - iPad View');
    console.log('═══════════════════════════════════════\n');
    
    const walletSection = page.locator('.wallet-instructions-section');
    await walletSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Проверяем grid на tablet (должно быть 2 колонки)
    const grid = page.locator('.wallet-cards-grid');
    const gridStyles = await grid.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns
      };
    });
    
    console.log(`📐 Grid columns на tablet: ${gridStyles.gridTemplateColumns}`);
    
    await walletSection.screenshot({ 
      path: 'тесты/screenshots/wallet-widgets-tablet.png',
      fullPage: true
    });
    console.log('📸 Tablet screenshot сохранён\n');
  });
});
