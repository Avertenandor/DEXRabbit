// Финальное устранение дубликатов контента DEXRabbit
console.log('🧹 Запуск финального устранения дубликатов контента...');

class DuplicateContentRemover {
    constructor() {
        this.removedCount = 0;
        this.processedSections = new Map();
    }

    removeDuplicates() {
        console.log('🔍 Поиск и удаление дублированных секций...');
        
        const sections = document.querySelectorAll('section');
        const seenContent = new Set();
        const duplicatesToRemove = [];

        sections.forEach((section, index) => {
            // Создаем хеш контента секции
            const contentText = section.textContent.replace(/\s+/g, ' ').trim();
            const contentHash = this.hashString(contentText);
            
            console.log(`Секция ${index + 1}: "${contentText.substring(0, 50)}..." Hash: ${contentHash}`);
            
            if (seenContent.has(contentHash) && contentText.length > 50) {
                // Это дубликат
                duplicatesToRemove.push(section);
                console.log(`❌ Дубликат найден: секция ${index + 1}`);
            } else {
                seenContent.add(contentHash);
                console.log(`✅ Уникальная секция ${index + 1}`);
            }
        });
        
        // Удаляем дубликаты
        duplicatesToRemove.forEach((section, index) => {
            section.style.display = 'none';
            section.setAttribute('data-duplicate', 'true');
            this.removedCount++;
            console.log(`🗑️ Скрыт дубликат ${index + 1}`);
        });
        
        if (this.removedCount > 0) {
            console.log(`✅ Удалено ${this.removedCount} дублированных секций`);
            
            // Показываем уведомление
            this.showNotification(`Исправлено: удалено ${this.removedCount} дублированных секций`);
        } else {
            console.log('✅ Дубликаты не найдены');
        }
        
        return this.removedCount;
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
        `;
        notification.textContent = `🧹 ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Дополнительные исправления
    fixCommonIssues() {
        console.log('🛠️ Исправление общих проблем...');
        
        // Исправляем пустые feature-icon
        const emptyIcons = document.querySelectorAll('.feature-icon:empty');
        const icons = ['💰', '🐰', '🤝'];
        emptyIcons.forEach((icon, index) => {
            if (icons[index]) {
                icon.textContent = icons[index];
                console.log(`✅ Добавлена иконка: ${icons[index]}`);
            }
        });
        
        // Исправляем title и meta если нужно
        if (document.title.includes('  ')) {
            document.title = document.title.replace(/\s+/g, ' ').trim();
            console.log('✅ Исправлен title с двойными пробелами');
        }
        
        // Добавляем alt к изображениям без него
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        imagesWithoutAlt.forEach((img, index) => {
            img.alt = `DEXRabbit изображение ${index + 1}`;
            console.log(`✅ Добавлен alt: ${img.alt}`);
        });
        
        return true;
    }
}

// Автозапуск после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const remover = new DuplicateContentRemover();
            remover.removeDuplicates();
            remover.fixCommonIssues();
        }, 1000);
    });
} else {
    setTimeout(() => {
        const remover = new DuplicateContentRemover();
        remover.removeDuplicates();
        remover.fixCommonIssues();
    }, 1000);
}

// Экспорт для тестирования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuplicateContentRemover;
}