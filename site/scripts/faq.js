// Task 13: FAQ with accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqData = [
        {
            question: "Какую породу кролика лучше выбрать для начинающего?",
            answer: `
                <p>Для начинающих кролиководов рекомендуем следующие породы:</p>
                <p><strong>Калифорнийская порода</strong> — неприхотливые, быстро растут, хорошо адаптируются к различным условиям содержания.</p>
                <p><strong>Белый великан</strong> — спокойные, крупные, подходят для мясного направления.</p>
                <p><strong>Советская шиншилла</strong> — универсальная порода, дает хорошее мясо и ценный мех.</p>
                <p>Все наши кролики проходят ветеринарный осмотр и поставляются с полным пакетом документов.</p>
            `,
            keywords: "порода породы выбор какую начинающий"
        },
        {
            question: "Сколько стоят кролики и от чего зависит цена?",
            answer: `
                <p>Стоимость кроликов варьируется от 7000 до 9500 рублей и зависит от:</p>
                <p>• <strong>Породы</strong> — редкие породы стоят дороже</p>
                <p>• <strong>Возраста и веса</strong> — взрослые особи дороже молодняка</p>
                <p>• <strong>Племенных качеств</strong> — кролики для разведения стоят больше</p>
                <p>• <strong>Пола</strong> — самки обычно дороже самцов</p>
                <p>Точные цены смотрите в нашем каталоге. Предоставляем скидки при покупке нескольких особей.</p>
            `,
            keywords: "цена стоимость сколько дорого дешево рубли"
        },
        {
            question: "Как происходит доставка кроликов?",
            answer: `
                <p>Мы осуществляем безопасную доставку кроликов по всей России:</p>
                <p><strong>Самовывоз</strong> — бесплатно из нашего питомника в Подольске</p>
                <p><strong>Доставка по Москве и МО</strong> — от 1500 рублей, специальным транспортом</p>
                <p><strong>Доставка в другие регионы</strong> — авиаперевозкой или автотранспортом</p>
                <p>Все перевозки осуществляются в специальных контейнерах с соблюдением ветеринарных требований. Кролики доставляются с полным пакетом документов.</p>
            `,
            keywords: "доставка отправка транспорт везете перевозка"
        },
        {
            question: "Какие документы выдаются при покупке?",
            answer: `
                <p>К каждому кролику прилагается полный пакет документов:</p>
                <p>• <strong>Ветеринарная справка</strong> — подтверждает здоровье животного</p>
                <p>• <strong>Справка о прививках</strong> — информация о проведенной вакцинации</p>
                <p>• <strong>Родословная</strong> — для племенных особей</p>
                <p>• <strong>Договор купли-продажи</strong> — официальное оформление сделки</p>
                <p>• <strong>Инструкция по содержанию</strong> — рекомендации по уходу</p>
                <p>Все документы оформляются в день покупки или доставки.</p>
            `,
            keywords: "документы ветпаспорт прививки справки родословная"
        },
        {
            question: "Как правильно содержать и кормить кроликов?",
            answer: `
                <p>Основы правильного содержания кроликов:</p>
                <p><strong>Размещение:</strong> клетка размером минимум 80×50×40 см для взрослого кролика</p>
                <p><strong>Кормление:</strong> сено, комбикорм, овощи, зелень. Избегать картофель, лук, капусту в больших количествах</p>
                <p><strong>Вода:</strong> постоянный доступ к свежей воде</p>
                <p><strong>Температура:</strong> оптимально 16-20°C, избегать сквозняков</p>
                <p>Подробную инструкцию по уходу получите при покупке. Консультируем покупателей бесплатно.</p>
            `,
            keywords: "содержание уход кормление клетка питание еда"
        },
        {
            question: "Какие гарантии предоставляете?",
            answer: `
                <p>Мы предоставляем следующие гарантии:</p>
                <p><strong>Здоровье животных</strong> — 14-дневная гарантия от даты покупки</p>
                <p><strong>Породность</strong> — соответствие заявленной породе и характеристикам</p>
                <p><strong>Возврат средств</strong> — при обнаружении скрытых дефектов в течение 7 дней</p>
                <p><strong>Бесплатные консультации</strong> — поддержка по вопросам содержания</p>
                <p>При возникновении проблем обращайтесь к нам немедленно. Решаем все вопросы в индивидуальном порядке.</p>
            `,
            keywords: "гарантия возврат обмен проблемы гарантии"
        },
        {
            question: "Подходят ли ваши кролики для разведения?",
            answer: `
                <p>Большинство наших кроликов подходят для племенного разведения:</p>
                <p><strong>Племенной класс</strong> — кролики от титулованных родителей с родословной</p>
                <p><strong>Здоровье</strong> — все животные проходят ветеринарное обследование</p>
                <p><strong>Возраст</strong> — оптимальный возраст для начала разведения 5-8 месяцев</p>
                <p><strong>Консультации</strong> — помогаем с подбором пар и планированием разведения</p>
                <p>Для серьезного разведения рекомендуем приобретать несколько особей разных линий.</p>
            `,
            keywords: "разведение спаривание потомство размножение племенные"
        },
        {
            question: "Как забронировать или купить кролика?",
            answer: `
                <p>Процесс покупки максимально простой:</p>
                <p><strong>1. Выбор</strong> — выберите кролика в каталоге или обратитесь за консультацией</p>
                <p><strong>2. Бронирование</strong> — внесите предоплату 30% для резервирования</p>
                <p><strong>3. Оформление</strong> — заключаем договор, оформляем документы</p>
                <p><strong>4. Получение</strong> — самовывоз или доставка в удобное время</p>
                <p>Связаться с нами можно по телефону +7 (999) 123-45-67 или через форму обратной связи.</p>
            `,
            keywords: "бронирование резерв заказ как купить покупка"
        },
        {
            question: "Чем кормить кроликов зимой и летом?",
            answer: `
                <p>Рацион кроликов отличается по сезонам:</p>
                <p><strong>Летом:</strong> свежая трава, ботва овощей, веточный корм, комбикорм в меньших количествах</p>
                <p><strong>Зимой:</strong> качественное сено, комбикорм, корнеплоды, сушеные травы</p>
                <p><strong>Круглый год:</strong> чистая вода, минеральные добавки, ветки плодовых деревьев</p>
                <p><strong>Запрещено:</strong> мокрая трава, испорченные корма, шоколад, сладости</p>
                <p>Подробные рекомендации по кормлению предоставляем каждому покупателю.</p>
            `,
            keywords: "кормление питание рацион что едят корм еда зима лето"
        },
        {
            question: "Как понять, что кролик болен, и что делать?",
            answer: `
                <p>Признаки болезни у кроликов:</p>
                <p><strong>Тревожные симптомы:</strong> отказ от еды, вялость, выделения из глаз/носа, диарея, затрудненное дыхание</p>
                <p><strong>Немедленно к ветеринару:</strong> при обнаружении любых симптомов</p>
                <p><strong>Профилактика:</strong> регулярные прививки, чистота в клетке, качественное кормление</p>
                <p><strong>Наша поддержка:</strong> консультируем по здоровью животных, рекомендуем проверенных ветеринаров</p>
                <p>Помните: раннее обращение к ветеринару — залог успешного лечения.</p>
            `,
            keywords: "болезни ветеринар лечение здоровье симптомы больной"
        }
    ];

    const faqList = document.getElementById('faq-list');
    const searchInput = document.getElementById('faq-search');

    // Create FAQ HTML
    function createFaqHTML() {
        const faqHTML = faqData.map((faq, index) => `
            <div class="faq-item" data-keywords="${faq.keywords}" style="background-color: var(--color-bg-card); border-radius: var(--radius-xl); margin-bottom: var(--space-4); overflow: hidden;">
                <button class="faq-question" aria-expanded="false" style="width: 100%; padding: var(--space-6); background: none; border: none; text-align: left; cursor: pointer; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); display: flex; justify-content: space-between; align-items: center; transition: all var(--transition-fast);">
                    ${faq.question}
                    <span class="faq-icon" style="font-size: var(--font-size-xl); transition: transform var(--transition-fast);">▼</span>
                </button>
                <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal) ease-out;">
                    <div class="faq-answer-content" style="padding: 0 var(--space-6) var(--space-6); color: var(--color-text-secondary); line-height: var(--line-height-relaxed);">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `).join('');

        // Add expert consultation CTA
        const expertCTA = `
            <div style="background-color: var(--color-bg-card); border-radius: var(--radius-2xl); padding: var(--space-8); text-align: center; margin-top: var(--space-12);">
                <h2 style="margin-bottom: var(--space-4);">Не нашли ответ на свой вопрос?</h2>
                <p style="margin-bottom: var(--space-6); color: var(--color-text-secondary);">Получите профессиональную консультацию от наших экспертов по кролиководству</p>
                <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
                    <a href="tel:+79991234567" class="btn btn-primary btn-large">📞 Позвонить эксперту</a>
                    <a href="/contacts" class="btn btn-secondary btn-large">💬 Задать вопрос</a>
                </div>
            </div>
        `;

        return faqHTML + expertCTA;
    }

    // Render FAQ
    faqList.innerHTML = createFaqHTML();

    // Get FAQ items after rendering
    const faqItems = document.querySelectorAll('.faq-item');

    // Add click handlers for accordion
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                const otherQuestion = otherItem.querySelector('.faq-question');
                
                otherAnswer.style.maxHeight = '0';
                otherIcon.style.transform = 'rotate(0deg)';
                otherQuestion.setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Add hover effect
        question.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                question.style.backgroundColor = 'var(--color-bg-hover)';
            }
        });

        question.addEventListener('mouseleave', () => {
            question.style.backgroundColor = 'transparent';
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const keywords = item.getAttribute('data-keywords') || '';
            const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
            
            const isMatch = question.includes(searchTerm) || 
                           keywords.includes(searchTerm) || 
                           answer.includes(searchTerm);
            
            item.style.display = isMatch || searchTerm === '' ? 'block' : 'none';
        });
    });

    // Open first FAQ item by default
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        const firstAnswer = firstItem.querySelector('.faq-answer');
        const firstIcon = firstItem.querySelector('.faq-icon');
        const firstQuestion = firstItem.querySelector('.faq-question');
        
        firstItem.classList.add('active');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        firstIcon.style.transform = 'rotate(180deg)';
        firstQuestion.setAttribute('aria-expanded', 'true');
    }
});