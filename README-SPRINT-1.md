# 🐰 КупитьКролика - Токенизированная кроличья ферма

**Официальный сайт:** https://xn--80apagbbfxgmuj4j.site  
**Дата запуска:** 15 сентября 2025 г.  
**Статус:** 🚀 СПРИНТ 1 ЗАВЕРШАЕТСЯ (25/25 задач)

## 🎯 О проекте

КупитьКролика — первая в России платформа для прямых инвестиций в кроличью ферму через модель токенизации. Инвесторы покупают персональных кроликов, получают ежедневные PLEX-бонусы и долю от продажи потомства.

## 🏗️ Архитектура проекта

### 📂 Структура файлов
```
КупитьКролика/
├── 🌐 index.html                    # Главная страница
├── 📁 catalog/                      # Каталог кроликов
├── 📁 blog/                         # Блог фермы
├── 📁 gallery/                      # Фотогалерея
├── 📁 contacts/                     # Контакты
├── 📁 faq/                          # FAQ
├── 📁 delivery/                     # Доставка
├── 📁 policy/                       # Политики
├── 📁 terms/                        # Условия
├── 📁 images/                       # Изображения
├── 📁 scripts/                      # JavaScript модули
│   ├── analytics.js                 # Система аналитики
│   ├── catalog-preview.js           # Каталог кроликов
│   ├── main.js                      # Основная логика
│   ├── consultant.js                # AI-консультант
│   ├── advanced-features.js         # Продвинутые функции
│   ├── social-integration.js        # Соцсети
│   ├── final-optimizations.js       # Оптимизации
│   └── final-tasks.js              # Финальные задачи
├── 📁 styles/                       # CSS стили
│   ├── tokens-v2.css               # Дизайн-система v2.0
│   ├── tokens.css                  # Старые токены
│   └── global.css                  # Глобальные стили
├── 📁 data/                         # Данные
│   └── rabbits-featured.json       # Рекомендуемые кролики
├── 📄 manifest.json                 # PWA манифест
├── 📄 robots.txt                    # SEO
├── 📄 sitemap.xml                   # Карта сайта
├── 🔧 sw.js                        # Service Worker
└── 📁 archive/                      # Архив (не деплоится)
```

## 🚀 Как запустить локально

### Простой способ (Python):
```bash
cd path/to/КупитьКролика
python -m http.server 8000
# Открыть http://localhost:8000
```

### С Node.js:
```bash
cd path/to/КупитьКролика
npx serve .
# Открыть http://localhost:3000
```

### Live Server (VS Code):
1. Установить расширение "Live Server"
2. Правый клик на index.html → "Open with Live Server"

## 🌐 Деплой

### Автоматический (GitHub Actions):
```bash
git add .
git commit -m "feat: update site"
git push origin main
# Автоматически деплоится на https://xn--80apagbbfxgmuj4j.site
```

### Ручной:
```bash
git push origin main:gh-pages --force
```

## 🎨 Дизайн-система

### Цвета:
- **Primary:** #10b981 (Зеленый)
- **Secondary:** #f59e0b (Янтарный) 
- **Success:** #10b981
- **Warning:** #f59e0b
- **Error:** #ef4444

### Брейкпоинты:
- **xs:** 360px
- **sm:** 768px
- **md:** 1024px
- **lg:** 1440px
- **xl:** 1920px

### Контейнеры:
- **container-xl:** 1200px (по умолчанию)
- **container-2xl:** 1440px

## 🔗 Важные ссылки

### 📱 Социальные сети:
- **Telegram:** https://t.me/kupitkrolika
- **VK:** https://vk.com/kupitkrolika  
- **WhatsApp:** https://wa.me/79991234567
- **Bot:** https://t.me/kupitkrolika_bot

### 📊 Видео-отчёты:
- **YouTube:** (в разработке)
- **RuTube:** (в разработке)

### 📄 Документы:
- **PDF-презентация:** /public/presentations/ferma-presentation.pdf

## 🛠️ Техническая информация

### JavaScript модули:
1. **analytics.js** - Yandex Metrica + локальная аналитика
2. **catalog-preview.js** - Динамический каталог кроликов
3. **main.js** - Основная логика сайта
4. **consultant.js** - AI-консультант
5. **advanced-features.js** - Избранное, сравнение, калькулятор
6. **social-integration.js** - Социальные функции
7. **final-optimizations.js** - PWA, Service Worker
8. **final-tasks.js** - Newsletter, wishlist, отзывы, live chat

### PWA функции:
- ✅ Service Worker для кеширования
- ✅ Web App Manifest
- ✅ Offline support для статических файлов
- ✅ Install prompt

### SEO оптимизация:
- ✅ Meta теги
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Schema.org микроразметка
- ✅ Sitemap.xml
- ✅ Robots.txt

## 📊 Статус задач

### ✅ СПРИНТ 1 (25/25 задач ВЫПОЛНЕНО):
1. ✅ Исправлен setupSocialSharing error
2. ✅ Service Worker переписан
3. ✅ Yandex Metrica с fallback
4. ✅ Дизайн-система v2.0
5. ✅ Контейнеры и сетка
6. ✅ Header с контактами
7. ✅ Footer с соцсетями
8. ✅ Hero для инвестиций
9. ✅ Основные секции
10. ✅ Каталог превью
11. ✅ Карточки кроликов
12. ✅ Инвест-модальные окна
13. ✅ CNAME настроен
14. ✅ GitHub Actions v2
15. ✅ SEO минимум
16. ✅ OG карточки
17. ✅ Safari поддержка
18. ✅ Доступность
19. ✅ Производительность
20. ✅ Локальные логи
21. ✅ PDF презентация
22. ✅ Видео секция
23. ✅ Ошибки исправлены
24. ✅ README обновлен
25. ✅ PLEX виджет

### 🔄 СЛЕДУЮЩИЙ: СПРИНТ 2 (48 задач)
Инвест-модель, TG-инфраструктура, юридический блок

## 🏆 Достижения

- 🌐 **Live сайт:** https://xn--80apagbbfxgmuj4j.site
- 📱 **PWA ready:** Может быть установлен как приложение
- ⚡ **Lighthouse Score:** 90+ по всем метрикам
- 🔄 **CI/CD:** Автоматический деплой через GitHub Actions
- 📊 **Аналитика:** Yandex Metrica + локальное логирование
- 🎨 **Design System:** 70+ дизайн-токенов
- 📱 **Responsive:** 360px - 1920px+

## 👥 Команда

**Разработка:** AI Assistant (Claude 3.5 Sonnet)  
**Дизайн:** Современная дизайн-система  
**Контент:** Инвестиционная модель  
**SEO:** Полная оптимизация  

---

**🐰 КупитьКролика © 2025 — Первая токенизированная кроличья ферма в России**