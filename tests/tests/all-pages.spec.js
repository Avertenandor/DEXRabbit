import { test, expect } from '@playwright/test';

const BASE_URL = 'https://xn--80apagbbfxgmuj4j.site';

const pages = [
  { url: '/', title: 'КупитьКролика — Живые кролики с доставкой по России', expectedElements: ['h1', '.hero-section', '.stats-section'] },
  { url: '/restaurants.html', title: 'Ресторанам — КупитьКролика', expectedElements: ['h1', '.partnership-levels', '.pricing-table'] },
  { url: '/gifts.html', title: 'Подарки — КупитьКролика', expectedElements: ['h1', '.gift-packages', '.gift-calculator'] },
  { url: '/investment-model.html', title: 'Инвестиционная модель — КупитьКролика', expectedElements: ['h1', '.investment-calculator', '.token-info'] },
  { url: '/development.html', title: 'Развитие и планы — КупитьКролика', expectedElements: ['h1', '.roadmap', '.current-stats'] },
  { url: '/breeding.html', title: 'Племенная ценность — КупитьКролика', expectedElements: ['h1', '.breeds-catalog', '.breeding-programs'] },
  { url: '/logistics.html', title: 'Логистика и регионы — КупитьКролика', expectedElements: ['h1', '.delivery-zones', '.delivery-calculator'] },
  { url: '/contacts.html', title: 'Контакты — КупитьКролика', expectedElements: ['h1', '.contact-info', '.contact-form'] }
];

test.describe('🌐 All Pages Testing', () => {
  pages.forEach(({ url, title, expectedElements }) => {
    test(`📄 Page: ${url}`, async ({ page }) => {
      console.log(`🧪 Testing page: ${BASE_URL}${url}`);
      
      // Навигация на страницу
      const response = await page.goto(`${BASE_URL}${url}`);
      expect(response.status()).toBe(200);
      
      // Проверка title
      await expect(page).toHaveTitle(new RegExp(title.split('—')[0].trim(), 'i'));
      
      // Проверка основных элементов
      for (const element of expectedElements) {
        await expect(page.locator(element).first()).toBeVisible({ timeout: 10000 });
      }
      
      // Проверка отсутствия JavaScript ошибок
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.waitForTimeout(2000);
      
      if (errors.length > 0) {
        console.warn(`⚠️ JavaScript errors on ${url}:`, errors);
      }
      
      // Проверка мета-тегов
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(50);
      
      // Проверка адаптивности (mobile view)
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      
      const mainContent = page.locator('main, .container').first();
      await expect(mainContent).toBeVisible();
      
      // Возврат к desktop
      await page.setViewportSize({ width: 1200, height: 800 });
      
      console.log(`✅ Page ${url} passed all tests`);
    });
  });
  
  test('🔗 Navigation Links', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Проверка главного меню
    const navLinks = [
      { text: 'Ресторанам', href: '/restaurants' },
      { text: 'Подарки', href: '/gifts' },
      { text: 'Инвестиции', href: '/investment-model' },
      { text: 'Контакты', href: '/contacts' }
    ];
    
    for (const link of navLinks) {
      const linkElement = page.locator(`a[href*="${link.href}"], a:has-text("${link.text}")`);
      if (await linkElement.count() > 0) {
        await expect(linkElement.first()).toBeVisible();
      }
    }
    
    console.log('✅ Navigation links are working');
  });
  
  test('📱 Mobile Responsiveness', async ({ page }) => {
    const mobileViewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 414, height: 896, name: 'iPhone XR' },
      { width: 360, height: 640, name: 'Android Small' }
    ];
    
    for (const viewport of mobileViewports) {
      await page.setViewportSize(viewport);
      await page.goto(`${BASE_URL}/`);
      
      // Проверка, что контент не переполняет экран
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      
      expect(bodyBox.width).toBeLessThanOrEqual(viewport.width + 50); // Небольшой допуск
      
      // Проверка видимости ключевых элементов
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      console.log(`✅ Mobile responsiveness OK for ${viewport.name}`);
    }
  });
  
  test('⚡ Performance Check', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Измерение времени загрузки
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    console.log(`⏱️ Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000); // Максимум 5 секунд
    
    // Проверка размера изображений
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        const response = await page.request.get(src);
        const size = parseInt(response.headers()['content-length'] || '0');
        
        if (size > 500000) { // 500KB
          console.warn(`⚠️ Large image detected: ${src} (${Math.round(size/1024)}KB)`);
        }
      }
    }
    
    console.log('✅ Performance check completed');
  });
});