// Комплексная диагностика сайта DEXRabbit
console.log('🔍 Запуск диагностики сайта DEXRabbit...');

class SiteDiagnostics {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.fixes = [];
    }

    async runFullDiagnostics() {
        console.log('\n🏥 === ПОЛНАЯ ДИАГНОСТИКА САЙТА ===\n');
        
        await this.checkHTMLStructure();
        await this.checkCSS();
        await this.checkJavaScript();
        await this.checkPWA();
        await this.checkSEO();
        await this.checkAccessibility();
        await this.checkPerformance();
        await this.checkIntegrations();
        
        this.generateReport();
    }

    addIssue(category, description, severity = 'medium', fix = '') {
        this.issues.push({ category, description, severity, fix });
    }

    addWarning(category, description, fix = '') {
        this.warnings.push({ category, description, fix });
    }

    async checkHTMLStructure() {
        console.log('📄 Проверка HTML структуры...');
        
        // Проверка title
        const title = document.title;
        if (title.includes('  ')) {
            this.addIssue('HTML', 'Двойные пробелы в title тега', 'low', 'Убрать лишние пробелы');
        }
        
        // Проверка meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && metaDesc.content.startsWith(' ')) {
            this.addIssue('HTML', 'Meta description начинается с пробела', 'low', 'Удалить начальный пробел');
        }
        
        // Проверка дублированного контента
        const sections = document.querySelectorAll('section');
        if (sections.length !== new Set(Array.from(sections).map(s => s.innerHTML)).size) {
            this.addIssue('HTML', 'Обнаружен дублированный контент', 'high', 'Удалить повторяющиеся секции');
        }
        
        // Проверка заголовков
        const h1 = document.querySelectorAll('h1');
        if (h1.length === 0) {
            this.addIssue('HTML', 'Отсутствует H1 заголовок', 'high', 'Добавить H1 на страницу');
        } else if (h1.length > 1) {
            this.addIssue('HTML', `Найдено ${h1.length} H1 заголовков, должен быть один`, 'medium', 'Оставить только один H1');
        }
        
        // Проверка alt атрибутов
        const images = document.querySelectorAll('img:not([alt])');
        if (images.length > 0) {
            this.addWarning('Accessibility', `${images.length} изображений без alt атрибута`, 'Добавить alt ко всем изображениям');
        }
    }

    async checkCSS() {
        console.log('🎨 Проверка CSS...');
        
        // Проверка inline стилей
        const inlineStyles = document.querySelectorAll('[style]');
        if (inlineStyles.length > 10) {
            this.addWarning('CSS', `Много inline стилей (${inlineStyles.length})`, 'Вынести в CSS файл');
        }
        
        // Проверка CSS переменных
        const rootStyle = getComputedStyle(document.documentElement);
        const primaryColor = rootStyle.getPropertyValue('--color-primary');
        if (!primaryColor) {
            this.addWarning('CSS', 'CSS переменные не определены', 'Проверить загрузку стилей');
        }
    }

    async checkJavaScript() {
        console.log('⚙️ Проверка JavaScript...');
        
        // Проверка глобальных переменных
        if (typeof window.analytics === 'undefined') {
            this.addWarning('JavaScript', 'Analytics не инициализирован', 'Подключить систему аналитики');
        }
        
        // Проверка Service Worker
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (!registration) {
                    this.addIssue('PWA', 'Service Worker не зарегистрирован', 'medium', 'Проверить регистрацию SW');
                }
            } catch (error) {
                this.addIssue('PWA', 'Ошибка Service Worker: ' + error.message, 'high', 'Исправить SW код');
            }
        }
        
        // Проверка консольных ошибок
        const originalError = console.error;
        let errorCount = 0;
        console.error = function(...args) {
            errorCount++;
            originalError.apply(console, args);
        };
        
        setTimeout(() => {
            if (errorCount > 0) {
                this.addIssue('JavaScript', `${errorCount} ошибок в консоли`, 'high', 'Исправить JavaScript ошибки');
            }
        }, 2000);
    }

    async checkPWA() {
        console.log('📱 Проверка PWA...');
        
        // Проверка манифеста
        try {
            const manifestResponse = await fetch('/manifest.webmanifest');
            if (!manifestResponse.ok) {
                this.addIssue('PWA', 'Манифест не загружается', 'high', 'Проверить путь к manifest.webmanifest');
            } else {
                const manifest = await manifestResponse.json();
                if (!manifest.name) {
                    this.addIssue('PWA', 'Отсутствует name в манифесте', 'medium', 'Добавить name в manifest');
                }
                if (!manifest.icons || manifest.icons.length === 0) {
                    this.addIssue('PWA', 'Отсутствуют иконки в манифесте', 'medium', 'Добавить иконки в manifest');
                }
            }
        } catch (error) {
            this.addIssue('PWA', 'Ошибка загрузки манифеста: ' + error.message, 'high', 'Исправить манифест');
        }
        
        // Проверка HTTPS
        if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            this.addIssue('PWA', 'Сайт не использует HTTPS', 'critical', 'Настроить SSL сертификат');
        }
    }

    async checkSEO() {
        console.log('🔍 Проверка SEO...');
        
        // Проверка robots.txt
        try {
            const robotsResponse = await fetch('/robots.txt');
            if (!robotsResponse.ok) {
                this.addWarning('SEO', 'robots.txt не найден', 'Создать robots.txt');
            }
        } catch (error) {
            this.addWarning('SEO', 'Ошибка загрузки robots.txt', 'Проверить robots.txt');
        }
        
        // Проверка sitemap.xml
        try {
            const sitemapResponse = await fetch('/sitemap.xml');
            if (!sitemapResponse.ok) {
                this.addWarning('SEO', 'sitemap.xml не найден', 'Создать sitemap.xml');
            }
        } catch (error) {
            this.addWarning('SEO', 'Ошибка загрузки sitemap.xml', 'Проверить sitemap.xml');
        }
        
        // Проверка meta тегов
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (!ogTitle) {
            this.addWarning('SEO', 'Отсутствует og:title', 'Добавить OpenGraph теги');
        }
        if (!ogDescription) {
            this.addWarning('SEO', 'Отсутствует og:description', 'Добавить OpenGraph описание');
        }
    }

    async checkAccessibility() {
        console.log('♿ Проверка доступности...');
        
        // Проверка цветового контраста
        const body = document.body;
        const bodyStyles = getComputedStyle(body);
        const backgroundColor = bodyStyles.backgroundColor;
        const color = bodyStyles.color;
        
        if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
            this.addWarning('Accessibility', 'Не определён цвет фона', 'Установить явный цвет фона');
        }
        
        // Проверка ссылок
        const links = document.querySelectorAll('a');
        const linksWithoutText = Array.from(links).filter(link => !link.textContent.trim());
        if (linksWithoutText.length > 0) {
            this.addIssue('Accessibility', `${linksWithoutText.length} ссылок без текста`, 'medium', 'Добавить текст или aria-label');
        }
    }

    async checkPerformance() {
        console.log('⚡ Проверка производительности...');
        
        // Проверка времени загрузки
        if (performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 3000) {
                this.addWarning('Performance', `Медленная загрузка: ${loadTime}ms`, 'Оптимизировать ресурсы');
            }
        }
        
        // Проверка размера ресурсов
        if (performance.getEntriesByType) {
            const resources = performance.getEntriesByType('resource');
            const largeResources = resources.filter(r => r.transferSize > 1024 * 1024); // > 1MB
            if (largeResources.length > 0) {
                this.addWarning('Performance', `${largeResources.length} больших ресурсов`, 'Сжать изображения и файлы');
            }
        }
    }

    async checkIntegrations() {
        console.log('🔌 Проверка интеграций...');
        
        // Проверка PLEX виджета
        const plexWidget = document.querySelector('#geckoterminal-embed');
        if (!plexWidget) {
            this.addIssue('Integrations', 'PLEX виджет не найден', 'medium', 'Проверить iframe с GeckoTerminal');
        } else if (plexWidget.src && !plexWidget.src.includes('geckoterminal.com')) {
            this.addIssue('Integrations', 'Неверный источник PLEX виджета', 'high', 'Исправить src iframe');
        }
        
        // Проверка Telegram ссылок
        const telegramLinks = document.querySelectorAll('a[href*="t.me"]');
        if (telegramLinks.length === 0) {
            this.addWarning('Integrations', 'Нет Telegram ссылок', 'Добавить контактные ссылки');
        }
    }

    generateReport() {
        console.log('\n📋 === ОТЧЁТ О ДИАГНОСТИКЕ ===\n');
        
        console.log(`🚨 Критичных проблем: ${this.issues.filter(i => i.severity === 'critical').length}`);
        console.log(`⚠️ Высокой важности: ${this.issues.filter(i => i.severity === 'high').length}`);
        console.log(`📝 Средней важности: ${this.issues.filter(i => i.severity === 'medium').length}`);
        console.log(`💡 Низкой важности: ${this.issues.filter(i => i.severity === 'low').length}`);
        console.log(`⚡ Предупреждений: ${this.warnings.length}`);
        
        if (this.issues.length > 0) {
            console.log('\n🛠️ Найденные проблемы:');
            this.issues.forEach((issue, index) => {
                const priority = issue.severity === 'critical' ? '🚨' : 
                                issue.severity === 'high' ? '⚠️' : 
                                issue.severity === 'medium' ? '📝' : '💡';
                console.log(`${priority} ${index + 1}. [${issue.category}] ${issue.description}`);
                if (issue.fix) console.log(`   💊 Решение: ${issue.fix}`);
            });
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚡ Предупреждения:');
            this.warnings.forEach((warning, index) => {
                console.log(`⚡ ${index + 1}. [${warning.category}] ${warning.description}`);
                if (warning.fix) console.log(`   💡 Рекомендация: ${warning.fix}`);
            });
        }
        
        const totalIssues = this.issues.length + this.warnings.length;
        if (totalIssues === 0) {
            console.log('\n🎉 Поздравляю! Критичных проблем не найдено!');
        } else {
            console.log(`\n📊 Всего найдено проблем для исправления: ${totalIssues}`);
        }
    }
}

// Автозапуск диагностики
const diagnostics = new SiteDiagnostics();
diagnostics.runFullDiagnostics();

// Экспорт для других модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteDiagnostics;
}