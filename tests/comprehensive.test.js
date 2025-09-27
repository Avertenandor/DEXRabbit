// Task 45-48: Comprehensive testing suite
// Performance testing, mobile responsiveness, cross-browser compatibility

describe('КупитьКролика - Comprehensive Tests', () => {
    const baseUrl = 'https://xn--80apagbbfxgmuj4j.site';
    
    // Task 45: Mobile responsiveness testing
    describe('Mobile Responsiveness Tests', () => {
        const viewports = [
            { name: 'iPhone SE', width: 375, height: 667 },
            { name: 'iPhone 12', width: 390, height: 844 },
            { name: 'iPad', width: 768, height: 1024 },
            { name: 'Android Phone', width: 360, height: 640 },
            { name: 'Android Tablet', width: 800, height: 1280 }
        ];

        viewports.forEach(viewport => {
            test(`${viewport.name} (${viewport.width}x${viewport.height}) responsiveness`, async () => {
                await page.setViewport(viewport);
                await page.goto(baseUrl);
                
                // Wait for page load
                await page.waitForSelector('.header', { timeout: 10000 });
                
                // Test mobile menu functionality
                if (viewport.width < 768) {
                    const burgerMenu = await page.$('#burger');
                    expect(burgerMenu).toBeTruthy();
                    
                    await burgerMenu.click();
                    const navMenu = await page.$('#nav-menu.active');
                    expect(navMenu).toBeTruthy();
                }
                
                // Test layout elements visibility
                const mainElements = ['.hero', '.benefits', '.reviews'];
                for (const selector of mainElements) {
                    const element = await page.$(selector);
                    expect(element).toBeTruthy();
                    
                    const boundingBox = await element.boundingBox();
                    expect(boundingBox.width).toBeLessThanOrEqual(viewport.width);
                }
                
                // Test touch-friendly elements
                const buttons = await page.$$('.btn');
                for (const button of buttons) {
                    const box = await button.boundingBox();
                    expect(box.height).toBeGreaterThanOrEqual(44); // Minimum touch target
                }
                
                console.log(`✅ ${viewport.name} responsive test passed`);
            });
        });
    });

    // Task 46: Cross-browser compatibility
    describe('Cross-Browser Compatibility Tests', () => {
        const pages = ['/', '/catalog', '/faq', '/contacts', '/delivery'];
        
        pages.forEach(path => {
            test(`Page ${path} loads correctly`, async () => {
                await page.goto(`${baseUrl}${path}`);
                
                // Wait for main content
                await page.waitForSelector('main', { timeout: 15000 });
                
                // Test JavaScript functionality
                const jsErrors = [];
                page.on('pageerror', error => jsErrors.push(error.message));
                
                // Test CSS loading
                const styles = await page.evaluate(() => {
                    const computedStyle = getComputedStyle(document.body);
                    return {
                        fontFamily: computedStyle.fontFamily,
                        backgroundColor: computedStyle.backgroundColor
                    };
                });
                
                expect(styles.fontFamily).not.toBe('Times'); // Default serif shouldn't be used
                
                // Test form functionality (if on contacts page)
                if (path === '/contacts') {
                    await page.waitForSelector('#contact-form');
                    const form = await page.$('#contact-form');
                    expect(form).toBeTruthy();
                }
                
                // Test navigation
                const nav = await page.$('.nav');
                expect(nav).toBeTruthy();
                
                expect(jsErrors).toHaveLength(0);
                console.log(`✅ Page ${path} cross-browser test passed`);
            });
        });
    });

    // Task 47: Performance testing
    describe('Performance Tests', () => {
        test('Homepage loads within performance budget', async () => {
            // Enable request interception for monitoring
            await page.setRequestInterception(true);
            
            const resources = [];
            page.on('request', request => {
                resources.push({
                    url: request.url(),
                    type: request.resourceType()
                });
                request.continue();
            });
            
            const startTime = Date.now();
            await page.goto(baseUrl, { waitUntil: 'networkidle2' });
            const loadTime = Date.now() - startTime;
            
            // Performance assertions
            expect(loadTime).toBeLessThan(3000); // Page should load in under 3 seconds
            
            // Check Core Web Vitals
            const metrics = await page.evaluate(() => {
                return new Promise((resolve) => {
                    new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const vitals = {};
                        
                        entries.forEach((entry) => {
                            if (entry.name === 'first-contentful-paint') {
                                vitals.fcp = entry.startTime;
                            }
                            if (entry.name === 'largest-contentful-paint') {
                                vitals.lcp = entry.startTime;
                            }
                        });
                        
                        resolve(vitals);
                    }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
                    
                    // Fallback timeout
                    setTimeout(() => resolve({}), 5000);
                });
            });
            
            // Core Web Vitals thresholds
            if (metrics.fcp) {
                expect(metrics.fcp).toBeLessThan(1800); // FCP under 1.8s
            }
            if (metrics.lcp) {
                expect(metrics.lcp).toBeLessThan(2500); // LCP under 2.5s
            }
            
            // Resource optimization checks
            const imageCount = resources.filter(r => r.type === 'image').length;
            const scriptCount = resources.filter(r => r.type === 'script').length;
            const stylesheetCount = resources.filter(r => r.type === 'stylesheet').length;
            
            expect(imageCount).toBeLessThan(15); // Reasonable image count
            expect(scriptCount).toBeLessThan(10); // Reasonable script count
            expect(stylesheetCount).toBeLessThan(5); // Reasonable CSS count
            
            console.log(`✅ Performance test passed - Load time: ${loadTime}ms`);
            console.log(`📊 Resources: ${imageCount} images, ${scriptCount} scripts, ${stylesheetCount} stylesheets`);
        });

        test('Catalog page performance', async () => {
            const startTime = Date.now();
            await page.goto(`${baseUrl}/catalog`);
            await page.waitForSelector('#product-grid', { timeout: 10000 });
            const loadTime = Date.now() - startTime;
            
            expect(loadTime).toBeLessThan(4000); // Catalog can be slightly slower due to images
            
            // Test filter performance
            const filterStart = Date.now();
            await page.select('#breed-filter', 'white-giant');
            await page.waitForFunction(
                () => document.querySelectorAll('.product-card').length > 0,
                { timeout: 2000 }
            );
            const filterTime = Date.now() - filterStart;
            
            expect(filterTime).toBeLessThan(500); // Filter should be fast
            
            console.log(`✅ Catalog performance test passed - Filter time: ${filterTime}ms`);
        });
    });

    // Task 48: User flow testing
    describe('User Flow Tests', () => {
        test('Complete user journey - Browse to Contact', async () => {
            // 1. Land on homepage
            await page.goto(baseUrl);
            await page.waitForSelector('.hero');
            
            // 2. Click CTA to catalog
            await page.click('.hero .btn-primary');
            await page.waitForSelector('#product-grid');
            
            // 3. Filter products
            await page.select('#breed-filter', 'california');
            await page.waitForTimeout(1000); // Wait for filter
            
            // 4. View product details (click on first product)
            const firstProduct = await page.$('.product-card');
            expect(firstProduct).toBeTruthy();
            
            // 5. Go to contacts
            await page.goto(`${baseUrl}/contacts`);
            await page.waitForSelector('#contact-form');
            
            // 6. Fill out form
            await page.type('#name', 'Тестовый Пользователь');
            await page.type('#phone', '+7 999 123 45 67');
            await page.type('#email', 'test@example.com');
            await page.select('#interest', 'california');
            await page.type('#message', 'Интересует калифорнийская порода для разведения');
            
            // 7. Submit form (don't actually submit in test)
            const submitButton = await page.$('#submit-btn');
            expect(submitButton).toBeTruthy();
            
            console.log('✅ Complete user journey test passed');
        });

        test('FAQ search functionality', async () => {
            await page.goto(`${baseUrl}/faq`);
            await page.waitForSelector('#faq-search');
            
            // Search for specific term
            await page.type('#faq-search', 'цена');
            await page.waitForTimeout(500);
            
            // Check that relevant FAQ items are visible
            const visibleItems = await page.evaluate(() => {
                const items = document.querySelectorAll('.faq-item');
                return Array.from(items).filter(item => 
                    getComputedStyle(item).display !== 'none'
                ).length;
            });
            
            expect(visibleItems).toBeGreaterThan(0);
            expect(visibleItems).toBeLessThan(10); // Should filter results
            
            console.log('✅ FAQ search test passed');
        });

        test('Mobile menu navigation', async () => {
            await page.setViewport({ width: 375, height: 667 });
            await page.goto(baseUrl);
            
            // Open mobile menu
            await page.click('#burger');
            await page.waitForSelector('#nav-menu.active');
            
            // Click on a menu item
            await page.click('#nav-menu a[href="/catalog"]');
            await page.waitForSelector('#product-grid');
            
            // Menu should close automatically
            const menuActive = await page.$('#nav-menu.active');
            expect(menuActive).toBeFalsy();
            
            console.log('✅ Mobile menu navigation test passed');
        });
    });

    // Test analytics tracking
    describe('Analytics Tests', () => {
        test('Event tracking works', async () => {
            const events = [];
            
            // Mock analytics functions
            await page.evaluateOnNewDocument(() => {
                window.gtag = (...args) => {
                    window.analyticsEvents = window.analyticsEvents || [];
                    window.analyticsEvents.push({ type: 'gtag', args });
                };
                
                window.ym = (...args) => {
                    window.analyticsEvents = window.analyticsEvents || [];
                    window.analyticsEvents.push({ type: 'yandex', args });
                };
            });
            
            await page.goto(baseUrl);
            
            // Click phone number
            await page.click('a[href^="tel:"]');
            
            // Check if events were tracked
            const trackedEvents = await page.evaluate(() => window.analyticsEvents || []);
            expect(trackedEvents.length).toBeGreaterThan(0);
            
            console.log('✅ Analytics tracking test passed');
        });
    });
});

// Test runner configuration
module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 30000,
    verbose: true
};