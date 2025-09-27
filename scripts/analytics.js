// Модуль аналитики для КупитьКролика
class Analytics {
    constructor() {
        this.yaMetricaId = this.getMetricaId();
        this.isProduction = location.hostname !== 'localhost' && !location.hostname.includes('127.0.0.1');
        this.initialized = false;
        
        if (this.isProduction && this.yaMetricaId) {
            this.initYandexMetrica();
        } else {
            console.warn('Analytics: Development mode or no Metrica ID');
        }
        
        this.initLocalAnalytics();
    }

    getMetricaId() {
        // В продакшене можно использовать ENV переменные
        // Пока используем фиксированный ID для демо
        return this.isProduction ? '95849184' : null;
    }

    initYandexMetrica() {
        // Создаем скрипт с defer
        const script = document.createElement('script');
        script.defer = true;
        script.src = 'https://mc.yandex.ru/metrika/tag.js';
        
        script.onload = () => {
            try {
                // Инициализация Яндекс.Метрики
                window.ym = window.ym || function() {
                    (window.ym.a = window.ym.a || []).push(arguments);
                };
                window.ym.l = Date.now();

                window.ym(this.yaMetricaId, 'init', {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true,
                    ecommerce: "dataLayer"
                });

                this.initialized = true;
                console.log('✅ Yandex Metrica initialized:', this.yaMetricaId);
                
            } catch (error) {
                console.error('❌ Yandex Metrica initialization failed:', error);
            }
        };

        script.onerror = () => {
            console.warn('❌ Yandex Metrica script failed to load (ERR_CONNECTION_REFUSED or blocked)');
            this.handleMetricaError();
        };

        document.head.appendChild(script);
    }

    handleMetricaError() {
        // Fallback когда Метрика заблокирована
        console.log('📊 Using local analytics fallback');
        window.ym = (id, method, data) => {
            console.log(`YM Fallback [${id}]:`, method, data);
        };
    }

    initLocalAnalytics() {
        // Локальное логирование событий для разработки
        this.eventQueue = [];
        this.sessionId = this.generateSessionId();
        
        console.log('📊 Local analytics initialized, session:', this.sessionId);
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Универсальный метод отслеживания событий
    trackEvent(eventName, params = {}) {
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            url: window.location.href,
            ...params
        };

        // Локальное логирование
        this.eventQueue.push(eventData);
        console.log('📊 Event tracked:', eventData);

        // Отправка в Яндекс.Метрику
        if (this.initialized && window.ym) {
            try {
                window.ym(this.yaMetricaId, 'reachGoal', eventName, eventData);
            } catch (error) {
                console.warn('YM tracking error:', error);
            }
        }

        // Отправка в Google Analytics (если настроен)
        if (window.gtag) {
            try {
                window.gtag('event', eventName, {
                    event_category: params.event_category || 'general',
                    event_label: params.event_label,
                    value: params.value
                });
            } catch (error) {
                console.warn('GA tracking error:', error);
            }
        }
    }

    // Готовые методы для часто используемых событий
    trackPageView(page = window.location.pathname) {
        this.trackEvent('page_view', { page });
    }

    trackClick(element, category = 'click') {
        const elementInfo = {
            tag: element.tagName.toLowerCase(),
            class: element.className,
            id: element.id,
            text: element.textContent?.substring(0, 50)
        };
        
        this.trackEvent('element_click', {
            event_category: category,
            element: elementInfo
        });
    }

    trackFormSubmit(formName, success = true) {
        this.trackEvent('form_submit', {
            event_category: 'form',
            form_name: formName,
            success: success
        });
    }

    trackPurchaseIntent(product, price) {
        this.trackEvent('purchase_intent', {
            event_category: 'ecommerce',
            product_name: product,
            price: price
        });
    }

    trackOutboundClick(url) {
        this.trackEvent('outbound_click', {
            event_category: 'external',
            url: url
        });
    }

    // Получение статистики для админки
    getLocalStats() {
        return {
            sessionId: this.sessionId,
            eventsCount: this.eventQueue.length,
            events: this.eventQueue.slice(-20), // Последние 20 событий
            initialized: this.initialized
        };
    }
}

// Глобальная инициализация
window.analytics = new Analytics();

// Совместимость с существующим кодом
window.trackEvent = (event, params) => {
    window.analytics.trackEvent(event, params);
};

// Автоматическое отслеживание кликов по ссылкам
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
        const href = link.getAttribute('href');
        
        // Внешние ссылки
        if (href && (href.startsWith('http') || href.startsWith('//')) && !href.includes(location.hostname)) {
            window.analytics.trackOutboundClick(href);
        }
        
        // CTA кнопки
        if (link.classList.contains('btn') || link.classList.contains('cta')) {
            window.analytics.trackClick(link, 'cta');
        }
        
        // Социальные ссылки
        if (link.href.includes('t.me') || link.href.includes('wa.me') || link.href.includes('vk.com')) {
            window.analytics.trackClick(link, 'social');
        }
    }
});

// Отслеживание загрузки страницы
window.addEventListener('load', () => {
    window.analytics.trackPageView();
});

console.log('📊 Analytics module loaded');