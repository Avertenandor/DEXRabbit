// Final remaining tasks implementation (Tasks 22, 36, 41-42)
class FinalTasks {
    constructor() {
        this.init();
    }

    init() {
        this.addNewsletterSubscription(); // Task 22
        this.addWishlistFeature(); // Task 36  
        this.addLiveChatIntegration(); // Task 41
        this.addCustomerReviewsSystem(); // Task 42
    }

    // Task 22: Newsletter subscription
    addNewsletterSubscription() {
        const newsletterSection = document.createElement('section');
        newsletterSection.style.cssText = `
            background: linear-gradient(135deg, #10b981, #059669);
            padding: 60px 0;
            margin: 40px 0;
        `;

        newsletterSection.innerHTML = `
            <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <div style="margin-bottom: 32px;">
                    <h2 style="color: white; font-size: 2.5rem; margin-bottom: 16px; font-weight: 700;">
                        📬 Будьте в курсе новинок!
                    </h2>
                    <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 32px;">
                        Подпишитесь на нашу рассылку и первыми узнавайте о новых породах, специальных предложениях и полезных советах по уходу
                    </p>
                </div>
                
                <form id="newsletter-form" style="display: flex; gap: 12px; max-width: 500px; margin: 0 auto; flex-wrap: wrap;">
                    <input 
                        type="email" 
                        id="newsletter-email" 
                        placeholder="Введите ваш email" 
                        required
                        style="
                            flex: 1;
                            min-width: 250px;
                            padding: 16px 20px;
                            border: none;
                            border-radius: 12px;
                            font-size: 16px;
                            outline: none;
                        "
                    >
                    <button 
                        type="submit"
                        style="
                            background: white;
                            color: #10b981;
                            border: none;
                            padding: 16px 32px;
                            border-radius: 12px;
                            font-weight: 600;
                            font-size: 16px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            white-space: nowrap;
                        "
                        onmouseover="this.style.transform='scale(1.05)'"
                        onmouseout="this.style.transform='scale(1)'"
                    >
                        Подписаться
                    </button>
                </form>
                
                <div style="margin-top: 24px;">
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px;">
                        🔒 Ваши данные в безопасности. Никакого спама, только полезная информация!
                    </p>
                    <div style="margin-top: 16px; display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                        <span style="color: rgba(255,255,255,0.8); font-size: 14px; display: flex; align-items: center; gap: 6px;">
                            ✅ Еженедельные советы
                        </span>
                        <span style="color: rgba(255,255,255,0.8); font-size: 14px; display: flex; align-items: center; gap: 6px;">
                            ✅ Специальные скидки
                        </span>
                        <span style="color: rgba(255,255,255,0.8); font-size: 14px; display: flex; align-items: center; gap: 6px;">
                            ✅ Новые поступления
                        </span>
                    </div>
                </div>
            </div>
        `;

        // Insert before footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.parentNode.insertBefore(newsletterSection, footer);
        }

