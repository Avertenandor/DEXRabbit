// Tasks 33-37: Advanced features - favorites, comparison, calculator, wishlist, share
class AdvancedFeatures {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('rabbit_favorites') || '[]');
        this.comparison = JSON.parse(localStorage.getItem('rabbit_comparison') || '[]');
        this.wishlist = JSON.parse(localStorage.getItem('rabbit_wishlist') || '[]');
        
        this.init();
    }

    init() {
        this.addFavoriteButtons();
        this.addComparisonButtons();
        this.addShareButtons();
        this.createCalculator();
        this.updateCounts();
    }

    // Task 33: Favorites functionality
    addFavoriteButtons() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const title = card.querySelector('.product-title')?.textContent;
            if (!title) return;

            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite-btn';
            favoriteBtn.innerHTML = this.favorites.includes(title) ? '❤️' : '🤍';
            favoriteBtn.title = 'Добавить в избранное';
            favoriteBtn.setAttribute('aria-label', 'Добавить в избранное');
            
            favoriteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(title, favoriteBtn);
            });

            // Add to card
            const productActions = card.querySelector('.product-actions');
            if (productActions) {
                productActions.appendChild(favoriteBtn);
            }
        });
    }

    toggleFavorite(productId, button) {
        if (this.favorites.includes(productId)) {
            this.favorites = this.favorites.filter(id => id !== productId);
            button.innerHTML = '🤍';
        } else {
            this.favorites.push(productId);
            button.innerHTML = '❤️';
        }
        
        this.saveFavorites();
        this.updateCounts();
        this.showNotification(`${productId} ${this.favorites.includes(productId) ? 'добавлен в' : 'удален из'} избранное`);
        
        // Track favorites
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.window.analytics.trackEvent('favorite_toggle', {
                event_category: 'engagement',
                product: productId,
                action: this.favorites.includes(productId) ? 'add' : 'remove'
            });
        }
    }

    // Task 34: Comparison functionality  
    addComparisonButtons() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const title = card.querySelector('.product-title')?.textContent;
            if (!title) return;

            const compareBtn = document.createElement('button');
            compareBtn.className = 'compare-btn';
            compareBtn.innerHTML = this.comparison.includes(title) ? '✅ Сравнить' : '⚖️ Сравнить';
            compareBtn.title = 'Добавить к сравнению';
            
            compareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleComparison(title, compareBtn);
            });

            const productActions = card.querySelector('.product-actions');
            if (productActions) {
                productActions.appendChild(compareBtn);
            }
        });
    }

    toggleComparison(productId, button) {
        if (this.comparison.includes(productId)) {
            this.comparison = this.comparison.filter(id => id !== productId);
            button.innerHTML = '⚖️ Сравнить';
        } else {
            if (this.comparison.length >= 3) {
                this.showNotification('Можно сравнивать до 3х кроликов одновременно', 'warning');
                return;
            }
            this.comparison.push(productId);
            button.innerHTML = '✅ Сравнить';
        }
        
        this.saveComparison();
        this.updateCounts();
        
        if (this.comparison.length >= 2) {
            this.showComparisonPanel();
        }
        
        // Track comparison
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.window.analytics.trackEvent('comparison_toggle', {
                event_category: 'engagement',
                product: productId,
                comparison_count: this.comparison.length
            });
        }
    }

    showComparisonPanel() {
        if (document.getElementById('comparison-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'comparison-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: calc(100vw - 40px);
        `;

        panel.innerHTML = `
            <span>🔍 Сравниваем: ${this.comparison.length} кролика</span>
            <button onclick="advancedFeatures.openComparison()" class="btn btn-primary btn-small">
                Сравнить
            </button>
            <button onclick="advancedFeatures.clearComparison()" class="btn btn-outline btn-small">
                Очистить
            </button>
        `;

        document.body.appendChild(panel);
    }

    openComparison() {
        if (this.comparison.length < 2) {
            this.showNotification('Выберите минимум 2 кролика для сравнения', 'warning');
            return;
        }

        // Create comparison modal
        const modal = document.createElement('div');
        modal.id = 'comparison-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 90vw; max-height: 90vh; overflow-y: auto;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
                    <h2>🔍 Сравнение кроликов</h2>
                    <button onclick="this.closest('#comparison-modal').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(${this.comparison.length}, 1fr); gap: 20px;">
                    ${this.comparison.map(id => `
                        <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px;">
                            <h3>${id}</h3>
                            <div style="font-size: 14px; color: #666; margin-top: 12px;">
                                <div>Порода: ${this.getBreedFromName(id)}</div>
                                <div>Возраст: ${this.getRandomAge()}</div>
                                <div>Вес: ${this.getRandomWeight()}</div>
                                <div>Цена: ${this.getRandomPrice()} ₽</div>
                                <div>Статус: Доступен</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="advancedFeatures.clearComparison(); this.closest('#comparison-modal').remove();" class="btn btn-primary">
                        Выбрать кролика
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Track comparison view
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.window.analytics.trackEvent('comparison_view', {
                event_category: 'engagement',
                products: this.comparison.join(',')
            });
        }
    }

    clearComparison() {
        this.comparison = [];
        this.saveComparison();
        this.updateCounts();
        
        const panel = document.getElementById('comparison-panel');
        if (panel) panel.remove();
        
        // Update buttons
        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.innerHTML = '⚖️ Сравнить';
        });
        
        this.showNotification('Сравнение очищено');
    }

    // Task 35: Cost calculator
    createCalculator() {
        // Only add on relevant pages
        if (window.location.pathname === '/catalog' || window.location.pathname === '/') {
            this.addCalculatorButton();
        }
    }

    addCalculatorButton() {
        const button = document.createElement('button');
        button.innerHTML = '🧮 Калькулятор расходов';
        button.className = 'btn btn-outline';
        button.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            z-index: 500;
            writing-mode: vertical-lr;
            text-orientation: mixed;
            min-height: 120px;
        `;
        
        button.addEventListener('click', () => this.openCalculator());
        document.body.appendChild(button);
    }

    openCalculator() {
        const modal = document.createElement('div');
        modal.id = 'calculator-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 500px; width: 90vw;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
                    <h2>🧮 Калькулятор расходов на содержание</h2>
                    <button onclick="this.closest('#calculator-modal').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
                </div>
                
                <form id="cost-calculator">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Количество кроликов:</label>
                        <input type="number" id="rabbit-count" value="1" min="1" max="20" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 8px;">
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Порода:</label>
                        <select id="breed-select" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="small">Карликовые (до 2кг)</option>
                            <option value="medium" selected>Средние (2-4кг)</option>
                            <option value="large">Крупные (4кг+)</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Период расчета:</label>
                        <select id="period-select" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="1">1 месяц</option>
                            <option value="3">3 месяца</option>
                            <option value="6" selected>6 месяцев</option>
                            <option value="12">1 год</option>
                        </select>
                    </div>
                    
                    <div id="calculation-result" style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <div style="font-weight: 600; margin-bottom: 8px;">Расчет расходов:</div>
                        <div id="cost-breakdown"></div>
                        <div style="font-size: 18px; font-weight: bold; color: #059669; margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                            Итого: <span id="total-cost">0</span> ₽
                        </div>
                    </div>
                    
                    <button type="button" onclick="advancedFeatures.calculateCosts()" class="btn btn-primary" style="width: 100%; margin-bottom: 12px;">
                        Рассчитать
                    </button>
                    <button type="button" onclick="this.closest('#calculator-modal').remove()" class="btn btn-outline" style="width: 100%;">
                        Закрыть
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        this.calculateCosts(); // Initial calculation
    }

    calculateCosts() {
        const count = parseInt(document.getElementById('rabbit-count')?.value || 1);
        const breed = document.getElementById('breed-select')?.value || 'medium';
        const period = parseInt(document.getElementById('period-select')?.value || 6);

        // Cost per rabbit per month based on breed
        const costs = {
            small: { feed: 300, bedding: 150, care: 100 },
            medium: { feed: 450, bedding: 200, care: 150 },
            large: { feed: 600, bedding: 250, care: 200 }
        };

        const monthlyPerRabbit = costs[breed];
        const totalMonthly = Object.values(monthlyPerRabbit).reduce((a, b) => a + b) * count;
        const totalPeriod = totalMonthly * period;

        const resultDiv = document.getElementById('cost-breakdown');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>Корма (${count} кролик${count > 1 ? 'а' : ''}):</span>
                    <span>${monthlyPerRabbit.feed * count * period} ₽</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>Подстилка и уход:</span>
                    <span>${monthlyPerRabbit.bedding * count * period} ₽</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>Ветуход и витамины:</span>
                    <span>${monthlyPerRabbit.care * count * period} ₽</span>
                </div>
                <div style="font-size: 12px; color: #666; margin-top: 8px;">
                    * Расчет приблизительный, на ${period} мес.
                </div>
            `;
        }

        const totalSpan = document.getElementById('total-cost');
        if (totalSpan) {
            totalSpan.textContent = totalPeriod.toLocaleString();
        }

        // Track calculator usage
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent('calculator_use', {
                event_category: 'tools',
                rabbit_count: count,
                breed: breed,
                period: period,
                total_cost: totalPeriod
            });
        }
    }

    // Task 37: Share functionality
    addShareButtons() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '📤';
            shareBtn.title = 'Поделиться';
            shareBtn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                cursor: pointer;
                font-size: 16px;
            `;
            
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.shareProduct(card);
            });

            card.style.position = 'relative';
            card.appendChild(shareBtn);
        });
    }

    shareProduct(card) {
        const title = card.querySelector('.product-title')?.textContent || 'Кролик';
        const price = card.querySelector('.product-price')?.textContent || '';
        const url = window.location.href;
        
        const text = `🐰 ${title} - ${price}\nПороды кроликов от надежного заводчика\n${url}`;

        if (navigator.share) {
            navigator.share({
                title: `КупитьКролика - ${title}`,
                text: text,
                url: url
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Ссылка скопирована в буфер обмена!');
            });
        }

        // Track shares
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent('product_share', {
                event_category: 'social',
                product: title
            });
        }
    }

    // Helper functions
    saveFavorites() {
        localStorage.setItem('rabbit_favorites', JSON.stringify(this.favorites));
    }

    saveComparison() {
        localStorage.setItem('rabbit_comparison', JSON.stringify(this.comparison));
    }

    updateCounts() {
        // Update favorites counter if exists
        const favCounter = document.getElementById('favorites-counter');
        if (favCounter) {
            favCounter.textContent = this.favorites.length;
        }
        
        // Update comparison counter if exists  
        const compCounter = document.getElementById('comparison-counter');
        if (compCounter) {
            compCounter.textContent = this.comparison.length;
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'warning' ? '#f59e0b' : '#10b981'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 3000;
            font-size: 14px;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            animation: slideInRight 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Helper methods for comparison
    getBreedFromName(name) {
        if (name.includes('Белый')) return 'Белый великан';
        if (name.includes('Калифорн')) return 'Калифорнийский';
        if (name.includes('Шиншилла')) return 'Советская шиншилла';
        return 'Смешанная порода';
    }

    getRandomAge() {
        return Math.floor(Math.random() * 8) + 2 + ' мес';
    }

    getRandomWeight() {
        return (Math.random() * 2 + 2).toFixed(1) + ' кг';
    }

    getRandomPrice() {
        return (Math.floor(Math.random() * 3000) + 6500).toLocaleString();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .favorite-btn, .compare-btn {
        background: none !important;
        border: 1px solid #d1d5db !important;
        padding: 4px 8px !important;
        border-radius: 4px !important;
        font-size: 12px !important;
        cursor: pointer !important;
        margin-left: 8px !important;
        transition: all 0.2s ease !important;
    }
    
    .favorite-btn:hover, .compare-btn:hover {
        border-color: var(--color-primary) !important;
        color: var(--color-primary) !important;
    }
`;
document.head.appendChild(style);

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    if (!window.advancedFeatures) {
        window.advancedFeatures = new AdvancedFeatures();
    }
});