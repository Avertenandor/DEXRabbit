// Модуль партнёрской программы и реферальной системы
class PartnershipProgram {
    constructor() {
        this.partnerTypes = {
            'referrer': {
                name: 'Реферальный партнёр',
                commission: 0.05, // 5% с инвестиций рефералов
                bonusCommission: 0.02, // 2% с прибыли рефералов
                requirements: { referrals: 1 },
                benefits: ['5% комиссия', 'Пожизненный доход', 'Статистика в реальном времени']
            },
            'influencer': {
                name: 'Инфлюенсер',
                commission: 0.08, // 8% с инвестиций
                bonusCommission: 0.03, // 3% с прибыли
                requirements: { referrals: 25, followers: 5000 },
                benefits: ['8% комиссия', 'Персональная ссылка', 'Промо-материалы', 'Приоритетная поддержка']
            },
            'agency': {
                name: 'Агентский партнёр',
                commission: 0.12, // 12% с инвестиций
                bonusCommission: 0.05, // 5% с прибыли
                requirements: { referrals: 100, monthlyVolume: 50000 },
                benefits: ['12% комиссия', 'Персональный менеджер', 'Белая метка', 'API-доступ']
            },
            'corporate': {
                name: 'Корпоративный партнёр',
                commission: 0.15, // 15% с инвестиций
                bonusCommission: 0.08, // 8% с прибыли
                requirements: { monthlyVolume: 200000 },
                benefits: ['15% комиссия', 'Индивидуальные условия', 'Совместные продукты', 'Техническая интеграция']
            }
        };
        
        this.referralTiers = {
            'bronze': { minReferrals: 1, bonusRate: 1.0, title: 'Бронзовый партнёр' },
            'silver': { minReferrals: 10, bonusRate: 1.2, title: 'Серебряный партнёр' },
            'gold': { minReferrals: 50, bonusRate: 1.5, title: 'Золотой партнёр' },
            'platinum': { minReferrals: 100, bonusRate: 2.0, title: 'Платиновый партнёр' },
            'diamond': { minReferrals: 500, bonusRate: 3.0, title: 'Алмазный партнёр' }
        };
        
        this.partners = {};
        this.referralCodes = {};
        this.partnerStats = {};
        
        this.init();
    }

    init() {
        this.loadPartnerData();
        this.initializeTracking();
        this.renderPartnerDashboard();
        this.startCommissionCalculation();
        console.log('🤝 Partnership program initialized');
    }

    // Создание реферального кода
    generateReferralCode(userId, customCode = null) {
        if (customCode && !this.referralCodes[customCode]) {
            this.referralCodes[customCode] = userId;
            return customCode;
        }
        
        // Генерируем уникальный код
        let code;
        do {
            code = 'REF' + userId.toString().slice(-4) + 
                   Math.random().toString(36).substr(2, 4).toUpperCase();
        } while (this.referralCodes[code]);
        
        this.referralCodes[code] = userId;
        return code;
    }

    // Регистрация партнёра
    async registerPartner(userId, type = 'referrer', data = {}) {
        const partnerConfig = this.partnerTypes[type];
        if (!partnerConfig) {
            throw new Error('Неизвестный тип партнёра');
        }

        // Проверяем требования
        const meetsRequirements = await this.checkRequirements(userId, partnerConfig.requirements);
        if (!meetsRequirements.success) {
            throw new Error(`Не выполнены требования: ${meetsRequirements.missing.join(', ')}`);
        }

        const partner = {
            id: userId,
            type: type,
            status: 'active',
            registrationDate: new Date().toISOString(),
            referralCode: data.customCode ? 
                this.generateReferralCode(userId, data.customCode) : 
                this.generateReferralCode(userId),
            commission: partnerConfig.commission,
            bonusCommission: partnerConfig.bonusCommission,
            tier: this.calculateTier(0),
            stats: {
                totalReferrals: 0,
                activeReferrals: 0,
                totalVolume: 0,
                totalCommissions: 0,
                monthlyVolume: 0,
                monthlyCommissions: 0
            },
            settings: {
                payoutMethod: data.payoutMethod || 'usdt',
                payoutAddress: data.payoutAddress || '',
                notifications: data.notifications || true,
                autoPayouts: data.autoPayouts || false,
                minPayout: data.minPayout || 10
            }
        };

        this.partners[userId] = partner;
        this.partnerStats[userId] = this.createStatsStructure();
        
        // Уведомляем о регистрации
        await this.notifyPartnerRegistration(partner);
        
        // Трекинг события
        if (window.analytics) {
            window.analytics.trackEvent('partner_registered', {
                event_category: 'partnership',
                partner_type: type,
                user_id: userId
            });
        }

        return partner;
    }

