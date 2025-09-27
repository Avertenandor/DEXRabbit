#!/usr/bin/env node
/**
 * 🔒 Расширенное тестирование безопасности и производительности
 * Углубленная проверка веб-приложения на промышленном уровне
 */

const https = require('https');
const fs = require('fs').promises;

class AdvancedTester {
    constructor(baseUrl = 'https://xn--80apagbbfxgmuj4j.site') {
        this.baseUrl = baseUrl;
        this.results = {
            security: { passed: 0, failed: 0, warnings: 0 },
            performance: { passed: 0, failed: 0, warnings: 0 },
            accessibility: { passed: 0, failed: 0, warnings: 0 },
            seo: { passed: 0, failed: 0, warnings: 0 },
            total: 0,
            errors: []
        };
    }

    // Тестирование безопасности
    async testSecurity() {
        console.log('\n🔒 РАСШИРЕННОЕ ТЕСТИРОВАНИЕ БЕЗОПАСНОСТИ...\n');
        
        const pages = ['/', '/restaurants.html', '/gifts.html', '/contacts.html'];
        
        for (const page of pages) {
            console.log(`🔍 Проверяем безопасность: ${page}`);
            
            try {
                const response = await this.makeRequest(`${this.baseUrl}${page}`);
                const html = response.data;
                const headers = response.headers;
                
                // Проверка HTTPS
                if (this.baseUrl.startsWith('https://')) {
                    this.logSuccess('🔐 HTTPS включен');
                } else {
                    this.logError('❌ HTTPS отсутствует - критическая уязвимость');
                }
                
                // Проверка Content Security Policy
                if (headers['content-security-policy']) {
                    this.logSuccess('🛡️ CSP заголовок установлен');
                } else {
                    this.logWarning('⚠️ CSP заголовок отсутствует');
                }
                
                // Проверка X-Frame-Options
                if (headers['x-frame-options']) {
                    this.logSuccess('🖼️ X-Frame-Options защищает от clickjacking');
                } else {
                    this.logWarning('⚠️ X-Frame-Options отсутствует');
                }
                
                // Проверка X-Content-Type-Options
                if (headers['x-content-type-options']) {
                    this.logSuccess('📄 X-Content-Type-Options предотвращает MIME sniffing');
                } else {
                    this.logWarning('⚠️ X-Content-Type-Options отсутствует');
                }
                
                // Проверка на XSS уязвимости
                const xssPatterns = [
                    '<script>alert(',
                    'javascript:',
                    'onload=',
                    'onerror=',
                    'eval(',
                    'document.cookie'
                ];
                
                let xssFound = false;
                for (const pattern of xssPatterns) {
                    if (html.toLowerCase().includes(pattern.toLowerCase())) {
                        xssFound = true;
                        break;
                    }
                }
                
                if (!xssFound) {
                    this.logSuccess('✅ XSS паттерны не обнаружены');
                } else {
                    this.logError('❌ Потенциальные XSS уязвимости найдены');
                }
                
                // Проверка на SQL инъекции в формах
                const sqlPatterns = [
                    'union select',
                    'drop table',
                    'insert into',
                    'update set',
                    'delete from',
                    '\' or 1=1',
                    '"; drop table'
                ];
                
                let sqlFound = false;
                for (const pattern of sqlPatterns) {
                    if (html.toLowerCase().includes(pattern.toLowerCase())) {
                        sqlFound = true;
                        break;
                    }
                }
                
                if (!sqlFound) {
                    this.logSuccess('✅ SQL injection паттерны не найдены');
                } else {
                    this.logError('❌ Потенциальные SQL injection уязвимости');
                }
                
                // Проверка защиты форм
                if (html.includes('name="honeypot"')) {
                    this.logSuccess('🍯 Honeypot защита от ботов активна');
                } else {
                    this.logWarning('⚠️ Honeypot защита отсутствует');
                }
                
                // Проверка CSRF токенов
                if (html.includes('csrf') || html.includes('token')) {
                    this.logSuccess('🛡️ CSRF защита обнаружена');
                } else {
                    this.logWarning('⚠️ CSRF токены не обнаружены');
                }
                
            } catch (error) {
                this.logError(`❌ Ошибка тестирования безопасности ${page}: ${error.message}`);
            }
        }
    }

