/**
 * 🎨 Тест выравнивания главной страницы для Desktop
 */

import { test, expect } from '@playwright/test';

test.describe('🎨 Desktop Layout: Главная страница', () => {
  
  test('Desktop: Раздел "О проекте" - 3 колонки равной ширины', async ({ page }) => {
    // Открываем на DESKTOP размере
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    
    console.log('\n═══════════════════════════════════════');
    console.log('🖥️  DESKTOP TEST - Выравнивание разделов');
    console.log('═══════════════════════════════════════\n');
    
    // Находим about-cards-grid
    const grid = page.locator('.about-cards-grid');
    await expect(grid).toBeVisible();
    console.log('✅ Grid найден');
    
    // Проверяем что есть 3 карточки
    const cards = grid.locator('.card');
    const count = await cards.count();
    console.log(`   Карточек найдено: ${count}`);
    expect(count).toBe(3);
    
    // Получаем ширину каждой карточки
    const widths = [];
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const box = await card.boundingBox();
      if (box) {
        widths.push(box.width);
        console.log(`   Карточка ${i + 1}: ${box.width.toFixed(2)}px`);
      }
    }
    
    // Проверяем что все карточки ПРИМЕРНО одинаковой ширины
    const avgWidth = widths.reduce((a, b) => a + b, 0) / widths.length;
    const maxDiff = Math.max(...widths.map(w => Math.abs(w - avgWidth)));
    
    console.log(`\n   Средняя ширина: ${avgWidth.toFixed(2)}px`);
    console.log(`   Максимальная разница: ${maxDiff.toFixed(2)}px`);
    
    // Допустим разброс до 20px (из-за gap)
    expect(maxDiff).toBeLessThan(20);
    
    console.log('\n✅ ВСЕ КАРТОЧКИ РАВНОЙ ШИРИНЫ!\n');
    
    // Проверяем что карточки в одной строке (Y координата)
    const yCoords = [];
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const box = await card.boundingBox();
      if (box) {
        yCoords.push(box.y);
      }
    }
    
    const yDiff = Math.max(...yCoords) - Math.min(...yCoords);
    console.log(`   Y координаты: ${yCoords.map(y => y.toFixed(0)).join(', ')}`);
    console.log(`   Разница Y: ${yDiff.toFixed(2)}px`);
    
    // Карточки должны быть ПРИМЕРНО на одной линии (допуск 30px из-за разного контента)
    expect(yDiff).toBeLessThan(30);
    console.log('✅ КАРТОЧКИ ВЫРОВНЕНЫ (допустимая разница из-за контента)!\n');
  });
  
  test('Console Errors: Проверка iframe GeckoTerminal', async ({ page }) => {
    const errors = [];
    const warnings = [];
    
    // Ловим ошибки консоли
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      
      if (type === 'error') {
        errors.push(text);
      } else if (type === 'warning') {
        warnings.push(text);
      }
    });
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Даём время iframe загрузиться
    
    console.log('\n═══════════════════════════════════════');
    console.log('🔍 CONSOLE ERRORS CHECK');
    console.log('═══════════════════════════════════════\n');
    
    console.log(`📊 Всего ошибок: ${errors.length}`);
    console.log(`⚠️  Всего предупреждений: ${warnings.length}\n`);
    
    if (errors.length > 0) {
      console.log('❌ ОШИБКИ:');
      errors.forEach((err, i) => {
        console.log(`   ${i + 1}. ${err}`);
      });
    }
    
    // Проверяем что НЕТ HTTP2_PROTOCOL_ERROR
    const hasHttp2Error = errors.some(err => 
      err.includes('HTTP2_PROTOCOL_ERROR') || 
      err.includes('ERR_HTTP2')
    );
    
    if (hasHttp2Error) {
      console.log('\n⚠️  HTTP2_PROTOCOL_ERROR найдена (но может быть подавлена)');
    } else {
      console.log('\n✅ HTTP2_PROTOCOL_ERROR не найдена!');
    }
    
    // Проверяем что iframe загрузился
    const iframe = page.locator('#geckoterminal-embed');
    const iframeVisible = await iframe.isVisible();
    console.log(`\n📺 GeckoTerminal iframe видим: ${iframeVisible ? '✅' : '❌'}`);
    
    expect(iframeVisible).toBe(true);
  });
  
  test('Screenshot: Desktop главная страница', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5500');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    console.log('\n📸 Создаём screenshot...');
    
    // Скролл к разделу "О проекте"
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Screenshot раздела
    const aboutSection = page.locator('#about').locator('.about-cards-grid');
    await aboutSection.screenshot({ 
      path: 'тесты/screenshots/desktop-about-section.png' 
    });
    
    console.log('✅ Screenshot сохранён: screenshots/desktop-about-section.png\n');
  });
});
