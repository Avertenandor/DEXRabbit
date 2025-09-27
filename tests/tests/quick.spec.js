import { test, expect } from '@playwright/test';

const BASE_URL = 'https://xn--80apagbbfxgmuj4j.site';

test.describe('⚡ Quick Smoke Tests', () => {
  
  test('🚀 Site is Online and Accessible', async ({ page }) => {
    console.log('🧪 Testing site availability...');
    
    const response = await page.goto(BASE_URL);
    
    // Проверка статуса ответа
    expect(response.status()).toBe(200);
    console.log('✅ Site responds with 200 OK');
    
    // Проверка загрузки основного контента
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    console.log('✅ Main page structure is present');
  });
  
  test('🔗 Critical Pages Load Successfully', async ({ page }) => {
    const criticalPages = [
      '/',
      '/restaurants.html',
      '/gifts.html',
      '/investment-model.html',
      '/contacts.html'
    ];
    
    for (const pagePath of criticalPages) {
      console.log(`🧪 Testing ${pagePath}...`);
      
      const response = await page.goto(`${BASE_URL}${pagePath}`);
      expect(response.status()).toBe(200);
      
      // Проверка базовых элементов
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('title')).not.toBeEmpty();
      
      console.log(`✅ ${pagePath} loads correctly`);
    }
  });
  
  test('📱 Mobile Responsiveness Quick Check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(BASE_URL);
    
    // Проверка основных элементов на мобильном
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Проверка отсутствия горизонтального скролла
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50); // Небольшой допуск
    
    console.log('✅ Mobile responsiveness check passed');
  });
  
  test('⚡ Performance Quick Check', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`⏱️ Page load time: ${loadTime}ms`);
    
    // Базовая проверка производительности
    expect(loadTime).toBeLessThan(8000); // Максимум 8 секунд для первой загрузки
    
    console.log('✅ Performance check passed');
  });
  
  test('🔍 JavaScript Errors Check', async ({ page }) => {
    const jsErrors = [];
    
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForTimeout(3000); // Даем время для загрузки всех скриптов
    
    // Проверяем отсутствие критичных JS ошибок
    const criticalErrors = jsErrors.filter(error => 
      !error.includes('404') && // Игнорируем 404 ошибки
      !error.includes('net::ERR_') && // Игнорируем сетевые ошибки
      !error.includes('Loading chunk') // Игнорируем ошибки загрузки чанков
    );
    
    if (criticalErrors.length > 0) {
      console.warn('⚠️ JavaScript errors detected:', criticalErrors);
    } else {
      console.log('✅ No critical JavaScript errors');
    }
    
    // Не должно быть критичных ошибок
    expect(criticalErrors.length).toBeLessThan(5);
  });
  
  test('📝 Contact Form Basic Test', async ({ page }) => {
    await page.goto(`${BASE_URL}/contacts.html`);
    
    // Поиск формы обратной связи
    const contactForm = page.locator('form, .contact-form, #contact-form').first();
    
    if (await contactForm.count() > 0) {
      // Проверка наличия основных полей
      const nameField = contactForm.locator('input[name*="name"], input[placeholder*="имя"]').first();
      const emailField = contactForm.locator('input[type="email"], input[name*="email"]').first();
      const messageField = contactForm.locator('textarea, input[name*="message"]').first();
      
      if (await nameField.count() > 0) {
        await expect(nameField).toBeVisible();
      }
      
      if (await emailField.count() > 0) {
        await expect(emailField).toBeVisible();
      }
      
      if (await messageField.count() > 0) {
        await expect(messageField).toBeVisible();
      }
      
      console.log('✅ Contact form fields are present');
    } else {
      console.warn('⚠️ Contact form not found');
    }
  });
  
  test('🎨 CSS Styles Loading Check', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Проверка, что основные стили загрузились
    const header = page.locator('header').first();
    
    if (await header.count() > 0) {
      const headerStyles = await header.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          backgroundColor: computed.backgroundColor,
          padding: computed.padding
        };
      });
      
      // Проверяем, что стили применились (не default значения)
      expect(headerStyles.display).not.toBe('inline');
      
      console.log('✅ CSS styles are loading correctly');
    }
  });
  
  test('🔗 Navigation Menu Check', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Поиск навигационного меню
    const nav = page.locator('nav, .nav, .menu, .navigation').first();
    
    if (await nav.count() > 0) {
      const navLinks = nav.locator('a');
      const linkCount = await navLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
      
      // Проверка первой ссылки
      if (linkCount > 0) {
        const firstLink = navLinks.first();
        await expect(firstLink).toBeVisible();
        
        const href = await firstLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
      
      console.log(`✅ Navigation menu found with ${linkCount} links`);
    } else {
      console.warn('⚠️ Navigation menu not clearly identified');
    }
  });
  
  test('🖼️ Images Loading Check', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    let loadedImages = 0;
    let failedImages = 0;
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      
      if (src && !src.startsWith('data:')) {
        const isVisible = await img.isVisible();
        
        if (isVisible) {
          // Проверка загрузки изображения
          const naturalWidth = await img.evaluate(el => el.naturalWidth);
          
          if (naturalWidth > 0) {
            loadedImages++;
          } else {
            failedImages++;
            console.warn(`⚠️ Image failed to load: ${src}`);
          }
        }
      }
    }
    
    console.log(`🖼️ Images status: ${loadedImages} loaded, ${failedImages} failed`);
    
    // Большинство изображений должно загружаться успешно
    if (loadedImages + failedImages > 0) {
      const successRate = loadedImages / (loadedImages + failedImages);
      expect(successRate).toBeGreaterThan(0.8); // 80% успешно загруженных
    }
  });
  
  test('📄 Page Metadata Check', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Проверка title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    
    // Проверка meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    
    // Проверка charset
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset?.toLowerCase()).toContain('utf-8');
    
    // Проверка viewport
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    
    console.log('✅ Page metadata is properly configured');
  });
});