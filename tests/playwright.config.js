import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['list']
  ],
  
  outputDir: 'reports/test-results/',
  
  use: {
    baseURL: 'https://xn--80apagbbfxgmuj4j.site',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  webServer: {
    command: 'python -m http.server 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    cwd: '../'
  }
});