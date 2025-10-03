/* ============================================
   BELARUS OFFICE - UX INTERACTIONS
   Прогрессивное раскрытие и интерактивность
   ============================================ */

(function() {
  'use strict';

  // === 1. ACCORDION FUNCTIONALITY ===
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-belarus');
    
    accordions.forEach(accordion => {
      const header = accordion.querySelector('.accordion-header');
      const content = accordion.querySelector('.accordion-content');
      
      if (!header || !content) return;
      
      header.addEventListener('click', () => {
        const isActive = accordion.classList.contains('active');
        
        // Close all other accordions
        accordions.forEach(item => {
          if (item !== accordion) {
            item.classList.remove('active');
            const otherContent = item.querySelector('.accordion-content');
            if (otherContent) {
              otherContent.style.maxHeight = null;
            }
          }
        });
        
        // Toggle current accordion
        if (isActive) {
          accordion.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          accordion.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
      
      // Set initial state
      if (accordion.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }

  // === 2. SCROLL ANIMATIONS ===
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Animate cards
    const animatedElements = document.querySelectorAll('.card-belarus, .roadmap-item, .accordion-belarus');
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // === 3. SMOOTH SCROLL ===
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      });
    });
  }

  // === 4. SCROLL PROGRESS INDICATOR ===
  function initScrollProgress() {
    let progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #7c8cff 0%, #4cc9f0 100%);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // === 5. ROADMAP PROGRESS VISUALIZATION ===
  function initRoadmapProgress() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const marker = entry.target.querySelector('.roadmap-marker');
        if (!marker) return;
        
        if (entry.isIntersecting) {
          marker.style.transform = 'scale(1.15)';
          marker.style.boxShadow = `
            0 12px 32px rgba(124, 140, 255, 0.6),
            0 0 0 4px rgba(15, 20, 25, 1),
            0 0 0 8px rgba(124, 140, 255, 0.5)
          `;
          
          setTimeout(() => {
            marker.style.transform = 'scale(1)';
            marker.style.boxShadow = `
              0 8px 24px rgba(124, 140, 255, 0.4),
              0 0 0 4px rgba(15, 20, 25, 1),
              0 0 0 6px rgba(124, 140, 255, 0.3)
            `;
          }, 300);
        }
      });
    }, observerOptions);
    
    roadmapItems.forEach(item => {
      observer.observe(item);
    });
  }

  // === 6. CARD HOVER EFFECTS ===
  function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card-belarus');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = document.createElement('div');
        glow.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(124, 140, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: opacity 0.5s ease;
        `;
        glow.className = 'card-glow-effect';
        
        // Remove previous glow
        const existingGlow = card.querySelector('.card-glow-effect');
        if (existingGlow) existingGlow.remove();
        
        card.appendChild(glow);
        
        setTimeout(() => {
          glow.style.opacity = '0';
          setTimeout(() => glow.remove(), 500);
        }, 100);
      });
    });
  }

  // === 7. LAZY LOAD IMAGES ===
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // === 8. CTA BUTTON RIPPLE EFFECT ===
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-primary-belarus, .cta-secondary-belarus');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-animation-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation-style';
      style.textContent = `
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // === 9. SCROLL TO TOP BUTTON ===
  function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (!scrollBtn) return;
    
    function toggleScrollButton() {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    }
    
    scrollBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
    
    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    toggleScrollButton();
  }

  // === 10. PARALLAX EFFECT ===
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  // === 11. PERFORMANCE OPTIMIZATION ===
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // === INITIALIZATION ===
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    console.log('🇧🇾 Belarus Office UX: Initializing...');
    
    try {
      initAccordions();
      initScrollAnimations();
      initSmoothScroll();
      initScrollProgress();
      initRoadmapProgress();
      initCardHoverEffects();
      initLazyLoad();
      initRippleEffect();
      initScrollToTop();
      initParallax();
      
      console.log('✅ Belarus Office UX: All features initialized');
    } catch (error) {
      console.error('❌ Belarus Office UX: Initialization error', error);
    }
  }

  // Start initialization
  init();
  
  // Re-initialize on page show (for bfcache)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      console.log('🔄 Belarus Office UX: Re-initializing from cache');
      init();
    }
  });

})();