    // Тестирование производительности
    async testPerformance() {
        console.log('\n⚡ РАСШИРЕННОЕ ТЕСТИРОВАНИЕ ПРОИЗВОДИТЕЛЬНОСТИ...\n');
        
        const pages = [
            '/', '/restaurants.html', '/gifts.html', '/investment-model.html',
            '/development.html', '/breeding.html', '/logistics.html', '/contacts.html'
        ];
        
        const performanceResults = [];
        
        for (const page of pages) {
            console.log(`📊 Анализ производительности: ${page}`);
            
            try {
                // Множественные замеры
                const measurements = [];
                for (let i = 0; i < 5; i++) {
                    const startTime = process.hrtime.bigint();
                    const response = await this.makeRequest(`${this.baseUrl}${page}`);
                    const endTime = process.hrtime.bigint();
                    
                    const loadTime = Number(endTime - startTime) / 1000000; // в миллисекундах
                    measurements.push({
                        loadTime,
                        size: response.data.length,
                        status: response.statusCode
                    });
                }
                
                // Статистика
                const avgLoadTime = measurements.reduce((sum, m) => sum + m.loadTime, 0) / measurements.length;
                const minLoadTime = Math.min(...measurements.map(m => m.loadTime));
                const maxLoadTime = Math.max(...measurements.map(m => m.loadTime));
                const avgSize = measurements.reduce((sum, m) => sum + m.size, 0) / measurements.length;
                
                performanceResults.push({
                    page,
                    avgLoadTime: Math.round(avgLoadTime),
                    minLoadTime: Math.round(minLoadTime),
                    maxLoadTime: Math.round(maxLoadTime),
                    avgSize: Math.round(avgSize)
                });
                
                // Оценка производительности
                if (avgLoadTime < 100) {
                    this.logSuccess(`🚀 ${page}: Отличная скорость (${Math.round(avgLoadTime)}мс)`);
                } else if (avgLoadTime < 300) {
                    this.logSuccess(`✅ ${page}: Хорошая скорость (${Math.round(avgLoadTime)}мс)`);
                } else if (avgLoadTime < 1000) {
                    this.logWarning(`⚠️ ${page}: Приемлемая скорость (${Math.round(avgLoadTime)}мс)`);
                } else {
                    this.logError(`❌ ${page}: Медленная загрузка (${Math.round(avgLoadTime)}мс)`);
                }
                
                // Проверка размера
                if (avgSize < 50000) { // 50KB
                    this.logSuccess(`📦 ${page}: Оптимальный размер (${Math.round(avgSize/1024)}KB)`);
                } else if (avgSize < 100000) { // 100KB
                    this.logWarning(`⚠️ ${page}: Большой размер (${Math.round(avgSize/1024)}KB)`);
                } else {
                    this.logError(`❌ ${page}: Слишком большая страница (${Math.round(avgSize/1024)}KB)`);
                }
                
            } catch (error) {
                this.logError(`❌ Ошибка тестирования производительности ${page}: ${error.message}`);
            }
        }
        
        // Общая статистика производительности
        console.log('\n📈 СВОДКА ПО ПРОИЗВОДИТЕЛЬНОСТИ:');
        performanceResults.forEach(result => {
            console.log(`📄 ${result.page}:`);
            console.log(`   ⏱️ Среднее: ${result.avgLoadTime}мс`);
            console.log(`   ⚡ Мин/Макс: ${result.minLoadTime}мс / ${result.maxLoadTime}мс`);
            console.log(`   📦 Размер: ${Math.round(result.avgSize/1024)}KB`);
        });
    }