    // Обработка реферальной регистрации
    async processReferralRegistration(referralCode, newUserId, investmentAmount = 0) {
        const referrerId = this.referralCodes[referralCode];
        if (!referrerId) {
            return { success: false, reason: 'Invalid referral code' };
        }

        const partner = this.partners[referrerId];
        if (!partner || partner.status !== 'active') {
            return { success: false, reason: 'Partner not active' };
        }

        // Создаём запись о реферале
        const referral = {
            id: newUserId,
            referrerId: referrerId,
            registrationDate: new Date().toISOString(),
            status: 'registered',
            totalInvested: investmentAmount,
            totalCommissions: 0,
            isActive: investmentAmount > 0
        };

        // Обновляем статистику партнёра
        partner.stats.totalReferrals++;
        if (investmentAmount > 0) {
            partner.stats.activeReferrals++;
            partner.stats.totalVolume += investmentAmount;
            partner.stats.monthlyVolume += investmentAmount;
        }

        // Рассчитываем и начисляем комиссию
        if (investmentAmount > 0) {
            const commission = await this.calculateCommission(referrerId, investmentAmount, 'investment');
            await this.creditCommission(referrerId, commission, 'referral_investment', {
                referralId: newUserId,
                amount: investmentAmount
            });
        }

        // Обновляем tier партнёра
        partner.tier = this.calculateTier(partner.stats.totalReferrals);

        // Уведомляем партнёра
        await this.notifyNewReferral(referrerId, referral, investmentAmount);

        return {
            success: true,
            referral: referral,
            commission: investmentAmount > 0 ? commission : 0
        };
    }

    // Расчёт комиссии
    async calculateCommission(partnerId, amount, type = 'investment') {
        const partner = this.partners[partnerId];
        if (!partner) return 0;

        let baseRate = type === 'investment' ? partner.commission : partner.bonusCommission;
        const tierMultiplier = this.referralTiers[partner.tier]?.bonusRate || 1.0;
        
        // Дополнительные бонусы
        let bonusMultiplier = 1.0;
        
        // Бонус за объём (для агентских партнёров)
        if (partner.type === 'agency' && partner.stats.monthlyVolume > 100000) {
            bonusMultiplier += 0.1; // +10%
        }
        
        // Бонус за активность (более 20 рефералов в месяц)
        if (partner.stats.monthlyReferrals > 20) {
            bonusMultiplier += 0.05; // +5%
        }
        
        const finalRate = baseRate * tierMultiplier * bonusMultiplier;
        const commission = amount * finalRate;
        
        return {
            amount: commission,
            rate: finalRate,
            baseRate: baseRate,
            tierMultiplier: tierMultiplier,
            bonusMultiplier: bonusMultiplier,
            details: {
                originalAmount: amount,
                tier: partner.tier,
                partnerType: partner.type
            }
        };
    }

    // Начисление комиссии
    async creditCommission(partnerId, commission, type, metadata = {}) {
        const partner = this.partners[partnerId];
        if (!partner) return;

        const commissionRecord = {
            id: this.generateCommissionId(),
            partnerId: partnerId,
            amount: commission.amount,
            rate: commission.rate,
            type: type,
            status: 'credited',
            createdAt: new Date().toISOString(),
            metadata: metadata
        };

        // Обновляем статистику партнёра
        partner.stats.totalCommissions += commission.amount;
        partner.stats.monthlyCommissions += commission.amount;

        // Сохраняем запись о комиссии
        if (!this.partnerStats[partnerId].commissions) {
            this.partnerStats[partnerId].commissions = [];
        }
        this.partnerStats[partnerId].commissions.push(commissionRecord);

        // Автоматическая выплата, если настроена
        if (partner.settings.autoPayouts && 
            partner.stats.totalCommissions >= partner.settings.minPayout) {
            await this.processAutoPayout(partnerId);
        }

        // Уведомляем о начислении
        await this.notifyCommissionCredited(partnerId, commission, type);

        return commissionRecord;
    }

    // Расчёт tier'а партнёра
    calculateTier(referralCount) {
        const tiers = Object.entries(this.referralTiers)
            .sort((a, b) => b[1].minReferrals - a[1].minReferrals);
        
        for (const [tierName, tierData] of tiers) {
            if (referralCount >= tierData.minReferrals) {
                return tierName;
            }
        }
        
        return 'bronze';
    }

