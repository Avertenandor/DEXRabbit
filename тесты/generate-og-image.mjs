/**
 * 📸 OG Image Generator Script
 * Автоматическая генерация Open Graph изображения для социальных сетей
 */

import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  console.log('\n🎨 Запуск генерации OG изображения...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 }
  });

  // Путь к HTML файлу
  const htmlPath = path.join(__dirname, '..', 'og', 'og-generator.html');
  const outputPath = path.join(__dirname, '..', 'og', 'og-rabbit.jpg');

  console.log(`📂 HTML файл: ${htmlPath}`);
  console.log(`💾 Выходной файл: ${outputPath}\n`);

  // Загружаем HTML
  await page.goto(`file://${htmlPath}`);
  
  // Ждём загрузки всех шрифтов и стилей
  await page.waitForTimeout(1000);

  // Делаем screenshot контейнера
  const ogContainer = page.locator('.og-container');
  await ogContainer.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 95
  });

  console.log('✅ OG изображение создано успешно!\n');
  console.log('📊 Параметры:');
  console.log('   • Размер: 1200 x 630 px');
  console.log('   • Формат: JPEG');
  console.log('   • Качество: 95%');
  console.log(`   • Путь: ${outputPath}\n`);

  console.log('📋 Следующие шаги:');
  console.log('   1. Проверьте изображение');
  console.log('   2. git add og/og-rabbit.jpg');
  console.log('   3. git commit -m "feat(og): Обновлено OG изображение с новым текстом"');
  console.log('   4. git push\n');

  await browser.close();
}

generateOGImage().catch(console.error);
