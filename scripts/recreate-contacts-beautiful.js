const fs = require('fs');

const indexHTML = fs.readFileSync('index.html', 'utf8');

// Извлекаем навигацию
const navMatch = indexHTML.match(/<nav class="nav-beautiful">[\s\S]*?<\/nav>/);
const navigation = navMatch ? navMatch[0] : '';

// Извлекаем футер
const footerMatch = indexHTML.match(/<footer class="footer">[\s\S]*?<\/style>/);
const footer = footerMatch ? footerMatch[0] : '';

const contactsPage = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Контакты — DEXRabbit | Ферма между Байкалом и Улан-Удэ</title>
    <meta name="description" content="📞 Свяжитесь с DEXRabbit: Telegram бот, канал, чат инвесторов. Ферма в Республике Бурятия между озером Байкал и Улан-Удэ. Email: kupitkrolika@gmail.com" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#7c8cff" />

    <meta property="og:title" content="Контакты — DEXRabbit" />
    <meta property="og:description" content="Свяжитесь с нами: Telegram, Email. Ферма между Байкалом и Улан-Удэ" />
    <meta property="og:image" content="/og/og-rabbit.jpg" />
    <meta property="og:type" content="website" />

    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="stylesheet" href="/assets/css/variables.css" />
    <link rel="stylesheet" href="/assets/css/performance.css" />
    <link rel="stylesheet" href="/assets/css/navigation-beautiful.css?v=20251001-fixed-top" />
    <link rel="stylesheet" href="/assets/css/mobile-critical-fix.css?v=20251001-android-fix" />
    <link rel="stylesheet" href="/assets/css/ultimate-responsive.css?v=20251001-ultimate" />
    <link rel="stylesheet" href="/assets/css/footer.css" />

    <script defer src="/assets/js/navigation-beautiful.js?v=20251001-stable-hover"></script>
  </head>
  <body>
