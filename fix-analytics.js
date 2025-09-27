#!/usr/bin/env node
/**
 * 🔧 Фикс аналитики: заменяет trackEvent на window.analytics.trackEvent
 * Устраняет ошибки "trackEvent is not defined"
 */

const fs = require('fs');
const path = require('path');

// Список файлов для исправления
const filesToFix = [
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\contacts.js',
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\consultant.js',
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\advanced-features.js',
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\social-integration.js',
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\final-tasks.js'
];

function fixAnalyticsInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Заменяем все вхождения typeof trackEvent на window.analytics
        const patterns = [
            {
                from: /typeof trackEvent === 'function'/g,
                to: "window.analytics && typeof window.analytics.trackEvent === 'function'"
            },
            {
                from: /trackEvent\(/g,
                to: "window.analytics.trackEvent("
            }
        ];

        patterns.forEach(pattern => {
            if (pattern.from.test(content)) {
                content = content.replace(pattern.from, pattern.to);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Исправлен: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚪ Без изменений: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Ошибка в ${path.basename(filePath)}:`, error.message);
        return false;
    }
}

// Исправляем все файлы
console.log('🔧 Исправление аналитики в JavaScript файлах...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
    if (fixAnalyticsInFile(file)) {
        fixedCount++;
    }
});

console.log(`\n✅ Завершено! Исправлено файлов: ${fixedCount}/${filesToFix.length}`);

if (fixedCount > 0) {
    console.log('\n🎯 Теперь все вызовы trackEvent используют window.analytics.trackEvent');
    console.log('🚀 Перезагрузите страницу для применения изменений');
}