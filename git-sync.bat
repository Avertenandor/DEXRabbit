@echo off
REM ====================================
REM DEXRabbit - Git Sync & Deploy Script
REM ====================================

echo ====================================
echo    DEXRabbit Git Sync
echo ====================================
echo.

cd /d "C:\Users\konfu\Desktop\Кролики"

echo [1/5] Добавление всех изменений...
git add -A

echo.
echo [2/5] Создание коммита...
git commit -m "fix: Service Worker cache update + cleanup workflows"

echo.
echo [3/5] Отправка на GitHub...
git push origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Ошибка при push! Пробуем синхронизироваться...
    git pull origin main --rebase
    git push origin main
)

echo.
echo [4/5] Изменения отправлены!
echo.
echo ====================================
echo ВАЖНО: GitHub Pages обновится через 2-5 минут
echo.
echo [5/5] Что делать дальше:
echo 1. Подождите 2-5 минут для обновления GitHub Pages
echo 2. Откройте браузер в режиме инкогнито
echo 3. Перейдите на https://xn--80apagbbfxgmuj4j.site/?nocache=1
echo 4. Нажмите Ctrl+F5 для полной перезагрузки
echo ====================================
echo.
pause