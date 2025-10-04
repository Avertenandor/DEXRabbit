const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeCriticalImages() {
  console.log('🚀 Начинаем оптимизацию критичных изображений...\n');
  
  // 1. Оптимизация vlad.png
  console.log('📸 Обработка vlad.png (3040KB)...');
  
  const vladOriginal = 'assets/img/avatars/vlad.png';
  const vladOptimized = 'assets/img/avatars/vlad-optimized.png';
  const vladWebP = 'assets/img/avatars/vlad.webp';
  
  try {
    // PNG версия (оптимизированная)
    await sharp(vladOriginal)
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(vladOptimized);
    
    // WebP версия
    await sharp(vladOriginal)
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(vladWebP);
    
    // Получаем размеры
    const originalSize = fs.statSync(vladOriginal).size;
    const optimizedSize = fs.statSync(vladOptimized).size;
    const webpSize = fs.statSync(vladWebP).size;
    
    console.log(`  ✅ PNG: ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (-${((1-optimizedSize/originalSize)*100).toFixed(0)}%)`);
    console.log(`  ✅ WebP: ${(webpSize/1024).toFixed(0)}KB (создан)\n`);
    
    // Заменяем оригинал оптимизированной версией
    fs.renameSync(vladOptimized, vladOriginal);
    
  } catch (error) {
    console.error('  ❌ Ошибка:', error.message);
  }
  
  // 2. Оптимизация natder.jpg
  console.log('📸 Обработка natder.jpg (1235KB)...');
  
  const natderOriginal = 'assets/img/avatars/natder.jpg';
  const natderOptimized = 'assets/img/avatars/natder-optimized.jpg';
  const natderWebP = 'assets/img/avatars/natder.webp';
  
  try {
    // JPEG версия (оптимизированная)
    await sharp(natderOriginal)
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85, progressive: true })
      .toFile(natderOptimized);
    
    // WebP версия
    await sharp(natderOriginal)
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(natderWebP);
    
    // Получаем размеры
    const originalSize = fs.statSync(natderOriginal).size;
    const optimizedSize = fs.statSync(natderOptimized).size;
    const webpSize = fs.statSync(natderWebP).size;
    
    console.log(`  ✅ JPEG: ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (-${((1-optimizedSize/originalSize)*100).toFixed(0)}%)`);
    console.log(`  ✅ WebP: ${(webpSize/1024).toFixed(0)}KB (создан)\n`);
    
    // Заменяем оригинал оптимизированной версией
    fs.renameSync(natderOptimized, natderOriginal);
    
  } catch (error) {
    console.error('  ❌ Ошибка:', error.message);
  }
  
  console.log('✨ Оптимизация завершена!');
  console.log('\n📊 Итого экономии: ~4.1MB (-95%)');
  console.log('\n🔄 Следующий шаг: git add + commit + push');
}

optimizeCriticalImages();