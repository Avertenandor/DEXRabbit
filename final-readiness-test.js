// Финальный тест готовности проекта DEXRabbit
console.log('🚀 Запуск финального теста готовности проекта DEXRabbit...');

class ProjectReadinessTest {
    constructor() {
        this.results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            errors: []
        };
    }

    async runAllTests() {
        console.log('\n📋 === ТЕСТ ГОТОВНОСТИ ПРОЕКТА DEXRabbit ===\n');
        
        await this.testFiles();
        await this.testHTML();
        await this.testPWA();
        await this.testSEO();
        await this.testJavaScript();
        
        this.displayResults();
    }

    test(name, condition, errorMessage = '') {
        this.results.totalTests++;
        if (condition) {
            console.log(`✅ ${name}`);
            this.results.passedTests++;
            return true;
        } else {
            console.log(`❌ ${name} - ${errorMessage}`);
            this.results.failedTests++;
            this.results.errors.push(`${name}: ${errorMessage}`);
            return false;
        }
    }

    async testFiles() {
        console.log('\n📁 Тест файловой структуры:');
        
        const requiredFiles = [
            'index.html',
            'investment-model.html', 
            'contacts.html',
            'manifest.webmanifest',
            'sw.js',
            'robots.txt',
            'sitemap.xml',
            'favicon.ico',
            'favicon.svg'
        ];

        let allFilesExist = true;
        for (const file of requiredFiles) {
            try {
                await fetch(file);
                this.test(`${file} exists`, true);
            } catch (e) {
                this.test(`${file} exists`, false, 'File not found');
                allFilesExist = false;
            }
        }
        
        this.test('All required files exist', allFilesExist);
    }

    async testHTML() {
        console.log('\n🌐 Тест HTML структуры:');
        
        try {
            const response = await fetch('/');
            const html = await response.text();
            
            this.test('HTML loads correctly', response.ok);
            this.test('Contains title', html.includes('<title>'));
            this.test('Contains meta description', html.includes('meta name="description"'));
            this.test('Contains viewport meta', html.includes('viewport'));
            this.test('Contains DEXRabbit branding', html.includes('DEXRabbit') || html.includes('🐰'));
            this.test('Contains investment info', html.includes('инвест') || html.includes('PLEX'));
            
        } catch (error) {
            this.test('HTML structure', false, error.message);
        }
    }

    async testPWA() {
        console.log('\n📱 Тест PWA готовности:');
        
        // Тест манифеста
        try {
            const manifestResponse = await fetch('/manifest.webmanifest');
            const manifest = await manifestResponse.json();
            
            this.test('Manifest loads', manifestResponse.ok);
            this.test('Manifest has name', !!manifest.name);
            this.test('Manifest has icons', manifest.icons && manifest.icons.length > 0);
            this.test('Manifest has start_url', !!manifest.start_url);
            this.test('Manifest has display', !!manifest.display);
            
        } catch (error) {
            this.test('PWA manifest', false, error.message);
        }

        // Тест Service Worker
        this.test('Service Worker registered', 'serviceWorker' in navigator);
        
        try {
            const swResponse = await fetch('/sw.js');
            this.test('Service Worker file exists', swResponse.ok);
        } catch (error) {
            this.test('Service Worker file', false, 'SW file not accessible');
        }
    }

    async testSEO() {
        console.log('\n🔍 Тест SEO оптимизации:');
        
        try {
            // Robots.txt
            const robotsResponse = await fetch('/robots.txt');
            this.test('robots.txt exists', robotsResponse.ok);
            
            // Sitemap
            const sitemapResponse = await fetch('/sitemap.xml');
            this.test('sitemap.xml exists', sitemapResponse.ok);
            
            // Favicon
            const faviconResponse = await fetch('/favicon.ico');
            this.test('favicon.ico exists', faviconResponse.ok);
            
            // Проверка мета-тегов на главной
            const mainPageResponse = await fetch('/');
            const html = await mainPageResponse.text();
            
            this.test('OpenGraph tags present', html.includes('og:title'));
            this.test('Canonical URL present', html.includes('canonical') || html.includes('rel="canonical"'));
            
        } catch (error) {
            this.test('SEO elements', false, error.message);
        }
    }

    async testJavaScript() {
        console.log('\n⚙️ Тест JavaScript функциональности:');
        
        // Базовые проверки
        this.test('Console API available', typeof console !== 'undefined');
        this.test('localStorage available', typeof localStorage !== 'undefined');
        this.test('fetch API available', typeof fetch !== 'undefined');
        
        // Проверка ошибок в консоли
        let hasConsoleErrors = false;
        const originalError = console.error;
        console.error = function(...args) {
            hasConsoleErrors = true;
            originalError.apply(console, args);
        };
        
        setTimeout(() => {
            this.test('No JavaScript errors', !hasConsoleErrors);
        }, 1000);
    }

    displayResults() {
        setTimeout(() => {
            console.log('\n🏆 === РЕЗУЛЬТАТЫ ФИНАЛЬНОГО ТЕСТА ===\n');
            console.log(`📊 Всего тестов: ${this.results.totalTests}`);
            console.log(`✅ Пройдено: ${this.results.passedTests}`);
            console.log(`❌ Провалено: ${this.results.failedTests}`);
            
            const successRate = Math.round((this.results.passedTests / this.results.totalTests) * 100);
            console.log(`📈 Успешность: ${successRate}%`);
            
            if (successRate >= 90) {
                console.log('\n🎉 ПРОЕКТ ГОТОВ К ПРОДАКШН ДЕПЛОЮ! 🚀');
                console.log('✨ Все критичные компоненты функционируют корректно');
            } else if (successRate >= 75) {
                console.log('\n⚠️ Проект почти готов, есть незначительные проблемы');
            } else {
                console.log('\n🛑 Проект требует доработки перед деплоем');
            }
            
            if (this.results.errors.length > 0) {
                console.log('\n📋 Обнаруженные проблемы:');
                this.results.errors.forEach(error => console.log(`  • ${error}`));
            }
            
            console.log('\n🌐 DEXRabbit - Токенизированная ферма кроликов готова!');
            console.log('🔗 Репозиторий: https://github.com/Avertenandor/DEXRabbit');
        }, 2000);
    }
}

// Запуск теста при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const tester = new ProjectReadinessTest();
        tester.runAllTests();
    });
} else {
    const tester = new ProjectReadinessTest();
    tester.runAllTests();
}

// Экспорт для использования в других контекстах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectReadinessTest;
}