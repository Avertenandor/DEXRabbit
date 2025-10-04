const fs = require('fs');
const path = require('path');

/**
 * Скрипт объединения всех CSS файлов в один
 */
function combineCSSFiles() {
  console.log('🔧 Объединение CSS файлов...\n');
  
  // Порядок загрузки CSS (критичность)
  const cssFiles = [
    'assets/css/variables.css',
    'assets/css/main.css',
    'assets/css/performance.css',
    'assets/css/responsive-extreme.css',
    'assets/css/ultimate-responsive.css',
    'assets/css/mobile-critical-fix.css',
    'assets/css/navigation-beautiful.css',
    'assets/css/buttons-effects.css',
    'assets/css/spacing-normalize.css',
    'assets/css/centering-fixes.css',
    'assets/css/avatars.css',
    'assets/css/investor-cards.css',
    'assets/css/copy-button.css',
    'assets/css/copy-contract.css',
    'assets/css/footer.css',
    'assets/css/sections-enhanced.css'
  ];
  
  let combinedCSS = '/* DEXRabbit - Объединенные стили */\n';
  combinedCSS += '/* Создано автоматически для оптимизации производительности */\n\n';
  
  let totalSize = 0;
  let processedFiles = 0;
  
  cssFiles.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const size = content.length;
        totalSize += size;
        processedFiles++;
        
        combinedCSS += `/* ========== ${path.basename(file)} (${(size/1024).toFixed(1)}KB) ========== */\n`;
        combinedCSS += content + '\n\n';
        
        console.log(`✅ ${file}: ${(size/1024).toFixed(1)}KB`);
      } else {
        console.log(`⚠️  ${file}: файл не найден`);
      }
    } catch (error) {
      console.log(`❌ ${file}: ошибка чтения`);
    }
  });
  
  // Сохраняем объединенный файл
  fs.writeFileSync('assets/css/combined.min.css', combinedCSS);
  
  console.log('\n📊 РЕЗУЛЬТАТ:');
  console.log(`   Обработано файлов: ${processedFiles}/${cssFiles.length}`);
  console.log(`   Общий размер: ${(totalSize/1024).toFixed(1)}KB`);
  console.log('   Создан: assets/css/combined.min.css');
  console.log('\n✨ CSS файлы объединены! Теперь вместо 15+ запросов будет 1');
}

combineCSSFiles();