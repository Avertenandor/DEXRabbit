// Модуль аналитических дашбордов и отчётности
class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.reportTypes = {
            'farm_performance': 'Показатели фермы',
            'investor_analytics': 'Аналитика инвесторов', 
            'breeding_cycles': 'Циклы разведения',
            'financial_reports': 'Финансовые отчёты',
            'plex_economy': 'Экономика PLEX',
            'partner_stats': 'Статистика партнёров'
        };
        
        this.kpis = {
            totalInvestments: { value: 1250000, change: 15.2 },
            activeRabbits: { value: 387, change: 8.5 },
            completedCycles: { value: 156, change: 22.1 },
            plexInCirculation: { value: 2847561, change: 12.3 },
            monthlyRevenue: { value: 187500, change: 28.7 },
            partnerCommissions: { value: 47250, change: 31.4 }
        };
        
        this.init();
    }

    init() {
        this.initializeCharts();
        this.loadAnalyticsData();
        this.renderDashboard();
        this.startRealTimeUpdates();
        console.log('📊 Analytics Dashboard initialized');
    }

    renderDashboard() {
        const container = document.getElementById('analytics-dashboard');
        if (!container) return;

        container.innerHTML = `
            <div class="analytics-dashboard">
                <div class="dashboard-header">
                    <h1>📊 Аналитический дашборд</h1>
                    <div class="time-filters">
                        <button class="time-filter active" data-period="24h">24ч</button>
                        <button class="time-filter" data-period="7d">7д</button>
                        <button class="time-filter" data-period="30d">30д</button>
                        <button class="time-filter" data-period="90d">90д</button>
                    </div>
                </div>

                <div class="kpi-grid">
                    ${Object.entries(this.kpis).map(([key, data]) => `
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <h3>${this.getKpiTitle(key)}</h3>
                                <span class="kpi-change ${data.change > 0 ? 'positive' : 'negative'}">
                                    ${data.change > 0 ? '+' : ''}${data.change}%
                                </span>
                            </div>
                            <div class="kpi-value">${this.formatKpiValue(key, data.value)}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="charts-grid">
                    <div class="chart-card large">
                        <h3>💰 Динамика инвестиций</h3>
                        <canvas id="investments-chart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h3>🐰 Статус кроликов</h3>
                        <canvas id="rabbits-status-chart"></canvas>
                    </div>

                    <div class="chart-card">
                        <h3>🪙 PLEX экономика</h3>
                        <canvas id="plex-chart"></canvas>
                    </div>

                    <div class="chart-card large">
                        <h3>📈 Доходность по кругам</h3>
                        <canvas id="rounds-performance-chart"></canvas>
                    </div>
                </div>

                <div class="reports-section">
                    <h2>📋 Детальные отчёты</h2>
                    <div class="reports-grid">
                        ${Object.entries(this.reportTypes).map(([key, title]) => `
                            <div class="report-card" onclick="generateReport('${key}')">
                                <div class="report-icon">${this.getReportIcon(key)}</div>
                                <h4>${title}</h4>
                                <p>${this.getReportDescription(key)}</p>
                                <div class="report-actions">
                                    <button class="btn btn-outline btn-small">Сгенерировать</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.initializeChartElements();
    }

    getKpiTitle(key) {
        const titles = {
            totalInvestments: '💰 Общие инвестиции',
            activeRabbits: '🐰 Активные кролики', 
            completedCycles: '🔄 Завершённые циклы',
            plexInCirculation: '🪙 PLEX в обороте',
            monthlyRevenue: '📊 Месячная выручка',
            partnerCommissions: '🤝 Комиссии партнёров'
        };
        return titles[key] || key;
    }

    formatKpiValue(key, value) {
        switch(key) {
            case 'totalInvestments':
            case 'monthlyRevenue': 
            case 'partnerCommissions':
                return '$' + value.toLocaleString();
            case 'plexInCirculation':
                return value.toLocaleString() + ' PLEX';
            default:
                return value.toLocaleString();
        }
    }

    getReportIcon(type) {
        const icons = {
            'farm_performance': '🏡',
            'investor_analytics': '👥',
            'breeding_cycles': '🔄', 
            'financial_reports': '💰',
            'plex_economy': '🪙',
            'partner_stats': '🤝'
        };
        return icons[type] || '📊';
    }

    getReportDescription(type) {
        const descriptions = {
            'farm_performance': 'Здоровье животных, продуктивность, затраты',
            'investor_analytics': 'Поведение инвесторов, доходность, сегментация',
            'breeding_cycles': 'Статистика циклов, качество потомства',
            'financial_reports': 'P&L, денежные потоки, прогнозы',
            'plex_economy': 'Токеномика, обмены, сжигание',
            'partner_stats': 'Эффективность партнёров, комиссии'
        };
        return descriptions[type] || 'Подробный анализ';
    }

    initializeChartElements() {
        // Инвестиции по времени
        this.createInvestmentsChart();
        
        // Статус кроликов (пончик)
        this.createRabbitsStatusChart();
        
        // PLEX экономика
        this.createPlexChart();
        
        // Доходность по кругам
        this.createRoundsChart();
    }

    createInvestmentsChart() {
        const ctx = document.getElementById('investments-chart');
        if (!ctx) return;

        // Симуляция данных
        const data = {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Инвестиции (USDT)',
                data: [125000, 189000, 267000, 345000, 412000, 567000],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }]
        };

        console.log('📊 Investments chart data:', data);
    }

    createRabbitsStatusChart() {
        const data = {
            labels: ['Активные', 'В разведении', 'Отдыхают', 'Молодняк'],
            datasets: [{
                data: [156, 89, 67, 75],
                backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#06b6d4']
            }]
        };

        console.log('🐰 Rabbits status chart:', data);
    }

    createPlexChart() {
        const data = {
            labels: ['Начислено', 'В стейкинге', 'Обменено', 'Сожжено'],
            datasets: [{
                data: [2847561, 450000, 890000, 156000],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280']
            }]
        };

        console.log('🪙 PLEX chart data:', data);
    }

    createRoundsChart() {
        const data = {
            labels: ['Круг А', 'Круг Б'],
            datasets: [
                {
                    label: 'Средняя доходность (%)',
                    data: [24.5, 31.8],
                    backgroundColor: ['#3b82f6', '#8b5cf6']
                },
                {
                    label: 'Количество инвесторов',
                    data: [234, 67],
                    backgroundColor: ['#06b6d4', '#f59e0b']
                }
            ]
        };

        console.log('📈 Rounds performance:', data);
    }

    generateReport(type) {
        console.log(`Generating ${type} report...`);
        
        const reportData = this.getReportData(type);
        const reportHtml = this.formatReport(type, reportData);
        
        // Создаём модальное окно с отчётом
        this.showReportModal(type, reportHtml);
        
        // Трекинг
        if (window.analytics) {
            window.analytics.trackEvent('report_generated', {
                event_category: 'analytics',
                report_type: type
            });
        }
    }

    getReportData(type) {
        // Симуляция данных отчёта
        const mockData = {
            'farm_performance': {
                healthScore: 94.2,
                productivityIndex: 87.5,
                operatingCosts: 45000,
                veterinaryCosts: 8500,
                feedEfficiency: 92.1
            },
            'investor_analytics': {
                totalInvestors: 301,
                averageInvestment: 4150,
                retentionRate: 89.3,
                profitabilitySegments: {
                    high: 67,
                    medium: 156,
                    low: 78
                }
            }
        };
        
        return mockData[type] || {};
    }

    formatReport(type, data) {
        const title = this.reportTypes[type];
        
        return `
            <div class="report-content">
                <div class="report-header">
                    <h2>${this.getReportIcon(type)} ${title}</h2>
                    <div class="report-meta">
                        <span>Сгенерировано: ${new Date().toLocaleString('ru-RU')}</span>
                    </div>
                </div>
                
                <div class="report-summary">
                    <h3>Основные показатели</h3>
                    ${Object.entries(data).map(([key, value]) => `
                        <div class="metric-row">
                            <span class="metric-label">${this.formatMetricLabel(key)}</span>
                            <span class="metric-value">${this.formatMetricValue(key, value)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="report-actions">
                    <button onclick="downloadReport('${type}')" class="btn btn-primary">
                        📄 Скачать PDF
                    </button>
                    <button onclick="emailReport('${type}')" class="btn btn-outline">
                        📧 Отправить на email
                    </button>
                </div>
            </div>
        `;
    }

    showReportModal(type, content) {
        // Создаём модальное окно
        const modal = document.createElement('div');
        modal.className = 'report-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeReportModal()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closeReportModal()">×</button>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Глобальная функция для закрытия
        window.closeReportModal = () => {
            modal.remove();
            delete window.closeReportModal;
        };
    }

    formatMetricLabel(key) {
        const labels = {
            healthScore: 'Индекс здоровья',
            productivityIndex: 'Индекс продуктивности',
            operatingCosts: 'Операционные расходы',
            veterinaryCosts: 'Ветеринарные расходы',
            feedEfficiency: 'Эффективность кормов',
            totalInvestors: 'Всего инвесторов',
            averageInvestment: 'Средняя инвестиция',
            retentionRate: 'Коэффициент удержания'
        };
        return labels[key] || key;
    }

    formatMetricValue(key, value) {
        if (key.includes('Rate') || key.includes('Score') || key.includes('Index') || key.includes('Efficiency')) {
            return value + '%';
        }
        if (key.includes('Cost') || key.includes('Investment')) {
            return '$' + value.toLocaleString();
        }
        return value.toLocaleString();
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.updateKPIs();
        }, 30000); // обновление каждые 30 секунд
    }

    updateKPIs() {
        // Симуляция обновления KPI
        Object.keys(this.kpis).forEach(key => {
            const randomChange = (Math.random() - 0.5) * 2; // ±1%
            this.kpis[key].value *= (1 + randomChange / 100);
            this.kpis[key].change = randomChange;
        });
        
        console.log('📊 KPIs updated');
    }

    initializeCharts() {
        // Инициализация библиотеки графиков
        console.log('Initializing chart library...');
    }

    loadAnalyticsData() {
        // Загрузка данных аналитики
        console.log('Loading analytics data...');
    }
}

// Глобальная функция для генерации отчёта
window.generateReport = (type) => {
    window.analyticsDashboard.generateReport(type);
};

window.downloadReport = (type) => {
    console.log(`Downloading ${type} report as PDF...`);
    alert('Отчёт будет сгенерирован и отправлен на email в течение 5 минут.');
};

window.emailReport = (type) => {
    const email = prompt('Введите email для отправки отчёта:');
    if (email) {
        console.log(`Emailing ${type} report to ${email}...`);
        alert(`Отчёт будет отправлен на ${email} в течение 5 минут.`);
    }
};

// Инициализация дашборда аналитики
window.analyticsDashboard = new AnalyticsDashboard();

console.log('📊 Analytics Dashboard loaded');