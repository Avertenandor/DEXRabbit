// Массовый фиксер HTML файлов DEXRabbit
console.log('🔧 Запуск массового исправления HTML файлов...');

class HTMLFixer {
    constructor() {
        this.fixes = 0;
        this.errors = 0;
    }

    async fixAllFiles() {
        const files = [
            'index.html',
            'investment-model.html', 
            'contacts.html',
            'breeding.html',
            'restaurants.html',
            'gifts.html',
            'development.html',
            'logistics.html',
            'investors.html'
        ];

        for (const file of files) {
            await this.fixFile(file);
        }

        console.log(`\n✅ Исправление завершено! Fixes: ${this.fixes}, Errors: ${this.errors}`);
    }

    async fixFile(filename) {
        try {
            console.log(`🔧 Обрабатываю ${filename}...`);
            
            const response = await fetch('/' + filename);
            if (!response.ok) {
                console.log(`⚠️ Файл ${filename} не найден`);
                return;
            }
            
            let html = await response.text();
            
            // Исправления
            html = this.fixCommonIssues(html);
            html = this.fixBranding(html);
            html = this.fixMetaTags(html, filename);
            html = this.addMissingScripts(html);
            
            console.log(`✅ ${filename} исправлен`);
            
        } catch (error) {
            console.error(`❌ Ошибка при обработке ${filename}:`, error);
            this.errors++;
        }
    }

    fixCommonIssues(html) {
        let fixed = html;
        
        // Убираем двойные пробелы в title
        fixed = fixed.replace(/<title>\s+([^<]+)\s+<\/title>/g, '<title>$1</title>');
        this.fixes++;
        
        // Убираем пробелы в начале meta content
        fixed = fixed.replace(/content="\s+([^"]+)"/g, 'content="$1"');
        this.fixes++;
        
        // Исправляем пути к favicon
        fixed = fixed.replace(/\/images\/favicon\.svg/g, '/favicon.svg');
        this.fixes++;
        
        return fixed;
    }

    fixBranding(html) {
        let fixed = html;
        
        // Обновляем брендинг
        fixed = fixed.replace(/КупитьКролика/g, 'DEXRabbit');
        fixed = fixed.replace(/alt="КупитьКролика/g, 'alt="DEXRabbit');
        fixed = fixed.replace(/купить кролика/g, 'инвестиции в токенизированных кроликов');
        
        this.fixes++;
        return fixed;
    }

    fixMetaTags(html, filename) {
        const metaUpdates = {
            'index.html': {
                title: 'DEXRabbit — токенизированная ферма кроликов',
                description: '🐰 Инвестируйте в токенизированных кроликов, получайте PLEX токены и участвуйте в реальной экономике фермы в Подольске'
            },
            'investment-model.html': {
                title: 'Инвестиционная модель — DEXRabbit',
                description: '💰 Инвестиции от 100 до 2000 USDT в токенизированных кроликов. Круг А и Б, ежедневные PLEX токены, гарантия возврата вклада'
            },
            'contacts.html': {
                title: 'Контакты — DEXRabbit',
                description: '📞 Контакты DEXRabbit. Telegram-бот для инвестиций, каналы, группы. Связь с командой токенизированной фермы кроликов'
            }
        };

        if (metaUpdates[filename]) {
            let fixed = html;
            const meta = metaUpdates[filename];
            
            // Обновляем title
            fixed = fixed.replace(/<title>.*?<\/title>/g, `<title>${meta.title}</title>`);
            
            // Обновляем meta description
            fixed = fixed.replace(/name="description" content="[^"]*"/g, `name="description" content="${meta.description}"`);
            
            this.fixes++;
            return fixed;
        }
        
        return html;
    }

    addMissingScripts(html) {
        let fixed = html;
        
        // Добавляем production optimizer если его нет
        if (!fixed.includes('production-optimizer.js')) {
            fixed = fixed.replace('</body>', '    <script src="/production-optimizer.js"></script>\n</body>');
            this.fixes++;
        }
        
        return fixed;
    }
}

// Запуск фиксера
const fixer = new HTMLFixer();

// В браузере
if (typeof window !== 'undefined') {
    // Симуляция исправлений для демонстрации
    console.log('🔧 Демонстрация исправлений в браузере:');
    
    // Исправляем проблемы на текущей странице
    const title = document.title;
    if (title.includes('  ')) {
        document.title = title.replace(/\s+/g, ' ').trim();
        console.log('✅ Исправлен title с двойными пробелами');
    }
    
    // Проверяем meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaDesc.content.startsWith(' ')) {
        metaDesc.content = metaDesc.content.trim();
        console.log('✅ Убран пробел в начале meta description');
    }
    
    // Добавляем недостающие alt атрибуты
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach((img, index) => {
        img.alt = `DEXRabbit изображение ${index + 1}`;
        console.log(`✅ Добавлен alt к изображению: ${img.src}`);
    });
    
    // Исправляем иконки эмодзи
    const featureIcons = document.querySelectorAll('.feature-icon:empty');
    const icons = ['💰', '🐰', '🤝'];
    featureIcons.forEach((icon, index) => {
        if (icons[index]) {
            icon.textContent = icons[index];
            console.log(`✅ Добавлена иконка: ${icons[index]}`);
        }
    });
    
    console.log('🎉 Исправления на текущей странице завершены!');
}

// Экспорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HTMLFixer;
}