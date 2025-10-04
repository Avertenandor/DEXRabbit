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
 * ПРОМЫШЛЕННЫЙ ТЕСТ: ПУТЬ ПОКУПАТЕЛЯ КРОЛИКОВ
 * 
 * Сценарий:
 * 1. Заходит на сайт, интересуется покупкой
 * 2. Изучает услуги: Покупка кроликов
 * 3. Смотрит доступные породы
 * 4. Читает об уходе за кроликами
 * 5. Проверяет доставку
 * 6. Связывается через бот
 */

test.describe('ПРОМЫШЛЕННЫЙ ТЕСТ: Путь Покупателя', () => {
  
  test('Покупатель: от интереса до покупки', async ({ page }) => {
    console.log('\n🐰 НАЧАЛО ТЕСТА: ПУТЬ ПОКУПАТЕЛЯ КРОЛИКОВ\n');
    
    // ========== ШАГ 1: Главная страница ==========
    console.log('📍 ШАГ 1: Загрузка главной, осмотр');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await fullPageCheck(page, 'Главная (Покупатель)');
    await humanPause(2000);
    
    // ========== ШАГ 2: Меню → Услуги ==========
    console.log('\n📍 ШАГ 2: Открытие раздела Услуги');
    await openMobileMenu(page);
    await openDropdown(page, 'Услуги');
    await humanPause(1500);
    
    // ========== ШАГ 3: Покупка кроликов ==========
    console.log('\n📍 ШАГ 3: Переход на Покупка кроликов');
    await clickDropdownLink(page, 'Покупка кроликов');
    await verifyPage(page, '/my-rabbit-breeder.html');
    await fullPageCheck(page, 'Покупка кроликов');
    await readPageContent(page, 3000);
    
    // ========== ШАГ 4: Возврат, изучение пород ==========
    console.log('\n📍 ШАГ 4: Возврат и изучение пород');
    await goBack(page);
    await humanPause(1000);
    await openMobileMenu(page);
    await openDropdown(page, 'Породы');
    await humanPause(1500);
    
    // ========== ШАГ 5: Племенная ценность ==========
    console.log('\n📍 ШАГ 5: Изучение Племенной ценности');
    await clickDropdownLink(page, 'Племенная ценность');
    await verifyPage(page, '/breeding-value.html');
    await fullPageCheck(page, 'Племенная ценность');
    await readPageContent(page, 2500);
    
    // ========== ШАГ 6: Кролики vs Зайцы ==========
    console.log('\n📍 ШАГ 6: Кролики vs Зайцы');
    await goBack(page);
    await openMobileMenu(page);
    await openDropdown(page, 'Породы');
    await clickDropdownLink(page, 'Кролики vs Зайцы');
    await verifyPage(page, '/rabbits-hares.html');
    await fullPageCheck(page, 'Кролики vs Зайцы');
    await readPageContent(page, 2000);
    
    // ========== ШАГ 7: Уход ==========
    console.log('\n📍 ШАГ 7: Изучение ухода за кроликами');
    await goBack(page);
    await openMobileMenu(page);
    await openDropdown(page, 'Породы');
    await clickDropdownLink(page, 'Уход');
    await verifyPage(page, '/care.html');
    await fullPageCheck(page, 'Уход');
    await readPageContent(page, 3000); // Долго читаем про уход
    
    // ========== ШАГ 8: Доставка ==========
    console.log('\n📍 ШАГ 8: Проверка доставки');
    await goBack(page);
    await openMobileMenu(page);
    await openDropdown(page, 'Услуги');
    await clickDropdownLink(page, 'Доставка');
    await verifyPage(page, '/logistics.html');
    await fullPageCheck(page, 'Доставка');
    await readPageContent(page, 2500);
    
    // ========== ШАГ 9: Контакт через бот ==========
    console.log('\n📍 ШАГ 9: Связь через Telegram бот');
    const botLink = await clickExternalLink(page, 'Открыть бот');
    expect(botLink).toContain('t.me');
    
    console.log('\n✅ ПУТЬ ПОКУПАТЕЛЯ ЗАВЕРШЕН');
    console.log('📊 Пользователь готов к покупке!');
  });
  
  test('Покупатель: сравнение пород', async ({ page }) => {
    console.log('\n🐰 ТЕСТ: СРАВНЕНИЕ ВСЕХ ПОРОД\n');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await humanPause(1000);
    
    await openMobileMenu(page);
    await openDropdown(page, 'Породы');
    
    const breedPages = [
      { text: 'Племенная ценность', url: '/breeding-value.html' },
      { text: 'Кролики vs Зайцы', url: '/rabbits-hares.html' },
      { text: 'Кролики vs Коты', url: '/cats-rabbits.html' },
      { text: 'Уход', url: '/care.html' }
    ];
    
    for (const breed of breedPages) {
      console.log(`\n🐇 Изучаем: ${breed.text}`);
      
      if (breedPages.indexOf(breed) > 0) {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await openMobileMenu(page);
        await openDropdown(page, 'Породы');
      }
      
      await clickDropdownLink(page, breed.text);
      await verifyPage(page, breed.url);
      await readPageContent(page, 2000);
      await fullPageCheck(page, breed.text);
    }
    
    console.log('\n✅ ВСЕ ПОРОДЫ ИЗУЧЕНЫ');
  });
});
