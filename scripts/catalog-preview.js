// Модуль для работы с каталогом кроликов
class CatalogManager {
    constructor() {
        this.rabbits = [];
        this.filteredRabbits = [];
        this.init();
    }

    async init() {
        try {
            await this.loadRabbitsData();
            this.renderFeaturedRabbits();
            this.initializeFilters();
        } catch (error) {
            console.error('Failed to initialize catalog:', error);
            this.renderError();
        }
    }

    async loadRabbitsData() {
        try {
            const response = await fetch('/data/rabbits-featured.json');
            if (!response.ok) throw new Error('Failed to fetch rabbits data');
            this.rabbits = await response.json();
            this.filteredRabbits = [...this.rabbits];
        } catch (error) {
            console.warn('Using fallback rabbits data');
            this.rabbits = this.getFallbackData();
            this.filteredRabbits = [...this.rabbits];
        }
    }

    getFallbackData() {
        return [
            {
                id: 1,
                name: "Белоснежка",
                breed: "Калифорнийский",
                gender: "female",
                age: 6,
                weight: 2.8,
                price: 15000,
                status: "available",
                image: "/images/rabbit-1.webp",
                description: "Молодая самка калифорнийской породы"
            },
            {
                id: 2,
                name: "Граф",
                breed: "Калифорнийский",
                gender: "male", 
                age: 8,
                weight: 3.5,
                price: 18000,
                status: "available",
                image: "/images/rabbit-2.webp",
                description: "Племенной самец с отличными показателями"
            },
            {
                id: 3,
                name: "Серый",
                breed: "Серый великан",
                gender: "male",
                age: 12,
                weight: 4.2,
                price: 22000,
                status: "reserved",
                image: "/images/rabbit-3.webp",
                description: "Крупный самец породы Серый великан"
            }
        ];
    }

    renderFeaturedRabbits() {
        const container = document.getElementById('featured-rabbits');
        if (!container) return;

        const featuredRabbits = this.rabbits.slice(0, 6); // Первые 6 для главной
        
        container.innerHTML = featuredRabbits.map(rabbit => 
            this.createRabbitCard(rabbit)
        ).join('');

        container.className = 'catalog-preview-grid';
    }

    renderError() {
        const container = document.getElementById('featured-rabbits');
        if (!container) return;

        container.innerHTML = `
            <div class="error-message">
                <div class="error-icon">⚠️</div>
                <h3>Ошибка загрузки каталога</h3>
                <p>Не удалось загрузить данные о кроликах. Попробуйте обновить страницу.</p>
                <button onclick="window.location.reload()" class="btn btn-primary">
                    🔄 Обновить
                </button>
            </div>
        `;
        container.className = 'error-container';
    }