    // Тестирование доступности (A11Y)
    async testAccessibility() {
        console.log('\n♿ ТЕСТИРОВАНИЕ ДОСТУПНОСТИ (A11Y)...\n');
        
        const pages = ['/', '/restaurants.html', '/gifts.html', '/contacts.html'];
        
        for (const page of pages) {
            console.log(`🔍 Проверка доступности: ${page}`);
            
            try {
                const response = await this.makeRequest(`${this.baseUrl}${page}`);
                const html = response.data;
                
                // Проверка alt атрибутов для изображений
                const imgMatches = html.match(/<img[^>]*>/g) || [];
                let imagesWithoutAlt = 0;
                
                imgMatches.forEach(img => {
                    if (!img.includes('alt=')) {
                        imagesWithoutAlt++;
                    }
                });
                
                if (imagesWithoutAlt === 0) {
                    this.logSuccess('🖼️ Все изображения имеют alt атрибуты');
                } else {
                    this.logError(`❌ ${imagesWithoutAlt} изображений без alt атрибутов`);
                }
                
                // Проверка заголовков (H1-H6)
                const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
                if (h1Count === 1) {
                    this.logSuccess('📝 Корректная структура заголовков (один H1)');
                } else if (h1Count === 0) {
                    this.logError('❌ H1 заголовок отсутствует');
                } else {
                    this.logError(`❌ Множественные H1 заголовки (${h1Count})`);
                }
                
                // Проверка lang атрибута
                if (html.includes('lang="ru"')) {
                    this.logSuccess('🌐 Язык страницы указан корректно');
                } else {
                    this.logError('❌ Язык страницы не указан');
                }
                
                // Проверка form labels
                const formMatches = html.match(/<form[^>]*>[\s\S]*?<\/form>/g) || [];
                let formsWithoutLabels = 0;
                
                formMatches.forEach(form => {
                    const inputs = form.match(/<input[^>]*>/g) || [];
                    const labels = form.match(/<label[^>]*>/g) || [];
                    
                    if (inputs.length > 0 && labels.length === 0) {
                        formsWithoutLabels++;
                    }
                });
                
                if (formsWithoutLabels === 0) {
                    this.logSuccess('📋 Все формы имеют labels для полей ввода');
                } else {
                    this.logError(`❌ ${formsWithoutLabels} форм без labels`);
                }
                
                // Проверка цветовых контрастов (базовая)
                if (html.includes('color:') || html.includes('background-color:')) {
                    this.logWarning('⚠️ Рекомендуется проверить цветовые контрасты');
                }
                
                // Проверка skip links
                if (html.includes('skip') && html.includes('content')) {
                    this.logSuccess('⏭️ Skip links обнаружены');
                } else {
                    this.logWarning('⚠️ Skip links отсутствуют');
                }
                
            } catch (error) {
                this.logError(`❌ Ошибка тестирования доступности ${page}: ${error.message}`);
            }
        }
    }

