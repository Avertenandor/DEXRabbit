// Task 23: Online consultant widget
class OnlineConsultant {
    constructor() {
        this.isOpen = false;
        this.messages = [
            {
                type: 'bot',
                text: '👋 Здравствуйте! Я помогу выбрать подходящего кролика. Что вас интересует?',
                time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
            }
        ];
        
        this.quickReplies = [
            { text: '🐰 Выбор породы', action: 'breed_selection' },
            { text: '💰 Цены и стоимость', action: 'pricing' },
            { text: '🚚 Доставка', action: 'delivery' },
            { text: '📋 Документы', action: 'documents' },
            { text: '🍎 Содержание и уход', action: 'care' },
            { text: '👨‍💼 Связаться с экспертом', action: 'expert' }
        ];
        
        this.responses = {
            breed_selection: [
                'Для выбора породы важно понимать ваши цели:',
                '🎯 **Для детей и дома** - Белый великан (спокойный, ласковый)',
                '🏆 **Для разведения** - Калифорнийский (продуктивный, неприхотливый)', 
                '💎 **Для выставок** - Советская шиншилла (красивый мех, стандарт)',
                '',
                'Какая цель у вас?'
            ],
            pricing: [
                '💰 **Актуальные цены:**',
                '• Белый великан: 7500-8500 ₽',
                '• Калифорнийский: 6500-7500 ₽',  
                '• Советская шиншилла: 8000-9500 ₽',
                '',
                '🎁 Скидки при покупке от 3х животных - 10%',
                '📋 В стоимость входят все документы и консультации'
            ],
            delivery: [
                '🚚 **Варианты доставки:**',
                '🏠 Самовывоз из Подольска - **БЕСПЛАТНО**',
                '🚗 По Москве и МО - от 1500 ₽',
                '✈️ В регионы - по согласованию',
                '',
                '📦 Доставка в специальных переносках с документами',
                '⏰ Обычно доставляем в день заказа'
            ],
            documents: [
                '📋 **Документы в комплекте:**',
                '✅ Ветеринарная справка',
                '✅ Информация о прививках', 
                '✅ Родословная (для племенных)',
                '✅ Рекомендации по содержанию',
                '',
                '🛡️ Гарантия здоровья - 14 дней'
            ],
            care: [
                '🐰 **Основы ухода:**',
                '🏠 Клетка мин. 120×60×50 см',
                '🥕 Сено + гранулы + овощи',
                '💧 Свежая вода ежедневно',
                '🧹 Уборка 2-3 раза в неделю',
                '',
                '📚 Подробнее в нашем [блоге](/blog)'
            ],
            expert: [
                '👨‍💼 **Связаться с экспертом:**',
                '📱 Телефон: +7 (999) 123-45-67',
                '💬 WhatsApp: [Написать сообщение](https://wa.me/79991234567)',
                '📧 Email: info@купитькролика.рф',
                '',
                '⏰ Работаем: Пн-Пт 9:00-18:00, Сб-Вс 10:00-16:00'
            ]
        };
        
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
    }

    createWidget() {
        // Create widget HTML
        const widgetHTML = `
            <div id="consultant-widget" class="consultant-widget">
                <!-- Chat button -->
                <button id="consultant-toggle" class="consultant-toggle" aria-label="Открыть чат">
                    <span class="consultant-icon">💬</span>
                    <span class="consultant-badge">Консультант онлайн</span>
                </button>
                
                <!-- Chat window -->
                <div id="consultant-chat" class="consultant-chat">
                    <div class="consultant-header">
                        <div class="consultant-title">
                            <span class="consultant-avatar">🐰</span>
                            <div>
                                <div class="consultant-name">Консультант КупитьКролика</div>
                                <div class="consultant-status">Онлайн • Отвечаем быстро</div>
                            </div>
                        </div>
                        <button id="consultant-close" class="consultant-close" aria-label="Закрыть чат">✕</button>
                    </div>
                    
                    <div class="consultant-messages" id="consultant-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="consultant-quick-replies" id="consultant-quick-replies">
                        <!-- Quick replies will be added here -->
                    </div>
                    
                    <div class="consultant-input">
                        <input type="text" id="consultant-input-field" placeholder="Напишите вопрос..." maxlength="500">
                        <button id="consultant-send" class="consultant-send-btn" aria-label="Отправить">
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        
        // Add CSS
        this.addStyles();
        
        // Render initial messages
        this.renderMessages();
        this.renderQuickReplies();
    }

    addStyles() {
        const styles = `
            <style>
            .consultant-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                font-family: var(--font-family-base);
            }
            
            .consultant-toggle {
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                border: none;
                border-radius: 25px;
                padding: 12px 20px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
                transition: all 0.3s ease;
            }
            
