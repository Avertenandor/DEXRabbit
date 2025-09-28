// Модуль управления производственными парами кроликов
class RabbitPairs {
    constructor() {
        this.pairs = [];
        this.cycles = [];
        this.pairRules = {
            minAge: 6, // минимальный возраст в месяцах
            maxAge: 36, // максимальный возраст в месяцах
            gestation: 31, // период беременности в днях
            lactation: 35, // период лактации в днях
            recovery: 7, // период восстановления в днях
        };
        this.init();
    }

    init() {
        this.loadPairs();
        this.renderPairsInterface();
        this.startCycleMonitoring();
    }

    // Правила создания пары
    canFormPair(male, female) {
        const reasons = [];
        
        // Проверка пола
        if (male.gender !== 'male' || female.gender !== 'female') {
            reasons.push('Неправильное сочетание полов');
        }
        
        // Проверка возраста
        if (male.age < this.pairRules.minAge) {
            reasons.push('Самец слишком молод (мин. 6 мес)');
        }
        if (female.age < this.pairRules.minAge) {
            reasons.push('Самка слишком молода (мин. 6 мес)');
        }
        if (male.age > this.pairRules.maxAge) {
            reasons.push('Самец слишком стар (макс. 36 мес)');
        }
        if (female.age > this.pairRules.maxAge) {
            reasons.push('Самка слишком стара (макс. 36 мес)');
        }
        
        // Проверка здоровья
        if (male.health !== 'excellent' || female.health !== 'excellent') {
            reasons.push('Требуется отличное здоровье обеих особей');
        }
        
        // Проверка доступности
        if (male.status !== 'available' || female.status !== 'available') {
            reasons.push('Один из кроликов недоступен');
        }
        
        // Проверка породы (желательно одинаковые)
        if (male.breed !== female.breed) {
            reasons.push('Рекомендуется одинаковая порода');
        }
        
        // Проверка, не участвует ли уже в паре
        if (this.isInActivePair(male.id) || this.isInActivePair(female.id)) {
            reasons.push('Один из кроликов уже участвует в активной паре');
        }
        
        return {
            canForm: reasons.length === 0,
            reasons: reasons
        };
    }

    // Создание производственной пары
    createPair(maleId, femaleId, investorId) {
        const male = this.getRabbitById(maleId);
        const female = this.getRabbitById(femaleId);
        
        if (!male || !female) {
            throw new Error('Кролик не найден');
        }
        
        const validation = this.canFormPair(male, female);
        if (!validation.canForm) {
            throw new Error('Нельзя создать пару: ' + validation.reasons.join(', '));
        }
        
        const pair = {
            id: this.generatePairId(),
            male: maleId,
            female: femaleId,
            investor: investorId,
            status: 'forming', // forming -> active -> cycle1 -> cycle2 -> completed
            createdAt: new Date().toISOString(),
            cycles: [],
            expectedCycles: 2,
            completedCycles: 0
        };
        
        this.pairs.push(pair);
        this.updateRabbitStatus([maleId, femaleId], 'paired');
        
        // Планируем первый цикл
        this.scheduleCycle(pair.id, 1);
        
        // Трекинг события
        if (window.analytics) {
            window.analytics.trackEvent('pair_created', {
                event_category: 'breeding',
                pair_id: pair.id,
                investor: investorId,
                breeds: `${male.breed}_${female.breed}`
            });
        }
        
        return pair;
    }

    // Планирование цикла разведения
    scheduleCycle(pairId, cycleNumber) {
        const pair = this.pairs.find(p => p.id === pairId);
        if (!pair) return;
        
        const now = new Date();
        const cycle = {
            id: `${pairId}_cycle_${cycleNumber}`,
            pairId: pairId,
            cycleNumber: cycleNumber,
            status: 'planned', // planned -> breeding -> pregnant -> birthing -> lactating -> completed
            stages: {
                breeding: {
                    startDate: now,
                    endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 дней на случку
                    status: 'pending'
                },
                pregnancy: {
                    startDate: null,
                    endDate: null,
                    expectedDuration: this.pairRules.gestation,
                    status: 'pending'
                },
                birthing: {
                    startDate: null,
                    endDate: null,
                    expectedOffspring: 6, // среднее количество крольчат
                    actualOffspring: 0,
                    status: 'pending'
                },
                lactation: {
                    startDate: null,
                    endDate: null,
                    duration: this.pairRules.lactation,
                    status: 'pending'
                }
            },
            timeline: this.calculateCycleTimeline(now),
            expectedCompletion: new Date(now.getTime() + (this.pairRules.gestation + this.pairRules.lactation + 14) * 24 * 60 * 60 * 1000)
        };
        
        pair.cycles.push(cycle);
        this.cycles.push(cycle);
        
        return cycle;
    }

