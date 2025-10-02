const fs = require('fs');
const path = require('path');

const BREEDING_VALUE_LINK = `                <li><a href="/breeding-value.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🏆</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Племенная ценность</span>
                    <span class="nav-beautiful__dropdown-desc">Генетика и селекция</span>
                  </div>
                </a></li>
`;

function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && file !== 'index.html' && file !== 'breeding-value.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('🏆 Добавляю "Племенная ценность" в навигацию на все страницы...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверяем, есть ли уже ссылка
  if (content.includes('breeding-value.html')) {
    console.log(`⚪ ${relativePath} - уже есть`);
    return;
  }
  
  // Ищем раздел "Породы" и добавляем ссылку ПЕРВОЙ
  const breedsSectionMatch = content.match(/(<button class="nav-beautiful__btn">\s*Породы[\s\S]*?<ul class="nav-beautiful__dropdown-list">)/);
  
  if (breedsSectionMatch) {
    const replacement = breedsSectionMatch[0] + '\n' + BREEDING_VALUE_LINK;
    content = content.replace(breedsSectionMatch[0], replacement);
    
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ ${relativePath}`);
  } else {
    console.log(`⚠️  ${relativePath} - раздел Породы не найден`);
  }
});

console.log(`\n📊 ИТОГО: ${updatedCount} страниц обновлено`);
console.log('\n✅ "Племенная ценность" добавлена в навигацию!');

