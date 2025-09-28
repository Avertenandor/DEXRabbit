// Комплексный тест производительности и готовности к продакшену
console.log('🔬 Запуск комплексного теста производительности DEXRabbit...');

class PerformanceAuditor {
    constructor() {
        this.results = {
            performance: {},
            seo: {},
            accessibility: {},
            pwa: {},
            security: {},
            issues: [],
            score: 0
        };
    }

    async runFullAudit() {
        console.log('\n🎯 === КОМПЛЕКСНЫЙ АУДИТ САЙТА ===\n');
        
        await this.testPerformance();
        await this.testSEO();
        await this.testAccessibility();
        await this.testPWA();
        await this.testSecurity();
        
        this.calculateOverallScore();
        this.generateReport();
    }

    async testPerformance() {
        console.log('⚡ Тест производительности...');
        
        const startTime = performance.now();
        
        // Core Web Vitals simulation
        const metrics = {
            fcp: this.measureFCP(),
            lcp: this.measureLCP(),
            cls: this.measureCLS(),
            fid: this.measureFID()
        };
        
        // Размер ресурсов
        const resourceSizes = this.analyzeResourceSizes();
        
        // Время загрузки
        const loadMetrics = this.analyzeLoadTimes();
        
        this.results.performance = {
            metrics,
            resourceSizes,
            loadMetrics,
            score: this.calculatePerformanceScore(metrics, resourceSizes, loadMetrics)
        };
        
        const endTime = performance.now();
        console.log(`✅ Тест производительности завершен за ${Math.round(endTime - startTime)}мс`);
    }