    // Расчёт временной линии цикла
    calculateCycleTimeline(startDate) {
        const timeline = [];
        let currentDate = new Date(startDate);
        
        // Фаза случки (7 дней)
        timeline.push({
            phase: 'breeding',
            startDate: new Date(currentDate),
            endDate: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
            description: 'Период случки'
        });
        
        currentDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        // Фаза беременности (31 день)
        timeline.push({
            phase: 'pregnancy',
            startDate: new Date(currentDate),
            endDate: new Date(currentDate.getTime() + this.pairRules.gestation * 24 * 60 * 60 * 1000),
            description: 'Период беременности'
        });
        
        currentDate = new Date(currentDate.getTime() + this.pairRules.gestation * 24 * 60 * 60 * 1000);
        
        // Фаза родов и лактации (35 дней)
        timeline.push({
            phase: 'lactation',
            startDate: new Date(currentDate),
            endDate: new Date(currentDate.getTime() + this.pairRules.lactation * 24 * 60 * 60 * 1000),
            description: 'Период лактации и выращивания'
        });
        
        currentDate = new Date(currentDate.getTime() + this.pairRules.lactation * 24 * 60 * 60 * 1000);
        
        // Фаза восстановления (7 дней)
        timeline.push({
            phase: 'recovery',
            startDate: new Date(currentDate),
            endDate: new Date(currentDate.getTime() + this.pairRules.recovery * 24 * 60 * 60 * 1000),
            description: 'Период восстановления'
        });
        
        return timeline;
    }

    // Отображение статуса пары в карточке
    getPairStatusBadge(pair) {
        const statusConfig = {
            forming: { text: 'Формируется', class: 'status-forming', icon: '⏳' },
            active: { text: 'Активная', class: 'status-active', icon: '💕' },
            cycle1: { text: 'Цикл 1', class: 'status-cycle1', icon: '🐰' },
            cycle2: { text: 'Цикл 2', class: 'status-cycle2', icon: '🐰🐰' },
            completed: { text: 'Завершено', class: 'status-completed', icon: '✅' },
            returning: { text: 'Возврат фермеру', class: 'status-returning', icon: '🔄' }
        };
        
        const config = statusConfig[pair.status] || statusConfig.forming;
        
        return `
            <div class="pair-status-badge ${config.class}">
                <span class="status-icon">${config.icon}</span>
                <span class="status-text">${config.text}</span>
            </div>
        `;
    }

    // Правило "2 цикла — возврат фермеру"
    handlePairCompletion(pairId) {
        const pair = this.pairs.find(p => p.id === pairId);
        if (!pair) return;
        
        if (pair.completedCycles >= 2) {
            pair.status = 'returning';
            
            // Обновляем статус кроликов
            this.updateRabbitStatus([pair.male, pair.female], 'returning_to_farmer');
            
            // Уведомление инвестора
            this.notifyInvestor(pair.investor, {
                type: 'pair_completed',
                message: `Пара ${this.getPairName(pair)} завершила 2 цикла и возвращается фермеру`,
                pairId: pairId,
                cycles: pair.completedCycles,
                totalOffspring: this.getTotalOffspring(pair),
                expectedPayment: this.calculateFinalPayment(pair)
            });
            
            // Планируем выкуп по стартовой цене
            this.scheduleBuyback(pair);
            
            // Трекинг
            if (window.analytics) {
                window.analytics.trackEvent('pair_completed', {
                    event_category: 'breeding',
                    pair_id: pairId,
                    cycles_completed: pair.completedCycles,
                    total_offspring: this.getTotalOffspring(pair)
                });
            }
        }
    }

    // Правило "фермер выкупает по стартовой цене"
    scheduleBuyback(pair) {
        const male = this.getRabbitById(pair.male);
        const female = this.getRabbitById(pair.female);
        
        const buybackOffer = {
            id: this.generateBuybackId(),
            pairId: pair.id,
            investor: pair.investor,
            rabbits: [
                { id: pair.male, name: male.name, originalPrice: male.originalPrice },
                { id: pair.female, name: female.name, originalPrice: female.originalPrice }
            ],
            totalAmount: male.originalPrice + female.originalPrice,
            currency: 'USDT',
            status: 'pending',
            createdAt: new Date().toISOString(),
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней на решение
            type: 'mandatory_buyback'
        };
        
        // Сохраняем предложение о выкупе
        this.saveBuybackOffer(buybackOffer);
        
        return buybackOffer;
    }

