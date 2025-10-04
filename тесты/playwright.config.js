// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Максимальное время для одного теста */
  timeout: 30 * 1000,
  
  /* Параллельное выполнение тестов */
  fullyParallel: true,
  
  /* Retry при падении */
  retries: process.env.CI ? 2 : 0,
  
  /* Количество параллельных воркеров */
  workers: process.env.CI ? 1 : undefined,
  
  /* Репортер */
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list']
  ],
  
  /* Общие настройки для всех тестов */
  use: {
    /* Базовый URL */
    baseURL: 'https://xn--80apagbbfxgmuj4j.site',
    
    /* Скриншоты при падении */
    screenshot: 'only-on-failure',
    
    /* Видео при падении */
    video: 'retain-on-failure',
    
    /* Trace при падении */
    trace: 'on-first-retry',
    
    /* Timeout для actions */
    actionTimeout: 10 * 1000,
    
    /* Timeout для navigation */
    navigationTimeout: 15 * 1000,
  },

  /* Конфигурация для разных браузеров и устройств */
  projects: [
    /* Desktop браузеры для сравнения */
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },

    /* iPhone устройства */
    {
      name: 'iphone-12',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'iphone-14-pro-max',
      use: { 
        ...devices['iPhone 14 Pro Max'],
        viewport: { width: 430, height: 932 },
      },
    },

    /* Samsung Galaxy */
    {
      name: 'galaxy-s21',
      use: {
        ...devices['Galaxy S9+'],
        viewport: { width: 360, height: 800 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36',
      },
    },

    /* Google Pixel */
    {
      name: 'pixel-5',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
      },
    },

    /* Складной телефон (Galaxy Fold) */
    {
      name: 'galaxy-fold',
      use: {
        viewport: { width: 280, height: 653 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-F916B) AppleWebKit/537.36',
      },
    },

    /* Планшеты */
    {
      name: 'ipad-mini',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 },
      },
    },

    /* Landscape ориентация */
    {
      name: 'iphone-12-landscape',
      use: {
        ...devices['iPhone 12 landscape'],
        viewport: { width: 844, height: 390 },
      },
    },
  ],
});