    createRabbitCard(rabbit) {
        const statusClass = rabbit.status === 'available' ? 'available' : 'reserved';
        const statusText = rabbit.status === 'available' ? 'Свободен' : 'Забронирован';
        const genderIcon = rabbit.gender === 'male' ? '♂️' : '♀️';
        const genderText = rabbit.gender === 'male' ? 'Самец' : 'Самка';
        
        // Определяем множители цены для инвест-модели
        const investmentMultiplier = rabbit.gender === 'male' ? 2.2 : 1.8; // Самцы дороже
        const investmentPrice = Math.round(rabbit.price * investmentMultiplier);
        
        return `
            <article class="rabbit-card" data-id="${rabbit.id}">
                <div class="rabbit-image">
                    <img src="${rabbit.image}" alt="${rabbit.name}" loading="lazy" onerror="this.src='/images/placeholder-rabbit.jpg'">
                    <div class="rabbit-badges">
                        <span class="status-badge status-${statusClass}">${statusText}</span>
                        <span class="gender-badge gender-${rabbit.gender}">${genderIcon}</span>
                    </div>
                </div>
                <div class="rabbit-info">
                    <h3 class="rabbit-name">${rabbit.name}</h3>
                    <div class="rabbit-breed">${rabbit.breed}</div>
                    <div class="rabbit-specs">
                        <div class="spec-item">
                            <span class="spec-label">Пол:</span>
                            <span class="spec-value">${genderText}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Возраст:</span>
                            <span class="spec-value">${rabbit.age} мес</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Вес:</span>
                            <span class="spec-value">${rabbit.weight} кг</span>
                        </div>
                    </div>
                    <div class="rabbit-pricing">
                        <div class="investment-price">
                            <span class="price-label">Инвестиция:</span>
                            <span class="price-value">$${investmentPrice}</span>
                        </div>
                        <div class="multiplier-note">
                            × ${investmentMultiplier} от базовой цены
                        </div>
                    </div>
                    <div class="rabbit-actions">
                        <button class="btn btn-primary btn-block" onclick="catalog.selectRabbit(${rabbit.id})">
                            ${rabbit.status === 'available' ? 'Выбрать кролика' : 'В лист ожидания'}
                        </button>
                        <button class="btn btn-outline btn-small" onclick="catalog.showDetails(${rabbit.id})">
                            Детали
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    selectRabbit(rabbitId) {
        const rabbit = this.rabbits.find(r => r.id === rabbitId);
        if (!rabbit) return;

        if (rabbit.status !== 'available') {
            this.showNotification('❌ Этот кролик уже забронирован', 'warning');
            return;
        }

        // Трекинг события
        if (window.analytics) {
            window.analytics.trackEvent('rabbit_select', {
                event_category: 'investment',
                rabbit_id: rabbitId,
                rabbit_name: rabbit.name,
                breed: rabbit.breed,
                price: rabbit.price
            });
        }

        // Открываем форму инвестиции
        this.openInvestmentForm(rabbit);
    }

    openInvestmentForm(rabbit) {
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal investment-modal">
                <div class="modal-header">
                    <h2>🐰 Инвестиция в кролика "${rabbit.name}"</h2>
                    <button class="modal-close" onclick="this.closest('.modal-backdrop').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="rabbit-preview">
                        <img src="${rabbit.image}" alt="${rabbit.name}" class="preview-image">
                        <div class="preview-info">
                            <h3>${rabbit.name}</h3>
                            <p>${rabbit.breed} • ${rabbit.gender === 'male' ? 'Самец' : 'Самка'} • ${rabbit.age} мес • ${rabbit.weight} кг</p>
                        </div>
                    </div>
                    
                    <div class="investment-details">
                        <h4>💰 Условия инвестиции:</h4>
                        <ul>
                            <li><strong>Сумма инвестиции:</strong> $${Math.round(rabbit.price * (rabbit.gender === 'male' ? 2.2 : 1.8))}</li>
                            <li><strong>Круг А:</strong> 100-2000 USDT</li>
                            <li><strong>Ежедневные PLEX:</strong> ~0.1-0.2% от суммы</li>
                            <li><strong>Циклы разведения:</strong> 2 полных цикла</li>
                            <li><strong>Гарантия возврата:</strong> 100% по стартовой цене</li>
                        </ul>
                    </div>
                    
                    <form class="investment-form" onsubmit="catalog.submitInvestment(event, ${rabbit.id})">
                        <div class="form-group">
                            <label>Ваше имя:</label>
                            <input type="text" name="investor_name" required>
                        </div>
                        <div class="form-group">
                            <label>Telegram:</label>
                            <input type="text" name="telegram" placeholder="@username" required>
                        </div>
                        <div class="form-group">
                            <label>Сумма инвестиции (USDT):</label>
                            <input type="number" name="amount" min="100" max="2000" placeholder="100-2000" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">
                                🚀 Подать заявку на инвестицию
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    submitInvestment(event, rabbitId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const investmentData = {
            rabbit_id: rabbitId,
            investor_name: formData.get('investor_name'),
            telegram: formData.get('telegram'),
            amount: parseFloat(formData.get('amount')),
            timestamp: new Date().toISOString()
        };

        // В реальном приложении здесь был бы API-вызов
        console.log('Investment submitted:', investmentData);
        
        // Закрываем модал
        event.target.closest('.modal-backdrop').remove();
        
        // Показываем уведомление об успехе
        this.showNotification('🎉 Заявка отправлена! Менеджер свяжется с вами в течение 30 минут.', 'success');
        
        // Трекинг
        if (window.analytics) {
            window.analytics.trackEvent('investment_submit', {
                event_category: 'conversion',
                rabbit_id: rabbitId,
                amount: investmentData.amount
            });
        }
    }

    showDetails(rabbitId) {
        const rabbit = this.rabbits.find(r => r.id === rabbitId);
        if (!rabbit) return;

        // Простое модальное окно с деталями
        alert(`🐰 ${rabbit.name}\n\nПорода: ${rabbit.breed}\nОписание: ${rabbit.description}\n\nДля подробной информации свяжитесь с менеджером.`);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    renderError() {
        const container = document.getElementById('featured-rabbits');
        if (!container) return;
        
        container.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h3>Не удалось загрузить каталог</h3>
                <p>Попробуйте обновить страницу или свяжитесь с менеджером</p>
                <button onclick="location.reload()" class="btn btn-primary">Обновить</button>
            </div>
        `;
    }

