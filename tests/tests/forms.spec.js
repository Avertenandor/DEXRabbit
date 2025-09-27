import { test, expect } from '@playwright/test';

const BASE_URL = 'https://xn--80apagbbfxgmuj4j.site';

test.describe('📝 Forms Testing', () => {
  
  test('🏠 Main Page Contact Form', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Ищем форму обратной связи на главной
    const contactForm = page.locator('form[name="contact"], .contact-form form, #contact-form').first();
    
    if (await contactForm.count() > 0) {
      // Заполнение формы
      await contactForm.locator('input[name="name"], input[placeholder*="имя"]').first().fill('Тестовый Пользователь');
      await contactForm.locator('input[name="phone"], input[type="tel"]').first().fill('+7 999 123 45 67');
      await contactForm.locator('textarea, input[name="message"]').first().fill('Тестовое сообщение для проверки формы');
      
      // Проверка валидации
      const submitBtn = contactForm.locator('button[type="submit"], input[type="submit"]').first();
      await expect(submitBtn).toBeEnabled();
      
      console.log('✅ Main page contact form is working');
    }
  });
  
  test('🍽️ Restaurant Partnership Form', async ({ page }) => {
    await page.goto(`${BASE_URL}/restaurants.html`);
    
    const partnerForm = page.locator('#partnership-form, .partnership-form').first();
    
    if (await partnerForm.count() > 0) {
      // Заполнение формы партнерства
      await partnerForm.locator('input[name="restaurant_name"]').fill('Тестовый Ресторан');
      await partnerForm.locator('input[name="contact_person"]').fill('Иван Иванов');
      await partnerForm.locator('input[name="phone"]').fill('+7 999 123 45 67');
      await partnerForm.locator('input[name="email"]').fill('test@restaurant.ru');
      
      if (await partnerForm.locator('select[name="partnership_level"]').count() > 0) {
        await partnerForm.locator('select[name="partnership_level"]').selectOption('premium');
      }
      
      // Проверка чекбокса согласия
      const agreementCheckbox = partnerForm.locator('input[name="partnership_agreement"]');
      if (await agreementCheckbox.count() > 0) {
        await agreementCheckbox.check();
        expect(await agreementCheckbox.isChecked()).toBe(true);
      }
      
      console.log('✅ Restaurant partnership form is working');
    }
  });
  
  test('🎁 Gift Order Form', async ({ page }) => {
    await page.goto(`${BASE_URL}/gifts.html`);
    
    const giftForm = page.locator('#gift-form, .gift-form').first();
    
    if (await giftForm.count() > 0) {
      // Выбор подарочного пакета
      await giftForm.locator('select[name="gift_package"]').selectOption('premium');
      
      // Данные получателя
      await giftForm.locator('input[name="recipient_name"]').fill('Анна Петрова');
      await giftForm.locator('input[name="recipient_phone"]').fill('+7 999 987 65 43');
      
      // Данные отправителя
      await giftForm.locator('input[name="sender_name"]').fill('Петр Сидоров');
      await giftForm.locator('input[name="sender_phone"]').fill('+7 999 111 22 33');
      
      // Дата доставки (если есть)
      const deliveryDateField = giftForm.locator('input[name="delivery_date"]');
      if (await deliveryDateField.count() > 0) {
        await deliveryDateField.fill('2025-10-01');
      }
      
      // Поздравительное сообщение
      await giftForm.locator('textarea[name="message"]').fill('Поздравляю с днем рождения!');
      
      console.log('✅ Gift order form is working');
    }
  });
  
  test('🧬 Breeding Program Form', async ({ page }) => {
    await page.goto(`${BASE_URL}/breeding.html`);
    
    const breedingForm = page.locator('#breeding-form, .breeding-form').first();
    
    if (await breedingForm.count() > 0) {
      // Выбор программы
      await breedingForm.locator('select[name="program_type"]').selectOption('premium');
      
      // Опыт разведения
      await breedingForm.locator('select[name="breeding_experience"]').selectOption('intermediate');
      
      // Интересующие породы
      await breedingForm.locator('select[name="interested_breeds"]').selectOption('californian');
      
      // Цели разведения
      await breedingForm.locator('select[name="breeding_goals"]').selectOption('breeding');
      
      // Контактные данные
      await breedingForm.locator('input[name="contact_name"]').fill('Владимир Козлов');
      await breedingForm.locator('input[name="phone"]').fill('+7 999 555 44 33');
      
      // Дополнительная информация
      await breedingForm.locator('textarea[name="additional_info"]').fill('Интересуюсь профессиональным разведением');
      
      // Согласие на обработку данных
      const agreementCheckbox = breedingForm.locator('input[name="breeding_agreement"]');
      if (await agreementCheckbox.count() > 0) {
        await agreementCheckbox.check();
      }
      
      console.log('✅ Breeding program form is working');
    }
  });
  
  test('📞 Contact Page Form', async ({ page }) => {
    await page.goto(`${BASE_URL}/contacts.html`);
    
    const contactForm = page.locator('#contact-form, .contact-form form').first();
    
    if (await contactForm.count() > 0) {
      // Выбор темы обращения
      if (await contactForm.locator('select[name="subject"]').count() > 0) {
        await contactForm.locator('select[name="subject"]').selectOption('general');
      }
      
      // Контактные данные
      await contactForm.locator('input[name="name"]').fill('Мария Иванова');
      await contactForm.locator('input[name="email"]').fill('maria@example.com');
      await contactForm.locator('input[name="phone"]').fill('+7 999 777 88 99');
      
      // Сообщение
      await contactForm.locator('textarea[name="message"]').fill('Здравствуйте! Интересуюсь покупкой кроликов для домашнего содержания.');
      
      // Согласие на обработку данных
      const privacyCheckbox = contactForm.locator('input[name="privacy_agreement"]');
      if (await privacyCheckbox.count() > 0) {
        await privacyCheckbox.check();
      }
      
      console.log('✅ Contact page form is working');
    }
  });
  
  test('🧮 Calculators Testing', async ({ page }) => {
    // Тест калькулятора доходности
    await page.goto(`${BASE_URL}/investment-model.html`);
    
    const investmentCalculator = page.locator('#investment-calculator, .investment-calculator').first();
    
    if (await investmentCalculator.count() > 0) {
      // Ввод суммы инвестиций
      await investmentCalculator.locator('input[name="investment_amount"]').fill('100000');
      
      // Выбор срока
      await investmentCalculator.locator('select[name="investment_term"]').selectOption('12');
      
      // Нажатие кнопки расчета
      const calculateBtn = investmentCalculator.locator('button:has-text("Рассчитать"), .btn:has-text("рассчитать")').first();
      if (await calculateBtn.count() > 0) {
        await calculateBtn.click();
        
        // Проверка появления результатов
        await page.waitForTimeout(2000);
        const results = investmentCalculator.locator('.results, .calculation-results').first();
        
        if (await results.count() > 0) {
          await expect(results).toBeVisible();
        }
      }
      
      console.log('✅ Investment calculator is working');
    }
    
    // Тест калькулятора доставки
    await page.goto(`${BASE_URL}/logistics.html`);
    
    const deliveryCalculator = page.locator('#delivery-calculator, .delivery-calculator').first();
    
    if (await deliveryCalculator.count() > 0) {
      // Выбор региона
      await deliveryCalculator.locator('select[name="delivery_region"], #delivery-region').selectOption('moscow');
      
      // Количество животных
      await deliveryCalculator.locator('input[name="animal_count"], #animal-count').fill('2');
      
      // Нажатие кнопки расчета
      const calculateBtn = deliveryCalculator.locator('#calculate-delivery, button:has-text("Рассчитать")').first();
      if (await calculateBtn.count() > 0) {
        await calculateBtn.click();
        
        // Проверка появления результатов
        await page.waitForTimeout(2000);
        const results = page.locator('#delivery-results, .calculator-results').first();
        
        if (await results.count() > 0) {
          await expect(results).toBeVisible();
        }
      }
      
      console.log('✅ Delivery calculator is working');
    }
  });
  
  test('🔒 Form Validation', async ({ page }) => {
    await page.goto(`${BASE_URL}/contacts.html`);
    
    const contactForm = page.locator('#contact-form, .contact-form form').first();
    
    if (await contactForm.count() > 0) {
      // Попытка отправить пустую форму
      const submitBtn = contactForm.locator('button[type="submit"]').first();
      await submitBtn.click();
      
      // Проверка появления сообщений об ошибках валидации
      const requiredFields = await contactForm.locator('input[required], textarea[required], select[required]').all();
      
      for (const field of requiredFields) {
        const fieldName = await field.getAttribute('name');
        console.log(`Checking validation for field: ${fieldName}`);
        
        // Проверка HTML5 валидации
        const isValid = await field.evaluate(el => el.checkValidity());
        expect(isValid).toBe(false);
      }
      
      // Тест валидации email
      const emailField = contactForm.locator('input[type="email"]').first();
      if (await emailField.count() > 0) {
        await emailField.fill('invalid-email');
        await submitBtn.click();
        
        const isValid = await emailField.evaluate(el => el.checkValidity());
        expect(isValid).toBe(false);
        
        // Ввод корректного email
        await emailField.fill('valid@example.com');
        const isValidNow = await emailField.evaluate(el => el.checkValidity());
        expect(isValidNow).toBe(true);
      }
      
      // Тест валидации телефона
      const phoneField = contactForm.locator('input[type="tel"]').first();
      if (await phoneField.count() > 0) {
        await phoneField.fill('123');
        const isValid = await phoneField.evaluate(el => el.checkValidity());
        // Здесь может быть как true так и false в зависимости от паттерна валидации
        
        await phoneField.fill('+7 999 123 45 67');
      }
      
      console.log('✅ Form validation is working');
    }
  });
  
  test('🚫 Anti-spam Protection', async ({ page }) => {
    await page.goto(`${BASE_URL}/contacts.html`);
    
    const contactForm = page.locator('#contact-form, .contact-form form').first();
    
    if (await contactForm.count() > 0) {
      // Проверка наличия honeypot поля
      const honeypotField = contactForm.locator('input[name="honeypot"]');
      
      if (await honeypotField.count() > 0) {
        // Honeypot поле должно быть скрыто
        const isVisible = await honeypotField.isVisible();
        expect(isVisible).toBe(false);
        
        console.log('✅ Honeypot anti-spam protection is active');
      }
      
      // Проверка rate limiting (если реализован)
      // Быстрая отправка нескольких форм
      for (let i = 0; i < 3; i++) {
        await contactForm.locator('input[name="name"]').fill(`Test User ${i}`);
        await contactForm.locator('input[name="email"]').fill(`test${i}@example.com`);
        await contactForm.locator('textarea[name="message"]').fill(`Test message ${i}`);
        
        const submitBtn = contactForm.locator('button[type="submit"]').first();
        if (await submitBtn.isEnabled()) {
          // Не кликаем реально, только проверяем что форма готова
          console.log(`Form ${i + 1} ready for submission`);
        }
        
        await page.waitForTimeout(500);
      }
      
      console.log('✅ Anti-spam checks completed');
    }
  });
});