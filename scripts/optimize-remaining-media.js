const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function optimizeRemainingMedia() {
  console.log('🎬 Завершающая оптимизация media файлов...\n');
  
  // Ищем все изображения в assets/media
  const mediaFiles = glob.sync('assets/media/**/*.{jpg,jpeg,png}', {
    ignore: ['**/originals/**']
  });
  
  if (mediaFiles.length === 0) {
    console.log('✅ Все media файлы уже оптимизированы!');
    return;
  }
  
  console.log(`📁 Найдено ${mediaFiles.length} необработанных файлов\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const filePath of mediaFiles) {
    const dir = path.dirname(filePath);
    const filename = path.basename(filePath);
    const backupDir = path.join(dir, 'originals');
    
    // Создаем папку для бэкапов
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupPath = path.join(backupDir, filename);
    const outputPath = path.join(dir, `optimized-${filename}`);
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    try {
      const originalSize = fs.statSync(filePath).size;
      totalOriginal += originalSize;
      
      // Бэкап
      fs.copyFileSync(filePath, backupPath);
      
      // Определяем формат
      const ext = path.extname(filePath).toLowerCase();
      
      // Оптимизируем (800x600 для media)
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(filePath)
          .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toFile(outputPath);
      } else if (ext === '.png') {
        await sharp(filePath)
          .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(outputPath);
      }
      
      // WebP
      await sharp(filePath)
        .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const optimizedSize = fs.statSync(outputPath).size;
      const webpSize = fs.statSync(webpPath).size;
      totalOptimized += optimizedSize;
      
      // Заменяем
      fs.renameSync(outputPath, filePath);
      
      const savings = ((1 - optimizedSize/originalSize) * 100).toFixed(0);
      console.log(`✅ ${filename}`);
      console.log(`   ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (-${savings}%) | WebP: ${(webpSize/1024).toFixed(0)}KB`);
      
    } catch (error) {
      console.error(`❌ ${filename}:`, error.message);
    }
  }
  
  console.log('\n📊 ФИНАЛЬНАЯ СТАТИСТИКА:');
  console.log(`   Файлов обработано: ${mediaFiles.length}`);
  console.log(`   Экономия: ${(totalOriginal/1024).toFixed(0)}KB → ${(totalOptimized/1024).toFixed(0)}KB (-${((1-totalOptimized/totalOriginal)*100).toFixed(0)}%)`);
  console.log('\n✨ ВСЕ изображения проекта оптимизированы!');
}

optimizeRemainingMedia();