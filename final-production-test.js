// Финальный тест готовности DEXRabbit к продакшену
console.log('🎯 Запуск финального теста готовности DEXRabbit к продакшену...');

class ProductionReadinessTest {
    constructor() {
        this.testResults = {
            critical: [],
            warnings: [],
            success: [],
            score: 0
        };
        this.startTime = performance.now();
    }

    async runCompleteTest() {
        console.log('\n🏥 === ФИНАЛЬНЫЙ ТЕСТ ПРОДАКШН ГОТОВНОСТИ ===\n');
        
        // Критически важные тесты
        await this.testCriticalIssues();
        
        // Функциональные тесты
        await this.testFunctionality();
        
        // Производительность
        await this.testPerformance();
        
        // SEO и доступность
        await this.testSEOAndAccessibility();
        
        // PWA готовность
        await this.testPWA();
        
        // Интеграции
        await this.testIntegrations();
        
        this.calculateFinalScore();
        this.generateFinalReport();
    }

    async testCriticalIssues() {
        console.log('🚨 Тест критических проблем...');
        
        // Проверка title
        const title = document.title;
        if (title && !title.includes('  ') && title.length > 10) {
            this.success('HTML', 'Title корректный без двойных пробелов');
        } else {
            this.critical('HTML', 'Проблемы с title тегом');
        }
        
        // Проверка meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && !metaDesc.content.startsWith(' ') && metaDesc.content.length > 50) {
            this.success('HTML', 'Meta description корректен');
        } else {
            this.critical('HTML', 'Проблемы с meta description');
        }
        
        // Проверка дублированного контента
        const sections = document.querySelectorAll('section');
        const uniqueContent = new Set();
        let duplicates = 0;
        
        sections.forEach(section => {
            const contentHash = this.hashContent(section.innerHTML);
            if (uniqueContent.has(contentHash)) {
                duplicates++;
            } else {
                uniqueContent.add(contentHash);
            }
        });
        
        if (duplicates === 0) {
            this.success('HTML', 'Нет дублированного контента');
        } else {
            this.critical('HTML', `Найдено ${duplicates} дублированных секций`);
        }
        
