// Test setup configuration
const puppeteer = require('puppeteer');

// Global test timeout
jest.setTimeout(30000);

// Browser configuration
const browserOptions = {
    headless: 'new',
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
    ]
};

// Global setup
beforeAll(async () => {
    global.browser = await puppeteer.launch(browserOptions);
});

beforeEach(async () => {
    global.page = await global.browser.newPage();
    
    // Set user agent
    await global.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set default timeout
    global.page.setDefaultTimeout(15000);
    
    // Capture console errors
    global.page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('Browser console error:', msg.text());
        }
    });
    
    // Capture page errors
    global.page.on('pageerror', error => {
        console.log('Page error:', error.message);
    });
});

afterEach(async () => {
    if (global.page) {
        await global.page.close();
    }
});

afterAll(async () => {
    if (global.browser) {
        await global.browser.close();
    }
});

// Custom matchers
expect.extend({
    toBeVisibleInViewport(received) {
        const pass = received && received.width > 0 && received.height > 0;
        return {
            message: () => `Expected element ${pass ? 'not ' : ''}to be visible in viewport`,
            pass
        };
    }
});