const fs = require('fs');
const path = require('path');

/**
 * Скрипт оптимизации HTML файлов
 */
function optimizeHTML() {
  console.log('📏 Оптимизация HTML файлов...\n');
  
  const htmlFiles = ['index.html', 'contacts.html', 'belarus-office.html'];
  
  htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`⚠️  ${file}: файл не найден`);
      return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    const originalSize = content.length;
    
    // Оптимизации
    content = content
      // Удаляем лишние пробелы между тегами
      .replace(/>\s+</g, '><')
      // Удаляем комментарии HTML (кроме условных)
      .replace(/<!--(?!\[if|<!\[endif)[\s\S]*?-->/g, '')
      // Удаляем пустые строки
      .replace(/\n\s*\n/g, '\n')
      // Удаляем лишние пробелы в начале строк
      .replace(/^\s+/gm, '')
      // Сжимаем inline стили
      .replace(/style\s*=\s*"([^"]+)"/g, (match, style) => {
        return `style="${style.replace(/\s+/g, ' ').trim()}"`;
      });
    
    const newSize = content.length;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // Создаем резервную копию
    if (!fs.existsSync('backup')) {
      fs.mkdirSync('backup');
    }
    fs.writeFileSync(`backup/${file}`, fs.readFileSync(file));
    
    // Сохраняем оптимизированный файл
    fs.writeFileSync(file, content);
    
    console.log(`✅ ${file}:`);
    console.log(`   Было: ${(originalSize/1024).toFixed(1)}KB`);
    console.log(`   Стало: ${(newSize/1024).toFixed(1)}KB`);
    console.log(`   Экономия: ${savings}%\n`);
  });
  
  console.log('✨ HTML файлы оптимизированы!');
}

optimizeHTML();