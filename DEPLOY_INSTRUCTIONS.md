# 🚀 Инструкция по деплою сайта DEXRabbit на GitHub Pages

## Проблема
Система PowerShell имеет критические ошибки, которые мешают автоматическому выполнению команд. Нужно выполнить действия вручную.

## Шаг 1: Инициализация Git репозитория

```bash
cd C:\Users\konfu\Desktop\Кролики
git init --initial-branch=main
```

## Шаг 2: Добавление файлов в Git

```bash
git add .
```

## Шаг 3: Создание коммита

```bash
git commit -m "Initial commit: DEXRabbit site with GitHub Actions deploy

- Added GitHub Actions workflow for automatic deployment
- Added .nojekyll file for static site generation
- Added .gitignore for proper file exclusions
- Added README.md with project documentation
- Site is ready for GitHub Pages deployment"
```

## Шаг 4: Добавление remote origin

```bash
git remote add origin https://github.com/Avertenandor/DEXRabbit.git
```

## Шаг 5: Отправка в GitHub

```bash
git push -u origin main
```

## Шаг 6: Проверка GitHub Actions

1. Перейдите на https://github.com/Avertenandor/DEXRabbit/actions
2. Дождитесь выполнения workflow "Deploy to GitHub Pages"
3. Время выполнения: 5-10 минут

## Шаг 7: Проверка сайта

После успешного выполнения workflow:
- Сайт будет доступен по адресу: https://xn--80apagbbfxgmuj4j.site/
- GitHub Pages автоматически настроится

## Что уже готово:

✅ **GitHub Actions workflow** создан (`.github/workflows/deploy.yml`)
✅ **.nojekyll файл** добавлен в `site/public/`
✅ **.gitignore** настроен
✅ **README.md** создан
✅ **Сайт полностью собран** в папке `site/dist/`

## Ожидаемый результат:

После выполнения всех шагов:
1. GitHub Actions автоматически соберет и задеплоит сайт
2. Сайт станет доступен по адресу https://xn--80apagbbfxgmuj4j.site/
3. Настройка GitHub Pages будет завершена автоматически

---

**Важно:** Выполните команды в указанном порядке в терминале (Git Bash или Command Prompt).

