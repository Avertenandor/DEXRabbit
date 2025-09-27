#!/usr/bin/env node
/**
 * 🧪 Быстрая система тестирования КупитьКролика
 * Простое, но эффективное тестирование без тяжёлых зависимостей
 */

const https = require('https');
const fs = require('fs').promises;

class QuickTester {
    constructor(baseUrl = 'https://xn--80apagbbfxgmuj4j.site') {
        this.baseUrl = baseUrl;
        this.results = {
            total: 0,
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    // Проверка доступности страницы
    async testPageAccess(path, expectedTitle) {
        try {
            const url = `${this.baseUrl}${path}`;
            console.log(`🔍 Тестируем: ${url}`);
            
            const response = await this.makeRequest(url);
            
            // Проверяем статус код
            if (response.statusCode !== 200) {
                throw new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`);
            }
            
            // Проверяем содержимое
            const html = response.data;
            
            // Базовые проверки HTML
            if (!html.includes('<!DOCTYPE html>')) {
                throw new Error('Отсутствует DOCTYPE');
            }
            
            if (!html.includes('<html lang="ru">')) {
                throw new Error('Отсутствует lang="ru"');
            }
            
            // Проверяем title
            const titleMatch = html.match(/<title>(.*?)<\/title>/);
            if (!titleMatch) {
                throw new Error('Отсутствует тег <title>');
            }
            
            const actualTitle = titleMatch[1];
            if (expectedTitle && !actualTitle.includes(expectedTitle)) {
                throw new Error(`Неверный title. Ожидался: ${expectedTitle}, получен: ${actualTitle}`);
            }
            
            // Проверяем мета-теги
            if (!html.includes('meta name="viewport"')) {
                throw new Error('Отсутствует viewport meta');
            }
            
            if (!html.includes('meta charset="UTF-8"')) {
                throw new Error('Отсутствует UTF-8 charset');
            }
            
            // Проверяем основные CSS
            if (!html.includes('styles/global.css')) {
                throw new Error('Не подключен global.css');
            }
            
            this.logSuccess(`✅ ${path} - OK (${html.length} bytes)`);
            return true;
            
        } catch (error) {
            this.logError(`❌ ${path} - ОШИБКА: ${error.message}`);
            return false;
        }
    }

    // Тестирование форм
    async testForms() {
        console.log('\n📝 Тестирование форм...');
        
        const forms = [
            { page: '/', formId: 'investment-form', name: 'Форма инвестиций' },
            { page: '/restaurants.html', formId: 'partnership-form', name: 'Форма партнерства' },
            { page: '/gifts.html', formId: 'gift-form', name: 'Форма подарков' },
            { page: '/breeding.html', formId: 'breeding-form', name: 'Форма селекции' },
            { page: '/contacts.html', formId: 'contact-form', name: 'Форма обратной связи' }
        ];
        
        for (const form of forms) {
            try {
                const response = await this.makeRequest(`${this.baseUrl}${form.page}`);
                const html = response.data;
                
                if (html.includes(`id="${form.formId}"`)) {
                    this.logSuccess(`✅ ${form.name} найдена`);
                } else {
                    throw new Error(`Форма ${form.formId} не найдена`);
                }
                
                // Проверяем защиту от спама
                if (html.includes('name="honeypot"')) {
                    this.logSuccess(`🛡️ ${form.name} защищена от спама`);
                }
                
            } catch (error) {
                this.logError(`❌ ${form.name}: ${error.message}`);
            }
        }
    }

    // Тестирование производительности
    async testPerformance() {
        console.log('\n⚡ Тестирование производительности...');
        
        const pages = ['/', '/restaurants.html', '/gifts.html', '/investment-model.html'];
        
        for (const page of pages) {
            try {
                const startTime = Date.now();
                const response = await this.makeRequest(`${this.baseUrl}${page}`);
                const loadTime = Date.now() - startTime;
                
                if (loadTime < 3000) {
                    this.logSuccess(`🚀 ${page} загружается за ${loadTime}мс (БЫСТРО)`);
                } else if (loadTime < 5000) {
                    this.logWarning(`⚠️ ${page} загружается за ${loadTime}мс (МЕДЛЕННО)`);
                } else {
                    throw new Error(`Очень медленная загрузка: ${loadTime}мс`);
                }
                
                // Проверяем размер
                const size = response.data.length;
                if (size > 500000) { // 500KB
                    this.logWarning(`⚠️ ${page} слишком большая: ${(size/1024).toFixed(1)}KB`);
                }
                
            } catch (error) {
                this.logError(`❌ ${page}: ${error.message}`);
            }
        }
    }

    // Тестирование мобильности
    async testMobileResponsiveness() {
        console.log('\n📱 Тестирование адаптивности...');
        
        const pages = ['/', '/restaurants.html', '/gifts.html'];
        
        for (const page of pages) {
            try {
                const response = await this.makeRequest(`${this.baseUrl}${page}`);
                const html = response.data;
                
                // Проверяем viewport
                if (html.includes('viewport') && html.includes('width=device-width')) {
                    this.logSuccess(`📱 ${page} имеет viewport meta`);
                } else {
                    throw new Error('Отсутствует правильный viewport');
                }
                
                // Проверяем адаптивные стили
                if (html.includes('media') || html.includes('@media')) {
                    this.logSuccess(`📐 ${page} имеет медиа-запросы`);
                }
                
            } catch (error) {
                this.logError(`❌ ${page}: ${error.message}`);
            }
        }
    }

    // Тестирование безопасности
    async testSecurity() {
        console.log('\n🔒 Тестирование безопасности...');
        
        try {
            const response = await this.makeRequest(this.baseUrl);
            const html = response.data;
            const headers = response.headers;
            
            // Проверяем HTTPS
            if (this.baseUrl.startsWith('https://')) {
                this.logSuccess('🔐 Используется HTTPS');
            } else {
                this.logWarning('⚠️ НЕ используется HTTPS');
            }
            
            // Проверяем защиту от XSS
            if (html.includes('CSP') || headers['content-security-policy']) {
                this.logSuccess('🛡️ CSP заголовки настроены');
            }
            
            // Проверяем мета-теги безопасности
            if (html.includes('X-Frame-Options') || html.includes('X-Content-Type-Options')) {
                this.logSuccess('🔒 Мета-теги безопасности найдены');
            }
            
        } catch (error) {
            this.logError(`❌ Тест безопасности: ${error.message}`);
        }
    }

    // Тестирование SEO
    async testSEO() {
        console.log('\n🔍 Тестирование SEO...');
        
        const pages = [
            { path: '/', title: 'КупитьКролика' },
            { path: '/restaurants.html', title: 'Ресторанам' },
            { path: '/gifts.html', title: 'Подарки' },
            { path: '/investment-model.html', title: 'Инвестиционная модель' },
            { path: '/development.html', title: 'Развитие' },
            { path: '/breeding.html', title: 'Племенная ценность' },
            { path: '/logistics.html', title: 'Логистика' },
            { path: '/contacts.html', title: 'Контакты' }
        ];
        
        for (const page of pages) {
            try {
                const response = await this.makeRequest(`${this.baseUrl}${page.path}`);
                const html = response.data;
                
                // Проверяем title
                if (html.includes(`<title>`) && html.includes(page.title)) {
                    this.logSuccess(`📄 ${page.path} имеет корректный title`);
                } else {
                    throw new Error(`Некорректный или отсутствующий title`);
                }
                
                // Проверяем description
                if (html.includes('name="description"') && html.includes('content=')) {
                    this.logSuccess(`📝 ${page.path} имеет description`);
                } else {
                    this.logWarning(`⚠️ ${page.path} не имеет description`);
                }
                
                // Проверяем H1
                if (html.includes('<h1')) {
                    this.logSuccess(`🔤 ${page.path} имеет H1`);
                } else {
                    this.logWarning(`⚠️ ${page.path} не имеет H1`);
                }
                
                // Проверяем структурированные данные
                if (html.includes('application/ld+json') || html.includes('schema.org')) {
                    this.logSuccess(`📊 ${page.path} имеет структурированные данные`);
                }
                
            } catch (error) {
                this.logError(`❌ ${page.path}: ${error.message}`);
            }
        }
    }

    // Функциональное тестирование JavaScript
    async testJavaScript() {
        console.log('\n⚙️ Тестирование JavaScript...');
        
        const scripts = [
            '/scripts/analytics.js',
            '/scripts/social-integration.js',
            '/scripts/catalog-preview.js'
        ];
        
        for (const script of scripts) {
            try {
                const response = await this.makeRequest(`${this.baseUrl}${script}`);
                
                if (response.statusCode === 200) {
                    this.logSuccess(`📜 ${script} загружается`);
                    
                    // Базовая проверка синтаксиса
                    const js = response.data;
                    if (js.includes('function') || js.includes('=>') || js.includes('const')) {
                        this.logSuccess(`✅ ${script} содержит валидный JS`);
                    }
                } else {
                    throw new Error(`HTTP ${response.statusCode}`);
                }
                
            } catch (error) {
                this.logError(`❌ ${script}: ${error.message}`);
            }
        }
    }

    // Утилитарные методы
    makeRequest(url) {
        return new Promise((resolve, reject) => {
            const request = https.get(url, (response) => {
                let data = '';
                
                response.on('data', (chunk) => {
                    data += chunk;
                });
                
                response.on('end', () => {
                    resolve({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage,
                        headers: response.headers,
                        data: data
                    });
                });
            });
            
            request.on('error', (error) => {
                reject(error);
            });
            
            request.setTimeout(10000, () => {
                request.destroy();
                reject(new Error('Таймаут запроса'));
            });
        });
    }

    logSuccess(message) {
        console.log(message);
        this.results.passed++;
        this.results.total++;
    }

    logError(message) {
        console.log(message);
        this.results.failed++;
        this.results.total++;
        this.results.errors.push(message);
    }

    logWarning(message) {
        console.log(message);
        this.results.total++;
    }

    // Основной метод тестирования
    async runAllTests() {
        console.log('🚀 ЗАПУСК КОМПЛЕКСНОГО ТЕСТИРОВАНИЯ САЙТА');
        console.log('=' + '='.repeat(60));
        console.log(`Тестируемый сайт: ${this.baseUrl}`);
        console.log('=' + '='.repeat(60));

        const startTime = Date.now();

        // Тестирование доступности страниц
        console.log('\n📄 Тестирование доступности страниц...');
        const pages = [
            { path: '/', title: 'КупитьКролика' },
            { path: '/restaurants.html', title: 'Ресторанам' },
            { path: '/gifts.html', title: 'Подарки' },
            { path: '/investment-model.html', title: 'Инвестиционная модель' },
            { path: '/development.html', title: 'Развитие' },
            { path: '/breeding.html', title: 'Племенная ценность' },
            { path: '/logistics.html', title: 'Логистика' },
            { path: '/contacts.html', title: 'Контакты' }
        ];

        for (const page of pages) {
            await this.testPageAccess(page.path, page.title);
        }

        // Запуск всех остальных тестов
        await this.testForms();
        await this.testPerformance();
        await this.testMobileResponsiveness();
        await this.testSecurity();
        await this.testSEO();
        await this.testJavaScript();

        // Результаты
        const totalTime = Date.now() - startTime;
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 ИТОГОВЫЕ РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ');
        console.log('=' + '='.repeat(60));
        console.log(`⏱️  Время выполнения: ${totalTime}мс`);
        console.log(`📊 Всего тестов: ${this.results.total}`);
        console.log(`✅ Успешно: ${this.results.passed}`);
        console.log(`❌ Неудачно: ${this.results.failed}`);
        console.log(`📈 Процент успеха: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);

        if (this.results.errors.length > 0) {
            console.log('\n❌ НАЙДЕННЫЕ ПРОБЛЕМЫ:');
            this.results.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        }

        // Сохранение отчёта
        await this.saveReport();

        console.log('\n' + '='.repeat(60));
        if (this.results.failed === 0) {
            console.log('🎉 ВСЕ ТЕСТЫ ПРОШЛИ УСПЕШНО!');
        } else {
            console.log('⚠️  НАЙДЕНЫ ПРОБЛЕМЫ, ТРЕБУЮЩИЕ ВНИМАНИЯ');
        }
        console.log('=' + '='.repeat(60));
    }

    async saveReport() {
        const report = {
            timestamp: new Date().toISOString(),
            baseUrl: this.baseUrl,
            results: this.results,
            summary: {
                status: this.results.failed === 0 ? 'PASSED' : 'FAILED',
                successRate: `${((this.results.passed / this.results.total) * 100).toFixed(1)}%`
            }
        };

        try {
            await fs.writeFile('test-report.json', JSON.stringify(report, null, 2));
            console.log('\n💾 Отчёт сохранён в test-report.json');
        } catch (error) {
            console.log(`\n❌ Ошибка сохранения отчёта: ${error.message}`);
        }
    }
}

// Запуск тестирования
if (require.main === module) {
    const tester = new QuickTester();
    tester.runAllTests().catch(console.error);
}

module.exports = QuickTester;