    // Правило селекции: "из каждого эшелона 1 остаётся фермеру"
    handleOffspringDistribution(cycleId, offspring) {
        const cycle = this.cycles.find(c => c.id === cycleId);
        if (!cycle) return;
        
        const pair = this.pairs.find(p => p.id === cycle.pairId);
        const totalOffspring = offspring.length;
        
        // Сортируем потомство по качеству (вес, здоровье, экстерьер)
        const sortedOffspring = offspring.sort((a, b) => {
            const scoreA = this.calculateOffspringScore(a);
            const scoreB = this.calculateOffspringScore(b);
            return scoreB - scoreA; // лучшие первыми
        });
        
        // Лучший экземпляр остаётся фермеру для селекции
        const forBreeding = sortedOffspring[0];
        const forSale = sortedOffspring.slice(1);
        
        // Обновляем информацию о цикле
        cycle.stages.birthing.actualOffspring = totalOffspring;
        cycle.distribution = {
            total: totalOffspring,
            forBreeding: 1,
            forSale: forSale.length,
            breedingRabbit: forBreeding,
            saleRabbits: forSale
        };
        
        // Уведомляем инвестора
        this.notifyInvestor(pair.investor, {
            type: 'offspring_born',
            message: `Родилось ${totalOffspring} крольчат. ${forSale.length} пойдут в продажу, 1 остаётся для селекции`,
            cycleId: cycleId,
            offspring: {
                total: totalOffspring,
                forSale: forSale.length,
                expectedRevenue: this.calculateExpectedRevenue(forSale)
            }
        });
        
        return {
            forBreeding: [forBreeding],
            forSale: forSale
        };
    }

    // Расчёт качества потомства
    calculateOffspringScore(rabbit) {
        return (
            (rabbit.weight / rabbit.age) * 10 + // вес к возрасту
            rabbit.health * 2 + // здоровье
            rabbit.exterior * 1.5 + // экстерьер
            (rabbit.genetics?.parentQuality || 0) // генетика родителей
        );
    }

    // Вспомогательные методы
    generatePairId() {
        return 'pair_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateBuybackId() {
        return 'buyback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    isInActivePair(rabbitId) {
        return this.pairs.some(pair => 
            (pair.male === rabbitId || pair.female === rabbitId) && 
            ['active', 'cycle1', 'cycle2'].includes(pair.status)
        );
    }

    getRabbitById(id) {
        // В реальном приложении здесь был бы запрос к API
        return {
            id: id,
            name: `Rabbit ${id}`,
            age: 12,
            health: 'excellent',
            status: 'available',
            breed: 'Калифорнийский',
            gender: id % 2 === 0 ? 'male' : 'female',
            originalPrice: 200
        };
    }

    updateRabbitStatus(rabbitIds, status) {
        // Обновление статуса кроликов в базе данных
        console.log(`Updating rabbits ${rabbitIds.join(', ')} status to ${status}`);
    }

    notifyInvestor(investorId, notification) {
        // Отправка уведомления инвестору
        console.log(`Notification to investor ${investorId}:`, notification);
    }

    saveBuybackOffer(offer) {
        // Сохранение предложения о выкупе
        console.log('Buyback offer created:', offer);
    }

    getPairName(pair) {
        const male = this.getRabbitById(pair.male);
        const female = this.getRabbitById(pair.female);
        return `${male.name} × ${female.name}`;
    }

    getTotalOffspring(pair) {
        return pair.cycles.reduce((total, cycle) => {
            return total + (cycle.stages?.birthing?.actualOffspring || 0);
        }, 0);
    }

    calculateFinalPayment(pair) {
        // Расчёт финальной выплаты инвестору
        return pair.cycles.reduce((total, cycle) => {
            const revenue = this.calculateExpectedRevenue(cycle.distribution?.saleRabbits || []);
            return total + revenue * 0.7; // 70% инвестору, 30% ферме
        }, 0);
    }

    calculateExpectedRevenue(rabbits) {
        return rabbits.reduce((total, rabbit) => {
            return total + (rabbit.expectedPrice || 150); // средняя цена за крольчонка
        }, 0);
    }

    renderPairsInterface() {
        // Интерфейс управления парами будет добавлен в следующих задачах
        console.log('Rabbit pairs system initialized');
    }

    startCycleMonitoring() {
        // Мониторинг циклов разведения
        setInterval(() => {
            this.checkCycleProgress();
        }, 24 * 60 * 60 * 1000); // проверка раз в день
    }

    checkCycleProgress() {
        this.cycles.forEach(cycle => {
            if (cycle.status === 'planned') {
                // Логика обновления статуса циклов
            }
        });
    }

    loadPairs() {
        // Загрузка существующих пар
        this.pairs = [];
        this.cycles = [];
    }
}

// Инициализация системы пар
window.rabbitPairs = new RabbitPairs();

console.log('🐰 Rabbit Pairs system loaded');