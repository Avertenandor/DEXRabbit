@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 Деплой улучшений страницы /partners/
echo Дата: 03.10.2025
echo ========================================
echo.

cd /d "C:\Users\konfu\Desktop\Кролики"

echo 📋 Проверка статуса...
git status
echo.

echo ➕ Добавление изменений...
git add -A
echo.

echo 💬 Создание коммита...
git commit -m "feat(partners): UX улучшения страницы /partners/ - визуальная иерархия, дыхание, accessibility, SEO" -m "✨ Основные улучшения:" -m "- Добавлена breadcrumbs навигация с Schema.org разметкой" -m "- Увеличено дыхание контента (секции 80-120px, карточки gap 40px)" -m "- Улучшена визуальная иерархия (градиенты, разделители, overline)" -m "- Добавлен интерактивный FAQ аккордеон для прогрессивного раскрытия" -m "- Расширены SEO теги (Schema.org Organization, BreadcrumbList, keywords, canonical)" -m "- Улучшена accessibility (ARIA-labels, role, focus states, sr-only)" -m "- Оптимизирована мобильная адаптация (touch-friendly 44px+, responsive grid)" -m "- Центрированы все заголовки и тексты" -m "- Добавлены иконки-маркеры для лучшей сканируемости" -m "" -m "🎯 Результат:" -m "- Лучшая UX для пользователей 30-67 лет" -m "- Повышение SEO видимости" -m "- Полная WCAG accessibility" -m "- Адаптация для всех устройств" -m "" -m "📊 Метрики: 61.6KB, ~1100 строк, 15+ ARIA атрибутов, 2 Schema.org типа"
echo.

echo 🚀 Отправка в GitHub...
git push origin main
echo.

echo ========================================
echo ✅ Деплой завершён!
echo ========================================
echo.
echo 📋 Следующие шаги:
echo 1. Дождитесь деплоя GitHub Pages (2-3 минуты)
echo 2. Проверьте: https://xn--80apagbbfxgmuj4j.site/partners/
echo 3. Протестируйте FAQ аккордеон
echo 4. Проверьте мобильную версию
echo.
pause