        // Handle form submission
        const form = document.getElementById('newsletter-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubscription();
        });
    }

    handleNewsletterSubscription() {
        const email = document.getElementById('newsletter-email')?.value;
        const button = document.querySelector('#newsletter-form button');
        
        if (!email) return;

        // Show loading state
        if (button) {
            button.textContent = 'Подписываем...';
            button.disabled = true;
        }

        // Simulate subscription (in real app would send to backend)
        setTimeout(() => {
            // Show success message
            this.showNotification('🎉 Спасибо за подписку! Проверьте email для подтверждения.', 'success');
            
            // Reset form
            document.getElementById('newsletter-email').value = '';
            if (button) {
                button.textContent = 'Подписаться';
                button.disabled = false;
            }

            // Track subscription
            if (window.analytics && typeof window.analytics.trackEvent === 'function') {
                window.analytics.trackEvent('newsletter_subscribe', {
                    event_category: 'engagement',
                    email_domain: email.split('@')[1]
                });
            }
        }, 1500);
    }

    // Task 36: Wishlist feature
    addWishlistFeature() {
        this.wishlist = JSON.parse(localStorage.getItem('rabbit_wishlist') || '[]');
        
        // Add wishlist button to header
        const headerCta = document.querySelector('.header-cta');
        if (headerCta) {
            const wishlistBtn = document.createElement('button');
            wishlistBtn.className = 'wishlist-header-btn';
            wishlistBtn.innerHTML = `💝 Список желаний <span class="wishlist-counter">${this.wishlist.length}</span>`;
            wishlistBtn.style.cssText = `
                background: none;
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 14px;
                cursor: pointer;
                margin-right: 12px;
                transition: all 0.3s ease;
            `;
            
            wishlistBtn.addEventListener('click', () => this.openWishlistModal());
            headerCta.insertBefore(wishlistBtn, headerCta.firstChild);
        }

        // Add wishlist buttons to products
        this.addWishlistButtons();
    }

    addWishlistButtons() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const title = card.querySelector('.product-title')?.textContent;
            if (!title) return;

            const wishlistBtn = document.createElement('button');
            wishlistBtn.className = 'wishlist-btn';
            wishlistBtn.innerHTML = this.wishlist.includes(title) ? '💝' : '🤍';
            wishlistBtn.title = 'Добавить в список желаний';
            wishlistBtn.style.cssText = `
                position: absolute;
                top: 8px;
                left: 8px;
                background: rgba(255,255,255,0.9);
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                cursor: pointer;
                font-size: 18px;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            `;
            
            wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleWishlist(title, wishlistBtn);
            });

            card.style.position = 'relative';
            card.appendChild(wishlistBtn);
        });
    }

    toggleWishlist(productId, button) {
        if (this.wishlist.includes(productId)) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            button.innerHTML = '🤍';
        } else {
            this.wishlist.push(productId);
            button.innerHTML = '💝';
        }
        
        localStorage.setItem('rabbit_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCounter();
        
        this.showNotification(`${productId} ${this.wishlist.includes(productId) ? 'добавлен в' : 'удален из'} список желаний`);
        
        // Track wishlist actions
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent('wishlist_toggle', {
                event_category: 'engagement',
                product: productId,
                action: this.wishlist.includes(productId) ? 'add' : 'remove'
            });
        }
    }

    updateWishlistCounter() {
        const counter = document.querySelector('.wishlist-counter');
        if (counter) {
            counter.textContent = this.wishlist.length;
        }
    }

    openWishlistModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 600px; width: 90vw; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>💝 Ваш список желаний</h2>
                    <button onclick="this.closest('div').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
                </div>
                
                ${this.wishlist.length > 0 ? `
                    <div style="display: grid; gap: 16px;">
                        ${this.wishlist.map(item => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px;">
                                <div>
                                    <div style="font-weight: 600; margin-bottom: 4px;">${item}</div>
                                    <div style="font-size: 14px; color: #6b7280;">В наличии • Доступен для заказа</div>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button onclick="window.location.href='/contacts'" class="btn btn-primary btn-small">Заказать</button>
                                    <button onclick="finalTasks.removeFromWishlist('${item}'); this.closest('div').closest('div').remove();" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Удалить</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div style="text-align: center; padding: 40px 20px; color: #6b7280;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🤍</div>
                        <div style="font-size: 18px; margin-bottom: 8px;">Список желаний пуст</div>
                        <div style="font-size: 14px;">Добавьте понравившихся кроликов, нажав на сердечко</div>
                    </div>
                `}
                
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="window.location.href='/catalog'" class="btn btn-primary">Посмотреть каталог</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(id => id !== productId);
        localStorage.setItem('rabbit_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCounter();
        
        // Update product buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const card = btn.closest('.product-card');
            const title = card?.querySelector('.product-title')?.textContent;
            if (title === productId) {
                btn.innerHTML = '🤍';
            }
        });
    }

    // Task 41: Live chat integration
    addLiveChatIntegration() {
        // Enhanced live chat status indicator
        const chatStatus = document.createElement('div');
        chatStatus.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 12px 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        const isOnline = this.isBusinessHours();
        chatStatus.innerHTML = `
            <div style="width: 8px; height: 8px; background: ${isOnline ? '#10b981' : '#f59e0b'}; border-radius: 50%; animation: pulse 2s infinite;"></div>
            <span style="font-weight: 500;">
                ${isOnline ? '🟢 Эксперт онлайн' : '🟡 Скоро будем'}
            </span>
        `;

        chatStatus.addEventListener('click', () => {
            if (window.consultant) {
                window.consultant.openChat();
            }
        });

        document.body.appendChild(chatStatus);

        // Update status every minute
        setInterval(() => {
            const newStatus = this.isBusinessHours();
            const indicator = chatStatus.querySelector('div');
            const text = chatStatus.querySelector('span');
            
            if (indicator && text) {
                indicator.style.background = newStatus ? '#10b981' : '#f59e0b';
                text.textContent = newStatus ? '🟢 Эксперт онлайн' : '🟡 Скоро будем';
            }
        }, 60000);
    }

    isBusinessHours() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = Sunday
        
        // Mon-Fri 9-18, Sat-Sun 10-16
        if (day >= 1 && day <= 5) {
            return hour >= 9 && hour < 18;
        } else {
            return hour >= 10 && hour < 16;
        }
    }

    // Task 42: Customer reviews system
    addCustomerReviewsSystem() {
        this.setupReviewsModal();
        this.addReviewButtons();
    }

    setupReviewsModal() {
        // Add "Оставить отзыв" button to reviews section
        const reviewsSection = document.querySelector('.reviews');
        if (reviewsSection) {
            const addReviewBtn = document.createElement('div');
            addReviewBtn.style.cssText = `
                text-align: center;
                margin-top: 32px;
            `;
            
            addReviewBtn.innerHTML = `
                <button onclick="finalTasks.openReviewModal()" class="btn btn-primary btn-large">
                    ⭐ Оставить отзыв
                </button>
            `;
            
            reviewsSection.appendChild(addReviewBtn);
        }
    }

    addReviewButtons() {
        // Add review buttons to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const title = card.querySelector('.product-title')?.textContent;
            const reviewBtn = document.createElement('button');
            reviewBtn.textContent = '📝 Отзыв';
            reviewBtn.className = 'btn btn-outline btn-small';
            reviewBtn.style.marginLeft = '8px';
            
            reviewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openReviewModal(title);
            });

            const actions = card.querySelector('.product-actions');
            if (actions) {
                actions.appendChild(reviewBtn);
            }
        });
    }

    openReviewModal(productName = '') {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 500px; width: 90vw;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>⭐ Оставить отзыв</h2>
                    <button onclick="this.closest('div').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
                </div>
                
                <form id="review-form">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Ваше имя:</label>
                        <input type="text" name="name" required style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                    </div>
                    
                    ${productName ? `
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Кролик:</label>
                            <input type="text" name="product" value="${productName}" readonly style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; background: #f9fafb;">
                        </div>
                    ` : ''}
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Оценка:</label>
                        <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                            ${[1,2,3,4,5].map(i => `
                                <button type="button" class="star-rating" data-rating="${i}" style="background: none; border: none; font-size: 24px; color: #d1d5db; cursor: pointer;">⭐</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Ваш отзыв:</label>
                        <textarea name="review" required rows="4" placeholder="Расскажите о своем опыте..." style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button type="submit" class="btn btn-primary" style="flex: 1;">Отправить отзыв</button>
                        <button type="button" onclick="this.closest('div').closest('div').remove()" class="btn btn-outline">Отмена</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle star rating
        const stars = modal.querySelectorAll('.star-rating');
        let rating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                rating = index + 1;
                stars.forEach((s, i) => {
                    s.style.color = i < rating ? '#f59e0b' : '#d1d5db';
                });
            });
        });

        // Handle form submission
        const form = modal.querySelector('#review-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview(new FormData(form), rating);
            modal.remove();
        });
    }

    submitReview(formData, rating) {
        const reviewData = {
            name: formData.get('name'),
            product: formData.get('product') || 'Общий отзыв',
            rating: rating,
            review: formData.get('review'),
            date: new Date().toLocaleDateString('ru')
        };

        // Simulate submission (in real app would send to backend)
        this.showNotification('🙏 Спасибо за отзыв! Он будет опубликован после модерации.', 'success');

        // Track review submission
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
            window.analytics.trackEvent('review_submit', {
                event_category: 'engagement',
                rating: rating,
                product: reviewData.product,
                review_length: reviewData.review.length
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            z-index: 3000;
            font-size: 14px;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize final tasks
document.addEventListener('DOMContentLoaded', () => {
    if (!window.finalTasks) {
        window.finalTasks = new FinalTasks();
    }
});