    measureFCP() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? Math.round(fcp.startTime) : null;
    }

    measureLCP() {
        return new Promise(resolve => {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver(list => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(Math.round(lastEntry.startTime));
                });
                
                try {
                    observer.observe({ entryTypes: ['largest-contentful-paint'] });
                    setTimeout(() => resolve(null), 1000);
                } catch (e) {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    }

    measureCLS() {
        return new Promise(resolve => {
            let clsValue = 0;
            
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver(list => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                });
                
                try {
                    observer.observe({ entryTypes: ['layout-shift'] });
                    setTimeout(() => resolve(clsValue), 2000);
                } catch (e) {
                    resolve(0);
                }
            } else {
                resolve(0);
            }
        });
    }

    measureFID() {
        return new Promise(resolve => {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver(list => {
                    for (const entry of list.getEntries()) {
                        resolve(Math.round(entry.processingStart - entry.startTime));
                        break;
                    }
                });
                
                try {
                    observer.observe({ entryTypes: ['first-input'] });
                    setTimeout(() => resolve(null), 5000);
                } catch (e) {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    }

    analyzeResourceSizes() {
        if (!performance.getEntriesByType) return null;
        
        const resources = performance.getEntriesByType('resource');
        const sizes = {
            total: 0,
            images: 0,
            scripts: 0,
            stylesheets: 0,
            large_resources: 0
        };
        
        resources.forEach(resource => {
            const size = resource.transferSize || 0;
            sizes.total += size;
            
            if (resource.initiatorType === 'img') sizes.images += size;
            else if (resource.initiatorType === 'script') sizes.scripts += size;
            else if (resource.initiatorType === 'link') sizes.stylesheets += size;
            
            if (size > 1024 * 1024) sizes.large_resources++;
        });
        
        return sizes;
    }

    analyzeLoadTimes() {
        if (!performance.timing) return null;
        
        const timing = performance.timing;
        return {
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            connect: timing.connectEnd - timing.connectStart,
            request: timing.responseStart - timing.requestStart,
            response: timing.responseEnd - timing.responseStart,
            dom: timing.domContentLoadedEventEnd - timing.navigationStart,
            load: timing.loadEventEnd - timing.navigationStart
        };
    }

    calculatePerformanceScore(metrics, sizes, loadTimes) {
        let score = 100;
        
        // FCP penalty
        if (metrics.fcp > 3000) score -= 20;
        else if (metrics.fcp > 1800) score -= 10;
        
        // Resource size penalty
        if (sizes && sizes.total > 5 * 1024 * 1024) score -= 15; // > 5MB
        if (sizes && sizes.large_resources > 0) score -= 10;
        
        // Load time penalty
        if (loadTimes && loadTimes.load > 3000) score -= 15;
        
        return Math.max(0, score);
    }

    async testSEO() {
        console.log('🔍 Тест SEO...');
        
        const seoChecks = {
            title: this.checkTitle(),
            metaDescription: this.checkMetaDescription(),
            headings: this.checkHeadings(),
            images: this.checkImageSEO(),
            links: this.checkLinks(),
            openGraph: this.checkOpenGraph(),
            robots: await this.checkRobots(),
            sitemap: await this.checkSitemap()
        };
        
        this.results.seo = {
            ...seoChecks,
            score: this.calculateSEOScore(seoChecks)
        };
        
        console.log('✅ SEO тест завершен');
    }

    checkTitle() {
        const title = document.title;
        return {
            exists: !!title,
            length: title.length,
            optimal: title.length >= 30 && title.length <= 60,
            title: title
        };
    }

    checkMetaDescription() {
        const meta = document.querySelector('meta[name="description"]');
        const content = meta ? meta.content : '';
        return {
            exists: !!meta,
            length: content.length,
            optimal: content.length >= 120 && content.length <= 160,
            content: content
        };
    }

    checkHeadings() {
        const h1 = document.querySelectorAll('h1');
        const h2 = document.querySelectorAll('h2');
        const h3 = document.querySelectorAll('h3');
        
        return {
            h1_count: h1.length,
            h1_optimal: h1.length === 1,
            h2_count: h2.length,
            h3_count: h3.length,
            hierarchy_proper: this.checkHeadingHierarchy()
        };
    }

    checkHeadingHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        
        for (let heading of headings) {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > lastLevel + 1) return false;
            lastLevel = level;
        }
        
        return true;
    }

    checkImageSEO() {
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        
        return {
            total: images.length,
            without_alt: imagesWithoutAlt.length,
            alt_coverage: images.length > 0 ? ((images.length - imagesWithoutAlt.length) / images.length) * 100 : 100
        };
    }

    checkLinks() {
        const links = document.querySelectorAll('a[href]');
        const externalLinks = Array.from(links).filter(link => 
            link.href.startsWith('http') && !link.href.includes(location.hostname)
        );
        
        return {
            total: links.length,
            external: externalLinks.length,
            internal: links.length - externalLinks.length
        };
    }

    checkOpenGraph() {
        const ogTags = {
            title: document.querySelector('meta[property="og:title"]'),
            description: document.querySelector('meta[property="og:description"]'),
            image: document.querySelector('meta[property="og:image"]'),
            url: document.querySelector('meta[property="og:url"]'),
            type: document.querySelector('meta[property="og:type"]')
        };
        
        const coverage = Object.values(ogTags).filter(Boolean).length / Object.keys(ogTags).length * 100;
        
        return {
            coverage: Math.round(coverage),
            tags: Object.fromEntries(Object.entries(ogTags).map(([key, value]) => [key, !!value]))
        };
    }

    async checkRobots() {
        try {
            const response = await fetch('/robots.txt');
            return {
                exists: response.ok,
                status: response.status
            };
        } catch (e) {
            return { exists: false, status: null };
        }
    }

    async checkSitemap() {
        try {
            const response = await fetch('/sitemap.xml');
            return {
                exists: response.ok,
                status: response.status
            };
        } catch (e) {
            return { exists: false, status: null };
        }
    }

    calculateSEOScore(checks) {
        let score = 0;
        
        // Title (20 points)
        if (checks.title.exists && checks.title.optimal) score += 20;
        else if (checks.title.exists) score += 10;
        
        // Meta description (15 points)
        if (checks.metaDescription.exists && checks.metaDescription.optimal) score += 15;
        else if (checks.metaDescription.exists) score += 7;
        
        // Headings (15 points)
        if (checks.headings.h1_optimal && checks.headings.hierarchy_proper) score += 15;
        else if (checks.headings.h1_count > 0) score += 8;
        
        // Images (10 points)
        if (checks.images.alt_coverage === 100) score += 10;
        else if (checks.images.alt_coverage >= 80) score += 7;
        
        // OpenGraph (15 points)
        score += Math.round(checks.openGraph.coverage * 0.15);
        
        // Technical SEO (25 points)
        if (checks.robots.exists) score += 10;
        if (checks.sitemap.exists) score += 15;
        
        return Math.min(100, score);
    }

    async testAccessibility() {
        console.log('♿ Тест доступности...');
        
        const a11yChecks = {
            images: this.checkImageAccessibility(),
            forms: this.checkFormAccessibility(),
            links: this.checkLinkAccessibility(),
            colors: this.checkColorContrast(),
            keyboard: this.checkKeyboardNavigation()
        };
        
        this.results.accessibility = {
            ...a11yChecks,
            score: this.calculateA11yScore(a11yChecks)
        };
        
        console.log('✅ Тест доступности завершен');
    }

    checkImageAccessibility() {
        const images = document.querySelectorAll('img');
        const decorativeImages = document.querySelectorAll('img[alt=""]');
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        
        return {
            total: images.length,
            without_alt: imagesWithoutAlt.length,
            decorative: decorativeImages.length,
            compliance: imagesWithoutAlt.length === 0
        };
    }

    checkFormAccessibility() {
        const formElements = document.querySelectorAll('input, textarea, select');
        const elementsWithoutLabel = Array.from(formElements).filter(element => {
            const label = document.querySelector(`label[for="${element.id}"]`);
            return !label && !element.getAttribute('aria-label');
        });
        
        return {
            total: formElements.length,
            without_label: elementsWithoutLabel.length,
            compliance: elementsWithoutLabel.length === 0
        };
    }

    checkLinkAccessibility() {
        const links = document.querySelectorAll('a');
        const linksWithoutText = Array.from(links).filter(link => {
            return !link.textContent.trim() && !link.getAttribute('aria-label');
        });
        
        return {
            total: links.length,
            without_text: linksWithoutText.length,
            compliance: linksWithoutText.length === 0
        };
    }

    checkColorContrast() {
        // Упрощенная проверка цветового контраста
        const body = document.body;
        const computedStyle = getComputedStyle(body);
        
        return {
            background_set: computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)',
            color_set: computedStyle.color !== 'rgba(0, 0, 0, 0)',
            compliance: true // Требует более сложного анализа
        };
    }

    checkKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        return {
            focusable_count: focusableElements.length,
            has_focusable: focusableElements.length > 0
        };
    }

    calculateA11yScore(checks) {
        let score = 0;
        
        // Images (30 points)
        if (checks.images.compliance) score += 30;
        else score += Math.max(0, 30 - checks.images.without_alt * 5);
        
        // Forms (25 points)
        if (checks.forms.compliance) score += 25;
        else score += Math.max(0, 25 - checks.forms.without_label * 5);
        
        // Links (25 points)
        if (checks.links.compliance) score += 25;
        else score += Math.max(0, 25 - checks.links.without_text * 5);
        
        // Colors (10 points)
        if (checks.colors.background_set && checks.colors.color_set) score += 10;
        
        // Keyboard (10 points)
        if (checks.keyboard.has_focusable) score += 10;
        
        return Math.min(100, score);
    }

    async testPWA() {
        console.log('📱 Тест PWA...');
        
        const pwaChecks = {
            manifest: await this.checkManifest(),
            serviceWorker: await this.checkServiceWorker(),
            https: this.checkHTTPS(),
            installable: this.checkInstallability()
        };
        
        this.results.pwa = {
            ...pwaChecks,
            score: this.calculatePWAScore(pwaChecks)
        };
        
        console.log('✅ PWA тест завершен');
    }

    async checkManifest() {
        try {
            const response = await fetch('/manifest.webmanifest');
            if (!response.ok) return { exists: false, valid: false };
            
            const manifest = await response.json();
            const requiredFields = ['name', 'start_url', 'display', 'icons'];
            const hasRequired = requiredFields.every(field => manifest[field]);
            
            return {
                exists: true,
                valid: hasRequired,
                fields: Object.keys(manifest),
                icons_count: manifest.icons ? manifest.icons.length : 0
            };
        } catch (e) {
            return { exists: false, valid: false };
        }
    }

    async checkServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            return { supported: false, registered: false };
        }
        
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            return {
                supported: true,
                registered: !!registration,
                state: registration ? registration.active?.state : null
            };
        } catch (e) {
            return { supported: true, registered: false };
        }
    }

    checkHTTPS() {
        return {
            secure: location.protocol === 'https:' || location.hostname === 'localhost'
        };
    }

    checkInstallability() {
        // Проверяем основные критерии
        return {
            criteria_met: 
                location.protocol === 'https:' ||
                location.hostname === 'localhost'
        };
    }

    calculatePWAScore(checks) {
        let score = 0;
        
        // Manifest (40 points)
        if (checks.manifest.exists && checks.manifest.valid) score += 40;
        else if (checks.manifest.exists) score += 20;
        
        // Service Worker (30 points)
        if (checks.serviceWorker.registered) score += 30;
        else if (checks.serviceWorker.supported) score += 10;
        
        // HTTPS (20 points)
        if (checks.https.secure) score += 20;
        
        // Installability (10 points)
        if (checks.installable.criteria_met) score += 10;
        
        return Math.min(100, score);
    }

    async testSecurity() {
        console.log('🔒 Тест безопасности...');
        
        const securityChecks = {
            https: this.checkHTTPS(),
            headers: this.checkSecurityHeaders(),
            mixed_content: this.checkMixedContent(),
            external_links: this.checkExternalLinks()
        };
        
        this.results.security = {
            ...securityChecks,
            score: this.calculateSecurityScore(securityChecks)
        };
        
        console.log('✅ Тест безопасности завершен');
    }

    checkSecurityHeaders() {
        // Эта проверка требует доступа к заголовкам ответа
        // В браузере можем проверить только некоторые аспекты
        return {
            csp_meta: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
            referrer_policy: !!document.querySelector('meta[name="referrer"]')
        };
    }

    checkMixedContent() {
        const mixedContentElements = document.querySelectorAll('[src^="http:"], [href^="http:"]');
        return {
            mixed_content_count: location.protocol === 'https:' ? mixedContentElements.length : 0,
            secure: location.protocol === 'https:' ? mixedContentElements.length === 0 : true
        };
    }

    checkExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + location.hostname + '"])');
        const secureExternalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + location.hostname + '"])[rel*="noopener"]');
        
        return {
            external_count: externalLinks.length,
            secure_count: secureExternalLinks.length,
            compliance: externalLinks.length === 0 || secureExternalLinks.length === externalLinks.length
        };
    }

    calculateSecurityScore(checks) {
        let score = 0;
        
        // HTTPS (50 points)
        if (checks.https.secure) score += 50;
        
        // Mixed content (20 points)
        if (checks.mixed_content.secure) score += 20;
        
        // External links (20 points)
        if (checks.external_links.compliance) score += 20;
        
        // Security headers (10 points)
        if (checks.headers.csp_meta) score += 5;
        if (checks.headers.referrer_policy) score += 5;
        
        return Math.min(100, score);
    }

    calculateOverallScore() {
        const weights = {
            performance: 0.3,
            seo: 0.25,
            accessibility: 0.2,
            pwa: 0.15,
            security: 0.1
        };
        
        this.results.score = Math.round(
            this.results.performance.score * weights.performance +
            this.results.seo.score * weights.seo +
            this.results.accessibility.score * weights.accessibility +
            this.results.pwa.score * weights.pwa +
            this.results.security.score * weights.security
        );
    }

    generateReport() {
        console.log('\n🏆 === ИТОГОВЫЙ ОТЧЕТ АУДИТА ===\n');
        
        console.log(`🎯 ОБЩИЙ БАЛЛ: ${this.results.score}/100`);
        console.log('');
        
        console.log('📊 ДЕТАЛИЗАЦИЯ ПО КАТЕГОРИЯМ:');
        console.log(`⚡ Производительность: ${this.results.performance.score}/100`);
        console.log(`🔍 SEO: ${this.results.seo.score}/100`);
        console.log(`♿ Доступность: ${this.results.accessibility.score}/100`);
        console.log(`📱 PWA: ${this.results.pwa.score}/100`);
        console.log(`🔒 Безопасность: ${this.results.security.score}/100`);
        console.log('');
        
        // Оценка готовности
        if (this.results.score >= 90) {
            console.log('🎉 ОТЛИЧНО! Сайт полностью готов к продакшену!');
        } else if (this.results.score >= 80) {
            console.log('✅ ХОРОШО! Сайт готов к продакшену с минимальными доработками');
        } else if (this.results.score >= 70) {
            console.log('⚠️ УДОВЛЕТВОРИТЕЛЬНО! Требуются доработки перед запуском');
        } else {
            console.log('🛑 ТРЕБУЕТСЯ ДОРАБОТКА! Существенные проблемы для исправления');
        }
        
        // Топ рекомендации
        console.log('\n💡 ПРИОРИТЕТНЫЕ РЕКОМЕНДАЦИИ:');
        
        if (this.results.performance.score < 80) {
            console.log('• Оптимизировать производительность (сжатие изображений, минификация)');
        }
        
        if (this.results.seo.score < 85) {
            console.log('• Улучшить SEO (мета-теги, структурированные данные)');
        }
        
        if (this.results.accessibility.score < 85) {
            console.log('• Повысить доступность (alt атрибуты, aria-labels)');
        }
        
        if (this.results.pwa.score < 80) {
            console.log('• Доработать PWA функции (Service Worker, манифест)');
        }
        
        if (this.results.security.score < 85) {
            console.log('• Усилить безопасность (HTTPS, заголовки безопасности)');
        }
        
        console.log('\n🔗 Полные результаты сохранены в window.auditResults');
        window.auditResults = this.results;
    }
}

// Автозапуск аудита
const auditor = new PerformanceAuditor();

// Запуск после загрузки страницы
if (document.readyState === 'complete') {
    auditor.runFullAudit();
} else {
    window.addEventListener('load', () => {
        setTimeout(() => auditor.runFullAudit(), 1000);
    });
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceAuditor;
}