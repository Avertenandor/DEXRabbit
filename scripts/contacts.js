// Task 14: Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactContent = document.getElementById('contact-content');
    
    const contactHTML = `
        <div style="padding: var(--space-16) 0;">
            <div class="container">
                <div style="display: grid; gap: var(--space-12); max-width: 1000px; margin: 0 auto;">
                    
                    <!-- Contact Methods -->
                    <div style="background-color: var(--color-bg-card); border-radius: var(--radius-2xl); padding: var(--space-8);">
                        <h2 style="margin-bottom: var(--space-6);">Свяжитесь с нами</h2>
                        <div style="display: grid; gap: var(--space-6); grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            
                            <!-- Phone -->
                            <div style="display: flex; align-items: center; gap: var(--space-4);">
                                <div style="width: var(--space-12); height: var(--space-12); background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xl);">📱</div>
                                <div>
                                    <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-1);">Телефон</div>
                                    <a href="tel:+79991234567" style="color: var(--color-primary); text-decoration: none; font-size: var(--font-size-lg);">+7 (999) 123-45-67</a>
                                    <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Ежедневно 9:00 - 20:00</div>
                                </div>
                            </div>

                            <!-- WhatsApp -->
                            <div style="display: flex; align-items: center; gap: var(--space-4);">
                                <div style="width: var(--space-12); height: var(--space-12); background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xl);">💬</div>
                                <div>
                                    <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-1);">WhatsApp</div>
                                    <a href="https://wa.me/79991234567" style="color: var(--color-primary); text-decoration: none; font-size: var(--font-size-lg);">Написать в WhatsApp</a>
                                    <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Быстрые ответы</div>
                                </div>
                            </div>

                            <!-- Telegram -->
                            <div style="display: flex; align-items: center; gap: var(--space-4);">
                                <div style="width: var(--space-12); height: var(--space-12); background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xl);">✈️</div>
                                <div>
                                    <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-1);">Telegram</div>
                                    <a href="https://t.me/kupitkrolika" style="color: var(--color-primary); text-decoration: none; font-size: var(--font-size-lg);">@kupitkrolika</a>
                                    <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Онлайн консультации</div>
                                </div>
                            </div>

                            <!-- Email -->
                            <div style="display: flex; align-items: center; gap: var(--space-4);">
                                <div style="width: var(--space-12); height: var(--space-12); background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xl);">📧</div>
                                <div>
                                    <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-1);">Email</div>
                                    <a href="mailto:info@xn--80apagbbfxgmuj4j.site" style="color: var(--color-primary); text-decoration: none; font-size: var(--font-size-lg);">info@купитькролика.рф</a>
                                    <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Ответ в течение дня</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div style="background-color: var(--color-bg-card); border-radius: var(--radius-2xl); padding: var(--space-8);">
                        <h2 style="margin-bottom: var(--space-6);">Форма обратной связи</h2>
                        <form id="contact-form" style="display: grid; gap: var(--space-4);">
                            <div style="display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                                <div>
                                    <label for="name" style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium);">Имя *</label>
                                    <input type="text" id="name" name="name" required style="width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background-color: var(--color-bg-body); color: var(--color-text-primary);">
                                </div>
                                <div>
                                    <label for="phone" style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium);">Телефон *</label>
                                    <input type="tel" id="phone" name="phone" required placeholder="+7 (999) 123-45-67" style="width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background-color: var(--color-bg-body); color: var(--color-text-primary);">
                                </div>
                            </div>
                            
                            <div>
                                <label for="email" style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium);">Email</label>
                                <input type="email" id="email" name="email" placeholder="your@email.com" style="width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background-color: var(--color-bg-body); color: var(--color-text-primary);">
                            </div>

                            <div>
                                <label for="interest" style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium);">Интересующая порода</label>
                                <select id="interest" name="interest" style="width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background-color: var(--color-bg-body); color: var(--color-text-primary);">
                                    <option value="">Выберите породу</option>
                                    <option value="white-giant">Белый великан</option>
                                    <option value="california">Калифорнийский</option>
                                    <option value="soviet-chinchilla">Советская шиншилла</option>
                                    <option value="gray-giant">Серый великан</option>
                                    <option value="vienna-blue">Венский голубой</option>
                                    <option value="consultation">Нужна консультация</option>
                                </select>
                            </div>

                            <div>
                                <label for="message" style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium);">Сообщение</label>
                                <textarea id="message" name="message" rows="4" placeholder="Опишите ваши пожелания, вопросы о содержании, доставке..." style="width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background-color: var(--color-bg-body); color: var(--color-text-primary); resize: vertical; min-height: 100px;"></textarea>
                            </div>

                            <!-- Task 31: Anti-spam honeypot -->
                            <div style="position: absolute; left: -9999px; opacity: 0;">
                                <input type="text" name="website" tabindex="-1" autocomplete="off">
                            </div>

                            <div style="display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; margin-top: var(--space-4);">
                                <button type="submit" class="btn btn-primary btn-large" id="submit-btn">
                                    📤 Отправить сообщение
                                </button>
                                <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
                                    * - обязательные поля
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Location & Schedule -->
                    <div style="display: grid; gap: var(--space-8); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                        <!-- Address -->
                        <div style="background-color: var(--color-bg-card); border-radius: var(--radius-2xl); padding: var(--space-8);">
                            <h2 style="margin-bottom: var(--space-6);">Наш питомник</h2>
                            <div style="display: flex; align-items: flex-start; gap: var(--space-4); margin-bottom: var(--space-4);">
                                <div style="width: var(--space-10); height: var(--space-10); background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-lg); flex-shrink: 0;">📍</div>
                                <div>
                                    <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2);">Адрес</div>
                                    <div style="color: var(--color-text-secondary); line-height: var(--line-height-relaxed);">
                                        Московская область<br>
                                        г. Подольск<br>
                                        ул. Кролиководческая, 15<br>
                                        (точный адрес уточняется при записи)
                                    </div>
                                </div>
                            </div>
                            <div style="font-size: var(--font-size-sm); color: var(--color-text-muted); background-color: var(--color-bg-body); padding: var(--space-3); border-radius: var(--radius-lg);">
                                🚗 Удобная парковка<br>
                                🏠 Собственная территория<br>
                                👁️ Открытый показ животных
                            </div>
                        </div>

                        <!-- Schedule -->
                        <div style="background-color: var(--color-bg-card); border-radius: var(--radius-2xl); padding: var(--space-8);">
                            <h2 style="margin-bottom: var(--space-6);">Режим работы</h2>
                            <div style="display: flex; align-items: flex-start; gap: var(--space-4);">
                                <div style="width: var(--space-10); height: var(--space-10); background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-lg); flex-shrink: 0;">🕐</div>
                                <div style="flex-grow: 1;">
                                    <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-3);">Время приема посетителей</div>
                                    <div style="display: grid; gap: var(--space-2);">
                                        <div style="display: flex; justify-content: space-between;">
                                            <span>Понедельник - Пятница</span>
                                            <strong style="color: var(--color-text-primary);">9:00 - 18:00</strong>
                                        </div>
                                        <div style="display: flex; justify-content: space-between;">
                                            <span>Суббота - Воскресенье</span>
                                            <strong style="color: var(--color-text-primary);">10:00 - 16:00</strong>
                                        </div>
                                    </div>
                                    <div style="margin-top: var(--space-4); font-size: var(--font-size-sm); color: var(--color-text-muted); background-color: var(--color-bg-body); padding: var(--space-3); border-radius: var(--radius-lg);">
                                        ⚠️ Обязательна предварительная запись<br>
                                        📞 Звоните заранее для согласования времени
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    contactContent.innerHTML = contactHTML;

    // Form handling
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Task 31: Basic validation and anti-spam check
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot.value !== '') {
            console.log('Spam detected');
            return;
        }

        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        
        if (!name || !phone) {
            alert('Пожалуйста, заполните обязательные поля');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '⏳ Отправляем...';
        submitBtn.disabled = true;

        // Task 32: Track form submission
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent('lead_submit', {
                form: 'contact',
                interest: formData.get('interest') || 'not_specified'
            });
        }

        // Simulate form submission
        setTimeout(() => {
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            form.reset();
            
            submitBtn.innerHTML = '📤 Отправить сообщение';
            submitBtn.disabled = false;
            
            // Task 38: Redirect to thank you page (if it exists)
            // window.location.href = '/thank-you';
        }, 1500);
    });
});