            .consultant-toggle:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
            }
            
            .consultant-toggle.active {
                display: none;
            }
            
            .consultant-badge {
                position: relative;
            }
            
            .consultant-badge::before {
                content: '';
                position: absolute;
                left: -12px;
                top: 50%;
                transform: translateY(-50%);
                width: 8px;
                height: 8px;
                background: #00ff88;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
                100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
            }
            
            .consultant-chat {
                display: none;
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 380px;
                max-width: calc(100vw - 40px);
                height: 600px;
                max-height: calc(100vh - 40px);
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            
            .consultant-chat.active {
                display: flex;
            }
            
            .consultant-header {
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                color: white;
                padding: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .consultant-title {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .consultant-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }
            
            .consultant-name {
                font-weight: 600;
                font-size: 16px;
            }
            
            .consultant-status {
                font-size: 12px;
                opacity: 0.9;
            }
            
            .consultant-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .consultant-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .consultant-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .consultant-message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 16px;
                line-height: 1.4;
            }
            
            .consultant-message.bot {
                background: #f3f4f6;
                color: #374151;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            
            .consultant-message.user {
                background: var(--color-primary);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            
            .consultant-message-time {
                font-size: 10px;
                opacity: 0.6;
                margin-top: 4px;
            }
            
            .consultant-quick-replies {
                padding: 12px 16px;
                border-top: 1px solid #e5e7eb;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .consultant-quick-reply {
                background: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 20px;
                padding: 8px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .consultant-quick-reply:hover {
                background: var(--color-primary);
                color: white;
                border-color: var(--color-primary);
            }
            
            .consultant-input {
                padding: 16px;
                border-top: 1px solid #e5e7eb;
                display: flex;
                gap: 8px;
            }
            
            #consultant-input-field {
                flex: 1;
                padding: 12px;
                border: 1px solid #d1d5db;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
            }
            
            #consultant-input-field:focus {
                border-color: var(--color-primary);
            }
            
            .consultant-send-btn {
                width: 40px;
                height: 40px;
                background: var(--color-primary);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }
            
            .consultant-send-btn:hover {
                background: var(--color-secondary);
            }
            
            .consultant-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            @media (max-width: 480px) {
                .consultant-chat {
                    width: calc(100vw - 20px);
                    height: calc(100vh - 20px);
                    bottom: 10px;
                    right: 10px;
                }
                
                .consultant-toggle {
                    bottom: 10px;
                    right: 10px;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    attachEventListeners() {
        const toggle = document.getElementById('consultant-toggle');
        const close = document.getElementById('consultant-close');
        const sendBtn = document.getElementById('consultant-send');
        const input = document.getElementById('consultant-input-field');

        toggle?.addEventListener('click', () => this.openChat());
        close?.addEventListener('click', () => this.closeChat());
        sendBtn?.addEventListener('click', () => this.sendMessage());
        
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Track consultant usage
        toggle?.addEventListener('click', () => {
            if (typeof trackEvent === 'function') {
                trackEvent('consultant_open', { event_category: 'engagement' });
            }
        });
    }

    openChat() {
        const toggle = document.getElementById('consultant-toggle');
        const chat = document.getElementById('consultant-chat');
        
        toggle?.classList.add('active');
        chat?.classList.add('active');
        this.isOpen = true;
        
        // Focus input
        setTimeout(() => {
            document.getElementById('consultant-input-field')?.focus();
        }, 100);
    }

    closeChat() {
        const toggle = document.getElementById('consultant-toggle');
        const chat = document.getElementById('consultant-chat');
        
        toggle?.classList.remove('active');
        chat?.classList.remove('active');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('consultant-input-field');
        const text = input?.value.trim();
        
        if (!text) return;
        
        // Add user message
        this.addMessage('user', text);
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            this.handleBotResponse(text);
        }, 1000);
        
        // Track message
        if (typeof trackEvent === 'function') {
            trackEvent('consultant_message', { 
                event_category: 'engagement',
                message_length: text.length 
            });
        }
    }

    handleQuickReply(action) {
        const response = this.responses[action];
        if (response) {
            setTimeout(() => {
                this.addMessage('bot', response.join('\n'));
            }, 500);
        }
        
        // Track quick reply usage
        if (typeof trackEvent === 'function') {
            trackEvent('consultant_quick_reply', { 
                event_category: 'engagement',
                action: action 
            });
        }
    }

    handleBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = [];

        // Simple keyword matching
        if (lowerMessage.includes('порода') || lowerMessage.includes('выбор')) {
            response = this.responses.breed_selection;
        } else if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость')) {
            response = this.responses.pricing;
        } else if (lowerMessage.includes('доставка') || lowerMessage.includes('доставить')) {
            response = this.responses.delivery;
        } else if (lowerMessage.includes('документ') || lowerMessage.includes('справка')) {
            response = this.responses.documents;
        } else if (lowerMessage.includes('уход') || lowerMessage.includes('содержание')) {
            response = this.responses.care;
        } else {
            // Default response
            response = [
                'Спасибо за вопрос! 🤔',
                '',
                'Для получения детальной консультации рекомендую связаться с нашим экспертом:',
                '📱 **+7 (999) 123-45-67**',
                '💬 **WhatsApp**: [Написать](https://wa.me/79991234567)',
                '',
                'Или выберите тему из предложенных ниже 👇'
            ];
        }

        this.addMessage('bot', response.join('\n'));
    }

    addMessage(type, text) {
        const time = new Date().toLocaleTimeString('ru', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        this.messages.push({ type, text, time });
        this.renderMessages();
        
        // Scroll to bottom
        const messagesContainer = document.getElementById('consultant-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    renderMessages() {
        const container = document.getElementById('consultant-messages');
        if (!container) return;

        container.innerHTML = this.messages.map(message => `
            <div class="consultant-message ${message.type}">
                <div>${this.formatMessage(message.text)}</div>
                <div class="consultant-message-time">${message.time}</div>
            </div>
        `).join('');
    }

    renderQuickReplies() {
        const container = document.getElementById('consultant-quick-replies');
        if (!container) return;

        container.innerHTML = this.quickReplies.map(reply => `
            <button class="consultant-quick-reply" onclick="consultant.handleQuickReply('${reply.action}')">
                ${reply.text}
            </button>
        `).join('');
    }

    formatMessage(text) {
        // Simple markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/\n/g, '<br>');
    }
}

// Initialize consultant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!window.consultant) {
        window.consultant = new OnlineConsultant();
    }
});