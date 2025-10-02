const fs = require('fs');
const path = require('path');

// Читаем футер из index.html
const indexContent = fs.readFileSync('index.html', 'utf8');
const footerMatch = indexContent.match(/<footer class="footer">[\s\S]*?<\/body>/);
const fullFooter = footerMatch ? footerMatch[0].replace('</body>', '') : '';

const bloggersPage = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Сотрудничество с блогерами — DEXRabbit</title>
    <meta name="description" content="🎥 Приглашаем блогеров YouTube, Rutube, TikTok, Telegram! Экологичные отношения, индивидуальный подход, безусловное взаимоуважение.">
    
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#7c8cff">
    
    <meta property="og:title" content="Сотрудничество с блогерами — DEXRabbit">
    <meta property="og:description" content="Приглашаем блогеров к взаимовыгодному сотрудничеству">
    <meta property="og:image" content="/og/og-rabbit.jpg">
    
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
${indexContent.match(/<nav class="nav-beautiful">[\s\S]*?<\/nav>/)[0]}

    <main>
        <section class="hero">
            <div class="container">
                <h1 class="hero-title">🎥 Сотрудничество с блогерами</h1>
                <p class="hero-subtitle">
                    Приглашаем контент-мейкеров из YouTube, Rutube, TikTok, Telegram и других платформ 
                    к экологичному и взаимовыгодному сотрудничеству. От микроблогеров до миллионников — 
                    мы открыты для всех!
                </p>

                <div class="bot-cta-wrapper" style="display: flex; gap: 16px; justify-content: center; margin: 32px 0; flex-wrap: wrap;">
                  <a href="https://t.me/dexrabbit_bot" target="_blank" class="bot-cta-primary" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5); transition: all 0.3s ease;">
                    <span style="font-size: 24px;">🤖</span>
                    <span>Начать сотрудничество в боте</span>
                  </a>
                  <a href="https://t.me/DexRebbitOfficial" target="_blank" class="cta-button cta-secondary" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: rgba(124, 140, 255, 0.1); border: 2px solid rgba(124, 140, 255, 0.5); border-radius: 28px; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">
                    <span style="font-size: 20px;">📢</span>
                    <span>Наш Telegram канал</span>
                  </a>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="overline">Наши принципы</span>
                    <h2>🌱 Экологичность во взаимоотношениях</h2>
                </div>

                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                    <div class="card" style="background: rgba(124, 140, 255, 0.08); border: 2px solid rgba(124, 140, 255, 0.3);">
                        <h3>🤝 Безусловное взаимоуважение</h3>
                        <p>Мы гарантируем уважительное отношение к труду каждого блогера. Ваш контент — ваша работа, 
                        и мы это ценим. Никаких жёстких требований, только партнёрство на равных.</p>
                    </div>

                    <div class="card" style="background: rgba(76, 201, 240, 0.08); border: 2px solid rgba(76, 201, 240, 0.3);">
                        <h3>📝 Индивидуальный подход</h3>
                        <p>Каждый блогер уникален! Мы работаем на отдельных договорных условиях, 
                        учитывая ваш стиль, аудиторию и формат. Никаких шаблонов — только персональные условия.</p>
                    </div>

                    <div class="card" style="background: rgba(250, 204, 21, 0.08); border: 2px solid rgba(250, 204, 21, 0.3);">
                        <h3>🌍 Без границ</h3>
                        <p>Приглашаем блогеров из России, Беларуси, Казахстана, Украины и других стран. 
                        Мы открыты для международного сотрудничества!</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-alt">
            <div class="container">
                <div class="section-header">
                    <span class="overline">Платформы</span>
                    <h2>📱 Где вы можете создавать контент</h2>
                </div>

                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="card">
                        <h3 style="color: #FF0000;">📺 YouTube</h3>
                        <p>Видео-обзоры, влоги с фермы, истории инвесторов, образовательный контент о кроликах.</p>
                        <p style="margin-top: 12px;"><strong>Наш канал:</strong></p>
                        <a href="https://www.youtube.com/@DexRabbitFarm" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 16px; background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); border-radius: 12px; color: #FF0000; text-decoration: none; font-weight: 600;">
                            @DexRabbitFarm →
                        </a>
                    </div>

                    <div class="card">
                        <h3 style="color: #4cc9f0;">🎬 Rutube</h3>
                        <p>Для российской аудитории: обзоры, туториалы, прямые эфиры с фермы, интервью.</p>
                        <p style="margin-top: 12px; opacity: 0.7;">Скоро запустим канал!</p>
                    </div>

                    <div class="card">
                        <h3 style="color: #000000;">🎵 TikTok</h3>
                        <p>Короткие ролики: милые кролики, факты, behind-the-scenes, инвестиционные советы.</p>
                        <p style="margin-top: 12px; opacity: 0.7;">Ждём ваших креативных идей!</p>
                    </div>

                    <div class="card">
                        <h3 style="color: #0088cc;">✈️ Telegram</h3>
                        <p>Посты, статьи, новости, аналитика рынка PLEX, отчёты с фермы.</p>
                        <div style="margin-top: 12px;">
                            <p><strong>Наши ресурсы:</strong></p>
                            <a href="https://t.me/DexRebbitOfficial" target="_blank" style="display: block; margin-top: 8px; padding: 8px 16px; background: rgba(0, 136, 204, 0.1); border: 1px solid rgba(0, 136, 204, 0.3); border-radius: 12px; color: #0088cc; text-decoration: none; font-weight: 600;">
                                📢 Канал @DexRebbitOfficial
                            </a>
                            <a href="https://t.me/DEXRabbitOfficialGroupInfo" target="_blank" style="display: block; margin-top: 8px; padding: 8px 16px; background: rgba(0, 136, 204, 0.1); border: 1px solid rgba(0, 136, 204, 0.3); border-radius: 12px; color: #0088cc; text-decoration: none; font-weight: 600;">
                                👥 Чат @DEXRabbitOfficialGroupInfo
                            </a>
                        </div>
                    </div>

                    <div class="card">
                        <h3>📸 Instagram / VK / OK</h3>
                        <p>Фото-контент, сторис, рилсы, посты про lifestyle с кроликами.</p>
                    </div>

                    <div class="card">
                        <h3>🎙️ Подкасты</h3>
                        <p>Аудио-интервью с фермером, обсуждение криптоинвестиций, истории успеха.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="overline">Условия</span>
                    <h2>💼 Что мы предлагаем</h2>
                </div>

                <div class="card">
                    <h3>🎁 Варианты сотрудничества</h3>
                    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
                        <div>
                            <h4>📊 Партнёрская программа</h4>
                            <ul class="checklist">
                                <li><strong>3 уровня в глубину</strong></li>
                                <li>5% от вложений рефералов</li>
                                <li>5% от прибыли рефералов</li>
                                <li>Выплаты в PLEX или USDT</li>
                            </ul>
                        </div>

                        <div>
                            <h4>💰 Индивидуальные условия</h4>
                            <ul class="checklist">
                                <li>Фиксированная оплата за видео</li>
                                <li>Процент от привлечённых инвестиций</li>
                                <li>Бонусы в PLEX токенах</li>
                                <li>Эксклюзивный доступ на ферму</li>
                            </ul>
                        </div>

                        <div>
                            <h4>🎬 Контент поддержка</h4>
                            <ul class="checklist">
                                <li>Доступ к материалам фермы</li>
                                <li>Эксклюзивные видео и фото</li>
                                <li>Интервью с фермером</li>
                                <li>Консультации по криптовалютам</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-alt">
            <div class="container">
                <div class="section-header">
                    <span class="overline">Для блогеров</span>
                    <h2>✨ Почему с нами интересно</h2>
                </div>

                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                    <div class="card">
                        <h3>🐰 Уникальная тема</h3>
                        <p>Кролики + криптовалюты + инвестиции = вирусный контент! Милые животные привлекают аудиторию, 
                        а блокчейн добавляет технологичности.</p>
                    </div>

                    <div class="card">
                        <h3>📈 Растущий проект</h3>
                        <p>Мы только начинаем! Присоединяйтесь на старте и растите вместе с нами. 
                        Ранние партнёры получают лучшие условия.</p>
                    </div>

                    <div class="card">
                        <h3>🎬 Готовый контент</h3>
                        <p>Мы предоставляем фото, видео, статистику, инфографику. Вам остаётся только 
                        адаптировать под свой стиль!</p>
                    </div>

                    <div class="card">
                        <h3>💎 Реальный бизнес</h3>
                        <p>Это не хайп и не пирамида. Реальная ферма, реальные кролики, реальная прибыль. 
                        Ваша аудитория оценит честность!</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="overline">Контакты</span>
                    <h2>📞 Как с нами связаться</h2>
                </div>

                <div class="card" style="max-width: 800px; margin: 0 auto;">
                    <h3>💬 Все контакты DEXRabbit</h3>
                    
                    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 24px;">
                        <div>
                            <h4>🤖 Telegram Bot</h4>
                            <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: block; margin-top: 12px; padding: 12px 20px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border-radius: 16px; color: #fff; text-decoration: none; font-weight: 600; text-align: center;">
                                @dexrabbit_bot →
                            </a>
                            <p style="margin-top: 8px; font-size: 13px; opacity: 0.8;">Основной канал связи</p>
                        </div>

                        <div>
                            <h4>📢 Telegram Канал</h4>
                            <a href="https://t.me/DexRebbitOfficial" target="_blank" style="display: block; margin-top: 12px; padding: 12px 20px; background: rgba(0, 136, 204, 0.2); border: 1px solid rgba(0, 136, 204, 0.5); border-radius: 16px; color: #0088cc; text-decoration: none; font-weight: 600; text-align: center;">
                                @DexRebbitOfficial →
                            </a>
                            <p style="margin-top: 8px; font-size: 13px; opacity: 0.8;">Новости и анонсы</p>
                        </div>

                        <div>
                            <h4>👥 Telegram Чат</h4>
                            <a href="https://t.me/DEXRabbitOfficialGroupInfo" target="_blank" style="display: block; margin-top: 12px; padding: 12px 20px; background: rgba(0, 136, 204, 0.2); border: 1px solid rgba(0, 136, 204, 0.5); border-radius: 16px; color: #0088cc; text-decoration: none; font-weight: 600; text-align: center;">
                                @DEXRabbitOfficialGroupInfo →
                            </a>
                            <p style="margin-top: 8px; font-size: 13px; opacity: 0.8;">Общение с инвесторами</p>
                        </div>

                        <div>
                            <h4>📺 YouTube</h4>
                            <a href="https://www.youtube.com/@DexRabbitFarm" target="_blank" style="display: block; margin-top: 12px; padding: 12px 20px; background: rgba(255, 0, 0, 0.2); border: 1px solid rgba(255, 0, 0, 0.5); border-radius: 16px; color: #FF0000; text-decoration: none; font-weight: 600; text-align: center;">
                                @DexRabbitFarm →
                            </a>
                            <p style="margin-top: 8px; font-size: 13px; opacity: 0.8;">Видео с фермы</p>
                        </div>

                        <div>
                            <h4>📧 Email</h4>
                            <a href="mailto:kupitkrolika@gmail.com" style="display: block; margin-top: 12px; padding: 12px 20px; background: rgba(124, 140, 255, 0.1); border: 1px solid rgba(124, 140, 255, 0.3); border-radius: 16px; color: #7c8cff; text-decoration: none; font-weight: 600; text-align: center;">
                                kupitkrolika@gmail.com →
                            </a>
                            <p style="margin-top: 8px; font-size: 13px; opacity: 0.8;">Деловые предложения</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="overline">Форматы</span>
                    <h2>🎬 Идеи для контента</h2>
                </div>

                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <div class="card">
                        <h3>🎥 Видео</h3>
                        <ul class="checklist">
                            <li>Обзор платформы DEXRabbit</li>
                            <li>Экскурсия по ферме</li>
                            <li>Интервью с инвесторами</li>
                            <li>Как работает токенизация</li>
                            <li>Распаковка прибыли</li>
                            <li>Процесс разведения кроликов</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h3>📝 Статьи</h3>
                        <ul class="checklist">
                            <li>Гайд для новичков</li>
                            <li>Сравнение с другими инвестициями</li>
                            <li>История успеха инвестора</li>
                            <li>Анализ PLEX токена</li>
                            <li>FAQ по платформе</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h3>📸 Визуальный контент</h3>
                        <ul class="checklist">
                            <li>Фотографии кроликов</li>
                            <li>Инфографика доходности</li>
                            <li>Скриншоты из бота</li>
                            <li>Графики роста PLEX</li>
                            <li>Мемы про кроликов</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-alt">
            <div class="container" style="text-align: center;">
                <h2 style="margin-bottom: 20px;">🚀 Готовы начать сотрудничество?</h2>
                <p style="font-size: 18px; color: rgba(255, 255, 255, 0.9); margin-bottom: 32px; max-width: 700px; margin-left: auto; margin-right: auto;">
                    Свяжитесь с нами через бот или напишите на почту. Мы обсудим индивидуальные условия 
                    и найдём лучший формат для вашего канала!
                </p>
                
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 18px 36px; background: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 28px; color: #fff; font-size: 17px; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(124, 140, 255, 0.5); transition: all 0.3s ease;">
                        <span style="font-size: 26px;">🤖</span>
                        <span>Написать в бот</span>
                    </a>
                    
                    <a href="mailto:kupitkrolika@gmail.com" style="display: inline-flex; align-items: center; gap: 10px; padding: 18px 36px; background: rgba(124, 140, 255, 0.1); border: 2px solid rgba(124, 140, 255, 0.5); border-radius: 28px; color: #fff; font-size: 17px; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">
                        <span style="font-size: 22px;">📧</span>
                        <span>Отправить email</span>
                    </a>
                </div>
            </div>
        </section>

        <div class="bot-link-wrapper" style="text-align: center; margin: 40px auto; padding: 32px; background: linear-gradient(135deg, rgba(124, 140, 255, 0.1), rgba(76, 201, 240, 0.05)); border: 1px solid rgba(124, 140, 255, 0.3); border-radius: 20px; max-width: 800px;">
          <h3 style="margin-bottom: 16px; color: #fff; font-size: 22px;">🤖 Все операции в Telegram боте</h3>
          <p style="margin-bottom: 24px; color: rgba(255, 255, 255, 0.8); font-size: 15px;">Партнёрская программа, реферальные ссылки, статистика и выплаты</p>
          <a href="https://t.me/dexrabbit_bot" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: rgba(124, 140, 255, 0.15); border: 2px solid rgba(124, 140, 255, 0.5); border-radius: 28px; color: #fff; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">
            <span style="font-size: 20px;">💬</span>
            <span>Перейти в бот @dexrabbit_bot</span>
          </a>
        </div>
    </main>

${fullFooter}
  </body>
</html>`;

fs.writeFileSync('bloggers.html', bloggersPage, 'utf8');
console.log('✅ bloggers.html создан с полным контентом и футером!');

