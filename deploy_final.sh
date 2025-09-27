#!/bin/bash

echo "🚀 ЗАПУСКАЮ ФИНАЛЬНЫЙ ДЕПЛОЙ DEXRABBIT..."
echo "=============================================="

# Проверяем статус git
echo "📊 Проверяю статус git..."
git status

# Добавляем все файлы
echo "📝 Добавляю файлы в git..."
git add .

# Проверяем, есть ли изменения
if git diff --cached --quiet; then
    echo "ℹ️ Нет изменений для коммита"
    exit 0
fi

# Создаем коммит
echo "💾 Создаю коммит..."
git commit -m "feat: final deployment - all requirements implemented"

# Пушим в main ветку
echo "📤 Пушу изменения в GitHub..."
git push origin main

echo "✅ ДЕПЛОЙ ЗАВЕРШЕН!"
echo "🎯 GitHub Actions workflow запустится автоматически"
echo "🔍 Мониторьте статус: https://github.com/Avertenandor/DEXRabbit/actions"
echo "🌐 Сайт будет доступен по адресу: https://xn--80apagbbfxgmuj4j.site/"

