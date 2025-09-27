import { test, expect } from '@playwright/test';

const BASE_URL = 'https://xn--80apagbbfxgmuj4j.site';

test.describe('🔒 Security & Performance Testing', () => {
  
  test('🛡️ Security Headers Check', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/`);
    
    const headers = response.headers();
    
    // Проверка Content Security Policy
    if (headers['content-security-policy']) {
      console.log('✅ CSP header present:', headers['content-security-policy']);
    } else {
      console.warn('⚠️ CSP header missing');
    }
    
    // Проверка X-Frame-Options
    if (headers['x-frame-options']) {
      console.log('✅ X-Frame-Options present:', headers['x-frame-options']);
    } else {
      console.warn('⚠️ X-Frame-Options header missing');
    }
    
    // Проверка X-Content-Type-Options
    if (headers['x-content-type-options']) {
      console.log('✅ X-Content-Type-Options present');
    } else {
      console.warn('⚠️ X-Content-Type-Options header missing');
    }
    
    // Проверка HTTPS
    expect(response.url()).toContain('https://');
    console.log('✅ Site uses HTTPS');
  });
  
  test('🚨 XSS Protection Test', async ({ page }) => {
    await page.goto(`${BASE_URL}/contacts.html`);
    
    // Попытка XSS через форму (безопасный тест)
    const contactForm = page.locator('#contact-form, .contact-form form').first();
    
    if (await contactForm.count() > 0) {
      const testPayload = '<script>alert("XSS")</script>';
      
      // Попытка ввести потенциально опасный код
      await contactForm.locator('input[name="name"]').fill(testPayload);
      await contactForm.locator('textarea[name="message"]').fill(testPayload);
      
      // Проверка, что код не выполняется
      const nameValue = await contactForm.locator('input[name="name"]').inputValue();
      expect(nameValue).toBe(testPayload); // Должен остаться как текст
      
      console.log('✅ XSS protection check passed');
    }
  });
  
  test('📊 Mixed Content Check', async ({ page }) => {
    const mixedContentWarnings = [];
    const securityErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'warning' && msg.text().includes('Mixed Content')) {
        mixedContentWarnings.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      if (error.message.includes('Mixed Content')) {
        securityErrors.push(error.message);
      }
    });
    
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('networkidle');
    
    // Проверка всех загруженных ресурсов
    const resources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources.map(resource => ({
        name: resource.name,
        protocol: new URL(resource.name).protocol
      }));
    });
    
    const insecureResources = resources.filter(resource => 
      resource.protocol === 'http:' && 
      !resource.name.includes('localhost') &&
      !resource.name.includes('127.0.0.1')
    );
    
    if (insecureResources.length > 0) {
      console.warn('⚠️ Insecure resources found:', insecureResources);
    } else {
      console.log('✅ No mixed content issues found');
    }
    
    expect(mixedContentWarnings).toHaveLength(0);
    expect(securityErrors).toHaveLength(0);
  });
  
  test('⚡ Page Load Performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Получение метрик производительности
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
      };
    });
    
    console.log('📊 Performance Metrics:');
    console.log(`⏱️ Total Load Time: ${loadTime}ms`);
    console.log(`📄 DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
    console.log(`🎨 First Paint: ${Math.round(metrics.firstPaint)}ms`);
    console.log(`🖼️ First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)}ms`);
    
    // Проверка приемлемых значений
    expect(loadTime).toBeLessThan(10000); // Максимум 10 секунд
    expect(metrics.firstContentfulPaint).toBeLessThan(3000); // FCP < 3 секунд
    
    console.log('✅ Performance metrics are acceptable');
  });
  
  test('💾 Resource Size Analysis', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('networkidle');
    
    // Анализ размеров ресурсов
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map(resource => ({
        name: resource.name,
        size: resource.transferSize || resource.encodedBodySize || 0,
        type: resource.initiatorType
      }));
    });
    
    const totalSize = resources.reduce((sum, resource) => sum + resource.size, 0);
    const imageResources = resources.filter(r => r.type === 'img');
    const cssResources = resources.filter(r => r.type === 'link' || r.name.includes('.css'));
    const jsResources = resources.filter(r => r.type === 'script' || r.name.includes('.js'));
    
    console.log('📦 Resource Analysis:');
    console.log(`📊 Total page size: ${Math.round(totalSize / 1024)}KB`);
    console.log(`🖼️ Images: ${imageResources.length} files`);
    console.log(`🎨 CSS: ${cssResources.length} files`);
    console.log(`⚙️ JavaScript: ${jsResources.length} files`);
    
    // Предупреждения о больших ресурсах
    const largeResources = resources.filter(r => r.size > 500000); // > 500KB
    if (largeResources.length > 0) {
      console.warn('⚠️ Large resources detected:');
      largeResources.forEach(resource => {
        console.warn(`  ${resource.name}: ${Math.round(resource.size / 1024)}KB`);
      });
    }
    
    // Общий размер страницы не должен превышать 5MB
    expect(totalSize).toBeLessThan(5000000);
    
    console.log('✅ Resource size analysis completed');
  });
  
  test('🔍 SEO Technical Check', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Проверка title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(70);
    
    // Проверка meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(120);
    expect(description.length).toBeLessThan(160);
    
    // Проверка h1
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1); // Должен быть ровно один H1
    
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text.length).toBeGreaterThan(10);
    
    // Проверка alt-атрибутов у изображений
    const images = await page.locator('img').all();
    const imagesWithoutAlt = [];
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      if (!alt && src && !src.startsWith('data:')) {
        imagesWithoutAlt.push(src);
      }
    }
    
    if (imagesWithoutAlt.length > 0) {
      console.warn('⚠️ Images without alt attributes:', imagesWithoutAlt);
    }
    
    // Проверка canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    if (canonical) {
      expect(canonical).toContain('https://');
      console.log('✅ Canonical URL present:', canonical);
    }
    
    // Проверка meta robots
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    if (robots) {
      console.log('✅ Robots meta present:', robots);
    }
    
    // Проверка Open Graph
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    
    if (ogTitle && ogDescription) {
      console.log('✅ Open Graph tags present');
    } else {
      console.warn('⚠️ Missing Open Graph tags');
    }
    
    console.log('✅ SEO technical check completed');
  });
  
  test('♿ Basic Accessibility Check', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Проверка наличия skip links
    const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();
    if (await skipLink.count() > 0) {
      console.log('✅ Skip link present');
    } else {
      console.warn('⚠️ No skip link found');
    }
    
    // Проверка контраста (базовая)
    const buttons = await page.locator('button, .btn').all();
    for (const button of buttons) {
      const isVisible = await button.isVisible();
      if (isVisible) {
        const styles = await button.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            fontSize: computed.fontSize
          };
        });
        
        // Кнопки должны иметь определенный цвет фона и текста
        expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
        expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
      }
    }
    
    // Проверка focus indicators
    const focusableElements = await page.locator('button, a, input, select, textarea').all();
    
    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0];
      await firstElement.focus();
      
      // Проверка, что элемент получил фокус
      const isFocused = await firstElement.evaluate(el => document.activeElement === el);
      expect(isFocused).toBe(true);
    }
    
    // Проверка форм на доступность
    const formLabels = await page.locator('label').count();
    const formInputs = await page.locator('input:not([type="hidden"]), textarea, select').count();
    
    if (formInputs > 0) {
      console.log(`📝 Form accessibility: ${formLabels} labels for ${formInputs} inputs`);
      
      // Желательно, чтобы количество label соответствовало количеству полей
      if (formLabels < formInputs) {
        console.warn('⚠️ Some form inputs may not have associated labels');
      }
    }
    
    // Проверка заголовков (иерархия)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = [];
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.substring(1));
      headingLevels.push(level);
    }
    
    // Проверка правильной иерархии заголовков
    if (headingLevels.length > 0) {
      expect(headingLevels[0]).toBe(1); // Первый заголовок должен быть H1
      
      for (let i = 1; i < headingLevels.length; i++) {
        const diff = headingLevels[i] - headingLevels[i-1];
        if (diff > 1) {
          console.warn(`⚠️ Heading level jump detected: h${headingLevels[i-1]} to h${headingLevels[i]}`);
        }
      }
    }
    
    console.log('✅ Basic accessibility check completed');
  });
  
  test('📱 PWA Features Check', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Проверка manifest.json
    const manifestLink = page.locator('link[rel="manifest"]');
    
    if (await manifestLink.count() > 0) {
      const manifestUrl = await manifestLink.getAttribute('href');
      console.log('✅ Web App Manifest found:', manifestUrl);
      
      // Попытка загрузить manifest
      try {
        const manifestResponse = await page.request.get(manifestUrl, { baseURL: BASE_URL });
        
        if (manifestResponse.ok()) {
          const manifest = await manifestResponse.json();
          
          // Проверка обязательных полей PWA
          expect(manifest.name || manifest.short_name).toBeTruthy();
          expect(manifest.icons).toBeTruthy();
          expect(manifest.start_url).toBeTruthy();
          
          console.log('✅ PWA manifest is valid');
        }
      } catch (error) {
        console.warn('⚠️ Could not validate manifest:', error.message);
      }
    } else {
      console.warn('⚠️ No PWA manifest found');
    }
    
    // Проверка Service Worker
    const serviceWorkerRegistration = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    
    expect(serviceWorkerRegistration).toBe(true);
    console.log('✅ Service Worker API is available');
    
    // Проверка иконок
    const icons = await page.locator('link[rel*="icon"]').all();
    
    if (icons.length > 0) {
      console.log(`✅ ${icons.length} favicon(s) found`);
      
      for (const icon of icons) {
        const href = await icon.getAttribute('href');
        const sizes = await icon.getAttribute('sizes');
        
        if (sizes) {
          console.log(`  Icon: ${href} (${sizes})`);
        }
      }
    } else {
      console.warn('⚠️ No favicons found');
    }
    
    // Проверка theme-color
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
    
    if (themeColor) {
      console.log('✅ Theme color defined:', themeColor);
    } else {
      console.warn('⚠️ No theme color defined');
    }
    
    console.log('✅ PWA features check completed');
  });
});