// Аккордеон для FAQ на странице партнерской программы
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    const content = item.querySelector('.faq-accordion-content');
    const icon = item.querySelector('.faq-accordion-icon');
    
    // Устанавливаем начальное состояние
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    content.style.padding = '0 1.5rem';
    
    header.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');
      
      // Закрываем все остальные
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-accordion-content').style.maxHeight = '0';
          otherItem.querySelector('.faq-accordion-content').style.paddingTop = '0';
          otherItem.querySelector('.faq-accordion-content').style.paddingBottom = '0';
          otherItem.querySelector('.faq-accordion-icon').style.transform = 'rotate(0deg)';
        }
      });
      
      // Переключаем текущий
      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 40 + 'px';
        content.style.paddingTop = '1rem';
        content.style.paddingBottom = '1rem';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});
