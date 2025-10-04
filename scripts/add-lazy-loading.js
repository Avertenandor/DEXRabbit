const fs = require('fs');
const path = require('path');
const glob = require('glob');

function addLazyLoading() {
  console.log('⚡ Массовое добавление lazy loading...\n');
  
  // Находим все HTML файлы
  const htmlFiles = glob.sync('**/*.html', {
    ignore: ['node_modules/**', 'archive/**', 'templates/**']
  });
  
  console.log(`📁 Найдено ${htmlFiles.length} HTML файлов\n`);
  
  let totalFiles = 0;
  let totalImages = 0;
  let addedLazy = 0;
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Подсчитываем изображения ДО
    const imgBefore = (content.match(/<img[^>]*>/gi) || []).length;
    
    // Добавляем loading="lazy" и decoding="async" если их нет
    const newContent = content.replace(
      /<img(?![^>]*loading=)([^>]*?)>/gi,
      (match) => {
        addedLazy++;
        modified = true;
        // Вставляем loading и decoding после <img
        return match.replace('<img', '<img loading="lazy" decoding="async"');
      }
    );
    
    // Добавляем decoding="async" к тем, у кого есть loading но нет decoding
    const finalContent = newContent.replace(
      /<img(?=[^>]*loading=)(?![^>]*decoding=)([^>]*?)>/gi,
      (match) => {
        return match.replace('<img', '<img decoding="async"');
      }
    );
    
    if (modified || newContent !== content) {
      fs.writeFileSync(file, finalContent, 'utf8');
      totalFiles++;
      console.log(`✅ ${file} (обработано изображений: ${imgBefore})`);
    }
    
    totalImages += imgBefore;
  });
  
  console.log('\n📊 СТАТИСТИКА:');
  console.log(`   HTML файлов обновлено: ${totalFiles}/${htmlFiles.length}`);
  console.log(`   Всего <img> тегов: ${totalImages}`);
  console.log(`   Добавлено lazy loading: ${addedLazy}`);
  console.log('\n✨ Lazy loading добавлен ко всем изображениям!');
}

addLazyLoading();