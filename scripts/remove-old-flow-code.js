const fs = require('fs');

console.log('🗑️ Удаление старого flow-chart кода...\n');

let content = fs.readFileSync('index.html', 'utf8');

// Ищем и удаляем старый код между комментарием и следующим div
const oldCodePattern = /<!-- Old arrow markup removed -->[\s\S]*?<div class="hero-cta">/;

if (content.match(oldCodePattern)) {
  content = content.replace(oldCodePattern, '<div class="hero-cta">');
  fs.writeFileSync('index.html', content, 'utf8');
  console.log('✅ Старый код удалён!');
} else {
  console.log('⚪ Старого кода не найдено');
}

// Удаляем классы flow-box-2/3/4
content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/flow-box-[234]/g, 'flow-box');
content = content.replace(/data-step="\d+"/g, '');
content = content.replace(/<div class="flow-glow"><\/div>/g, '');

fs.writeFileSync('index.html', content, 'utf8');
console.log('✅ Очищены классы и атрибуты');
console.log('\n✅ ГОТОВО!');