    // Партнёрская панель
    renderPartnerDashboard() {
        const dashboardContainer = document.getElementById('partner-dashboard');
        if (!dashboardContainer) return;

        // Получаем данные текущего пользователя (демо)
        const currentUserId = 'demo_partner';
        const partner = this.partners[currentUserId] || this.createDemoPartner(currentUserId);
        const stats = this.partnerStats[currentUserId] || this.createStatsStructure();

        dashboardContainer.innerHTML = `
            <div class="partner-dashboard">
                <div class="dashboard-header">
                    <div class="partner-info">
                        <h2 class="partner-title">${this.partnerTypes[partner.type].name}</h2>
                        <div class="partner-tier">
                            <span class="tier-badge tier-${partner.tier}">
                                ${this.referralTiers[partner.tier].title}
                            </span>
                        </div>
                    </div>
                    <div class="partner-code">
                        <label>Ваш реферальный код:</label>
                        <div class="code-display">
                            <input type="text" value="${partner.referralCode}" readonly>
                            <button onclick="copyReferralCode('${partner.referralCode}')" class="btn btn-outline btn-small">
                                📋 Копировать
                            </button>
                        </div>
                    </div>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <div class="stat-value">${partner.stats.totalReferrals}</div>
                            <div class="stat-label">Всего рефералов</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">$${partner.stats.totalVolume.toLocaleString()}</div>
                            <div class="stat-label">Общий объём</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">💎</div>
                        <div class="stat-content">
                            <div class="stat-value">$${partner.stats.totalCommissions.toFixed(2)}</div>
                            <div class="stat-label">Заработано всего</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">${(partner.commission * 100).toFixed(1)}%</div>
                            <div class="stat-label">Ваша ставка</div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <button onclick="generatePromaterials()" class="btn btn-primary">
                        🎨 Промо-материалы
                    </button>
                    <button onclick="openReferralStats()" class="btn btn-outline">
                        📈 Статистика
                    </button>
                    <button onclick="requestPayout()" class="btn btn-secondary">
                        💸 Запросить выплату
                    </button>
                    <button onclick="shareReferralLink('${partner.referralCode}')" class="btn btn-outline">
                        📤 Поделиться
                    </button>
                </div>

                <div class="recent-activity">
                    <h3>Последняя активность</h3>
                    <div class="activity-list">
                        ${this.generateRecentActivity(stats).map(activity => `
                            <div class="activity-item">
                                <div class="activity-icon">${activity.icon}</div>
                                <div class="activity-content">
                                    <div class="activity-text">${activity.text}</div>
                                    <div class="activity-time">${activity.time}</div>
                                </div>
                                <div class="activity-amount">${activity.amount}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Создание промо-материалов
    generatePromoMaterials(partnerId) {
        const partner = this.partners[partnerId];
        if (!partner) return;

        const materials = {
            banners: [
                {
                    size: '728x90',
                    title: 'Лидерборд баннер',
                    url: this.generateBannerUrl(partner.referralCode, '728x90'),
                    code: `<img src="${this.generateBannerUrl(partner.referralCode, '728x90')}" alt="КупитьКролика - Инвестиции в кроликов">`
                },
                {
                    size: '300x250',
                    title: 'Средний прямоугольник',
                    url: this.generateBannerUrl(partner.referralCode, '300x250'),
                    code: `<img src="${this.generateBannerUrl(partner.referralCode, '300x250')}" alt="КупитьКролика - Инвестиции в кроликов">`
                }
            ],
            links: [
                {
                    type: 'main',
                    title: 'Главная страница',
                    url: `https://xn--80apagbbfxgmuj4j.site?ref=${partner.referralCode}`,
                    text: 'Инвестируй в кроликов и получай ежедневные PLEX-бонусы!'
                },
                {
                    type: 'catalog',
                    title: 'Каталог кроликов',
                    url: `https://xn--80apagbbfxgmuj4j.site/catalog?ref=${partner.referralCode}`,
                    text: 'Выбери своего кролика для инвестиций'
                }
            ],
            texts: [
                {
                    type: 'short',
                    title: 'Краткое описание',
                    text: `🐰 Первая токенизированная кроличья ферма в России! Инвестируй от 100 USDT, получай ежедневные PLEX-бонусы и долю от продажи потомства. Мой код: ${partner.referralCode}`
                },
                {
                    type: 'detailed',
                    title: 'Подробное описание',
                    text: `💰 КупитьКролика - это революция в сельском хозяйстве! 

🎯 Что это:
• Токенизированная кроличья ферма
• Инвестиции от 100 до 50000 USDT
• Ежедневные PLEX-бонусы 0.15-0.25%
• Доход от продажи потомства (70% инвестору)
• Полная прозрачность через видео-отчёты

🎁 По моему коду ${partner.referralCode} получите бонус 10 PLEX!

Начни инвестировать: https://xn--80apagbbfxgmuj4j.site?ref=${partner.referralCode}`
                }
            ]
        };

        return materials;
    }

    // Обработка выплат
    async processAutoPayout(partnerId) {
        const partner = this.partners[partnerId];
        if (!partner) return;

        const payoutAmount = partner.stats.totalCommissions;
        
        // Создаём запись о выплате
        const payout = {
            id: this.generatePayoutId(),
            partnerId: partnerId,
            amount: payoutAmount,
            method: partner.settings.payoutMethod,
            address: partner.settings.payoutAddress,
            status: 'processing',
            createdAt: new Date().toISOString(),
            processedAt: null
        };

        // В реальном приложении здесь был бы API-вызов к платёжной системе
        console.log('Processing payout:', payout);

        // Обнуляем накопленные комиссии
        partner.stats.totalCommissions = 0;

        // Уведомляем о выплате
        await this.notifyPayoutProcessed(partnerId, payout);

        return payout;
    }

    // Проверка требований для партнёрства
    async checkRequirements(userId, requirements) {
        const userStats = await this.getUserStats(userId);
        const missing = [];

        if (requirements.referrals && userStats.referrals < requirements.referrals) {
            missing.push(`Нужно ${requirements.referrals} рефералов (есть ${userStats.referrals})`);
        }

        if (requirements.followers && userStats.followers < requirements.followers) {
            missing.push(`Нужно ${requirements.followers} подписчиков (есть ${userStats.followers})`);
        }

        if (requirements.monthlyVolume && userStats.monthlyVolume < requirements.monthlyVolume) {
            missing.push(`Нужен месячный оборот ${requirements.monthlyVolume} USDT`);
        }

        return {
            success: missing.length === 0,
            missing: missing
        };
    }

    // Вспомогательные методы
    createDemoPartner(userId) {
        return {
            id: userId,
            type: 'influencer',
            status: 'active',
            registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            referralCode: 'DEMO123',
            commission: 0.08,
            bonusCommission: 0.03,
            tier: 'silver',
            stats: {
                totalReferrals: 15,
                activeReferrals: 12,
                totalVolume: 45000,
                totalCommissions: 3600,
                monthlyVolume: 15000,
                monthlyCommissions: 1200
            }
        };
    }

    createStatsStructure() {
        return {
            commissions: [],
            referrals: [],
            payouts: []
        };
    }

    generateRecentActivity(stats) {
        return [
            {
                icon: '💰',
                text: 'Новая комиссия с реферала',
                time: '2 часа назад',
                amount: '+$125.50'
            },
            {
                icon: '👤',
                text: 'Новый активный реферал',
                time: '5 часов назад',
                amount: '+1 реферал'
            },
            {
                icon: '💎',
                text: 'Повышение до Silver tier',
                time: '1 день назад',
                amount: '+20% к ставке'
            }
        ];
    }

    generateBannerUrl(referralCode, size) {
        return `/images/banners/partner-${size}-${referralCode}.png`;
    }

    generateCommissionId() {
        return 'COMM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generatePayoutId() {
        return 'PAYOUT_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async getUserStats(userId) {
        return {
            referrals: 0,
            followers: 0,
            monthlyVolume: 0
        };
    }

    async notifyPartnerRegistration(partner) {
        console.log('Partner registered:', partner);
    }

    async notifyNewReferral(partnerId, referral, amount) {
        console.log(`New referral for partner ${partnerId}:`, referral);
    }

    async notifyCommissionCredited(partnerId, commission, type) {
        console.log(`Commission credited to partner ${partnerId}:`, commission);
    }

    async notifyPayoutProcessed(partnerId, payout) {
        console.log(`Payout processed for partner ${partnerId}:`, payout);
    }

    loadPartnerData() {
        // Загрузка данных партнёров
        console.log('Loading partner data...');
    }

    initializeTracking() {
        // Инициализация отслеживания
        console.log('Partner tracking initialized');
    }

    startCommissionCalculation() {
        // Запуск расчёта комиссий
        setInterval(() => {
            this.calculateMonthlyCommissions();
        }, 24 * 60 * 60 * 1000); // раз в день
    }

    calculateMonthlyCommissions() {
        // Расчёт месячных комиссий
        console.log('Calculating monthly commissions...');
    }
}

// Глобальные функции для интерфейса
window.copyReferralCode = (code) => {
    navigator.clipboard.writeText(code);
    alert('Код скопирован в буфер обмена!');
};

window.generatePromaterials = () => {
    console.log('Opening promo materials generator...');
};

window.openReferralStats = () => {
    console.log('Opening referral statistics...');
};

window.requestPayout = () => {
    console.log('Opening payout request form...');
};

window.shareReferralLink = (code) => {
    const url = `https://xn--80apagbbfxgmuj4j.site?ref=${code}`;
    if (navigator.share) {
        navigator.share({
            title: 'КупитьКролика - Инвестиции в кроликов',
            text: 'Инвестируй в токенизированную ферму и получай ежедневные PLEX-бонусы!',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        alert('Ссылка скопирована в буфер обмена!');
    }
};

// Инициализация партнёрской программы
window.partnershipProgram = new PartnershipProgram();

console.log('🤝 Partnership program loaded');