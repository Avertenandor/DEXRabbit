const { test, expect } = require('@playwright/test');

test.describe('Консоль браузера - Проверка ошибок', () => {
  
  test('Отсутствуют JavaScript ошибки', async ({ page }) => {
    const errors = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('JavaScript ошибок:', errors.length);
    errors.forEach(err => console.error('❌ Ошибка:', err));
    
    expect(errors).toHaveLength(0);
  });

  test('Отсутствуют 404 ошибки ресурсов', async ({ page }) => {
    const failed = [];
    
    page.on('response', response => {
      if (response.status() === 404) {
        failed.push(response.url());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('404 ошибок:', failed.length);
    failed.forEach(url => console.error('❌ 404:', url));
    
    expect(failed).toHaveLength(0);
  });

  test('DEBUG логи присутствуют', async ({ page }) => {
    const debugLogs = [];
    
    page.on('console', msg => {
      if (msg.text().includes('DEBUG')) {
        debugLogs.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    console.log('DEBUG логов:', debugLogs.length);
    debugLogs.forEach(log => console.log('📊', log));
    
    expect(debugLogs.length).toBeGreaterThan(0);
  });
});
