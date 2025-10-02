const fs = require('fs');

const indexHTML = fs.readFileSync('index.html', 'utf8');
const navMatch = indexHTML.match(/<nav class="nav-beautiful">[\s\S]*?<\/nav>/);
const footerMatch = indexHTML.match(/<footer class="footer">[\s\S]*?<\/html>/);

const navigation = navMatch ? navMatch[0] : '';
const footer = footerMatch ? footerMatch[0].replace('</html>', '') : '';

const pageContent = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Экспериментально-селективная работа — DEXRabbit</title>
    <meta name="description" content="🔬 Научная селекция и выведение чистых генетических линий. 12 экспериментальных программ по улучшению продуктивности кроликов.">
    
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#7c8cff">
    
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="stylesheet" href="/assets/css/variables.css">
    <link rel="stylesheet" href="/assets/css/performance.css" />
    <link rel="stylesheet" href="/assets/css/navigation-beautiful.css?v=20251001-stable-hover-v2" />
    <link rel="stylesheet" href="/assets/css/mobile-critical-fix.css?v=20251001-android-fix" />
    <link rel="stylesheet" href="/assets/css/ultimate-responsive.css?v=20251001-ultimate" />
    <link rel="stylesheet" href="/assets/css/footer.css" />
    
    <script defer src="/assets/js/navigation-beautiful.js?v=20251001-stable-hover"></script>
</head>
<body>
${navigation}

    <main>
        <section class="hero">
            <div class="container">
                <h1 class="hero-title">🔬 Экспериментально-селективная работа</h1>
                <p class="hero-subtitle">
                    Научный подход к выведению чистых генетических линий. 12 экспериментальных программ 
                    по улучшению продуктивности, здоровья и племенных качеств кроликов.
                </p>
                <div style="display: flex; gap: 16px; justify-content: center; margin: 32px 0; flex-wrap: wrap;">
                  <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5);">
                    <span style="font-size: 24px;">🤖</span>
                    <span>Начать в боте</span>
                  </a>
                  <a href="https://t.me/DexRebbitOfficial" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 28px; color: #0088cc; text-decoration: none; font-size: 16px; font-weight: 600;">
                    <span style="font-size: 20px;">📢</span>
                    <span>Telegram канал</span>
                  </a>
                  <a href="https://t.me/DEXRabbitOfficialGroupInfo" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 28px; color: #0088cc; text-decoration: none; font-size: 16px; font-weight: 600;">
                    <span style="font-size: 20px;">👥</span>
                    <span>Чат инвесторов</span>
                  </a>
                </div>
            </div>
        </section>

        ${require('./selective-breeding-content.js')}

        <div style="text-align: center; margin: 40px auto; padding: 32px; background: linear-gradient(135deg, rgba(124, 140, 255, 0.1), rgba(76, 201, 240, 0.05)); border: 1px solid rgba(124, 140, 255, 0.3); border-radius: 20px; max-width: 800px;">
          <h3 style="margin-bottom: 16px; color: #fff; font-size: 22px;">💬 Присоединяйтесь к сообществу</h3>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
            <a href="https://t.me/DexRebbitOfficial" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 20px; color: #0088cc; text-decoration: none; font-weight: 600;">
              <span>📢</span><span>Канал</span>
            </a>
            <a href="https://t.me/DEXRabbitOfficialGroupInfo" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 20px; color: #0088cc; text-decoration: none; font-weight: 600;">
              <span>👥</span><span>Чат</span>
            </a>
          </div>
        </div>
    </main>

${footer}
</body>
</html>`;

fs.writeFileSync('selective-breeding.html', pageContent, 'utf8');
console.log('✅ Страница создана!');

