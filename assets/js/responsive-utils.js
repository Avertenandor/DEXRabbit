/**
 * DEXRabbit - Финальная оптимизация адаптивности
 * Утилиты для улучшения UX на всех устройствах
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // 1. Определение типа устройства
    const deviceInfo = {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
        isAndroid: /Android/i.test(navigator.userAgent),
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
    
    // 2. Адаптивная высота для мобильных браузеров
    function setViewportHeight() {
        // Получаем реальную высоту viewport
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Для hero секций
        const heroElements = document.querySelectorAll('.hero, .fullscreen');
        heroElements.forEach(el => {
            if (deviceInfo.isMobile) {
                el.style.minHeight = `${window.innerHeight}px`;
            }
        });
    }
    
    // Обновляем при изменении размера и ориентации
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    setViewportHeight();
    
    // 3. Оптимизация таблиц для мобильных
    function optimizeTables() {
        const tables = document.querySelectorAll('.table:not(.optimized)');
        tables.forEach(table => {
            // Создаем обертку если её нет
            if (!table.parentElement.classList.contains('table-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
            table.classList.add('optimized');
            
            // Для очень узких экранов - делаем карточки
            if (window.innerWidth < 480) {
                table.setAttribute('role', 'list');
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    row.setAttribute('role', 'listitem');
                });
            }
        });
    }
    
    // 4. Lazy loading для изображений
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // 5. Оптимизация видео виджетов
    function optimizeEmbeds() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            // Добавляем обертку для responsive
            if (!iframe.parentElement.classList.contains('embed-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'embed-wrapper';
                
                // Определяем соотношение сторон
                const width = iframe.getAttribute('width') || 16;
                const height = iframe.getAttribute('height') || 9;
                const ratio = (height / width * 100).toFixed(2);
                
                wrapper.style.paddingBottom = `${ratio}%`;
                iframe.parentNode.insertBefore(wrapper, iframe);
                wrapper.appendChild(iframe);
                
                // Убираем фиксированные размеры
                iframe.removeAttribute('width');
                iframe.removeAttribute('height');
            }
        });
    }
    
    // 6. Smooth scroll с учетом sticky header
    function setupSmoothScroll() {
        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 7. Адаптивные кнопки CTA
    function adaptCTAButtons() {
        const ctaRows = document.querySelectorAll('.hero-cta, .cta-row');
        ctaRows.forEach(row => {
            const buttons = row.querySelectorAll('.btn');
            
            // На мобильных - полная ширина
            if (window.innerWidth < 640) {
                buttons.forEach(btn => {
                    btn.classList.add('btn-full-mobile');
                });
            } else {
                buttons.forEach(btn => {
                    btn.classList.remove('btn-full-mobile');
                });
            }
        });
    }
    
    // 8. Предотвращение зума при фокусе на input (iOS)
    function preventZoomOnFocus() {
        if (deviceInfo.isIOS) {
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
            inputs.forEach(input => {
                // Устанавливаем размер шрифта 16px чтобы iOS не зумил
                input.style.fontSize = '16px';
                
                input.addEventListener('focus', function() {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
                });
                
                input.addEventListener('blur', function() {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0, viewport-fit=cover');
                });
            });
        }
    }
    
    // 9. Адаптивные карточки инвесторов
    function adaptInvestorCards() {
        const investorCards = document.querySelectorAll('.investor-card');
        
        investorCards.forEach(card => {
            // Адаптируем размер аватарок
            const avatar = card.querySelector('.avatar, .investor-avatar');
            if (avatar && window.innerWidth < 640) {
                avatar.classList.add('avatar--sm');
            }
            
            // Адаптируем кнопки
            const buttons = card.querySelectorAll('a.contact-button, .btn');
            if (window.innerWidth < 480) {
                buttons.forEach(btn => {
                    btn.style.fontSize = '0.75rem';
                    btn.style.padding = '0.4rem 0.8rem';
                });
            }
        });
    }
    
    // 10. Performance: отложенная загрузка некритичных стилей
    function loadDeferredStyles() {
        const deferredStyles = [
            '/assets/css/animations.css',
            '/assets/css/print.css'
        ];
        
        deferredStyles.forEach(href => {
            // Проверяем существование файла
            fetch(href, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = href;
                        document.head.appendChild(link);
                    }
                })
                .catch(() => {}); // Игнорируем если файл не найден
        });
    }
    
    // 11. Добавляем классы для определения возможностей
    function detectFeatures() {
        const html = document.documentElement;
        
        // Touch support
        if (deviceInfo.isTouchDevice) {
            html.classList.add('touch');
        } else {
            html.classList.add('no-touch');
        }
        
        // Device type
        if (deviceInfo.isMobile) {
            html.classList.add('mobile');
        }
        if (deviceInfo.isIOS) {
            html.classList.add('ios');
        }
        if (deviceInfo.isAndroid) {
            html.classList.add('android');
        }
        
        // Размер экрана
        const updateSizeClass = () => {
            html.classList.remove('xs', 'sm', 'md', 'lg', 'xl', 'xxl');
            
            const width = window.innerWidth;
            if (width < 576) html.classList.add('xs');
            else if (width < 768) html.classList.add('sm');
            else if (width < 992) html.classList.add('md');
            else if (width < 1200) html.classList.add('lg');
            else if (width < 1920) html.classList.add('xl');
            else html.classList.add('xxl');
        };
        
        updateSizeClass();
        window.addEventListener('resize', updateSizeClass);
    }
    
    // 12. Инициализация всех оптимизаций
    function init() {
        detectFeatures();
        optimizeTables();
        setupLazyLoading();
        optimizeEmbeds();
        setupSmoothScroll();
        adaptCTAButtons();
        preventZoomOnFocus();
        adaptInvestorCards();
        
        // Отложенная загрузка
        setTimeout(loadDeferredStyles, 2000);
    }
    
    // Запуск
    init();
    
    // Реинициализация при изменении размера
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            adaptCTAButtons();
            adaptInvestorCards();
            optimizeTables();
        }, 250);
    });
    
    // Экспорт для использования в других скриптах
    window.DEXRabbitResponsive = {
        deviceInfo,
        setViewportHeight,
        optimizeTables,
        adaptCTAButtons
    };
});
