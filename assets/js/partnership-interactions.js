/**
 * PARTNERSHIP PAGE - INTERACTIVE FEATURES
 * Калькулятор дохода, прогрессивное раскрытие, scroll animations
 */

// ==================== КАЛЬКУЛЯТОР ДОХОДА ====================
class PartnershipCalculator {
  constructor() {
    this.partnersInput = document.getElementById('calc-partners');
    this.investmentInput = document.getElementById('calc-investment');
    this.partnersRange = document.getElementById('calc-partners-range');
    this.investmentRange = document.getElementById('calc-investment-range');
    
    if (!this.partnersInput || !this.investmentInput) return;
    
    this.init();
  }
  
  init() {
    // Синхронизация input и range
    this.partnersInput.addEventListener('input', (e) => this.updateFromInput(e, 'partners'));
    this.investmentInput.addEventListener('input', (e) => this.updateFromInput(e, 'investment'));
    this.partnersRange.addEventListener('input', (e) => this.updateFromRange(e, 'partners'));
    this.investmentRange.addEventListener('input', (e) => this.updateFromRange(e, 'investment'));
    
    // Начальный расчет
    this.calculate();
  }
  
  updateFromInput(e, type) {
    const value = parseInt(e.target.value) || 0;
    const range = type === 'partners' ? this.partnersRange : this.investmentRange;
    const min = parseInt(range.min);
    const max = parseInt(range.max);
    
    // Ограничение значений
    const clampedValue = Math.max(min, Math.min(max, value));
    
    if (type === 'partners') {
      this.partnersInput.value = clampedValue;
      this.partnersRange.value = clampedValue;
    } else {
      this.investmentInput.value = clampedValue;
      this.investmentRange.value = clampedValue;
    }
    
    this.calculate();
  }
  
  updateFromRange(e, type) {
    const value = parseInt(e.target.value);
    
    if (type === 'partners') {
      this.partnersInput.value = value;
    } else {
      this.investmentInput.value = value;
    }
    
    this.calculate();
  }
  
  calculate() {
    const partners = parseInt(this.partnersInput.value) || 0;
    const investment = parseInt(this.investmentInput.value) || 0;
    
    // Формулы расчета
    const totalInvestment = partners * investment;
    const commissionOnDeposit = totalInvestment * 0.05; // 5% от вложений
    
    // Доход = вложения × 8 (800% ROI)
    const totalProfit = totalInvestment * 8;
    const commissionOnProfit = totalProfit * 0.05; // 5% от прибыли
    
    const totalEarnings = commissionOnDeposit + commissionOnProfit;
    
    // Обновление значений в DOM
    this.updateResult('calc-result-deposit', commissionOnDeposit);
    this.updateResult('calc-result-profit', commissionOnProfit);
    this.updateResult('calc-result-total', totalEarnings);
    
    // Дополнительная информация
    document.getElementById('calc-total-investment').textContent = this.formatMoney(totalInvestment);
    document.getElementById('calc-total-profit').textContent = this.formatMoney(totalProfit);
  }
  
  updateResult(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = this.formatMoney(value);
      
      // Анимация изменения
      element.style.transform = 'scale(1.1)';
      element.style.color = '#facc15';
      
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
      }, 300);
    }
  }
  
  formatMoney(value) {
    return Math.round(value).toLocaleString('ru-RU');
  }
}

// ==================== ПРОГРЕССИВНОЕ РАСКРЫТИЕ ====================
class ExpandableDetails {
  constructor() {
    this.toggles = document.querySelectorAll('.partnership-details__toggle');
    this.init();
  }
  
  init() {
    this.toggles.forEach(toggle => {
      toggle.addEventListener('click', () => this.toggle(toggle));
    });
  }
  
  toggle(toggle) {
    const parent = toggle.closest('.partnership-details');
    const content = parent.querySelector('.partnership-details__content');
    const isActive = toggle.classList.contains('active');
    
    if (isActive) {
      // Закрываем
      toggle.classList.remove('active');
      content.classList.remove('active');
      content.style.maxHeight = '0';
    } else {
      // Открываем
      toggle.classList.add('active');
      content.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
}

// ==================== SCROLL ANIMATIONS ====================
class ScrollAnimations {
  constructor() {
    this.sections = document.querySelectorAll('[data-aos]');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: 0.15,
          rootMargin: '0px 0px -100px 0px'
        }
      );
      
      this.sections.forEach(section => this.observer.observe(section));
    } else {
      // Fallback для старых браузеров
      this.sections.forEach(section => section.classList.add('aos-animate'));
    }
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        
        // Отключаем наблюдение после первой анимации
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ==================== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Пропускаем пустые якоря
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==================== ВИЗУАЛЬНЫЙ ФИДБЕК ДЛЯ CTA ====================
function initCTAFeedback() {
  const ctaButtons = document.querySelectorAll('.partnership-cta');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Создаем ripple эффект
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ==================== LAZY LOADING ИЗОБРАЖЕНИЙ ====================
function initLazyLoading() {
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
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ==================== ПОКАЗ СТАТИСТИКИ С АНИМАЦИЕЙ ====================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-counter]');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            this.animateCounter(entry.target);
            entry.target.dataset.counted = 'true';
          }
        });
      }, { threshold: 0.5 });
      
      this.counters.forEach(counter => observer.observe(counter));
    }
  }
  
  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        element.textContent = target.toLocaleString('ru-RU');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString('ru-RU');
      }
    }, 16);
  }
}

// ==================== КОПИРОВАНИЕ РЕФЕРАЛЬНОЙ ССЫЛКИ ====================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const text = this.dataset.copy;
      
      try {
        await navigator.clipboard.writeText(text);
        
        // Визуальный фидбек
        const originalText = this.textContent;
        this.textContent = '✓ Скопировано!';
        this.style.background = 'linear-gradient(135deg, #4ade80, #22d3ee)';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = '';
        }, 2000);
      } catch (err) {
        console.error('Ошибка копирования:', err);
      }
    });
  });
}

// ==================== ПОКАЗ УВЕДОМЛЕНИЙ ====================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `partnership-notification partnership-notification--${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.95), rgba(34, 211, 238, 0.95));
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    font-weight: 600;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', function() {
  // Основные функции
  new PartnershipCalculator();
  new ExpandableDetails();
  new ScrollAnimations();
  new CounterAnimation();
  
  // Дополнительные фичи
  initSmoothScroll();
  initCTAFeedback();
  initLazyLoading();
  initCopyButtons();
  
  // Отладка
  console.log('✅ Partnership interactive features loaded');
});

// ==================== ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ АНИМАЦИЙ ====================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
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
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  img.loaded {
    animation: fadeIn 0.4s ease;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