    // Инициализация фильтров для каталога
    initializeFilters() {
        const filtersContainer = document.querySelector('.catalog-filters');
        if (!filtersContainer) {
            console.log('📋 Filters container not found, skipping initialization');
            return;
        }

        this.setupBreedFilter();
        this.setupGenderFilter();
        this.setupAgeFilter();
        this.setupStatusFilter();
        this.setupSortFilter();
        console.log('📋 Filters initialized');
    }

    setupBreedFilter() {
        const breedSelect = document.querySelector('#breed-filter');
        if (breedSelect) {
            breedSelect.addEventListener('change', (e) => {
                this.applyFilter('breed', e.target.value);
            });
        }
    }

    setupGenderFilter() {
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.applyFilter('gender', e.target.value);
                }
            });
        });
    }

    setupAgeFilter() {
        const ageSelect = document.querySelector('#age-filter');
        if (ageSelect) {
            ageSelect.addEventListener('change', (e) => {
                this.applyFilter('age', e.target.value);
            });
        }
    }

    setupStatusFilter() {
        const statusSelect = document.querySelector('#status-filter');
        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => {
                this.applyFilter('status', e.target.value);
            });
        }
    }

    setupSortFilter() {
        const sortSelect = document.querySelector('#sort-filter');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.applySorting(e.target.value);
            });
        }
    }

    applyFilter(filterType, value) {
        if (value === 'all' || !value) {
            this.filteredRabbits = [...this.rabbits];
        } else {
            this.filteredRabbits = this.rabbits.filter(rabbit => {
                switch (filterType) {
                    case 'breed':
                        return rabbit.breed === value;
                    case 'gender':
                        return rabbit.gender === value;
                    case 'age':
                        const age = parseInt(rabbit.age);
                        if (value === 'young') return age <= 6;
                        if (value === 'adult') return age > 6 && age <= 18;
                        if (value === 'mature') return age > 18;
                        return true;
                    case 'status':
                        return rabbit.status === value;
                    default:
                        return true;
                }
            });
        }
        this.renderFilteredRabbits();
    }

    applySorting(sortBy) {
        switch (sortBy) {
            case 'price-low':
                this.filteredRabbits.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredRabbits.sort((a, b) => b.price - a.price);
                break;
            case 'age-young':
                this.filteredRabbits.sort((a, b) => a.age - b.age);
                break;
            case 'age-old':
                this.filteredRabbits.sort((a, b) => b.age - a.age);
                break;
            case 'weight-light':
                this.filteredRabbits.sort((a, b) => a.weight - b.weight);
                break;
            case 'weight-heavy':
                this.filteredRabbits.sort((a, b) => b.weight - a.weight);
                break;
            default:
                // По умолчанию по ID (оригинальный порядок)
                this.filteredRabbits.sort((a, b) => a.id - b.id);
        }
        this.renderFilteredRabbits();
    }

    renderFilteredRabbits() {
        const resultsContainer = document.querySelector('.catalog-results');
        if (!resultsContainer) return;

        if (this.filteredRabbits.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>Кролики не найдены</h3>
                    <p>Попробуйте изменить параметры поиска</p>
                    <button onclick="window.catalog.resetFilters()" class="btn btn-outline">
                        Сбросить фильтры
                    </button>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = this.filteredRabbits.map(rabbit => this.createRabbitCard(rabbit)).join('');
        
        // Обновляем счетчик результатов
        const counter = document.querySelector('.results-counter');
        if (counter) {
            counter.textContent = `Найдено: ${this.filteredRabbits.length} ${this.getRabbitWord(this.filteredRabbits.length)}`;
        }
    }

    resetFilters() {
        // Сбрасываем все фильтры
        const breedSelect = document.querySelector('#breed-filter');
        const ageSelect = document.querySelector('#age-filter');
        const statusSelect = document.querySelector('#status-filter');
        const sortSelect = document.querySelector('#sort-filter');
        const genderRadios = document.querySelectorAll('input[name="gender"]');

        if (breedSelect) breedSelect.value = 'all';
        if (ageSelect) ageSelect.value = 'all';
        if (statusSelect) statusSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'default';
        
        genderRadios.forEach(radio => {
            radio.checked = radio.value === 'all';
        });

        this.filteredRabbits = [...this.rabbits];
        this.renderFilteredRabbits();
    }

    getRabbitWord(count) {
        if (count % 10 === 1 && count % 100 !== 11) return 'кролик';
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'кролика';
        return 'кроликов';
    }
}

// Инициализация каталога
window.catalog = new CatalogManager();

console.log('📋 Catalog module loaded');