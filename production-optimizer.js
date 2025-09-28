// Продакшн оптимизации для DEXRabbit
console.log('🚀 Инициализация продакшн оптимизаций DEXRabbit...');

class ProductionOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Исправление критических проблем
        this.fixCriticalIssues();
        
        // Оптимизации производительности
        this.optimizePerformance();
        
        // Улучшения PWA
        this.enhancePWA();
        
        // SEO улучшения
        this.improveSEO();
        
        // Аналитика и отслеживание
        this.setupAnalytics();
        
        console.log('✅ Продакшн оптимизации применены');
    }

    fixCriticalIssues() {
        console.log('🛠️ Исправление критических проблем...');
        
        // Исправление дублированного контента
        this.removeDuplicateContent();
        
        // Добавление alt к изображениям
        this.addMissingAlts();
        
        // Исправление структуры заголовков
        this.fixHeadingStructure();
    }

    removeDuplicateContent() {
        // Поиск дублированных секций
        const sections = document.querySelectorAll('section');
        const seenContent = new Set();
        const duplicates = [];

        sections.forEach((section, index) => {
            const content = section.innerHTML.trim();
            const hash = this.hashCode(content);
            
            if (seenContent.has(hash)) {
                duplicates.push(section);
            } else {
                seenContent.add(hash);
            }
        });

        // Удаление дубликатов
        duplicates.forEach(duplicate => {
            console.log('🗑️ Удален дублированный контент');
            duplicate.remove();
        });
    }

    addMissingAlts() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach((img, index) => {
            const altText = this.generateAltText(img);
            img.setAttribute('alt', altText);
            console.log(`🖼️ Добавлен alt: "${altText}"`);
        });
    }

    generateAltText(img) {
        if (img.src.includes('favicon')) return 'Логотип DEXRabbit';
        if (img.src.includes('rabbit')) return 'Кролик на ферме DEXRabbit';
        if (img.src.includes('logo')) return 'DEXRabbit логотип';
        return `Изображение DEXRabbit ${Date.now()}`;
    }

    fixHeadingStructure() {
        // Проверка иерархии заголовков
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > lastLevel + 1) {
                console.log(`⚠️ Нарушение иерархии заголовков: ${heading.tagName}`);
            }
            lastLevel = level;
        });
    }

    optimizePerformance() {
        console.log('⚡ Оптимизация производительности...');
        
        // Lazy loading для изображений
        this.enableLazyLoading();
        
        // Prefetch критичных ресурсов
        this.prefetchCriticalResources();
        
        // Оптимизация iframe
        this.optimizeIframes();
        
        // Минификация inline стилей
        this.optimizeInlineStyles();
    }

    enableLazyLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            if (!iframe.hasAttribute('loading')) {
                iframe.setAttribute('loading', 'lazy');
            }
        });
    }

    prefetchCriticalResources() {
        const criticalResources = [
            '/styles/global.css',
            '/scripts/analytics.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    optimizeIframes() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            // Добавление дополнительной безопасности
            if (!iframe.hasAttribute('referrerpolicy')) {
                iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
            }
            
            // Intersection Observer для lazy loading
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // iframe уже загружен
                            observer.unobserve(entry.target);
                        }
                    });
                });
                observer.observe(iframe);
            }
        });
    }

    optimizeInlineStyles() {
        // Удаление лишних пробелов в inline стилях
        const elementsWithStyle = document.querySelectorAll('[style]');
        elementsWithStyle.forEach(element => {
            const style = element.getAttribute('style');
            const optimizedStyle = style.replace(/\s+/g, ' ').trim();
            element.setAttribute('style', optimizedStyle);
        });
    }

    enhancePWA() {
        console.log('📱 Улучшение PWA...');
        
        // Проверка установки PWA
        this.setupInstallPrompt();
        
        // Уведомления о обновлениях
        this.setupUpdateNotifications();
        
        // Offline обработка
        this.enhanceOfflineExperience();
    }

    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Показать кнопку установки
            this.showInstallButton(deferredPrompt);
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('✅ PWA установлен');
            this.trackEvent('pwa_installed');
        });
    }

    showInstallButton(deferredPrompt) {
        const installButton = document.createElement('button');
        installButton.textContent = '📲 Установить приложение';
        installButton.className = 'install-button';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-primary, #4a90e2);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: transform 0.3s ease;
        `;
        
        installButton.addEventListener('mouseenter', () => {
            installButton.style.transform = 'translateY(-2px)';
        });
        
        installButton.addEventListener('mouseleave', () => {
            installButton.style.transform = 'translateY(0)';
        });
        
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    console.log('✅ Пользователь согласился установить PWA');
                    this.trackEvent('pwa_install_accepted');
                } else {
                    console.log('❌ Пользователь отклонил установку PWA');
                    this.trackEvent('pwa_install_rejected');
                }
                
                deferredPrompt = null;
                installButton.remove();
            }
        });
        
        document.body.appendChild(installButton);
    }

    setupUpdateNotifications() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (this.refreshing) return;
                this.refreshing = true;
                
                // Показать уведомление об обновлении
                this.showUpdateNotification();
            });
        }
    }

    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--color-success, #4caf50);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                z-index: 10000;
                font-weight: 500;
            ">
                🔄 Доступно обновление сайта
                <button onclick="location.reload()" style="
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    margin-left: 10px;
                    cursor: pointer;
                ">Обновить</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Автоудаление через 10 секунд
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }

    enhanceOfflineExperience() {
        window.addEventListener('online', () => {
            console.log('🌐 Соединение восстановлено');
            this.showConnectionStatus(true);
        });
        
        window.addEventListener('offline', () => {
            console.log('📴 Соединение потеряно');
            this.showConnectionStatus(false);
        });
    }

    showConnectionStatus(isOnline) {
        const existingStatus = document.querySelector('.connection-status');
        if (existingStatus) existingStatus.remove();
        
        const status = document.createElement('div');
        status.className = 'connection-status';
        status.innerHTML = isOnline 
            ? '🌐 Соединение восстановлено' 
            : '📴 Работа в режиме оффлайн';
        
        status.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isOnline ? '#4caf50' : '#ff9800'};
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 10000;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(status);
        
        setTimeout(() => {
            status.style.opacity = '0';
            setTimeout(() => status.remove(), 300);
        }, 3000);
    }

    improveSEO() {
        console.log('🔍 Улучшение SEO...');
        
        // Добавление структурированных данных
        this.addStructuredData();
        
        // Оптимизация мета-тегов
        this.optimizeMetaTags();
        
        // Улучшение внутренней перелинковки
        this.improveInternalLinking();
    }

    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DEXRabbit",
            "description": "Первая в мире токенизированная ферма кроликов",
            "url": "https://xn--80apagbbfxgmuj4j.site",
            "logo": "https://xn--80apagbbfxgmuj4j.site/favicon.svg",
            "sameAs": [
                "https://t.me/dexrabbit_channel"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://t.me/dexrabbit_bot"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }

    optimizeMetaTags() {
        // Добавление недостающих мета-тегов
        const metaTags = [
            { name: 'robots', content: 'index, follow' },
            { name: 'author', content: 'DEXRabbit Team' },
            { property: 'og:url', content: window.location.href },
            { property: 'og:image', content: 'https://xn--80apagbbfxgmuj4j.site/favicon.svg' },
            { name: 'twitter:card', content: 'summary_large_image' }
        ];
        
        metaTags.forEach(tag => {
            const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
            if (!document.querySelector(selector)) {
                const meta = document.createElement('meta');
                if (tag.name) meta.name = tag.name;
                if (tag.property) meta.setAttribute('property', tag.property);
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
    }

    improveInternalLinking() {
        // Добавление internal linking для лучшего SEO
        const links = [
            { text: 'investment-model', href: '/investment-model.html' },
            { text: 'партнерск', href: '/partnership.html' },
            { text: 'контакт', href: '/contacts.html' }
        ];
        
        links.forEach(linkData => {
            const textNodes = this.findTextNodes(document.body, linkData.text);
            textNodes.forEach(node => {
                // Создать ссылку только если текст не уже в ссылке
                if (!node.parentElement.closest('a')) {
                    const link = document.createElement('a');
                    link.href = linkData.href;
                    link.textContent = node.textContent;
                    node.parentNode.replaceChild(link, node);
                }
            });
        });
    }

    setupAnalytics() {
        console.log('📊 Настройка аналитики...');
        
        // Расширенная аналитика
        this.enhanceAnalytics();
        
        // Отслеживание производительности
        this.trackPerformance();
        
        // Отслеживание пользовательского поведения
        this.trackUserBehavior();
    }

    enhanceAnalytics() {
        if (window.analytics) {
            // Отслеживание времени на странице
            const startTime = Date.now();
            
            window.addEventListener('beforeunload', () => {
                const timeOnPage = Date.now() - startTime;
                this.trackEvent('time_on_page', { duration: timeOnPage });
            });
            
            // Отслеживание скролла
            let maxScroll = 0;
            window.addEventListener('scroll', () => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                maxScroll = Math.max(maxScroll, scrollPercent);
            });
            
            window.addEventListener('beforeunload', () => {
                this.trackEvent('max_scroll', { percent: maxScroll });
            });
        }
    }

    trackPerformance() {
        if (performance.timing) {
            window.addEventListener('load', () => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
                
                this.trackEvent('performance_metrics', {
                    load_time: loadTime,
                    dom_content_loaded: domContentLoaded,
                    first_paint: performance.getEntriesByType('paint')[0]?.startTime || 0
                });
            });
        }
    }

    trackUserBehavior() {
        // Отслеживание кликов по кнопкам
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, button, a')) {
                this.trackEvent('button_click', {
                    text: e.target.textContent.trim(),
                    href: e.target.href || '',
                    class: e.target.className
                });
            }
        });
        
        // Отслеживание фокуса на формах
        document.addEventListener('focus', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.trackEvent('form_focus', {
                    type: e.target.type || e.target.tagName.toLowerCase(),
                    name: e.target.name || e.target.id || ''
                });
            }
        }, true);
    }

    // Утилиты
    trackEvent(event, data = {}) {
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent(event, data);
        }
    }

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    findTextNodes(element, searchText) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(searchText.toLowerCase())) {
                textNodes.push(node);
            }
        }
        
        return textNodes;
    }
}

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProductionOptimizer();
    });
} else {
    new ProductionOptimizer();
}

// Экспорт для тестирования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductionOptimizer;
}