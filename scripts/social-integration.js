// Tasks 39-40, 46-48: Social features, notifications, additional testing
class SocialIntegration {
    constructor() {
        this.init();
    }

    init() {
        this.addSocialWidgets();
        this.setupNotifications();
        this.addInstagramFeed();
        this.addReviewsIntegration();
        this.setupAdvancedTesting();
    }

    // Task 39: Social media integration
    addSocialWidgets() {
        this.addFloatingSocialBar();
        this.addSocialProofs();
        this.setupSocialSharing();
    }

    addFloatingSocialBar() {
        const socialBar = document.createElement('div');
        socialBar.className = 'floating-social-bar';
        socialBar.style.cssText = `
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 500;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        const socialLinks = [
            {
                name: 'WhatsApp',
                icon: '💬',
                url: 'https://wa.me/79991234567',
                color: '#25D366',
                text: 'Написать в WhatsApp'
            },
            {
                name: 'Telegram',
                icon: '✈️',
                url: 'https://t.me/kupitkrolika',
                color: '#0088cc',
                text: 'Канал в Telegram'
            },
            {
                name: 'Instagram',
                icon: '📷',
                url: 'https://instagram.com/kupitkrolika',
                color: '#E4405F',
                text: 'Фото в Instagram'
            },
            {
                name: 'VKontakte',
                icon: '🟦',
                url: 'https://vk.com/kupitkrolika',
                color: '#4C75A3',
                text: 'Группа ВКонтакте'
            }
        ];

        socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.title = social.text;
            link.style.cssText = `
                width: 48px;
                height: 48px;
                background: ${social.color};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-decoration: none;
                font-size: 20px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                position: relative;
            `;

            link.innerHTML = social.icon;
            
            // Hover tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = social.text;
            tooltip.style.cssText = `
                position: absolute;
                left: 60px;
                top: 50%;
                transform: translateY(-50%);
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                white-space: nowrap;
                font-size: 12px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            link.appendChild(tooltip);
            
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.1)';
                tooltip.style.opacity = '1';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1)';
                tooltip.style.opacity = '0';
            });

            link.addEventListener('click', () => {
                if (typeof trackEvent === 'function') {
                    trackEvent('social_click', {
                        event_category: 'social',
                        platform: social.name.toLowerCase()
                    });
                }
            });

            socialBar.appendChild(link);
        });

        document.body.appendChild(socialBar);
    }

    addSocialProofs() {
        // Add live counter of satisfied customers
        const proofWidget = document.createElement('div');
        proofWidget.className = 'social-proof-widget';
        proofWidget.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 500;
            max-width: 250px;
            font-size: 14px;
            display: none;
            transition: all 0.3s ease;
        `;

        proofWidget.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">✓</div>
                    <div>
                        <div style="font-weight: 600; color: #059669;">Довольных клиентов</div>
                        <div style="font-size: 18px; font-weight: bold;">${this.getRandomCustomerCount()}</div>
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.style.display='none'" style="
                    background: none;
                    border: none;
                    color: #6b7280;
                    font-size: 16px;
                    cursor: pointer;
                    padding: 2px;
                    border-radius: 4px;
                    transition: color 0.2s;
                " onmouseover="this.style.color='#374151'" onmouseout="this.style.color='#6b7280'">✕</button>
            </div>
            <div style="font-size: 12px; color: #6b7280;">За ${new Date().getFullYear()} год</div>
        `;

        document.body.appendChild(proofWidget);
        
        // Update counter periodically
        setInterval(() => {
            const counter = proofWidget.querySelector('div:nth-child(2) div:nth-child(2)');
            if (counter) {
                counter.textContent = this.getRandomCustomerCount();
            }
        }, 30000);
        
        // Show after 5 seconds
        setTimeout(() => {
            proofWidget.style.display = 'block';
        }, 5000);
    }

    // Task 40: Advanced notifications and social proof
    setupNotifications() {
        this.addRecentPurchaseNotifications();
        this.addStockAlerts();
        this.addSeasonalPromotions();
    }

    addRecentPurchaseNotifications() {
        const names = ['Анна К.', 'Михаил В.', 'Елена Р.', 'Дмитрий П.', 'Ольга Н.', 'Игорь М.', 'Наталья Ж.'];
        const animals = ['Белого великана', 'Калифорнийского кролика', 'Советскую шиншиллу'];
        const cities = ['из Москвы', 'из Подольска', 'из Тулы', 'из Серпухова', 'из Воронежа'];

        const showNotification = () => {
            const name = names[Math.floor(Math.random() * names.length)];
            const animal = animals[Math.floor(Math.random() * animals.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 1500;
                max-width: 280px;
                font-size: 14px;
                animation: slideInRight 0.5s ease;
            `;

            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">🎉 Новая покупка!</div>
                        <div style="color: #6b7280;">${name} ${city} заказал${name.includes('а') ? 'а' : ''} ${animal}</div>
                        <div style="font-size: 12px; color: #9ca3af; margin-top: 4px;">${Math.floor(Math.random() * 30) + 1} мин назад</div>
                    </div>
                </div>
            `;

            document.body.appendChild(notification);

            // Auto remove after 6 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => notification.remove(), 500);
            }, 6000);
        };

        // Show random notifications
        const showRandomNotification = () => {
            if (Math.random() < 0.3) { // 30% chance
                showNotification();
            }
            setTimeout(showRandomNotification, Math.random() * 60000 + 30000); // 30-90 seconds
        };

        // Start after page load
        setTimeout(showRandomNotification, 10000);
    }

    addStockAlerts() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            if (Math.random() < 0.3) { // 30% chance for stock alert
                const stockAlert = document.createElement('div');
                stockAlert.style.cssText = `
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: #f59e0b;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    z-index: 10;
                `;
                
                const remaining = Math.floor(Math.random() * 3) + 1;
                stockAlert.textContent = `Осталось ${remaining}`;
                
                card.style.position = 'relative';
                card.appendChild(stockAlert);
            }
        });
    }

    addSeasonalPromotions() {
        const currentDate = new Date();
        const month = currentDate.getMonth();
        let promotion = null;

        // Seasonal promotions
        if (month >= 2 && month <= 4) { // March-May: Spring
            promotion = { text: '🌸 Весенняя скидка 15% на пары!', color: '#10b981' };
        } else if (month >= 5 && month <= 7) { // June-August: Summer  
            promotion = { text: '☀️ Летняя акция: 3-й кролик в подарок!', color: '#f59e0b' };
        } else if (month >= 8 && month <= 10) { // September-November: Autumn
            promotion = { text: '🍂 Осенняя распродажа до 20%!', color: '#dc2626' };
        } else { // Winter
            promotion = { text: '❄️ Новогодние цены! Скидки до 25%!', color: '#3b82f6' };
        }

        if (promotion) {
            const banner = document.createElement('div');
            banner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: ${promotion.color};
                color: white;
                text-align: center;
                padding: 8px;
                font-size: 14px;
                font-weight: 600;
                z-index: 1000;
                animation: slideDown 0.5s ease;
            `;
            
            banner.innerHTML = `
                ${promotion.text}
                <button onclick="this.parentElement.style.display='none'" style="
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                ">×</button>
            `;
            
            document.body.appendChild(banner);
            
            // Adjust body padding to account for banner
            document.body.style.paddingTop = '40px';
        }
    }

    addInstagramFeed() {
        // Placeholder for Instagram feed - in production would use Instagram API
        const instagramWidget = document.createElement('div');
        instagramWidget.id = 'instagram-feed';
        instagramWidget.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 24px;
            margin: 24px 0;
            border: 1px solid #e5e7eb;
        `;

        instagramWidget.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">📷</div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 4px;">@kupitkrolika в Instagram</div>
                    <div style="font-size: 14px; color: #6b7280;">Свежие фото наших питомцев</div>
                </div>
                <a href="https://instagram.com/kupitkrolika" target="_blank" style="margin-left: auto; background: #E4405F; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">Подписаться</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                ${Array(8).fill().map((_, i) => `
                    <div style="aspect-ratio: 1; background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 8px; position: relative; overflow: hidden;">
                        <img src="/images/photo_2025-09-15_13-17-5${i % 3}.jpg" alt="Instagram post ${i+1}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
                            <span style="color: white; font-size: 18px;">❤️ ${Math.floor(Math.random() * 100) + 20}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 16px;">
                <a href="https://instagram.com/kupitkrolika" target="_blank" style="color: #E4405F; text-decoration: none; font-weight: 500;">Смотреть все фото →</a>
            </div>
        `;

        // Add to homepage after reviews section
        const reviewsSection = document.querySelector('.reviews');
        if (reviewsSection) {
            reviewsSection.insertAdjacentElement('afterend', instagramWidget);
        }
    }

    // Task 46-48: Advanced testing and validation
    setupAdvancedTesting() {
        this.addRealTimeValidation();
        this.setupErrorTracking();
        this.addPerformanceMetrics();
    }

    addRealTimeValidation() {
        // Enhanced form validation with real-time feedback
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMessage = '';

        // Phone validation
        if (fieldName === 'phone') {
            const phoneRegex = /^[\+]?[7|8][\s\-\(]?[0-9]{3}[\s\-\)]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный номер телефона';
            }
        }

        // Email validation  
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный email';
            }
        }

        // Name validation
        if (fieldName === 'name') {
            if (value && value.length < 2) {
                isValid = false;
                errorMessage = 'Имя должно содержать минимум 2 символа';
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
    }

    showFieldValidation(field, isValid, errorMessage) {
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        if (!isValid && errorMessage) {
            field.style.borderColor = '#dc2626';
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = `
                color: #dc2626;
                font-size: 12px;
                margin-top: 4px;
            `;
            errorDiv.textContent = errorMessage;
            
            field.parentNode.appendChild(errorDiv);
        } else {
            field.style.borderColor = isValid ? '#10b981' : '#d1d5db';
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '#d1d5db';
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    }

    setupErrorTracking() {
        // Global error tracking
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            
            // Track error
            if (typeof trackEvent === 'function') {
                trackEvent('javascript_error', {
                    event_category: 'error',
                    error_message: event.message,
                    error_file: event.filename,
                    error_line: event.lineno
                });
            }
        });

        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            
            if (typeof trackEvent === 'function') {
                trackEvent('promise_rejection', {
                    event_category: 'error',
                    reason: event.reason.toString()
                });
            }
        });
    }

    addPerformanceMetrics() {
        // Advanced performance tracking
        if ('PerformanceObserver' in window) {
            // Track Long Tasks
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (typeof trackEvent === 'function') {
                        trackEvent('long_task', {
                            event_category: 'performance',
                            duration: Math.round(entry.duration),
                            start_time: Math.round(entry.startTime)
                        });
                    }
                });
            });
            
            try {
                longTaskObserver.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // Long tasks not supported
            }

            // Track Layout Shifts
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });

                if (clsValue > 0.1) { // CLS threshold
                    if (typeof trackEvent === 'function') {
                        trackEvent('layout_shift', {
                            event_category: 'performance',
                            cls_value: clsValue
                        });
                    }
                }
            });

            try {
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // Layout shift not supported
            }
        }
    }

    // Helper functions
    getRandomCustomerCount() {
        const baseCount = 847; // Starting number
        const variation = Math.floor(Math.random() * 10);
        return (baseCount + variation).toLocaleString();
    }
}

// Add required CSS animations
const socialStyles = document.createElement('style');
socialStyles.textContent = `
    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }
    
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
    
    @keyframes slideOutRight {
        from { 
            transform: translateX(0);
            opacity: 1;
        }
        to { 
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    
    /* Hide floating elements on mobile */
    @media (max-width: 768px) {
        .floating-social-bar {
            display: none !important;
        }
        
        body {
            padding-top: 0 !important;
        }
    }
`;

document.head.appendChild(socialStyles);

// Initialize social integration
document.addEventListener('DOMContentLoaded', () => {
    if (!window.socialIntegration) {
        window.socialIntegration = new SocialIntegration();
    }
});