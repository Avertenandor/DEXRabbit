const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeGallery() {
  console.log('🖼️  Начинаем массовую оптимизацию gallery...\n');
  
  const galleryDir = 'gallery';
  const files = fs.readdirSync(galleryDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  console.log(`📁 Найдено ${files.length} изображений\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;
  
  // Создаем папку для бэкапов
  const backupDir = path.join(galleryDir, 'originals');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  for (const file of files) {
    const inputPath = path.join(galleryDir, file);
    const outputPath = path.join(galleryDir, `optimized-${file}`);
    const webpPath = path.join(galleryDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    const backupPath = path.join(backupDir, file);
    
    try {
      // Получаем исходный размер
      const originalSize = fs.statSync(inputPath).size;
      totalOriginal += originalSize;
      
      // Копируем оригинал в бэкап
      fs.copyFileSync(inputPath, backupPath);
      
      // Определяем формат
      const isJpeg = /\.(jpg|jpeg)$/i.test(file);
      const isPng = /\.png$/i.test(file);
      
      // Оптимизируем
      if (isJpeg) {
        await sharp(inputPath)
          .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 75, progressive: true })
          .toFile(outputPath);
      } else if (isPng) {
        await sharp(inputPath)
          .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
          .png({ quality: 75, compressionLevel: 9 })
          .toFile(outputPath);
      }
      
      // Создаем WebP
      await sharp(inputPath)
        .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpPath);
      
      // Заменяем оригинал оптимизированной версией
      const optimizedSize = fs.statSync(outputPath).size;
      const webpSize = fs.statSync(webpPath).size;
      totalOptimized += optimizedSize;
      
      fs.renameSync(outputPath, inputPath);
      
      processedCount++;
      const savings = ((1 - optimizedSize/originalSize) * 100).toFixed(0);
      console.log(`✅ ${processedCount}/${files.length} ${file}`);
      console.log(`   ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (-${savings}%) | WebP: ${(webpSize/1024).toFixed(0)}KB`);
      
    } catch (error) {
      console.error(`❌ Ошибка при обработке ${file}:`, error.message);
    }
  }
  
  console.log('\n📊 ИТОГОВАЯ СТАТИСТИКА:');
  console.log(`   Обработано файлов: ${processedCount}/${files.length}`);
  console.log(`   Исходный размер: ${(totalOriginal/1024/1024).toFixed(1)}MB`);
  console.log(`   Оптимизированный: ${(totalOptimized/1024/1024).toFixed(1)}MB`);
  console.log(`   Экономия: ${(totalOriginal/1024/1024 - totalOptimized/1024/1024).toFixed(1)}MB (-${((1-totalOptimized/totalOriginal)*100).toFixed(0)}%)`);
  console.log('\n✨ Оптимизация gallery завершена!');
  console.log('💾 Оригиналы сохранены в gallery/originals/');
}

optimizeGallery();