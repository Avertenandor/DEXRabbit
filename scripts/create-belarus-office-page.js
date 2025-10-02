const fs = require('fs');

const indexHTML = fs.readFileSync('index.html', 'utf8');
const navMatch = indexHTML.match(/<nav class="nav-beautiful">[\s\S]*?<\/nav>/);
const footerMatch = indexHTML.match(/<footer class="footer">[\s\S]*?<\/style>/);

const navigation = navMatch ? navMatch[0] : '';
const footer = footerMatch ? footerMatch[0] : '';

const belarusPage = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Представительство в Беларуси — DEXRabbit</title>
    <meta name="description" content="🇧🇾 DEXRabbit в Республике Беларусь. Планы открытия представительства, поставки племенных кроликов, франшиза для белорусских фермеров." />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#7c8cff" />

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
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">🇧🇾 Представительство в Республике Беларусь</h1>
          <p class="hero-subtitle">
            DEXRabbit планирует открытие представительства в Беларуси для развития кролиководческого 
            бизнеса, поставок племенных животных и запуска франшизы токенизированных ферм.
          </p>

          <div style="display: flex; gap: 16px; justify-content: center; margin: 32px 0; flex-wrap: wrap;">
            <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5);">
              <span style="font-size: 24px;">🤖</span>
              <span>Обсудить сотрудничество</span>
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

      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="overline">Планы развития</span>
            <h2>🎯 Зачем нам Беларусь</h2>
          </div>

          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <div class="card" style="background: rgba(124, 140, 255, 0.08); border: 2px solid rgba(124, 140, 255, 0.3);">
              <h3>🌍 Расширение рынка</h3>
              <p>Беларусь - стратегически важный рынок для развития кролиководческого бизнеса:</p>
              <ul class="checklist" style="margin-top: 16px;">
                <li>Близость к России (логистика)</li>
                <li>Развитое сельское хозяйство</li>
                <li>Культура потребления крольчатины</li>
                <li>Поддержка фермерства государством</li>
              </ul>
            </div>

            <div class="card" style="background: rgba(76, 201, 240, 0.08); border: 2px solid rgba(76, 201, 240, 0.3);">
              <h3>🐰 Поставки племенных кроликов</h3>
              <p>Экспорт наших элитных генетических линий в Беларусь:</p>
              <ul class="checklist" style="margin-top: 16px;">
                <li>12 чистых племенных линий</li>
                <li>Сертификаты и ветеринарные документы</li>
                <li>Доставка и карантин</li>
                <li>Консультационная поддержка</li>
              </ul>
            </div>

            <div class="card" style="background: rgba(250, 204, 21, 0.08); border: 2px solid rgba(250, 204, 21, 0.3);">
              <h3>🏢 Франшиза DEXRabbit</h3>
              <p>Запуск токенизированных ферм-партнёров в РБ:</p>
              <ul class="checklist" style="margin-top: 16px;">
                <li>Готовая бизнес-модель</li>
                <li>Обучение и сопровождение</li>
                <li>Единая экосистема PLEX</li>
                <li>Общая маркетинговая поддержка</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="overline">Этапы развития</span>
            <h2>📅 Дорожная карта</h2>
          </div>

          <div class="grid" style="grid-template-columns: 1fr; gap: 20px;">
            <div class="card" style="border-left: 4px solid #7c8cff;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7c8cff, #4cc9f0); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #fff;">Q1</div>
                <h3 style="margin: 0;">2025 Q1-Q2: Исследование рынка</h3>
              </div>
              <ul class="checklist">
                <li>Анализ законодательства РБ</li>
                <li>Поиск партнёров и дистрибьюторов</li>
                <li>Оценка логистических маршрутов</li>
                <li>Регистрация товарного знака</li>
              </ul>
            </div>

            <div class="card" style="border-left: 4px solid #4cc9f0;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #4cc9f0, #00C896); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #fff;">Q2</div>
                <h3 style="margin: 0;">2025 Q2-Q3: Первые поставки</h3>
              </div>
              <ul class="checklist">
                <li>Экспорт 50-100 племенных кроликов</li>
                <li>Ветеринарное сопровождение</li>
                <li>Обучение белорусских фермеров</li>
                <li>Тестовые продажи крольчатины</li>
              </ul>
            </div>

            <div class="card" style="border-left: 4px solid #facc15;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #facc15, #f59e0b); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #000;">Q3</div>
                <h3 style="margin: 0;">2025 Q3-Q4: Открытие офиса</h3>
              </div>
              <ul class="checklist">
                <li>Регистрация представительства в Минске</li>
                <li>Найм локальной команды (3-5 человек)</li>
                <li>Склад-хранилище для кормов</li>
                <li>Запуск маркетинговой кампании</li>
              </ul>
            </div>

            <div class="card" style="border-left: 4px solid #4ade80;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #4ade80, #22c55e); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #000;">Q4</div>
                <h3 style="margin: 0;">2026: Франшиза</h3>
              </div>
              <ul class="checklist">
                <li>Запуск 2-3 ферм-партнёров</li>
                <li>Интеграция в экосистему PLEX</li>
                <li>Единая платформа инвестиций</li>
                <li>Масштабирование на страны СНГ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="overline">Для партнёров</span>
            <h2>🤝 Возможности сотрудничества</h2>
          </div>

          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
            <div class="card">
              <h3>🏢 Дистрибьюторы</h3>
              <p>Продажа племенных кроликов, кормов, оборудования в РБ</p>
              <div style="margin-top: 16px; padding: 16px; background: rgba(124, 140, 255, 0.1); border-radius: 12px;">
                <p style="font-size: 14px; margin: 0;"><strong>Условия:</strong></p>
                <ul style="font-size: 14px; margin-top: 8px; padding-left: 20px;">
                  <li>Эксклюзивность в регионе</li>
                  <li>Маржа 20-35%</li>
                  <li>Обучение и поддержка</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <h3>🧬 Племенные фермы</h3>
              <p>Закупка наших генетических линий для разведения</p>
              <div style="margin-top: 16px; padding: 16px; background: rgba(76, 201, 240, 0.1); border-radius: 12px;">
                <p style="font-size: 14px; margin: 0;"><strong>Преимущества:</strong></p>
                <ul style="font-size: 14px; margin-top: 8px; padding-left: 20px;">
                  <li>Проверенные линии (12 штук)</li>
                  <li>Доходность на 30% выше</li>
                  <li>Консультации зоотехника</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <h3>🍽️ Рестораны и HoReCa</h3>
              <p>Поставки фермерской крольчатины в заведения РБ</p>
              <div style="margin-top: 16px; padding: 16px; background: rgba(250, 204, 21, 0.1); border-radius: 12px;">
                <p style="font-size: 14px; margin: 0;"><strong>Что предлагаем:</strong></p>
                <ul style="font-size: 14px; margin-top: 8px; padding-left: 20px;">
                  <li>Охлаждённое мясо премиум</li>
                  <li>Регулярные поставки</li>
                  <li>Сертификаты качества</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container" style="text-align: center;">
          <h2 style="margin-bottom: 20px;">🚀 Хотите стать партнёром в Беларуси?</h2>
          <p style="font-size: 18px; color: rgba(255, 255, 255, 0.9); margin-bottom: 32px; max-width: 700px; margin-left: auto; margin-right: auto;">
            Свяжитесь с нами для обсуждения условий партнёрства и представительства
          </p>
          
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 18px 36px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 17px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5);">
              <span style="font-size: 26px;">🤖</span>
              <span>Написать в бот</span>
            </a>
            
            <a href="mailto:kupitkrolika@gmail.com" style="display: inline-flex; align-items: center; gap: 10px; padding: 18px 36px; background: rgba(250, 204, 21, 0.15); border: 2px solid rgba(250, 204, 21, 0.5); border-radius: 28px; color: #facc15; text-decoration: none; font-size: 17px; font-weight: 600;">
              <span style="font-size: 22px;">📧</span>
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

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

fs.writeFileSync('belarus-office.html', belarusPage, 'utf8');
console.log('✅ belarus-office.html создан!');

