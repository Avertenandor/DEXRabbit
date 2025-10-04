const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function addImageDimensions() {
  console.log('📏 Добавление width/height атрибутов...\n');
  
  // Получаем размеры всех изображений
  const imagePaths = glob.sync('{assets,gallery}/**/*.{jpg,jpeg,png}', {
    ignore: ['**/originals/**']
  });
  
  const dimensions = {};
  
  console.log('📊 Получение размеров изображений...\n');
  
  for (const imgPath of imagePaths) {
    try {
      const metadata = await sharp(imgPath).metadata();
      dimensions[imgPath] = {
        width: metadata.width,
        height: metadata.height
      };
      console.log(`✅ ${imgPath}: ${metadata.width}x${metadata.height}`);
    } catch (e) {
      console.log(`⚠️  ${imgPath}: ошибка чтения`);
    }
  }
  
  // Сохраняем mapping
  fs.writeFileSync('image-dimensions.json', JSON.stringify(dimensions, null, 2));
  console.log('\n📄 Создан файл: image-dimensions.json\n');
  
  // Обновляем HTML файлы
  const htmlFiles = glob.sync('**/*.html', {
    ignore: ['node_modules/**', 'archive/**', 'templates/**']
  });
  
  let totalUpdated = 0;
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Добавляем width/height к img без этих атрибутов
    content = content.replace(
      /<img([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi,
      (match, before, src, after) => {
        // Пропускаем если уже есть width и height
        if (match.includes('width=') && match.includes('height=')) {
          return match;
        }
        
        // Нормализуем путь к изображению
        const imgPath = src.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
        
        // Ищем размеры
        for (const [path, dims] of Object.entries(dimensions)) {
          if (path.includes(imgPath) || imgPath.includes(path.split('/').pop())) {
            modified = true;
            totalUpdated++;
            return `<img${before}src="${src}" width="${dims.width}" height="${dims.height}"${after}>`;
          }
        }
        
        return match;
      }
    );
    
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ ${file}`);
    }
  });
  
  console.log(`\n📊 ИТОГО: width/height добавлены к ${totalUpdated} изображениям`);
}

addImageDimensions();