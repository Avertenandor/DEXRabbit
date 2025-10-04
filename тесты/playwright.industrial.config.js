// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * ПРОМЫШЛЕННАЯ КОНФИГУРАЦИЯ E2E ТЕСТИРОВАНИЯ
 * - Headed mode (видимый браузер)
 * - Медленное выполнение (как реальный пользователь)
 * - Полное логирование
 * - Скриншоты на каждом шаге
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Увеличенные таймауты для headed mode */
  timeout: 120 * 1000, // 2 минуты на тест
  
  /* Последовательное выполнение для наблюдения */
  fullyParallel: false,
  workers: 1, // Один воркер = видим каждый тест
  
  /* Retry при падении */
  retries: 0, // Без retry для промышленных тестов
  
  /* Детальный репортер */
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list'],
    ['junit', { outputFile: 'reports/junit.xml' }]
  ],
  
  /* Общие настройки для ПРОМЫШЛЕННОГО тестирования */
  use: {
    /* Базовый URL */
    baseURL: 'https://xn--80apagbbfxgmuj4j.site',
    
    /* HEADED MODE - видимый браузер */
    headless: false,
    
    /* Медленное выполнение для наблюдения */
    slowMo: 500, // 500ms задержка между действиями
    
    /* Скриншоты на КАЖДОМ шаге */
    screenshot: 'on',
    
    /* Видео ВСЕГДА */
    video: 'on',
    
    /* Trace ВСЕГДА */
    trace: 'on',
    
    /* Увеличенные таймауты */
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    
    /* Viewport мобильный */
    viewport: { width: 390, height: 844 },
    
    /* User Agent мобильный */
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
    
    /* Touch events */
    hasTouch: true,
    isMobile: true,
    
    /* Дополнительные настройки для реализма */
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    
    /* Контекстные опции */
    contextOptions: {
      recordVideo: {
        dir: 'reports/videos/',
        size: { width: 390, height: 844 }
      }
    }
  },

  /* Проекты для разных устройств */
  projects: [
    {
      name: 'iphone-12-industrial',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
        // Дополнительные настройки для промышленного тестирования
        launchOptions: {
          slowMo: 500, // Медленное выполнение
          devtools: true // Открыть DevTools
        }
      },
    },
    
    {
      name: 'iphone-14-pro-max-industrial',
      use: { 
        ...devices['iPhone 14 Pro Max'],
        viewport: { width: 430, height: 932 },
        launchOptions: {
          slowMo: 500,
          devtools: true
        }
      },
    },
    
    {
      name: 'samsung-galaxy-s21-industrial',
      use: {
        viewport: { width: 360, height: 800 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36',
        deviceScaleFactor: 2.75,
        isMobile: true,
        hasTouch: true,
        launchOptions: {
          slowMo: 500,
          devtools: true
        }
      },
    },
  ],
  
  /* Веб-сервер для локального тестирования (опционально) */
  webServer: undefined,
});
