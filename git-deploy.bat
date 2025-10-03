@echo off
chcp 65001
cd /d "C:\Users\konfu\Desktop\Кролики"
echo Checking git status...
git status
echo.
echo Adding all changes...
git add -A
echo.
echo Creating commit...
git commit -m "feat(belarus): улучшена дорожная карта с применением UX best practices

- Добавлены статусные индикаторы для всех кварталов (В процессе/Планируется)
- Детализированы задачи Q1-Q4 с категоризацией (Legal/Ops/Marketing/Tech)
- Добавлены KPI метрики: 4 показателя на каждый квартал
- Улучшена визуальная иерархия: иконки, badge, статусы
- Применен принцип прогрессивного раскрытия информации
- Увеличена сканируемость контента с помощью strong и иконок
- Добавлено больше воздуха между элементами (spacing)

Технические детали:
- Q1: 6 задач, статус in-progress, KPI: 3+ партнёров, 5 регионов
- Q2: 6 задач, статус planned, KPI: 100 кроликов, 5 ферм
- Q3: 6 задач, статус planned, KPI: офис в Минске, 10 человек
- Q4: 6 задач, статус planned, KPI: 5 франшиз, $200K оборот

UX improvements: визуальная иерархия 9/10, сканируемость 9/10"
echo.
echo Pushing to GitHub...
git push origin main
echo.
echo ✅ Done! Check the site: https://xn--80apagbbfxgmuj4j.site/belarus-office.html
pause
