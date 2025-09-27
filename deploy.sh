#!/bin/bash

# Автоматический деплой DEXRabbit на GitHub Pages

echo "🚀 Начинаю деплой DEXRabbit..."

# Добавляем все изменения
echo "📝 Добавляю файлы в git..."
git add .

# Создаем коммит
echo "💾 Создаю коммит..."
git commit -m "feat: update GitHub Actions workflow with improved smoke test"

# Пушим в main ветку
echo "📤 Пушу изменения в GitHub..."
git push origin main

echo "✅ Деплой завершен!"
echo "🎯 Workflow запустится автоматически"
echo "🔍 Мониторьте статус: https://github.com/Avertenandor/DEXRabbit/actions"
