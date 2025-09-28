// Task 22, 30, 32: Mobile menu functionality + Performance + Analytics
document.addEventListener('DOMContentLoaded', function() {
    // Task 32: Analytics tracking
    function trackEvent(eventName, properties = {}) {
        // Google Analytics 4 (gtag)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Yandex.Metrica
        if (typeof ym !== 'undefined') {
            ym(95441234, 'reachGoal', eventName, properties);
        }
        
        // Console logging for development
        console.log('Event tracked:', eventName, properties);
    }

    // Task 30: Performance optimizations
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Performance monitoring
    function setupPerformanceMonitoring() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    trackEvent('performance', {
                        load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        page_load: Math.round(perfData.loadEventEnd - perfData.fetchStart)
                    });
                }
            }, 0);
        });
    }

    // Mobile menu toggle
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Track menu usage
            if (navMenu.classList.contains('active')) {
                trackEvent('menu_open', { event_category: 'navigation' });
            }
            
            // Animate burger icon
            const spans = burger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = burger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', function(event) {
            if (!burger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = burger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href*="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Task 32: Analytics events (placeholder)
    function trackEvent(eventName, properties = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, properties);
        
        // Example: gtag('event', eventName, properties);
        // Example: ym(METRIKA_ID, 'reachGoal', eventName);
    }
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const href = this.getAttribute('href');
            if (href === '/catalog') {
                trackEvent('cta_click', { type: 'catalog' });
            } else if (href === '/contacts') {
                trackEvent('cta_click', { type: 'contact' });
            }
        });
    });
    
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_click', { number: this.getAttribute('href') });
        });
    });
    
    // Track product card clicks
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const bookButton = card.querySelector('.btn');
        if (bookButton) {
            bookButton.addEventListener('click', function() {
                const productTitle = card.querySelector('.product-title')?.textContent || 'Unknown';
                const productPrice = card.querySelector('.product-price')?.textContent || 'Unknown';
                trackEvent('product_book_click', {
                    product: productTitle,
                    price: productPrice
                });
            });
        }
    });
});

// Task 42: Loading states (placeholder)
function showLoader(element) {
    if (element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }
}

function hideLoader(element) {
    if (element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Task 23: Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Enable navigation with Tab and Enter
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('btn')) {
            focusedElement.click();
        }
    }
    
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const burger = document.getElementById('burger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (burger) {
                const spans = burger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
});