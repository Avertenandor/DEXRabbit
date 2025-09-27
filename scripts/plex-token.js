// Модуль управления токенами PLEX
class PlexToken {
    constructor() {
        this.tokenInfo = {
            name: 'PLEX',
            fullName: 'Rabbit Farm Token',
            symbol: 'PLEX',
            decimals: 18,
            totalSupply: 0,
            circulatingSupply: 0,
            currentPrice: 1.0, // стартовый курс 1 PLEX = 1 USDT
            priceHistory: []
        };
        
        this.userBalances = {};
        this.dailyRewards = {};
        this.transactions = [];
        
        this.rewardRates = {
            roundA: 0.0015, // 0.15% в день
            roundB: 0.0025, // 0.25% в день
            roundC: 0.0035  // 0.35% в день (если будет)
        };
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.startDailyRewards();
        this.initPriceTracking();
        this.renderPlexWidget();
    }

    // Ежедневные начисления PLEX
    startDailyRewards() {
        // Проверяем каждый час, начисляем в 12:00 МСК
        setInterval(() => {
            const now = new Date();
            const moscowTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
            
            if (moscowTime.getHours() === 12 && moscowTime.getMinutes() === 0) {
                this.processDailyRewards();
            }
        }, 60000); // каждую минуту проверяем время

        // Для демо - начисляем сразу при загрузке
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
            setTimeout(() => this.processDailyRewards(), 3000);
        }
    }

    // Обработка ежедневных начислений
    processDailyRewards() {
        const today = new Date().toDateString();
        
        // Проверяем, не начисляли ли уже сегодня
        if (this.dailyRewards[today]) {
            console.log('PLEX rewards already processed today');
            return;
        }

        const investors = this.getActiveInvestors();
        let totalRewardsToday = 0;

        investors.forEach(investor => {
            const reward = this.calculateDailyReward(investor);
            if (reward > 0) {
                this.addToBalance(investor.id, reward);
                this.recordTransaction({
                    type: 'daily_reward',
                    userId: investor.id,
                    amount: reward,
                    description: `Ежедневное начисление PLEX за инвестицию`,
                    timestamp: new Date().toISOString(),
                    investmentId: investor.investmentId
                });
                
                totalRewardsToday += reward;
            }
        });

        // Обновляем общую информацию
        this.tokenInfo.circulatingSupply += totalRewardsToday;
        this.tokenInfo.totalSupply += totalRewardsToday;
        this.dailyRewards[today] = {
            totalAmount: totalRewardsToday,
            recipientsCount: investors.length,
            timestamp: new Date().toISOString()
        };

        // Уведомляем пользователей
        this.notifyUsersAboutRewards(totalRewardsToday);
        
        console.log(`💰 Daily PLEX rewards processed: ${totalRewardsToday.toFixed(4)} PLEX to ${investors.length} investors`);
    }

    // Расчёт ежедневной награды для инвестора
    calculateDailyReward(investor) {
        const investmentAmount = investor.investment?.amount || 0;
        const round = investor.investment?.round || 'roundA';
        const rate = this.rewardRates[round] || this.rewardRates.roundA;
        
        // Дополнительные модификаторы
        let multiplier = 1.0;
        
        // Бонус за срок инвестиции
        const daysSinceInvestment = this.getDaysSince(investor.investment?.date);
        if (daysSinceInvestment > 30) multiplier += 0.1; // +10% после месяца
        if (daysSinceInvestment > 90) multiplier += 0.1; // +20% после 3 месяцев
        
        // Бонус за реферралов
        if (investor.referrals && investor.referrals.length > 0) {
            multiplier += investor.referrals.length * 0.05; // +5% за каждого реферала
        }
        
        // Бонус за активность (комментарии, участие в голосованиях)
        if (investor.activityScore > 50) {
            multiplier += 0.15; // +15% за активность
        }
        
        const dailyReward = investmentAmount * rate * multiplier;
        return dailyReward;
    }

    // Обмен PLEX на USDT через внутреннюю биржу
    exchangePlexToUsdt(userId, plexAmount) {
        const userBalance = this.getUserBalance(userId);
        
        if (userBalance < plexAmount) {
            throw new Error('Недостаточно PLEX для обмена');
        }
        
        if (plexAmount < 10) {
            throw new Error('Минимальная сумма обмена: 10 PLEX');
        }
        
        // Рассчитываем курс с учётом комиссии
        const exchangeRate = this.getCurrentExchangeRate();
        const fee = plexAmount * 0.02; // 2% комиссия
        const plexAfterFee = plexAmount - fee;
        const usdtAmount = plexAfterFee * exchangeRate;
        
        // Проводим обмен
        this.subtractFromBalance(userId, plexAmount);
        this.addUsdtBalance(userId, usdtAmount);
        
        // Записываем транзакцию
        this.recordTransaction({
            type: 'exchange_plex_to_usdt',
            userId: userId,
            plexAmount: plexAmount,
            usdtAmount: usdtAmount,
            fee: fee,
            rate: exchangeRate,
            timestamp: new Date().toISOString()
        });
        
        // Влияем на курс (увеличивается предложение)
        this.updateTokenPrice(-0.001 * (plexAmount / 1000)); // небольшое снижение при продаже
        
        return {
            plexSold: plexAmount,
            usdtReceived: usdtAmount,
            fee: fee,
            rate: exchangeRate
        };
    }

    // Покупка PLEX за USDT
    buyPlexWithUsdt(userId, usdtAmount) {
        const userUsdtBalance = this.getUserUsdtBalance(userId);
        
        if (userUsdtBalance < usdtAmount) {
            throw new Error('Недостаточно USDT для покупки');
        }
        
        if (usdtAmount < 10) {
            throw new Error('Минимальная сумма покупки: 10 USDT');
        }
        
        const exchangeRate = this.getCurrentExchangeRate();
        const fee = usdtAmount * 0.015; // 1.5% комиссия при покупке
        const usdtAfterFee = usdtAmount - fee;
        const plexAmount = usdtAfterFee / exchangeRate;
        
        // Проводим покупку
        this.subtractUsdtBalance(userId, usdtAmount);
        this.addToBalance(userId, plexAmount);
        
        // Записываем транзакцию
        this.recordTransaction({
            type: 'buy_plex_with_usdt',
            userId: userId,
            usdtAmount: usdtAmount,
            plexAmount: plexAmount,
            fee: fee,
            rate: exchangeRate,
            timestamp: new Date().toISOString()
        });
        
        // Влияем на курс (увеличивается спрос)
        this.updateTokenPrice(0.001 * (usdtAmount / 1000)); // небольшой рост при покупке
        
        return {
            usdtSpent: usdtAmount,
            plexReceived: plexAmount,
            fee: fee,
            rate: exchangeRate
        };
    }

    // Использование PLEX для оплаты услуг фермы
    payWithPlex(userId, amount, service) {
        const userBalance = this.getUserBalance(userId);
        
        if (userBalance < amount) {
            throw new Error('Недостаточно PLEX для оплаты');
        }
        
        // Услуги фермы с ценами в PLEX
        const services = {
            'visit_farm': { price: 50, name: 'Посещение фермы' },
            'premium_feed': { price: 25, name: 'Премиум корма на месяц' },
            'vet_checkup': { price: 30, name: 'Дополнительный ветосмотр' },
            'photo_session': { price: 20, name: 'Фотосессия с кроликом' },
            'naming_rights': { price: 100, name: 'Право назвать крольчонка' },
            'breeding_priority': { price: 75, name: 'Приоритет в разведении' }
        };
        
        const serviceInfo = services[service];
        if (!serviceInfo) {
            throw new Error('Неизвестная услуга');
        }
        
        if (amount !== serviceInfo.price) {
            throw new Error(`Неверная сумма. Требуется: ${serviceInfo.price} PLEX`);
        }
        
        // Проводим оплату
        this.subtractFromBalance(userId, amount);
        
        // Записываем транзакцию
        this.recordTransaction({
            type: 'service_payment',
            userId: userId,
            amount: amount,
            service: service,
            serviceName: serviceInfo.name,
            timestamp: new Date().toISOString()
        });
        
        // Сжигаем PLEX (дефляционная механика)
        this.tokenInfo.circulatingSupply -= amount;
        
        console.log(`🔥 Burned ${amount} PLEX for service: ${serviceInfo.name}`);
        
        return {
            service: serviceInfo.name,
            amountPaid: amount,
            newBalance: this.getUserBalance(userId)
        };
    }

    // Система стейкинга PLEX
    stakePlex(userId, amount, duration = 90) {
        const userBalance = this.getUserBalance(userId);
        
        if (userBalance < amount) {
            throw new Error('Недостаточно PLEX для стейкинга');
        }
        
        if (amount < 100) {
            throw new Error('Минимальная сумма для стейкинга: 100 PLEX');
        }
        
        // Ставки по срокам
        const stakingRates = {
            30: 0.08,   // 8% годовых
            90: 0.12,   // 12% годовых
            180: 0.18,  // 18% годовых
            365: 0.25   // 25% годовых
        };
        
        const rate = stakingRates[duration] || stakingRates[90];
        const endDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
        const expectedReward = amount * rate * (duration / 365);
        
        // Блокируем PLEX
        this.subtractFromBalance(userId, amount);
        
        // Создаём стейк
        const stake = {
            id: this.generateStakeId(),
            userId: userId,
            amount: amount,
            duration: duration,
            rate: rate,
            startDate: new Date().toISOString(),
            endDate: endDate.toISOString(),
            expectedReward: expectedReward,
            status: 'active'
        };
        
        this.saveStake(stake);
        
        // Записываем транзакцию
        this.recordTransaction({
            type: 'stake_plex',
            userId: userId,
            amount: amount,
            duration: duration,
            expectedReward: expectedReward,
            stakeId: stake.id,
            timestamp: new Date().toISOString()
        });
        
        return stake;
    }

    // Отображение виджета PLEX
    renderPlexWidget() {
        const widgetContainer = document.getElementById('plex-widget');
        if (!widgetContainer) return;
        
        const userBalance = this.getUserBalance('demo_user') || 0;
        const todayRewards = this.getTodayRewards('demo_user') || 0;
        const currentPrice = this.tokenInfo.currentPrice;
        
        widgetContainer.innerHTML = `
            <div class="plex-widget">
                <div class="plex-header">
                    <div class="plex-logo">
                        <span class="token-icon">🪙</span>
                        <h3>PLEX Balance</h3>
                    </div>
                    <div class="plex-price">
                        <span class="price-value">${currentPrice.toFixed(4)} USDT</span>
                        <span class="price-change ${this.getPriceChangeClass()}">
                            ${this.getPriceChange()}
                        </span>
                    </div>
                </div>
                
                <div class="plex-balance">
                    <div class="balance-main">
                        <span class="balance-amount">${userBalance.toFixed(4)}</span>
                        <span class="balance-currency">PLEX</span>
                    </div>
                    <div class="balance-usd">
                        ≈ ${(userBalance * currentPrice).toFixed(2)} USDT
                    </div>
                </div>
                
                <div class="plex-stats">
                    <div class="stat-item">
                        <div class="stat-label">Сегодня получено</div>
                        <div class="stat-value">+${todayRewards.toFixed(4)} PLEX</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Всего в обороте</div>
                        <div class="stat-value">${this.tokenInfo.circulatingSupply.toFixed(0)} PLEX</div>
                    </div>
                </div>
                
                <div class="plex-actions">
                    <button onclick="plex.openExchange()" class="btn btn-primary btn-small">
                        💱 Обменять
                    </button>
                    <button onclick="plex.openStaking()" class="btn btn-outline btn-small">
                        📈 Стейкинг
                    </button>
                    <button onclick="plex.openServices()" class="btn btn-outline btn-small">
                        🛍️ Услуги
                    </button>
                </div>
            </div>
        `;
    }

    // Вспомогательные методы
    getUserBalance(userId) {
        return this.userBalances[userId] || 0;
    }

    addToBalance(userId, amount) {
        this.userBalances[userId] = (this.userBalances[userId] || 0) + amount;
    }

    subtractFromBalance(userId, amount) {
        this.userBalances[userId] = Math.max(0, (this.userBalances[userId] || 0) - amount);
    }

    getCurrentExchangeRate() {
        return this.tokenInfo.currentPrice;
    }

    updateTokenPrice(change) {
        this.tokenInfo.currentPrice = Math.max(0.1, this.tokenInfo.currentPrice + change);
        this.tokenInfo.priceHistory.push({
            price: this.tokenInfo.currentPrice,
            timestamp: new Date().toISOString(),
            change: change
        });
        
        // Сохраняем только последние 100 записей
        if (this.tokenInfo.priceHistory.length > 100) {
            this.tokenInfo.priceHistory = this.tokenInfo.priceHistory.slice(-100);
        }
    }

    recordTransaction(transaction) {
        this.transactions.push({
            id: this.generateTransactionId(),
            ...transaction
        });
        
        // Уведомляем о транзакции
        if (window.analytics) {
            window.analytics.trackEvent('plex_transaction', {
                event_category: 'token',
                transaction_type: transaction.type,
                amount: transaction.amount || transaction.plexAmount,
                user_id: transaction.userId
            });
        }
    }

    getActiveInvestors() {
        // В демо-режиме возвращаем тестовых инвесторов
        return [
            {
                id: 'demo_user',
                investment: {
                    amount: 1000,
                    round: 'roundA',
                    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 дней назад
                },
                referrals: [],
                activityScore: 75
            }
        ];
    }

    getDaysSince(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        return Math.floor((now - date) / (24 * 60 * 60 * 1000));
    }

    getTodayRewards(userId) {
        const today = new Date().toDateString();
        return this.dailyRewards[today]?.totalAmount || 0;
    }

    getPriceChange() {
        if (this.tokenInfo.priceHistory.length < 2) return '+0.00%';
        
        const current = this.tokenInfo.priceHistory[this.tokenInfo.priceHistory.length - 1];
        const previous = this.tokenInfo.priceHistory[this.tokenInfo.priceHistory.length - 2];
        
        const change = ((current.price - previous.price) / previous.price) * 100;
        return (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
    }

    getPriceChangeClass() {
        const change = this.getPriceChange();
        return change.startsWith('+') ? 'price-up' : change.startsWith('-') ? 'price-down' : 'price-neutral';
    }

    generateStakeId() {
        return 'stake_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateTransactionId() {
        return 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    loadUserData() {
        // Загрузка данных пользователя
        this.userBalances['demo_user'] = 234.5678; // демо-баланс
    }

    initPriceTracking() {
        // Инициализация отслеживания цены
        this.tokenInfo.priceHistory.push({
            price: this.tokenInfo.currentPrice,
            timestamp: new Date().toISOString(),
            change: 0
        });
    }

    notifyUsersAboutRewards(totalAmount) {
        console.log(`📢 Notifying users about ${totalAmount} PLEX rewards distributed`);
    }

    openExchange() {
        console.log('Opening PLEX exchange interface...');
        // Интерфейс обмена будет добавлен позже
    }

    openStaking() {
        console.log('Opening PLEX staking interface...');
        // Интерфейс стейкинга будет добавлен позже
    }

    openServices() {
        console.log('Opening farm services interface...');
        // Интерфейс услуг будет добавлен позже
    }

    saveStake(stake) {
        // Сохранение информации о стейке
        console.log('Stake saved:', stake);
    }

    getUserUsdtBalance(userId) {
        // В демо - возвращаем тестовый баланс USDT
        return 500;
    }

    addUsdtBalance(userId, amount) {
        console.log(`Adding ${amount} USDT to user ${userId}`);
    }

    subtractUsdtBalance(userId, amount) {
        console.log(`Subtracting ${amount} USDT from user ${userId}`);
    }
}

// Инициализация токен системы
window.plex = new PlexToken();

console.log('🪙 PLEX Token system loaded');