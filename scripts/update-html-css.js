const fs = require('fs');

/**
 * Скрипт обновления HTML для использования объединенного CSS
 */
function updateHTMLForOptimization() {
  console.log('🔄 Обновление HTML файлов для оптимизации...\n');
  
  const htmlFiles = ['index.html'];
  
  htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Создаем резервную копию
    fs.writeFileSync(`${file}.backup`, content);
    
    // Находим все CSS импорты и заменяем на один
    const cssLinkRegex = /<!-- Styles -->([\s\S]*?)<!-- SEO Scripts -->/;
    const match = content.match(cssLinkRegex);
    
    if (match) {
      const newStylesSection = `<!-- Styles -->
    <link rel="stylesheet" href="/assets/css/combined.min.css" />
    
    <!-- SEO Scripts -->`;
      
      content = content.replace(cssLinkRegex, newStylesSection);
      
      fs.writeFileSync(file, content);
      console.log(`✅ ${file}: CSS импорты объединены`);
    }
  });
  
  console.log('\n✨ HTML файлы обновлены для использования объединенного CSS!');
}

updateHTMLForOptimization();