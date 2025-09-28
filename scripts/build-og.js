// scripts/build-og.js
// Генерация Open Graph 1200x630 из фото кролика с тёмным градиентом, заголовком и логотипом.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createCanvas, loadImage, registerFont } = require('canvas');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const TITLE = 'DEXRabbit — Кроличий фарм токенизирован';
const SUB = 'Инвестируй в ферму, отслеживай доходность, владей долей.';
const OUT_DIR = path.join(process.cwd(), 'public', 'og');
const SRC = path.join(OUT_DIR, 'source-rabbit.jpg');
const OUT = path.join(OUT_DIR, 'og-rabbit.jpg');
const WIDTH = 1200, HEIGHT = 630;

const fontRegularPath = path.join(process.cwd(), 'assets', 'fonts', 'Inter-Regular.ttf');
const fontBoldPath = path.join(process.cwd(), 'assets', 'fonts', 'Inter-Bold.ttf');

if (!fs.existsSync(fontRegularPath) || !fs.existsSync(fontBoldPath)) {
  fs.mkdirSync(path.dirname(fontRegularPath), { recursive: true });
  console.warn('⚠ Inter не найден. Использую системные шрифты.');
}
try { registerFont(fontRegularPath, { family: 'Inter', weight: '400' }); } catch {}
try { registerFont(fontBoldPath, { family: 'Inter', weight: '700' }); } catch {}

(async () => {
  if (!fs.existsSync(SRC)) {
    console.error('❌ Нет исходника: public/og/source-rabbit.jpg');
    process.exit(1);
  }
  const cover = await sharp(SRC)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .blur(0.3)
    .toBuffer();

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  const bg = await loadImage(cover);
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

  // затемняющий градиент снизу
  const grad = ctx.createLinearGradient(0, HEIGHT * 0.45, 0, HEIGHT);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.65)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, HEIGHT * 0.45, WIDTH, HEIGHT * 0.55);

  const marginX = Math.round(WIDTH * 0.05);
  const marginBottom = Math.round(HEIGHT * 0.08);

  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'bottom';
  ctx.shadowColor = 'rgba(0,0,0,0.35)';

  // Заголовок
  ctx.font = '700 58px Inter, Arial, sans-serif';
  ctx.shadowBlur = 10;
  wrapText(ctx, TITLE, marginX, HEIGHT - marginBottom - 90, WIDTH - marginX * 2, 64);

  // Подзаголовок
  ctx.font = '400 30px Inter, Arial, sans-serif';
  ctx.shadowBlur = 8;
  wrapText(ctx, SUB, marginX, HEIGHT - marginBottom, WIDTH - marginX * 2, 36);

  // Логотип (опционально)
  const logoPath = path.join(process.cwd(), 'assets', 'branding', 'logo.png');
  if (fs.existsSync(logoPath)) {
    const logo = await loadImage(logoPath);
    const targetW = 160;
    const scale = targetW / logo.width;
    const w = targetW, h = logo.height * scale;
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.95;
    ctx.drawImage(logo, WIDTH - marginX - w, HEIGHT - marginBottom - h - 6, w, h);
    ctx.globalAlpha = 1;
  }

  const overlay = canvas.toBuffer('image/png');
  const jpeg = await sharp(overlay).jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true }).toBuffer();
  fs.writeFileSync(OUT, jpeg);

  try {
    await imagemin([OUT], {
      destination: OUT_DIR,
      plugins: [imageminMozjpeg({ quality: 82, progressive: true }), imageminPngquant({ quality: [0.82, 0.9] })]
    });
  } catch (e) {
    console.warn('⚠ Imagemin оптимизация пропущена:', e.message);
  }

  const size = fs.statSync(OUT).size;
  console.log(`✅ OG готово: ${OUT} (${size} bytes)`);
})().catch(e => { console.error('❌ Ошибка OG:', e); process.exit(1); });

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '', cy = y;
  for (let i = 0; i < words.length; i++) {
    const test = (line + words[i] + ' ');
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line, x, cy);
      line = words[i] + ' ';
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, cy);
}