    // Расширенное SEO тестирование
    async testAdvancedSEO() {
        console.log('\n🔍 РАСШИРЕННОЕ SEO ТЕСТИРОВАНИЕ...\n');
        
        const pages = [
            { path: '/', expectedKeywords: ['кролик', 'купить', 'ферма', 'инвестиции'] },
            { path: '/restaurants.html', expectedKeywords: ['ресторан', 'партнерство', 'мясо'] },
            { path: '/gifts.html', expectedKeywords: ['подарок', 'кролик', 'подарочный'] },
            { path: '/contacts.html', expectedKeywords: ['контакт', 'телефон', 'адрес'] }
        ];
        
        for (const page of pages) {
            console.log(`🔍 SEO анализ: ${page.path}`);
            
            try {
                const response = await this.makeRequest(`${this.baseUrl}${page.path}`);
                const html = response.data;
                
                // Проверка title длины
                const titleMatch = html.match(/<title>(.*?)<\/title>/);
                if (titleMatch) {
                    const titleLength = titleMatch[1].length;
                    if (titleLength >= 30 && titleLength <= 60) {
                        this.logSuccess(`📝 Оптимальная длина title (${titleLength} символов)`);
                    } else if (titleLength < 30) {
                        this.logWarning(`⚠️ Title слишком короткий (${titleLength} символов)`);
                    } else {
                        this.logWarning(`⚠️ Title слишком длинный (${titleLength} символов)`);
                    }
                }
                
                // Проверка meta description длины
                const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/);
                if (descMatch) {
                    const descLength = descMatch[1].length;
                    if (descLength >= 120 && descLength <= 160) {
                        this.logSuccess(`📄 Оптимальная длина description (${descLength} символов)`);
                    } else if (descLength < 120) {
                        this.logWarning(`⚠️ Description слишком короткий (${descLength} символов)`);
                    } else {
                        this.logWarning(`⚠️ Description слишком длинный (${descLength} символов)`);
                    }
                }
                
                // Проверка ключевых слов
                const bodyText = html.replace(/<[^>]*>/g, ' ').toLowerCase();
                const foundKeywords = page.expectedKeywords.filter(keyword => 
                    bodyText.includes(keyword.toLowerCase())
                );
                
                if (foundKeywords.length === page.expectedKeywords.length) {
                    this.logSuccess(`🎯 Все ключевые слова найдены (${foundKeywords.join(', ')})`);
                } else {
                    this.logWarning(`⚠️ Найдено ${foundKeywords.length}/${page.expectedKeywords.length} ключевых слов`);
                }
                
                // Проверка OpenGraph
                if (html.includes('og:title') && html.includes('og:description')) {
                    this.logSuccess('📱 OpenGraph метатеги настроены');
                } else {
                    this.logWarning('⚠️ OpenGraph метатеги отсутствуют');
                }
                
                // Проверка структурированных данных
                if (html.includes('application/ld+json') || html.includes('schema.org')) {
                    this.logSuccess('📊 Структурированные данные найдены');
                } else {
                    this.logWarning('⚠️ Структурированные данные отсутствуют');
                }
                
                // Проверка канонических URL
                if (html.includes('rel="canonical"')) {
                    this.logSuccess('🔗 Канонические URL настроены');
                } else {
                    this.logWarning('⚠️ Канонические URL отсутствуют');
                }
                
            } catch (error) {
                this.logError(`❌ Ошибка SEO тестирования ${page.path}: ${error.message}`);
            }
        }
    }

    // Проверка технических метрик
    async testTechnicalMetrics() {
        console.log('\n⚙️ ТЕХНИЧЕСКИЕ МЕТРИКИ...\n');
        
        try {
            // Проверка robots.txt
            const robotsResponse = await this.makeRequest(`${this.baseUrl}/robots.txt`);
            if (robotsResponse.statusCode === 200) {
                this.logSuccess('🤖 robots.txt доступен');
                
                const robotsContent = robotsResponse.data;
                if (robotsContent.includes('Sitemap:')) {
                    this.logSuccess('🗺️ Sitemap указан в robots.txt');
                } else {
                    this.logWarning('⚠️ Sitemap не указан в robots.txt');
                }
            } else {
                this.logWarning('⚠️ robots.txt недоступен');
            }
            
            // Проверка sitemap.xml
            const sitemapResponse = await this.makeRequest(`${this.baseUrl}/sitemap.xml`);
            if (sitemapResponse.statusCode === 200) {
                this.logSuccess('🗺️ sitemap.xml доступен');
                
                const sitemapContent = sitemapResponse.data;
                const urlCount = (sitemapContent.match(/<url>/g) || []).length;
                this.logSuccess(`📍 В sitemap найдено ${urlCount} URL`);
            } else {
                this.logWarning('⚠️ sitemap.xml недоступен');
            }
            
            // Проверка favicon
            const faviconResponse = await this.makeRequest(`${this.baseUrl}/favicon.ico`);
            if (faviconResponse.statusCode === 200) {
                this.logSuccess('🎨 favicon.ico найден');
            } else {
                this.logWarning('⚠️ favicon.ico отсутствует');
            }
            
            // Проверка manifest.json для PWA
            const manifestResponse = await this.makeRequest(`${this.baseUrl}/manifest.json`);
            if (manifestResponse.statusCode === 200) {
                this.logSuccess('📱 PWA manifest найден');
            } else {
                this.logWarning('⚠️ PWA manifest отсутствует');
            }
            
        } catch (error) {
            this.logError(`❌ Ошибка проверки технических метрик: ${error.message}`);
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
        this.results.total++;
        const category = this.getCurrentCategory();
        this.results[category].passed++;
    }

    logError(message) {
        console.log(message);
        this.results.total++;
        this.results.errors.push(message);
        const category = this.getCurrentCategory();
        this.results[category].failed++;
    }

    logWarning(message) {
        console.log(message);
        this.results.total++;
        const category = this.getCurrentCategory();
        this.results[category].warnings++;
    }

    getCurrentCategory() {
        const stack = new Error().stack;
        if (stack.includes('testSecurity')) return 'security';
        if (stack.includes('testPerformance')) return 'performance';
        if (stack.includes('testAccessibility')) return 'accessibility';
        if (stack.includes('testAdvancedSEO')) return 'seo';
        return 'security'; // default
    }

    // Основной метод тестирования
    async runAdvancedTests() {
        console.log('🧪 ЗАПУСК УГЛУБЛЕННОГО ТЕСТИРОВАНИЯ ПРОМЫШЛЕННОГО УРОВНЯ');
        console.log('=' + '='.repeat(70));
        console.log(`Тестируемый сайт: ${this.baseUrl}`);
        console.log('=' + '='.repeat(70));

        const startTime = Date.now();

        // Запуск всех тестов
        await this.testSecurity();
        await this.testPerformance();
        await this.testAccessibility();
        await this.testAdvancedSEO();
        await this.testTechnicalMetrics();

        // Результаты
        const totalTime = Date.now() - startTime;
        
        console.log('\n' + '='.repeat(70));
        console.log('📊 ДЕТАЛЬНЫЕ РЕЗУЛЬТАТЫ УГЛУБЛЕННОГО ТЕСТИРОВАНИЯ');
        console.log('=' + '='.repeat(70));
        
        console.log(`🔒 БЕЗОПАСНОСТЬ:`);
        console.log(`   ✅ Пройдено: ${this.results.security.passed}`);
        console.log(`   ❌ Ошибки: ${this.results.security.failed}`);
        console.log(`   ⚠️ Предупреждения: ${this.results.security.warnings}`);
        
        console.log(`⚡ ПРОИЗВОДИТЕЛЬНОСТЬ:`);
        console.log(`   ✅ Пройдено: ${this.results.performance.passed}`);
        console.log(`   ❌ Ошибки: ${this.results.performance.failed}`);
        console.log(`   ⚠️ Предупреждения: ${this.results.performance.warnings}`);
        
        console.log(`♿ ДОСТУПНОСТЬ:`);
        console.log(`   ✅ Пройдено: ${this.results.accessibility.passed}`);
        console.log(`   ❌ Ошибки: ${this.results.accessibility.failed}`);
        console.log(`   ⚠️ Предупреждения: ${this.results.accessibility.warnings}`);
        
        console.log(`🔍 SEO:`);
        console.log(`   ✅ Пройдено: ${this.results.seo.passed}`);
        console.log(`   ❌ Ошибки: ${this.results.seo.failed}`);
        console.log(`   ⚠️ Предупреждения: ${this.results.seo.warnings}`);

        const totalPassed = Object.values(this.results).reduce((sum, cat) => 
            typeof cat === 'object' && cat.passed ? sum + cat.passed : sum, 0);
        const totalFailed = Object.values(this.results).reduce((sum, cat) => 
            typeof cat === 'object' && cat.failed ? sum + cat.failed : sum, 0);
        const totalWarnings = Object.values(this.results).reduce((sum, cat) => 
            typeof cat === 'object' && cat.warnings ? sum + cat.warnings : sum, 0);

        console.log('\n📈 ОБЩАЯ СТАТИСТИКА:');
        console.log(`⏱️  Время выполнения: ${totalTime}мс`);
        console.log(`📊 Всего проверок: ${this.results.total}`);
        console.log(`✅ Успешно: ${totalPassed}`);
        console.log(`❌ Ошибки: ${totalFailed}`);
        console.log(`⚠️ Предупреждения: ${totalWarnings}`);
        console.log(`📈 Процент успеха: ${((totalPassed / this.results.total) * 100).toFixed(1)}%`);

        if (this.results.errors.length > 0) {
            console.log('\n❌ КРИТИЧЕСКИЕ ПРОБЛЕМЫ:');
            this.results.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        }

        // Сохранение отчёта
        await this.saveAdvancedReport();

        console.log('\n' + '='.repeat(70));
        if (totalFailed === 0) {
            console.log('🏆 ОТЛИЧНЫЙ РЕЗУЛЬТАТ! Критических проблем не найдено!');
        } else {
            console.log('⚠️  НАЙДЕНЫ ПРОБЛЕМЫ, ТРЕБУЮЩИЕ ВНИМАНИЯ');
        }
        console.log('=' + '='.repeat(70));
    }

    async saveAdvancedReport() {
        const report = {
            timestamp: new Date().toISOString(),
            baseUrl: this.baseUrl,
            testType: 'advanced_security_performance',
            results: this.results,
            summary: {
                totalChecks: this.results.total,
                criticalIssues: this.results.errors.length,
                status: this.results.errors.length === 0 ? 'EXCELLENT' : 'NEEDS_ATTENTION'
            }
        };

        try {
            await fs.writeFile('advanced-test-report.json', JSON.stringify(report, null, 2));
            console.log('\n💾 Углубленный отчёт сохранён в advanced-test-report.json');
        } catch (error) {
            console.log(`\n❌ Ошибка сохранения отчёта: ${error.message}`);
        }
    }
}

// Запуск тестирования
if (require.main === module) {
    const tester = new AdvancedTester();
    tester.runAdvancedTests().catch(console.error);
}

module.exports = AdvancedTester;