${navigation}

    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">📞 Свяжитесь с нами</h1>
          <p class="hero-subtitle">
            Ферма DEXRabbit расположена в Республике Бурятия, между озером Байкал и городом Улан-Удэ. 
            Мы всегда на связи через Telegram и готовы ответить на ваши вопросы!
          </p>

          <!-- Кнопки связи -->
          <div style="display: flex; gap: 16px; justify-content: center; margin: 32px 0; flex-wrap: wrap;">
            <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5); transition: all 0.3s ease;">
              <span style="font-size: 24px;">🤖</span>
              <span>Написать в бот</span>
            </a>
            <a href="https://t.me/DexRebbitOfficial" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 28px; color: #0088cc; text-decoration: none; font-size: 16px; font-weight: 600; transition: all 0.3s ease;">
              <span style="font-size: 20px;">📢</span>
              <span>Telegram канал</span>
            </a>
            <a href="https://t.me/DEXRabbitOfficialGroupInfo" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 28px; color: #0088cc; text-decoration: none; font-size: 16px; font-weight: 600; transition: all 0.3s ease;">
              <span style="font-size: 20px;">👥</span>
              <span>Чат инвесторов</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Основные контакты -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="overline">Связь с нами</span>
            <h2>💬 Основные каналы связи</h2>
          </div>

          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <!-- Telegram Bot -->
            <div class="card" style="background: linear-gradient(135deg, rgba(0, 136, 204, 0.15), rgba(0, 136, 204, 0.05)); border: 2px solid rgba(0, 136, 204, 0.4);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #0088cc, #4cc9f0); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">🤖</div>
                <div>
                  <h3 style="margin: 0;">Telegram Bot</h3>
                  <p style="margin: 0; font-size: 13px; opacity: 0.8;">Основной канал связи</p>
                </div>
              </div>
              <p style="margin-bottom: 16px; line-height: 1.6;">Инвестиции, реферальная программа, поддержка, отчётность - всё в одном месте.</p>
              <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(0, 136, 204, 0.2); border: 2px solid rgba(0, 136, 204, 0.5); border-radius: 16px; color: #0088cc; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                <span>💬</span>
                <span>@dexrabbit_bot</span>
              </a>
            </div>

            <!-- Telegram Канал -->
            <div class="card" style="background: linear-gradient(135deg, rgba(124, 140, 255, 0.15), rgba(124, 140, 255, 0.05)); border: 2px solid rgba(124, 140, 255, 0.4);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #7c8cff, #4cc9f0); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">📢</div>
                <div>
                  <h3 style="margin: 0;">Telegram Канал</h3>
                  <p style="margin: 0; font-size: 13px; opacity: 0.8;">Новости и анонсы</p>
                </div>
              </div>
              <p style="margin-bottom: 16px; line-height: 1.6;">Актуальные новости фермы, обновления токена PLEX, анонсы мероприятий.</p>
              <a href="https://t.me/DexRebbitOfficial" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(124, 140, 255, 0.2); border: 2px solid rgba(124, 140, 255, 0.5); border-radius: 16px; color: #7c8cff; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                <span>📢</span>
                <span>@DexRebbitOfficial</span>
              </a>
            </div>

            <!-- Telegram Чат -->
            <div class="card" style="background: linear-gradient(135deg, rgba(76, 201, 240, 0.15), rgba(76, 201, 240, 0.05)); border: 2px solid rgba(76, 201, 240, 0.4);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #4cc9f0, #00C896); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">👥</div>
                <div>
                  <h3 style="margin: 0;">Чат инвесторов</h3>
                  <p style="margin: 0; font-size: 13px; opacity: 0.8;">Общение и поддержка</p>
                </div>
              </div>
              <p style="margin-bottom: 16px; line-height: 1.6;">Общайтесь с другими инвесторами, делитесь опытом, задавайте вопросы.</p>
              <a href="https://t.me/DEXRabbitOfficialGroupInfo" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(76, 201, 240, 0.2); border: 2px solid rgba(76, 201, 240, 0.5); border-radius: 16px; color: #4cc9f0; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                <span>👥</span>
                <span>@DEXRabbitOfficialGroupInfo</span>
              </a>
            </div>

            <!-- Email -->
            <div class="card" style="background: linear-gradient(135deg, rgba(250, 204, 21, 0.15), rgba(250, 204, 21, 0.05)); border: 2px solid rgba(250, 204, 21, 0.4);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #facc15, #f59e0b); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">📧</div>
                <div>
                  <h3 style="margin: 0;">Email</h3>
                  <p style="margin: 0; font-size: 13px; opacity: 0.8;">Деловые предложения</p>
                </div>
              </div>
              <p style="margin-bottom: 16px; line-height: 1.6;">Для партнёрских предложений, сотрудничества с блогерами, СМИ.</p>
              <a href="mailto:kupitkrolika@gmail.com" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(250, 204, 21, 0.2); border: 2px solid rgba(250, 204, 21, 0.5); border-radius: 16px; color: #facc15; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                <span>✉️</span>
                <span>kupitkrolika@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Местоположение -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="overline">Где мы находимся</span>
            <h2>🏔️ Местоположение фермы</h2>
          </div>

          <div class="card" style="background: linear-gradient(135deg, rgba(124, 140, 255, 0.1), rgba(76, 201, 240, 0.05)); border: 2px solid rgba(124, 140, 255, 0.3);">
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px;">
              <div>
                <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                  <span style="font-size: 32px;">📍</span>
                  <span>Адрес фермы</span>
                </h3>
                <p style="font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
                  <strong style="color: #4cc9f0;">Республика Бурятия</strong><br/>
                  Между городом Улан-Удэ и озером Байкал
                </p>
                <p style="font-size: 14px; opacity: 0.9; line-height: 1.6;">
                  🌲 Экологически чистый район<br/>
                  🏔️ Чистый горный воздух<br/>
                  💧 Натуральная байкальская вода<br/>
                  🌱 Идеальный климат для кроликов
                </p>
              </div>

              <div>
                <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                  <span style="font-size: 32px;">🎯</span>
                  <span>Посещение фермы</span>
                </h3>
                <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
                  Приезд на ферму возможен <strong>по предварительной записи</strong> через Telegram бот.
                </p>
                <p style="font-size: 14px; opacity: 0.9; line-height: 1.6;">
                  💰 Оплата визита: в токенах PLEX<br/>
                  📅 Запись минимум за 3 дня<br/>
                  👥 Групповые экскурсии: скидка 20%<br/>
                  🎥 Видеотрансляции: ежедневно в боте
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- YouTube -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="overline">Видео с фермы</span>
            <h2>📺 YouTube канал</h2>
          </div>

          <div class="card" style="text-align: center; background: linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.05)); border: 2px solid rgba(255, 0, 0, 0.3);">
            <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #FF0000, #CC0000); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 36px;">📺</div>
              <div style="text-align: left;">
                <h3 style="margin: 0;">DEXRabbit Farm</h3>
                <p style="margin: 0; font-size: 14px; opacity: 0.8;">Видеоотчёты с фермы, уход за кроликами, жизнь животных</p>
              </div>
            </div>
            <a href="https://www.youtube.com/@DexRabbitFarm" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: rgba(255, 0, 0, 0.2); border: 2px solid rgba(255, 0, 0, 0.5); border-radius: 20px; color: #FF0000; text-decoration: none; font-weight: 700; font-size: 16px; transition: all 0.3s ease;">
              <span style="font-size: 22px;">▶️</span>
              <span>Смотреть на YouTube</span>
            </a>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="overline">Частые вопросы</span>
            <h2>❓ Как с нами связаться</h2>
          </div>

          <div class="grid" style="grid-template-columns: 1fr; gap: 16px;">
            <div class="card">
              <h3>🤖 Для инвестиций и вопросов</h3>
              <p>Все вопросы по инвестициям, выбору кроликов, получению PLEX токенов - решаются в <strong>Telegram боте @dexrabbit_bot</strong></p>
            </div>

            <div class="card">
              <h3>📢 Для получения новостей</h3>
              <p>Подпишитесь на <strong>Telegram канал @DexRebbitOfficial</strong> - там все анонсы, новости, отчёты с фермы</p>
            </div>

            <div class="card">
              <h3>👥 Для общения с инвесторами</h3>
              <p>Вступайте в <strong>чат @DEXRabbitOfficialGroupInfo</strong> - общайтесь с другими инвесторами, делитесь опытом</p>
            </div>

            <div class="card">
              <h3>📧 Для деловых предложений</h3>
              <p>Блогеры, СМИ, партнёры - пишите на <strong>kupitkrolika@gmail.com</strong></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Финальный CTA -->
      <div style="text-align: center; margin: 60px auto; padding: 40px; background: linear-gradient(135deg, rgba(124, 140, 255, 0.1), rgba(76, 201, 240, 0.05)); border: 2px solid rgba(124, 140, 255, 0.3); border-radius: 24px; max-width: 800px;">
        <h2 style="margin-bottom: 16px; font-size: 28px;">💬 Остались вопросы?</h2>
        <p style="margin-bottom: 28px; font-size: 17px; color: rgba(255, 255, 255, 0.9);">Напишите в Telegram бот - ответим в течение часа!</p>
        <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 12px; padding: 18px 40px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 18px; font-weight: 700; text-decoration: none; box-shadow: 0 12px 40px rgba(124, 140, 255, 0.4); transition: all 0.3s ease;">
          <span style="font-size: 28px;">🤖</span>
          <span>Открыть бот DEXRabbit</span>
        </a>
      </div>
    </main>

${footer}
  </body>
</html>`;

fs.writeFileSync('contacts.html', contactsPage, 'utf8');
console.log('✅ contacts.html пересоздан с нуля на основе лучших практик!');

