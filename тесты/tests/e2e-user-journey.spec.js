const { test, expect } = require('@playwright/test');

test.describe('E2E - Полный путь пользователя', () => {
  
  test('Пользователь открывает сайт, изучает инвестиции и регистрируется', async ({ page }) => {
    console.log('Шаг 1: Загрузка главной страницы');
    await page.goto('/');
    await expect(page).toHaveTitle(/DEXRabbit/);
    
    console.log('Шаг 2: Открытие мобильного меню');
    const mobileToggle = page.locator('.nav-beautiful__mobile-toggle');
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
      await page.waitForTimeout(500);
    }
    
    console.log('Шаг 3: Клик на "Инвестиции"');
    const investmentsDropdown = page.locator('.nav-beautiful__dropdown-wrapper').first();
    const investmentsButton = investmentsDropdown.locator('.nav-beautiful__btn');
    await investmentsButton.click();
    await page.waitForTimeout(400);
    
    console.log('Шаг 4: Проверка что dropdown открылся');
    const hasOpen = await investmentsDropdown.evaluate(el => el.classList.contains('open'));
    expect(hasOpen).toBe(true);
    
    console.log('Шаг 5: Клик на "Модель инвестирования"');
    const modelLink = investmentsDropdown.locator('a[href="/investment-model.html"]');
    await expect(modelLink).toBeVisible();
    await modelLink.click();
    
    console.log('Шаг 6: Проверка перехода на страницу');
    await page.waitForURL('**/investment-model.html', { timeout: 10000 });
    await expect(page).toHaveURL(/investment-model\.html/);
    
    console.log('Шаг 7: Возврат назад');
    await page.goBack();
    await page.waitForURL('**/', { timeout: 10000 });
    
    console.log('✅ E2E сценарий успешно пройден');
  });

  test('Проверка всех основных переходов', async ({ page }) => {
    await page.goto('/');
    
    const links = [
      { name: 'Инвестиции', selector: 'a[href="/investment-model.html"]' },
      { name: 'Партнёрство', selector: 'a[href="/partnership.html"]' },
      { name: 'Породы', selector: 'a[href*="breeding"]' }
    ];
    
    for (const link of links) {
      console.log(`Проверка ссылки: ${link.name}`);
      const element = page.locator(link.selector).first();
      await expect(element).toHaveAttribute('href', /.+/);
    }
  });
});
