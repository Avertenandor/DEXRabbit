const fs = require('fs');
const path = require('path');
const glob = require('glob');

function integrateWebP() {
  console.log('🖼️  Интеграция WebP через <picture> элементы...\n');
  
  const htmlFiles = glob.sync('**/*.html', {
    ignore: ['node_modules/**', 'archive/**', 'templates/**']
  });
  
  let totalFiles = 0;
  let totalPictures = 0;
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Находим все <img> с существующими WebP версиями
    content = content.replace(
      /<img([^>]*?)src=["']([^"']*?\.(jpg|jpeg|png))["']([^>]*?)>/gi,
      (match, before, imgPath, ext, after) => {
        // Проверяем существование WebP версии
        const webpPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const fullWebpPath = path.join(path.dirname(file), webpPath);
        
        // Пропускаем если уже в <picture>
        if (match.includes('picture')) return match;
        
        // Проверяем существование WebP файла
        try {
          if (fs.existsSync(fullWebpPath)) {
            modified = true;
            totalPictures++;
            
            // Создаем <picture> элемент
            return `<picture>
  <source type="image/webp" srcset="${webpPath}">
  <img${before}src="${imgPath}"${after}>
</picture>`;
          }
        } catch (e) {
          // Файл не найден, пропускаем
        }
        
        return match;
      }
    );
    
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      totalFiles++;
      console.log(`✅ ${file}`);
    }
  });
  
  console.log('\n📊 СТАТИСТИКА:');
  console.log(`   HTML файлов обновлено: ${totalFiles}`);
  console.log(`   <picture> элементов создано: ${totalPictures}`);
  console.log('\n✨ WebP интеграция завершена!');
}

integrateWebP();