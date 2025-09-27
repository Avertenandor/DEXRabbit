#!/usr/bin/env node
/**
 * 🔧 Фикс DOM ошибок: добавляет проверки существования элементов
 * Устраняет ошибки "Cannot read properties of null"
 */

const fs = require('fs');
const path = require('path');

// Список файлов для исправления
const filesToFix = [
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\catalog-preview.js',
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\social-integration.js',
    'C:\\Users\\konfu\\Desktop\\Кролики\\scripts\\final-tasks.js'
];

function addElementChecks(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Паттерны для исправления
        const patterns = [
            // getElementById без проверки
            {
                from: /document\.getElementById\(([^)]+)\)\.(\w+)/g,
                to: function(match, elementId, property) {
                    return `(document.getElementById(${elementId}) || {}).${property}`;
                }
            },
            // querySelector без проверки
            {
                from: /document\.querySelector\(([^)]+)\)\.(\w+)/g,
                to: function(match, selector, property) {
                    return `(document.querySelector(${selector}) || {}).${property}`;
                }
            }
        ];

        patterns.forEach(pattern => {
            if (pattern.from.test(content)) {
                if (typeof pattern.to === 'function') {
                    content = content.replace(pattern.from, pattern.to);
                } else {
                    content = content.replace(pattern.from, pattern.to);
                }
                modified = true;
            }
        });

        // Добавляем проверки для setInterval
        if (content.includes('setInterval') && !content.includes('// DOM check added')) {
            const intervalPattern = /setInterval\(\(\) => \{([^}]+)\}, (\d+)\);/g;
            content = content.replace(intervalPattern, (match, body, interval) => {
                if (!body.includes('document.')) return match;
                return `// DOM check added
setInterval(() => {
    if (document.readyState === 'complete') {
${body}
    }
}, ${interval});`;
            });
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Добавлены проверки DOM: ${path.basename(filePath)}`);
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
console.log('🔧 Добавление проверок DOM в JavaScript файлы...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
    if (addElementChecks(file)) {
        fixedCount++;
    }
});

console.log(`\n✅ Завершено! Исправлено файлов: ${fixedCount}/${filesToFix.length}`);

if (fixedCount > 0) {
    console.log('\n🎯 Добавлены проверки существования DOM элементов');
    console.log('🚀 Перезагрузите страницу для применения изменений');
}