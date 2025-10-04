const { test, expect } = require('@playwright/test');
const {
  humanPause,
  openMobileMenu,
  openDropdown,
  clickDropdownLink,
  verifyPage,
  readPageContent,
  goBack,
  fullPageCheck,
  clickExternalLink
} = require('../helpers/user-actions');

/**
 * ПРОМЫШЛЕННЫЙ ТЕСТ: ПУТЬ ИНВЕСТОРА
 * 
 * Сценарий:
 * 1. Пользователь заходит на главную страницу
 * 2. Открывает мобильное меню
 * 3. Переходит в "Инвестиции" → "Модель инвестирования"
 * 4. Читает информацию о модели
 * 5. Возвращается назад
 * 6. Переходит в "Гарантии"
 * 7. Изучает гарантии
 * 8. Возвращается назад
 * 9. Переходит в "Стать инвестором"
 * 10. Проверяет ссылку на бот
 */

test.describe('ПРОМЫШЛЕННЫЙ ТЕСТ: Путь Инвестора', () => {
  
  test('Инвестор: от главной до регистрации', async ({ page }) => {
    console.log('\n🎯 НАЧАЛО ТЕСТА: ПУТЬ ИНВЕСТОРА\n');
    
    // ========== ШАГ 1: Загрузка главной страницы ==========
    console.log('📍 ШАГ 1: Загрузка главной страницы');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await fullPageCheck(page, 'Главная страница');
    await humanPause(2000); // Пользователь осматривается
    
    // ========== ШАГ 2: Открытие мобильного меню ==========
    console.log('\n📍 ШАГ 2: Открытие мобильного меню');
    await openMobileMenu(page);
    await humanPause(1000); // Смотрим на меню
    
    // ========== ШАГ 3: Открытие dropdown "Инвестиции" ==========
    console.log('\n📍 ШАГ 3: Открытие раздела Инвестиции');
    await openDropdown(page, 'Инвестиции');
    await humanPause(1500); // Смотрим на варианты
    
    // ========== ШАГ 4: Переход на "Модель инвестирования" ==========
    console.log('\n📍 ШАГ 4: Переход на Модель инвестирования');
    await clickDropdownLink(page, 'Модель инвестирования');
    await verifyPage(page, '/investment-model.html', 'Модель');
    await fullPageCheck(page, 'Модель инвестирования');
    
    // ========== ШАГ 5: Чтение информации ==========
    console.log('\n📍 ШАГ 5: Чтение информации о модели');
    await readPageContent(page, 3000); // Долго читаем
    
    // ========== ШАГ 6: Возврат на главную ==========
    console.log('\n📍 ШАГ 6: Возврат на главную');
    await goBack(page);
    await verifyPage(page, '/', 'DEXRabbit');
    await humanPause(1000);
    
    // ========== ШАГ 7: Открытие меню снова ==========
    console.log('\n📍 ШАГ 7: Открытие меню снова');
    await openMobileMenu(page);
    await humanPause(800);
    
    // ========== ШАГ 8: Открытие dropdown "Инвестиции" снова ==========
    console.log('\n📍 ШАГ 8: Открытие раздела Инвестиции снова');
    await openDropdown(page, 'Инвестиции');
    await humanPause(1000);
    
    // ========== ШАГ 9: Переход на "Гарантии" ==========
    console.log('\n📍 ШАГ 9: Переход на Гарантии');
    await clickDropdownLink(page, 'Гарантии');
    await verifyPage(page, '/guarantees.html', 'Гарантии');
    await fullPageCheck(page, 'Гарантии');
    
    // ========== ШАГ 10: Чтение гарантий ==========
    console.log('\n📍 ШАГ 10: Изучение гарантий');
    await readPageContent(page, 2500);
    
    // ========== ШАГ 11: Возврат на главную ==========
    console.log('\n📍 ШАГ 11: Возврат на главную');
    await goBack(page);
    await verifyPage(page, '/', 'DEXRabbit');
    await humanPause(1000);
    
    // ========== ШАГ 12: Открытие меню третий раз ==========
    console.log('\n📍 ШАГ 12: Открытие меню третий раз');
    await openMobileMenu(page);
    await humanPause(800);
    
    // ========== ШАГ 13: Открытие dropdown "Инвестиции" третий раз ==========
    console.log('\n📍 ШАГ 13: Открытие раздела Инвестиции третий раз');
    await openDropdown(page, 'Инвестиции');
    await humanPause(1000);
    
    // ========== ШАГ 14: Переход на "Стать инвестором" ==========
    console.log('\n📍 ШАГ 14: Переход на Стать инвестором');
    await clickDropdownLink(page, 'Стать инвестором');
    await verifyPage(page, '/investors.html', 'Инвестор');
    await fullPageCheck(page, 'Стать инвестором');
    
    // ========== ШАГ 15: Чтение информации ==========
    console.log('\n📍 ШАГ 15: Изучение условий для инвесторов');
    await readPageContent(page, 3000);
    
    // ========== ШАГ 16: Проверка ссылки на бот ==========
    console.log('\n📍 ШАГ 16: Проверка ссылки на Telegram бот');
    const botLink = await clickExternalLink(page, 'Открыть бот');
    expect(botLink).toContain('t.me/dexrabbit_bot');
    
    // ========== ФИНАЛ ==========
    console.log('\n✅ ТЕСТ ЗАВЕРШЕН: ПУТЬ ИНВЕСТОРА УСПЕШНО ПРОЙДЕН');
    console.log('📊 Всего шагов: 16');
    console.log('⏱️ Эмуляция реального пользователя завершена\n');
  });
  
  test('Инвестор: быстрый путь (без возвратов)', async ({ page }) => {
    console.log('\n🎯 НАЧАЛО ТЕСТА: БЫСТРЫЙ ПУТЬ ИНВЕСТОРА\n');
    
    // Загрузка главной
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await humanPause(1000);
    
    // Открыть меню → Инвестиции → Модель
    await openMobileMenu(page);
    await openDropdown(page, 'Инвестиции');
    await clickDropdownLink(page, 'Модель инвестирования');
    await fullPageCheck(page, 'Модель (быстрый путь)');
    
    // Сразу на Стать инвестором через nav
    await page.goto('/investors.html');
    await page.waitForLoadState('networkidle');
    await fullPageCheck(page, 'Инвесторы (быстрый путь)');
    
    // Проверка бота
    const botLink = await clickExternalLink(page, 'Открыть бот');
    expect(botLink).toContain('t.me');
    
    console.log('\n✅ БЫСТРЫЙ ПУТЬ ПРОЙДЕН\n');
  });
  
  test('Инвестор: изучение всех разделов', async ({ page }) => {
    console.log('\n🎯 НАЧАЛО ТЕСТА: ПОЛНОЕ ИЗУЧЕНИЕ ИНВЕСТИЦИЙ\n');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await openMobileMenu(page);
    await openDropdown(page, 'Инвестиции');
    
    // Проходим по всем ссылкам в dropdown
    const links = [
      { text: 'Модель инвестирования', url: '/investment-model.html' },
      { text: 'Стать инвестором', url: '/investors.html' },
      { text: 'Гарантии', url: '/guarantees.html' },
      { text: 'Отчёты', url: '/reports.html' }
    ];
    
    for (const link of links) {
      console.log(`\n📄 Изучаем: ${link.text}`);
      
      // Возвращаемся на главную если не первая ссылка
      if (links.indexOf(link) > 0) {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await openMobileMenu(page);
        await openDropdown(page, 'Инвестиции');
      }
      
      await clickDropdownLink(page, link.text);
      await verifyPage(page, link.url);
      await readPageContent(page, 2000);
      await fullPageCheck(page, link.text);
    }
    
    console.log('\n✅ ВСЕ РАЗДЕЛЫ ИНВЕСТИЦИЙ ИЗУЧЕНЫ\n');
  });
});
