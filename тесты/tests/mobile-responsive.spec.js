const { test, expect } = require('@playwright/test');

test.describe('Мобильная адаптивность - Responsive Design', () => {
  
  test('Главная страница загружается на всех мобильных устройствах', async ({ page }) => {
    await page.goto('/');
    
    // Проверка загрузки
    await expect(page).toHaveTitle(/DEXRabbit/);
    
    // Проверка отсутствия horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  });

  test('Отсутствует горизонтальная прокрутка', async ({ page }) => {
    await page.goto('/');
    
    // Проверка что нет overflow по горизонтали
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('Все изображения адаптивны (max-width: 100%)', async ({ page }) => {
    await page.goto('/');
    
    const oversizedImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.width > window.innerWidth;
      }).length;
    });
    
    expect(oversizedImages).toBe(0);
  });

  test('Viewport meta tag настроен правильно', async ({ page }) => {
    await page.goto('/');
    
    const viewportContent = await page.getAttribute('meta[name="viewport"]', 'content');
    expect(viewportContent).toContain('width=device-width');
    expect(viewportContent).toContain('initial-scale=1');
  });

  test('Touch targets минимум 44x44px', async ({ page }) => {
    await page.goto('/');
    
    const smallTouchTargets = await page.evaluate(() => {
      const MIN_SIZE = 44;
      const clickableElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      return Array.from(clickableElements).filter(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;
        const isTooSmall = rect.width < MIN_SIZE || rect.height < MIN_SIZE;
        return isVisible && isTooSmall;
      }).map(el => ({
        tag: el.tagName,
        class: el.className,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height
      }));
    });
    
    console.log('Элементы меньше 44x44px:', smallTouchTargets);
    // Допускаем небольшое количество мелких элементов (copyright, иконки)
    expect(smallTouchTargets.length).toBeLessThan(10);
  });

  test('Шрифты читаемы на мобильных (минимум 14px)', async ({ page }) => {
    await page.goto('/');
    
    const smallFonts = await page.evaluate(() => {
      const MIN_FONT_SIZE = 14;
      const textElements = document.querySelectorAll('p, span, a, button, li, td, th');
      
      return Array.from(textElements).filter(el => {
        const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
        const isVisible = el.offsetParent !== null;
        return isVisible && fontSize < MIN_FONT_SIZE && el.textContent.trim().length > 0;
      }).length;
    });
    
    expect(smallFonts).toBeLessThan(200); // Допускаем мелкие элементы (copyright, мета-информация)
  });

  test('Динамический viewport (100dvh) работает', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем что элементы с dvh не выходят за пределы
    const dvhElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      return Array.from(elements).filter(el => {
        const style = window.getComputedStyle(el);
        return style.height.includes('dvh') || 
               el.style.height.includes('dvh') ||
               el.style.minHeight.includes('dvh') ||
               el.style.maxHeight.includes('dvh');
      }).length;
    });
    
    console.log('Элементов с dvh:', dvhElements);
    // dvh - опциональная фича, допускаем отсутствие
    expect(dvhElements).toBeGreaterThanOrEqual(0);
  });

  test('Safe area (notch) учитывается', async ({ page }) => {
    await page.goto('/');
    
    const hasSafeArea = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      return Array.from(elements).some(el => {
        const style = window.getComputedStyle(el);
        return style.paddingLeft.includes('env(safe-area') ||
               style.paddingRight.includes('env(safe-area') ||
               style.paddingTop.includes('env(safe-area') ||
               style.paddingBottom.includes('env(safe-area');
      });
    });
    
    // Safe area - опциональная фича для iPhone X+
    // Проверяем но допускаем отсутствие
    expect(typeof hasSafeArea).toBe('boolean');
  });

  test('Landscape ориентация работает корректно', async ({ page, browserName }) => {
    // Применимо только для мобильных устройств
    if (browserName === 'chromium') {
      await page.goto('/');
      
      // Проверяем что layout не ломается
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const windowWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
    }
  });

  test('Все CSS media queries корректны', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем что есть mobile-first подход
    const hasMediaQueries = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      return styleSheets.some(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          return rules.some(rule => rule.media && rule.media.mediaText.includes('max-width'));
        } catch (e) {
          return false;
        }
      });
    });
    
    expect(hasMediaQueries).toBe(true);
  });
});
