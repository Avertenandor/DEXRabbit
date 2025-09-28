// Модуль интеграции с Telegram-ботом и каналом
class TelegramIntegration {
    constructor() {
        this.botToken = process.env.TELEGRAM_BOT_TOKEN || 'demo_token';
        this.channelId = '@kupitkrolika';
        this.botUsername = '@kupitkrolika_bot';
        this.vipGroupId = '-1001234567890'; // VIP-группа для инвесторов Круга Б
        
        this.commands = {
            '/start': this.handleStart.bind(this),
            '/balance': this.handleBalance.bind(this),
            '/invest': this.handleInvest.bind(this),
            '/catalog': this.handleCatalog.bind(this),
            '/my_rabbits': this.handleMyRabbits.bind(this),
            '/reports': this.handleReports.bind(this),
            '/exchange': this.handleExchange.bind(this),
            '/referral': this.handleReferral.bind(this),
            '/support': this.handleSupport.bind(this),
            '/help': this.handleHelp.bind(this)
        };
        
        this.userSessions = {};
        this.notificationQueue = [];
        
        this.init();
    }

    init() {
        this.setupWebhook();
        this.startNotificationService();
        this.initializeChannelIntegration();
        console.log('🤖 Telegram integration initialized');
    }

    // Основные команды бота
    async handleStart(userId, messageText, chatId) {
        const user = await this.getOrCreateUser(userId);
        
        const welcomeMessage = `
🐰 *Добро пожаловать в КупитьКролика!*

Первая токенизированная кроличья ферма в России

*🎯 Что я умею:*
/balance - Ваш PLEX баланс
/invest - Инвестировать в кроликов  
/catalog - Каталог кроликов
/my_rabbits - Мои кролики
/reports - Видео-отчёты фермы
/exchange - Обмен PLEX ↔ USDT
/referral - Реферальная программа
/support - Техподдержка

*💰 Быстрый старт:*
1. Изучите /catalog кроликов
2. Выберите инвестицию от 100 USDT
3. Получайте ежедневные PLEX-бонусы
4. Участвуйте в прибыли от продажи потомства

*🎁 Бонус новичкам:* 10 PLEX при первой инвестиции!

👉 /invest - Начать инвестировать
        `;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '💰 Инвестировать', callback_data: 'invest_start' },
                    { text: '📋 Каталог', callback_data: 'catalog_view' }
                ],
                [
                    { text: '🪙 Мой баланс', callback_data: 'balance_check' },
                    { text: '📺 Отчёты', callback_data: 'reports_latest' }
                ],
                [
                    { text: '🌐 Открыть сайт', url: 'https://xn--80apagbbfxgmuj4j.site' }
                ]
            ]
        };

        return {
            text: welcomeMessage,
            parse_mode: 'Markdown',
            reply_markup: keyboard
        };
    }

    async handleBalance(userId) {
        const user = await this.getUserData(userId);
        const plexBalance = user.plexBalance || 0;
        const usdtBalance = user.usdtBalance || 0;
        const totalInvested = user.totalInvested || 0;
        const todayRewards = await this.getTodayRewards(userId);
        
        const balanceMessage = `
💰 *Ваш баланс*

🪙 *PLEX:* ${plexBalance.toFixed(4)}
💵 *USDT:* ${usdtBalance.toFixed(2)}

📊 *Статистика:*
• Всего инвестировано: ${totalInvested} USDT
• Получено сегодня: +${todayRewards.toFixed(4)} PLEX
• Курс PLEX: 1.0000 USDT

*📈 Доходность:*
• За сегодня: +${(todayRewards * 1.0).toFixed(2)} USDT
• За месяц: +${(todayRewards * 30).toFixed(2)} USDT
• Годовая: ~${((todayRewards * 365 / totalInvested) * 100).toFixed(2)}%

*💱 Действия:*
/exchange - Обменять PLEX → USDT
/invest - Увеличить инвестицию
        `;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '💱 Обменять', callback_data: 'exchange_plex' },
                    { text: '📈 Инвестировать', callback_data: 'invest_more' }
                ],
                [
                    { text: '📊 Детальная статистика', callback_data: 'stats_detailed' }
                ]
            ]
        };

        return {
            text: balanceMessage,
            parse_mode: 'Markdown',
            reply_markup: keyboard
        };
    }

    async handleCatalog(userId) {
        const featuredRabbits = await this.getFeaturedRabbits();
        
        let catalogMessage = '🐰 *Каталог рекомендуемых кроликов*\n\n';
        
        featuredRabbits.forEach((rabbit, index) => {
            const statusEmoji = rabbit.status === 'available' ? '✅' : '❌';
            const genderEmoji = rabbit.gender === 'male' ? '♂️' : '♀️';
            const investPrice = Math.round(rabbit.price * (rabbit.gender === 'male' ? 2.2 : 1.8));
            
            catalogMessage += `*${index + 1}. ${rabbit.name}* ${genderEmoji}\n`;
            catalogMessage += `🏷️ ${rabbit.breed}\n`;
            catalogMessage += `⚖️ ${rabbit.weight} кг • 📅 ${rabbit.age} мес\n`;
            catalogMessage += `💰 Инвестиция: ${investPrice} USDT ${statusEmoji}\n\n`;
        });
        
        catalogMessage += `*📱 Действия:*
• Выберите кролика кнопками ниже
• Или откройте полный каталог на сайте
        `;

        const keyboard = {
            inline_keyboard: [
                ...featuredRabbits.slice(0, 3).map((rabbit, index) => [
                    { text: `${index + 1}. ${rabbit.name} (${rabbit.gender === 'male' ? '♂️' : '♀️'})`, callback_data: `rabbit_${rabbit.id}` }
                ]),
                [
                    { text: '🌐 Полный каталог', url: 'https://xn--80apagbbfxgmuj4j.site/catalog' },
                    { text: '💰 Инвестировать', callback_data: 'invest_start' }
                ]
            ]
        };

        return {
            text: catalogMessage,
            parse_mode: 'Markdown',
            reply_markup: keyboard
        };
    }

    async handleMyRabbits(userId) {
        const userInvestments = await this.getUserInvestments(userId);
        
        if (userInvestments.length === 0) {
            return {
                text: `
🐰 *У вас пока нет кроликов*

Начните инвестировать и получите своего первого кролика!

/invest - Выбрать кролика
/catalog - Посмотреть каталог
                `,
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💰 Инвестировать', callback_data: 'invest_start' }]
                    ]
                }
            };
        }

        let myRabbitsMessage = '🐰 *Ваши кролики:*\n\n';
        
        userInvestments.forEach((investment, index) => {
            const rabbit = investment.rabbit;
            const cycle = investment.currentCycle || { status: 'preparing', cycleNumber: 1 };
            
            myRabbitsMessage += `*${index + 1}. ${rabbit.name}* ${rabbit.gender === 'male' ? '♂️' : '♀️'}\n`;
            myRabbitsMessage += `🏷️ ${rabbit.breed} • ⚖️ ${rabbit.weight} кг\n`;
            myRabbitsMessage += `💰 Инвестировано: ${investment.amount} USDT\n`;
            myRabbitsMessage += `🔄 Статус: ${this.getCycleStatusText(cycle.status)}\n`;
            myRabbitsMessage += `📊 Цикл: ${cycle.cycleNumber}/2\n\n`;
        });

        myRabbitsMessage += `*📱 Быстрые действия:*
/reports - Видео-отчёты
/balance - Проверить баланс PLEX
        `;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '📺 Видео-отчёты', callback_data: 'reports_latest' },
                    { text: '📊 Статистика', callback_data: 'stats_detailed' }
                ],
                [
                    { text: '🌐 Открыть в браузере', url: 'https://xn--80apagbbfxgmuj4j.site/dashboard' }
                ]
            ]
        };

        return {
            text: myRabbitsMessage,
            parse_mode: 'Markdown',
            reply_markup: keyboard
        };
    }

    async handleReports(userId) {
        const latestReports = await this.getLatestReports();
        
        let reportsMessage = '📺 *Последние видео-отчёты фермы*\n\n';
        
        latestReports.forEach((report, index) => {
            const timeAgo = this.getTimeAgo(report.timestamp);
            reportsMessage += `*${index + 1}. ${report.title}*\n`;
            reportsMessage += `📅 ${timeAgo}\n`;
            reportsMessage += `👀 ${report.views} просмотров\n\n`;
        });

        reportsMessage += `*📱 Новые отчёты:*
• Утром в 10:00 МСК
• Вечером в 18:00 МСК
• Экстренные по необходимости

🔔 Подпишитесь на уведомления!
        `;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '▶️ Последний отчёт', url: latestReports[0]?.url || '#' },
                    { text: '📺 Все отчёты', url: 'https://xn--80apagbbfxgmuj4j.site/reports' }
                ],
                [
                    { text: '🔔 Настроить уведомления', callback_data: 'notifications_setup' }
                ]
            ]
        };

        return {
            text: reportsMessage,
            parse_mode: 'Markdown',
            reply_markup: keyboard
        };
    }

    async handleReferral(userId) {
        const user = await this.getUserData(userId);
        const referralCode = user.referralCode || this.generateReferralCode(userId);
        const referralStats = await this.getReferralStats(userId);
        
        const referralMessage = `
🤝 *Реферальная программа*

*Ваш код:* \`${referralCode}\`
*Ссылка:* https://xn--80apagbbfxgmuj4j.site?ref=${referralCode}

*📊 Статистика:*
• Приглашено: ${referralStats.invited} человек
• Активных: ${referralStats.active} инвесторов
• Заработано: ${referralStats.earned.toFixed(2)} USDT

*💰 Как работает:*
1️⃣ Делитесь ссылкой с друзьями
2️⃣ Они регистрируются и инвестируют
3️⃣ Вы получаете 5% с их инвестиций
4️⃣ + 5% с их прибыли навсегда!

*🎁 Бонусы:*
• 10+ рефералов: +0.05% к ежедневным PLEX
• 50+ рефералов: приоритет в новых проектах
• 100+ рефералов: персональный менеджер
        `;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '📤 Поделиться ссылкой', switch_inline_query: `Инвестируй в кроликов! Получай ежедневные PLEX. Мой код: ${referralCode}` }
                ],
                [
                    { text: '📊 Детальная статистика', callback_data: 'referral_stats' },
                    { text: '💸 Вывести', callback_data: 'referral_withdraw' }
                ]
            ]
        };

        return {
            text: referralMessage,
            parse_mode: 'Markdown',
            reply_markup: keyboard
        };
    }

    // Автоматические уведомления
    async sendDailyRewardNotification(userId, amount) {
        const message = `
🎉 *Ежедневное начисление PLEX*

💰 Получено: +${amount.toFixed(4)} PLEX
🕐 Время: ${new Date().toLocaleTimeString('ru-RU', {timeZone: 'Europe/Moscow'})} МСК

*💡 Что можно сделать с PLEX:*
• Обменять на USDT через /exchange
• Оплатить визит на ферму (50 PLEX)
• Заказать фотосессию с кроликом (20 PLEX)

/balance - Проверить общий баланс
        `;

        await this.sendMessage(userId, message, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '💱 Обменять', callback_data: 'exchange_plex' },
                        { text: '🛍️ Услуги', callback_data: 'services_farm' }
                    ]
                ]
            }
        });
    }

    async sendBreedingUpdateNotification(userId, update) {
        const statusEmojis = {
            'breeding': '💕',
            'pregnant': '🤰',
            'birthing': '👶',
            'lactating': '🍼',
            'completed': '✅'
        };

        const message = `
${statusEmojis[update.status]} *Обновление по вашим кроликам*

🐰 *Пара:* ${update.maleName} × ${update.femaleName}
📊 *Статус:* ${this.getCycleStatusText(update.status)}
🔄 *Цикл:* ${update.cycleNumber}/2

${update.details}

*📺 Посмотреть видео-отчёт:*
${update.videoUrl || 'Будет доступен в ближайшее время'}
        `;

        await this.sendMessage(userId, message, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '📺 Видео-отчёт', url: update.videoUrl || '#' },
                        { text: '🐰 Мои кролики', callback_data: 'my_rabbits' }
                    ]
                ]
            }
        });
    }

    // Публикация в канале
    async publishToChannel(content) {
        const channelMessage = `
🐰 *КупитьКролика | Обновления фермы*

${content.message}

${content.media ? `📸 ${content.media.length} фото/видео` : ''}

💬 Обсуждение: ${this.botUsername}
🌐 Сайт: https://xn--80apagbbfxgmuj4j.site
        `;

        // В реальном приложении здесь был бы вызов Telegram Bot API
        console.log('📢 Publishing to channel:', channelMessage);
        
        return {
            messageId: Date.now(),
            url: `https://t.me/kupitkrolika/${Date.now()}`
        };
    }

    // Управление VIP-группой
    async inviteToVipGroup(userId, userName) {
        const inviteMessage = `
🌟 *Приглашение в VIP-группу инвесторов Круга Б*

Поздравляем! Вы получили доступ к закрытому сообществу крупных инвесторов.

*💎 Преимущества VIP-группы:*
• Прямое общение с фермером
• Эксклюзивные отчёты и фото
• Приоритет в новых проектах
• Участие в стратегических решениях
• Закрытые аукционы племенного материала

*👇 Присоединяйтесь:*
        `;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '🌟 Войти в VIP-группу', url: `https://t.me/kupitkrolika_vip` }
                ]
            ]
        };

        await this.sendMessage(userId, inviteMessage, {
            parse_mode: 'Markdown',
            reply_markup: keyboard
        });
    }

    // Интеграция с сайтом
    async syncWithWebsite(userId, data) {
        // Синхронизация данных пользователя с сайтом
        const syncData = {
            telegramId: userId,
            plexBalance: data.plexBalance,
            investments: data.investments,
            referralStats: data.referralStats,
            lastSync: new Date().toISOString()
        };

        // В реальном приложении здесь был бы API-вызов к сайту
        console.log('🔄 Syncing with website:', syncData);
        
        return syncData;
    }

    // Вспомогательные методы
    getCycleStatusText(status) {
        const statusMap = {
            'preparing': 'Подготовка к случке',
            'breeding': 'Период случки',
            'pregnant': 'Беременность',
            'birthing': 'Роды',
            'lactating': 'Выкармливание',
            'completed': 'Цикл завершён'
        };
        return statusMap[status] || status;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 60) return `${minutes} мин назад`;
        if (hours < 24) return `${hours} ч назад`;
        return `${days} дней назад`;
    }

    generateReferralCode(userId) {
        return 'REF' + userId.toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
    }

    async getOrCreateUser(userId) {
        // Заглушка для получения/создания пользователя
        return {
            id: userId,
            plexBalance: 0,
            usdtBalance: 0,
            totalInvested: 0,
            joinDate: new Date().toISOString(),
            referralCode: this.generateReferralCode(userId)
        };
    }

    async getUserData(userId) {
        return {
            plexBalance: 234.5678,
            usdtBalance: 150.00,
            totalInvested: 1000,
            referralCode: 'REF123ABC'
        };
    }

    async getTodayRewards(userId) {
        return 1.5; // 1.5 PLEX за день
    }

    async getFeaturedRabbits() {
        return [
            { id: 1, name: 'Белоснежка', breed: 'Калифорнийский', gender: 'female', age: 6, weight: 2.8, price: 150, status: 'available' },
            { id: 2, name: 'Граф', breed: 'Калифорнийский', gender: 'male', age: 8, weight: 3.5, price: 250, status: 'available' },
            { id: 3, name: 'Серый', breed: 'Серый великан', gender: 'male', age: 12, weight: 4.2, price: 300, status: 'reserved' }
        ];
    }

    async getUserInvestments(userId) {
        return [
            {
                rabbit: { id: 1, name: 'Белоснежка', breed: 'Калифорнийский', gender: 'female', weight: 2.8 },
                amount: 500,
                currentCycle: { status: 'breeding', cycleNumber: 1 }
            }
        ];
    }

    async getLatestReports() {
        return [
            {
                title: 'Утренний обход фермы',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                views: 156,
                url: 'https://example.com/video1'
            }
        ];
    }

    async getReferralStats(userId) {
        return {
            invited: 5,
            active: 3,
            earned: 125.50
        };
    }

    async sendMessage(userId, text, options = {}) {
        // В реальном приложении здесь был бы вызов Telegram Bot API
        console.log(`💬 Sending to ${userId}:`, text);
        return { message_id: Date.now() };
    }

    setupWebhook() {
        // Настройка webhook для получения сообщений
        console.log('🔗 Webhook configured');
    }

    startNotificationService() {
        // Сервис отправки уведомлений
        setInterval(() => {
            this.processNotificationQueue();
        }, 30000); // каждые 30 секунд
    }

    processNotificationQueue() {
        // Обработка очереди уведомлений
        if (this.notificationQueue.length > 0) {
            console.log(`📤 Processing ${this.notificationQueue.length} notifications`);
            this.notificationQueue = [];
        }
    }

    initializeChannelIntegration() {
        // Инициализация интеграции с каналом
        console.log('📺 Channel integration ready');
    }
}

// Инициализация Telegram интеграции
window.telegramBot = new TelegramIntegration();

console.log('🤖 Telegram Bot integration loaded');