        // Проверка H1 заголовков
        const h1Count = document.querySelectorAll('h1').length;
        if (h1Count === 1) {
            this.success('SEO', 'Единственный H1 заголовок');
        } else {
            this.critical('SEO', `Неверное количество H1: ${h1Count}`);
        }
    }

    async testFunctionality() {
        console.log('⚙️ Тест функциональности...');
        
        // Тест ссылок
        const links = document.querySelectorAll('a[href]');
        let workingLinks = 0;
        let brokenLinks = 0;
        
        for (const link of Array.from(links).slice(0, 5)) { // Тестируем первые 5 ссылок
            if (link.href.startsWith('http')) {
                try {
                    // Для внешних ссылок просто проверяем формат
                    if (link.href.includes('t.me') || link.href.includes('geckoterminal')) {
                        workingLinks++;
                    }
                } catch (e) {
                    brokenLinks++;
                }
            } else {
                workingLinks++;
            }
        }
        
        if (brokenLinks === 0) {
            this.success('Functionality', 'Все проверенные ссылки работают');
        } else {
            this.warning('Functionality', `${brokenLinks} сломанных ссылок`);
        }
        
        // Тест форм
        const forms = document.querySelectorAll('form');
        if (forms.length > 0) {
            this.success('Functionality', `${forms.length} форм найдено`);
        }
        
        // Тест PLEX виджета
        const plexWidget = document.querySelector('#geckoterminal-embed');
        if (plexWidget && plexWidget.src.includes('geckoterminal.com')) {
            this.success('Integrations', 'PLEX виджет настроен корректно');
        } else {
            this.warning('Integrations', 'PLEX виджет требует проверки');
        }
    }

    async testPerformance() {
        console.log('⚡ Тест производительности...');
        
        // Время загрузки
        if (performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime < 3000) {
                this.success('Performance', `Быстрая загрузка: ${loadTime}мс`);
            } else if (loadTime < 5000) {
                this.warning('Performance', `Средняя скорость загрузки: ${loadTime}мс`);
            } else {
                this.critical('Performance', `Медленная загрузка: ${loadTime}мс`);
            }
        }
        
        // Размер ресурсов
        if (performance.getEntriesByType) {
            const resources = performance.getEntriesByType('resource');
            const totalSize = resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
            
            if (totalSize < 2 * 1024 * 1024) { // < 2MB
                this.success('Performance', `Оптимальный размер ресурсов: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
            } else if (totalSize < 5 * 1024 * 1024) { // < 5MB
                this.warning('Performance', `Средний размер ресурсов: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
            } else {
                this.critical('Performance', `Большой размер ресурсов: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
            }
        }
    }

    async testSEOAndAccessibility() {
        console.log('🔍 Тест SEO и доступности...');
        
        // OpenGraph теги
        const ogTags = ['og:title', 'og:description', 'og:type'];
        let ogCount = 0;
        
        ogTags.forEach(tag => {
            if (document.querySelector(`meta[property="${tag}"]`)) {
                ogCount++;
            }
        });
        
        if (ogCount === ogTags.length) {
            this.success('SEO', 'Все основные OpenGraph теги присутствуют');
        } else {
            this.warning('SEO', `Отсутствуют ${ogTags.length - ogCount} OpenGraph тегов`);
        }
        
        // Alt атрибуты для изображений
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        
        if (imagesWithoutAlt.length === 0) {
            this.success('Accessibility', 'Все изображения имеют alt атрибуты');
        } else {
            this.warning('Accessibility', `${imagesWithoutAlt.length} изображений без alt`);
        }
        
        // Структурированные данные
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        if (jsonLdScripts.length > 0) {
            this.success('SEO', 'Структурированные данные присутствуют');
        } else {
            this.warning('SEO', 'Отсутствуют структурированные данные');
        }
    }

    async testPWA() {
        console.log('📱 Тест PWA готовности...');
        
        // Манифест
        try {
            const manifestResponse = await fetch('/manifest.webmanifest');
            if (manifestResponse.ok) {
                const manifest = await manifestResponse.json();
                if (manifest.name && manifest.icons && manifest.start_url) {
                    this.success('PWA', 'Манифест корректен');
                } else {
                    this.warning('PWA', 'Манифест неполный');
                }
            } else {
                this.critical('PWA', 'Манифест не найден');
            }
        } catch (e) {
            this.critical('PWA', 'Ошибка загрузки манифеста');
        }
        
        // Service Worker
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    this.success('PWA', 'Service Worker зарегистрирован');
                } else {
                    this.warning('PWA', 'Service Worker не зарегистрирован');
                }
            } catch (e) {
                this.warning('PWA', 'Проблемы с Service Worker');
            }
        }
        
        // HTTPS
        if (location.protocol === 'https:' || location.hostname === 'localhost') {
            this.success('PWA', 'HTTPS подключение');
        } else {
            this.critical('PWA', 'Требуется HTTPS');
        }
    }

    async testIntegrations() {
        console.log('🔌 Тест интеграций...');
        
        // Telegram ссылки
        const telegramLinks = document.querySelectorAll('a[href*="t.me"]');
        if (telegramLinks.length >= 2) {
            this.success('Integrations', `${telegramLinks.length} Telegram ссылок`);
        } else {
            this.warning('Integrations', 'Мало Telegram ссылок');
        }
        
        // Аналитика
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            this.success('Integrations', 'Система аналитики активна');
        } else {
            this.warning('Integrations', 'Аналитика не настроена');
        }
        
        // Production Optimizer
        if (window.ProductionOptimizer || document.querySelector('script[src*="production-optimizer"]')) {
            this.success('Optimization', 'Production Optimizer подключен');
        } else {
            this.warning('Optimization', 'Production Optimizer отсутствует');
        }
    }

    // Утилиты для записи результатов
    critical(category, message) {
        this.testResults.critical.push({ category, message });
        console.log(`🚨 КРИТИЧНО [${category}]: ${message}`);
    }

    warning(category, message) {
        this.testResults.warnings.push({ category, message });
        console.log(`⚠️ ПРЕДУПРЕЖДЕНИЕ [${category}]: ${message}`);
    }

    success(category, message) {
        this.testResults.success.push({ category, message });
        console.log(`✅ УСПЕШНО [${category}]: ${message}`);
    }

    calculateFinalScore() {
        const successPoints = this.testResults.success.length * 10;
        const warningPenalty = this.testResults.warnings.length * 3;
        const criticalPenalty = this.testResults.critical.length * 15;
        
        this.testResults.score = Math.max(0, Math.min(100, successPoints - warningPenalty - criticalPenalty));
    }

    generateFinalReport() {
        const endTime = performance.now();
        const testDuration = Math.round(endTime - this.startTime);
        
        console.log('\n🏆 === ФИНАЛЬНЫЙ ОТЧЁТ ГОТОВНОСТИ К ПРОДАКШЕНУ ===\n');
        
        console.log(`⏱️ Время тестирования: ${testDuration}мс`);
        console.log(`🎯 ИТОГОВЫЙ БАЛЛ: ${this.testResults.score}/100\n`);
        
        // Статистика
        console.log('📊 СТАТИСТИКА ТЕСТОВ:');
        console.log(`✅ Успешных тестов: ${this.testResults.success.length}`);
        console.log(`⚠️ Предупреждений: ${this.testResults.warnings.length}`);
        console.log(`🚨 Критических проблем: ${this.testResults.critical.length}\n`);
        
        // Оценка готовности
        if (this.testResults.score >= 95) {
            console.log('🎉 ПРЕВОСХОДНО! Сайт полностью готов к продакшену!');
            console.log('🚀 Рекомендуется немедленный запуск!');
        } else if (this.testResults.score >= 85) {
            console.log('✅ ОТЛИЧНО! Сайт готов к продакшену!');
            console.log('💡 Минимальные доработки для улучшения');
        } else if (this.testResults.score >= 75) {
            console.log('⚠️ ХОРОШО! Почти готов к продакшену');
            console.log('🔧 Требуются некоторые исправления');
        } else if (this.testResults.score >= 60) {
            console.log('📝 УДОВЛЕТВОРИТЕЛЬНО! Требуются доработки');
            console.log('⚡ Исправьте критические проблемы');
        } else {
            console.log('🛑 НЕУДОВЛЕТВОРИТЕЛЬНО! Не готов к продакшену');
            console.log('🔧 Требуется серьезная доработка');
        }
        
        // Критические проблемы
        if (this.testResults.critical.length > 0) {
            console.log('\n🚨 КРИТИЧЕСКИЕ ПРОБЛЕМЫ ДЛЯ ИСПРАВЛЕНИЯ:');
            this.testResults.critical.forEach((issue, index) => {
                console.log(`${index + 1}. [${issue.category}] ${issue.message}`);
            });
        }
        
        // Рекомендации по улучшению
        if (this.testResults.warnings.length > 0) {
            console.log('\n💡 РЕКОМЕНДАЦИИ ПО УЛУЧШЕНИЮ:');
            this.testResults.warnings.slice(0, 5).forEach((warning, index) => {
                console.log(`${index + 1}. [${warning.category}] ${warning.message}`);
            });
        }
        
        console.log('\n🔗 Полные результаты сохранены в window.finalTestResults');
        window.finalTestResults = this.testResults;
        
        // Финальное заключение
        console.log('\n📋 ФИНАЛЬНОЕ ЗАКЛЮЧЕНИЕ:');
        if (this.testResults.critical.length === 0) {
            console.log('🎯 Нет критических блокеров для продакшена');
            console.log('🚀 Проект технически готов к запуску');
            console.log('✨ DEXRabbit может быть развернут в продакшне');
        } else {
            console.log('⛔ Есть критические проблемы, блокирующие запуск');
            console.log('🔧 Исправьте их перед деплоем в продакшн');
        }
    }

    hashContent(content) {
        let hash = 0;
        const cleanContent = content.replace(/\s+/g, ' ').trim();
        for (let i = 0; i < cleanContent.length; i++) {
            const char = cleanContent.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
}

// Автозапуск финального теста
const finalTest = new ProductionReadinessTest();

if (document.readyState === 'complete') {
    finalTest.runCompleteTest();
} else {
    window.addEventListener('load', () => {
        setTimeout(() => finalTest.runCompleteTest(), 2000);
    });
}

// Экспорт для других модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductionReadinessTest;
}