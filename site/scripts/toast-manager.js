/**
 * Toast Notification System
 * Единый центр уведомлений для всего сайта
 */
class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.createContainer();
        window.showToast = this.show.bind(this);
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.style.cssText = 
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        ;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = 	oast toast-;
        
        const icons = {
            success: '',
            error: '',
            warning: '',
            info: 'ℹ'
        };

        toast.innerHTML = 
            <div class="toast-content">
                <span class="toast-icon"></span>
                <span class="toast-message"></span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        ;

        toast.style.cssText = 
            background: ;
            color: white;
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            pointer-events: auto;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        ;

        // Стили для содержимого
        const style = document.createElement('style');
        style.textContent = 
            .toast-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .toast-icon {
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .toast-message {
                flex: 1;
                line-height: 1.4;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: rgba(255,255,255,0.8);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
                flex-shrink: 0;
            }
            
            .toast-close:hover {
                background: rgba(255,255,255,0.2);
                color: white;
            }
        ;

        if (!document.getElementById('toast-styles')) {
            style.id = 'toast-styles';
            document.head.appendChild(style);
        }

        this.container.appendChild(toast);

        // Анимация появления
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);

        // Автоудаление
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        // Аналитика
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent('toast_shown', {
                type: type,
                message_length: message.length,
                timestamp: Date.now()
            });
        }

        return toast;
    }

    remove(toast) {
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }

    getBackgroundColor(type) {
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
        return colors[type] || colors.info;
    }

    // Публичные методы для удобства
    success(message, duration = 5000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 7000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 6000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 5000) {
        return this.show(message, 'info', duration);
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.toastManager = new ToastManager();
    console.log(' Toast Manager initialized');
});

// Глобальные сокращения
window.toast = {
    show: (message, type, duration) => window.showToast(message, type, duration),
    success: (message, duration) => window.toastManager?.success(message, duration),
    error: (message, duration) => window.toastManager?.error(message, duration),
    warning: (message, duration) => window.toastManager?.warning(message, duration),
    info: (message, duration) => window.toastManager?.info(message, duration)
};
