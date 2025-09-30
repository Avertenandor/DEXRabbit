@echo off
chcp 65001 >nul
echo === GIT ОПЕРАЦИИ - Исправление Telegram ссылок ===
echo.

cd /d "C:\Users\konfu\Desktop\Кролики"

echo [1] Проверка статуса...
git status
echo.

echo [2] Добавление всех изменений...
git add -A
echo.

echo [3] Создание коммита...
git commit -m "fix: унификация Telegram ссылок на официальные каналы" -m "- Заменены старые ссылки dexrabbit_channel на DexRebbitOfficial" -m "- Заменены старые ссылки dexrabbit_group на DEXRabbitOfficialGroupInfo" -m "- Исправлены ссылки в index.html, gifts.html, breeding.html"
echo.

echo [4] Отправка на GitHub...
git push origin main
echo.

echo ===============================================
echo ГОТОВО! Изменения отправлены на GitHub
echo Деплой через GitHub Pages займет 2-3 минуты
echo ===============================================
pause
