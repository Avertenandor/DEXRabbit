const fs = require('fs');
const path = require('path');

const BOT_LINK = 'https://t.me/dexrabbit_bot';

// Кнопка 1: Основная (для Hero/верха страницы)
const BOT_BUTTON_PRIMARY = `
            <!-- Telegram Bot CTA -->
            <div class="bot-cta-wrapper" style="display: flex; gap: 16px; justify-content: center; margin: 32px 0; flex-wrap: wrap;">
              <a href="${BOT_LINK}" target="_blank" class="bot-cta-primary" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5); transition: all 0.3s ease;">
                <span style="font-size: 24px;">🤖</span>
                <span>Открыть бот DEXRabbit</span>
              </a>
            </div>`;

// Кнопка 2: Вторичная (для низа страницы)
const BOT_BUTTON_SECONDARY = `
            <!-- Telegram Bot Link -->
            <div class="bot-link-wrapper" style="text-align: center; margin: 40px 0; padding: 32px; background: linear-gradient(135deg, rgba(124, 140, 255, 0.1), rgba(76, 201, 240, 0.05)); border: 1px solid rgba(124, 140, 255, 0.3); border-radius: 20px;">
              <h3 style="margin-bottom: 16px; color: #fff; font-size: 22px;">🤖 Все операции в Telegram боте</h3>
              <p style="margin-bottom: 24px; color: rgba(255, 255, 255, 0.8); font-size: 15px;">Инвестиции, реферальная программа, отчетность и управление</p>
              <a href="${BOT_LINK}" target="_blank" class="bot-cta-secondary" style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: rgba(124, 140, 255, 0.15); border: 2px solid rgba(124, 140, 255, 0.5); border-radius: 28px; color: #fff; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">
                <span style="font-size: 20px;">💬</span>
                <span>Перейти в бот @dexrabbit_bot</span>
              </a>
            </div>`;

function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && file !== 'demo-megamenu.html' && file !== 'index.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('🤖 Добавляю кнопки Telegram бота на все страницы (минимум 2 на каждой)...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверяем, есть ли уже кнопки бота
  if (content.includes('dexrabbit_bot')) {
    console.log(`⚪ ${relativePath} - бот уже добавлен`);
    return;
  }
  
  // Добавляем первую кнопку после первого <h1> или <h2>
  const h1Match = content.match(/<h1[^>]*>.*?<\/h1>/);
  const h2Match = content.match(/<h2[^>]*>.*?<\/h2>/);
  
  if (h1Match) {
    content = content.replace(h1Match[0], h1Match[0] + BOT_BUTTON_PRIMARY);
  } else if (h2Match) {
    content = content.replace(h2Match[0], h2Match[0] + BOT_BUTTON_PRIMARY);
  }
  
  // Добавляем вторую кнопку перед </main> или перед footer
  const footerMatch = content.match(/<footer/);
  const mainEndMatch = content.match(/<\/main>/);
  
  if (mainEndMatch) {
    content = content.replace('</main>', BOT_BUTTON_SECONDARY + '\n    </main>');
  } else if (footerMatch) {
    content = content.replace('<footer', BOT_BUTTON_SECONDARY + '\n\n    <footer');
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`✅ ${relativePath} - 2 кнопки бота добавлены`);
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Добавлены кнопки: ${updatedCount} страниц × 2 = ${updatedCount * 2} кнопок`);

console.log('\n✅ TELEGRAM БОТ ДОБАВЛЕН НА ВСЕ СТРАНИЦЫ!');

