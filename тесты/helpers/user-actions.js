/**
 * ПРОМЫШЛЕННЫЕ HELPERS ДЛЯ E2E ТЕСТИРОВАНИЯ
 * Эмулируют поведение реального пользователя
 */

const { expect } = require('@playwright/test');

/**
 * Пауза как у реального пользователя (чтение, размышление)
 */
async function humanPause(ms = 1000) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Скролл как реальный пользователь (постепенный)
 */
async function humanScroll(page, direction = 'down', distance = 300) {
  const scrollSteps = 5;
  const stepDistance = distance / scrollSteps;
  
  for (let i = 0; i < scrollSteps; i++) {
    await page.evaluate((step) => {
      window.scrollBy({
        top: step,
        behavior: 'smooth'
      });
    }, direction === 'down' ? stepDistance : -stepDistance);
    await humanPause(200);
  }
}

/**
 * Открыть мобильное меню с проверками
 */
async function openMobileMenu(page) {
  console.log('📱 Открываем мобильное меню...');
  
  const mobileToggle = page.locator('.nav-beautiful__mobile-toggle');
  
  // Проверяем что кнопка видна
  await expect(mobileToggle).toBeVisible();
  
  // Клик
  await mobileToggle.click();
  
  // Ждем анимацию
  await humanPause(800);
  
  // Проверяем что меню открылось
  const menu = page.locator('.nav-beautiful__menu');
  await expect(menu).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)'); // translateX(0)
  
  console.log('✅ Мобильное меню открыто');
}

/**
 * Открыть dropdown в меню
 */
async function openDropdown(page, dropdownName) {
  console.log(`📂 Открываем dropdown: ${dropdownName}...`);
  
  // Находим кнопку по тексту
  const button = page.locator('.nav-beautiful__btn', { hasText: dropdownName });
  
  // Проверяем видимость
  await expect(button).toBeVisible();
  
  // Клик
  await button.click();
  
  // Ждем анимацию
  await humanPause(500);
  
  // Проверяем что dropdown открылся
  const wrapper = button.locator('xpath=..');
  const hasOpen = await wrapper.evaluate(el => el.classList.contains('open'));
  
  if (!hasOpen) {
    throw new Error(`Dropdown "${dropdownName}" не открылся!`);
  }
  
  console.log(`✅ Dropdown "${dropdownName}" открыт`);
}

/**
 * Кликнуть на ссылку в dropdown
 */
async function clickDropdownLink(page, linkText) {
  console.log(`🔗 Кликаем на ссылку: ${linkText}...`);
  
  const link = page.locator('.nav-beautiful__dropdown-item', { hasText: linkText });
  
  // Проверяем видимость
  await expect(link).toBeVisible();
  
  // Небольшая пауза (чтение)
  await humanPause(500);
  
  // Клик
  await link.click();
  
  // Ждем навигацию
  await page.waitForLoadState('networkidle');
  
  console.log(`✅ Перешли на: ${linkText}`);
}

/**
 * Проверить что мы на правильной странице
 */
async function verifyPage(page, expectedUrl, expectedTitle) {
  console.log(`🔍 Проверяем страницу: ${expectedUrl}...`);
  
  // Проверяем URL
  await expect(page).toHaveURL(new RegExp(expectedUrl));
  
  // Проверяем title
  if (expectedTitle) {
    await expect(page).toHaveTitle(new RegExp(expectedTitle));
  }
  
  // Проверяем что страница загрузилась
  await expect(page.locator('body')).toBeVisible();
  
  console.log(`✅ Страница корректна: ${expectedUrl}`);
}

/**
 * Прокрутить страницу и "прочитать" контент
 */
async function readPageContent(page, pauseMs = 2000) {
  console.log('📖 Читаем контент страницы...');
  
  // Прокрутить вниз
  await humanScroll(page, 'down', 500);
  await humanPause(pauseMs);
  
  // Прокрутить еще
  await humanScroll(page, 'down', 500);
  await humanPause(pauseMs);
  
  // Вернуться наверх
  await humanScroll(page, 'up', 300);
  await humanPause(1000);
  
  console.log('✅ Контент прочитан');
}

/**
 * Вернуться назад
 */
async function goBack(page) {
  console.log('◀️ Возвращаемся назад...');
  
  await page.goBack();
  await page.waitForLoadState('networkidle');
  await humanPause(800);
  
  console.log('✅ Вернулись назад');
}

/**
 * Сделать скриншот с именем
 */
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `screenshots/${name}-${timestamp}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`📸 Скриншот: ${filename}`);
}

/**
 * Проверить отсутствие ошибок в консоли
 */
async function checkConsoleErrors(page) {
  const errors = [];
  
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  return errors;
}

/**
 * Открыть внешнюю ссылку (Telegram бот)
 */
async function clickExternalLink(page, linkText) {
  console.log(`🌐 Проверяем внешнюю ссылку: ${linkText}...`);
  
  const link = page.locator('a', { hasText: linkText });
  
  // Проверяем наличие
  await expect(link).toBeVisible();
  
  // Получаем href
  const href = await link.getAttribute('href');
  console.log(`✅ Ссылка корректна: ${href}`);
  
  // Не кликаем (не хотим открывать Telegram), просто проверяем
  expect(href).toContain('t.me');
  
  return href;
}

/**
 * Проверить все основные элементы страницы
 */
async function verifyPageElements(page) {
  console.log('🔍 Проверяем основные элементы страницы...');
  
  // Навигация
  await expect(page.locator('.nav-beautiful')).toBeVisible();
  
  // Footer (если есть)
  const footer = page.locator('footer');
  if (await footer.count() > 0) {
    await expect(footer).toBeVisible();
  }
  
  console.log('✅ Основные элементы на месте');
}

/**
 * Комплексная проверка страницы
 */
async function fullPageCheck(page, pageName) {
  console.log(`\n========== ПРОВЕРКА СТРАНИЦЫ: ${pageName} ==========`);
  
  // Элементы
  await verifyPageElements(page);
  
  // Ошибки в консоли
  const errors = await checkConsoleErrors(page);
  if (errors.length > 0) {
    console.warn(`⚠️ Найдены ошибки в консоли: ${errors.length}`);
    errors.forEach(err => console.error(`  ❌ ${err}`));
  }
  
  // Скриншот
  await takeScreenshot(page, pageName.toLowerCase().replace(/\s/g, '-'));
  
  console.log(`========== ПРОВЕРКА ЗАВЕРШЕНА: ${pageName} ==========\n`);
}

module.exports = {
  humanPause,
  humanScroll,
  openMobileMenu,
  openDropdown,
  clickDropdownLink,
  verifyPage,
  readPageContent,
  goBack,
  takeScreenshot,
  checkConsoleErrors,
  clickExternalLink,
  verifyPageElements,
  fullPageCheck
};
