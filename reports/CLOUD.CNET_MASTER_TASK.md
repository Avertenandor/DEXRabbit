# 🔧 CLOUD.CNET · MASTER-TASK

## Цель

Привести в идеальный порядок локальную директорию разработки и репозиторий GitHub `Avertenandor/DEXRabbit`, затем выполнить полный набор продуктовых задач по документу «План» (План.txt) и моему чек-листу.

## Жёсткие правила исполнения

* Не задавать уточняющих вопросов. Выполнять по шагам.
* Любое разрушительное действие — только через бэкап/ветку/тег.
* Конвенция коммитов: Conventional Commits.
* Все проверки и отчёты — артефактами в CI.

---

## Фаза 0 — Префлайт и бэкап (локально)

1. Склонировать репозиторий свежо:

```
git clone https://github.com/Avertenandor/DEXRabbit.git
cd DEXRabbit
git fetch --all --tags
```

2. Создать защитный тег и рабочую ветку:

```
git checkout main
git pull
git tag pre-clean-$(date +%F)
git checkout -b chore/repo-hygiene-$(date +%F)
```

3. Зафиксировать локальную копию файла «План»:

* Поместить `План.txt` в `docs/Plan.txt` (UTF-8).
* Дополнительно сгенерировать `docs/Plan.md` (Markdown-копия, без потерь).

**Критерии приёмки Ф0:** тег `pre-clean-YYYY-MM-DD` существует; ветка `chore/repo-hygiene-YYYY-MM-DD` активна; `docs/Plan.txt` и `docs/Plan.md` добавлены.

---

## Фаза 1 — Гигиена директорий (локально + GitHub)

### 1.1 Нормализация структуры проекта

* Создать/упорядочить дерево:

```
/
  assets/
    css/    (main.css, variables.css)
    js/     (main.js)
    img/    (оптимизированные изображения)
    icons/  (favicons, apple-touch, maskable)
    fonts/
  legal/        (license.html, terms.html, policy.html)
  investment/   (index.html, model.html)
  partners/     (index.html)
  reports/      (index.html, schedule.html)
  breeding/     (index.html, card.html)
  investors/    (index.html)
  bot/          (index.html)
  contacts/     (index.html)
  faq/          (index.html)
  index.html
  manifest.webmanifest
  sw.js
  CNAME
  robots.txt
  sitemap.xml
  README.md
  SECURITY.md
  CONTRIBUTING.md
  docs/Plan.txt
  docs/Plan.md
  .editorconfig
  .gitattributes
  .gitignore
  .prettierrc
  .eslintrc.json
  .stylelintrc.json
  .htmlhintrc
  .github/workflows/pages.yml
```

* Переместить разрозненные ассеты в `assets/*`. Удалить дубль-файлы и «мусор» (`*.tmp`, `*.bak`, неиспользуемые изображения).

### 1.2 Инструменты качества (dev-only)

* Инициализировать Node окружение:

```
npm init -y
npm i -D prettier eslint stylelint htmlhint linkinator lighthouse husky lint-staged imagemin imagemin-mozjpeg imagemin-pngquant
```

* Настроить конфиги:

  * `.prettierrc`: `{ "printWidth": 100, "singleQuote": true }`
  * `.eslintrc.json`: базовый для браузерного JS (env browser, es2022).
  * `.stylelintrc.json`: стандартный набор правил.
  * `.htmlhintrc`: запрет инлайновых стилей/скриптов, обязательные alt и lang.
  * `.editorconfig`: `utf-8`, `lf`, `indent_size=2`.
* `package.json` → scripts:

```
"format": "prettier -w .",
"lint:html": "htmlhint \"**/*.html\"",
"lint:css": "stylelint \"assets/css/**/*.css\"",
"lint:js": "eslint \"assets/js/**/*.js\"",
"links": "linkinator http://127.0.0.1:8080 --recurse --concurrency 10",
"opt:img": "imagemin assets/img/* --plugin=mozjpeg --plugin=pngquant > /dev/null || true"
```

* Husky + lint-staged:

```
npx husky init
echo "{\"*.{js,css,html}\": [\"prettier -w\"]}" > .lintstagedrc
```

Добавить в `.husky/pre-commit`:

```
npx --no-install lint-staged
```

### 1.3 CI/CD для GitHub Pages

Создать/обновить `.github/workflows/pages.yml` (сборка+проверки+деплой):

```yaml
name: Pages CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci || npm i
      - run: npm run format && npm run lint:html && npm run lint:css && npm run lint:js
      - run: npm run opt:img
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
  deploy:
    needs: build-and-deploy
    permissions:
      pages: write
      id-token: write
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 1.4 Документы и метаданные

* `README.md`: краткое описание, карта разделов, инструкция локального предпросмотра (например, `npx http-server .`), ссылка на прод-домен.
* `SECURITY.md`: контакт для уязвимостей.
* `CONTRIBUTING.md`: правила коммитов и ветвления.

**Критерии приёмки Ф1:**

* Репозиторий чистый: нет «висящих» файлов, всё разложено по `assets/*`.
* Локально проходят `npm run lint:*` без ошибок.
* CI зелёный на PR; артефакт деплоя собирается; Pages деплоится из workflow.
* `README.md` отражает актуальную структуру.

---

## Фаза 2 — Функциональные блоки по «Плану»

### 2.1 Виджет курса PLEX (обязательно)

В `index.html` секция «Курс PLEX» → вставить виджет GeckoTerminal пула PLEX/USDT (BSC):

```html
<section id="plex-rate" class="container">
  <h2>Курс PLEX</h2>
  <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
    <iframe
      src="https://www.geckoterminal.com/bsc/pools/0x41d9650faf3341cbf8947fd8063a1fc88dbf1889?embed=1&info=0"
      title="PLEX/USDT Pool — GeckoTerminal"
      frameborder="0"
      loading="lazy"
      style="position:absolute;top:0;left:0;width:100%;height:100%;"
      referrerpolicy="no-referrer"
      allowfullscreen
    ></iframe>
  </div>
</section>
```

**Приёмка:** виджет виден, не ломает верстку, lazy-load, без горизонтального скролла.

### 2.2 Раздел «Инвестиции: Круг А / Круг Б»

* `investment/index.html`: полное описание модели (диапазоны вкладов, условия перехода в Круг Б, возврат вклада, риски/форс-мажор, сроки выплат).
* Таблицы с примерами начислений, FAQ блок.

### 2.3 Партнёрская программа 3×5%

* `partners/index.html`: схема уровней (1–3), две точки начислений (вложение и прибыль), тайминг выплат, антифрод-правила, UTM-метки.

### 2.4 «Персональный кролик»

* `breeding/index.html`: карточки (самец/самка, имя, цена), статусы («вольер», «кормёжка», «проведать», «посмотреть»).
* `breeding/card.html`: правила передачи прав после 2х потомств; изъятие одного потомка; право выкупа фермером по стартовой цене; платный визит (PLEX).

### 2.5 Отчётность 2×в сутки

* `reports/index.html`: сетка видеовставок (YouTube/Rutube).
* `reports/schedule.html`: календарь/расписание по Europe/Kyiv, два окна в день по 10–15 минут.

### 2.6 Юридические страницы

* `legal/license.html`, `legal/terms.html`, `legal/policy.html`: оферта, политика, оговорки о рисках, гуманное обращение с животными, возврат вклада ≠ гарантия прибыли.

### 2.7 Соцдоказательства и контакты

* `investors/index.html`: карточки инвесторов (имя + @telegram), модерация.
* `bot/index.html`: большая кнопка «Перейти в Telegram-бот».
* `contacts/index.html`: менеджер TG, email, ссылки на TG-канал и группы.

### 2.8 SEO/OG/Schema

* Во всех страницах: корректные `<title>`, `meta description`, Open Graph (1200×630), Twitter Cards, `link rel="canonical"`.
* JSON-LD: `Organization`, `WebSite`, `FAQPage` на ключевых страницах.
* Обновить `sitemap.xml` и `robots.txt`; добавить верификацию поисковиков (мета-теги).

**Критерии приёмки Ф2:**

* Все упомянутые страницы существуют и доступны из меню.
* Lighthouse локально: Performance ≥ 90, SEO ≥ 90, A11y ≥ 95, Best Practices ≥ 90.
* Linkinator по локальному серверу: 0 битых ссылок.

---

## Фаза 3 — Дизайн и адаптив (единая тёмная тема)

* Ввести переменные цветов и типографики в `assets/css/variables.css`.
* Тёмная тема по умолчанию, поддержка `prefers-color-scheme`.
* Адаптив: брейкпоинты для 1366 / 1920 / 2560+ (проектор). Использовать `clamp()` для размеров шрифтов, сетки CSS Grid/Flex.
* Доступность: контраст ≥ 4.5:1, фокусы, aria-label, последовательная табуляция.

**Приёмка Ф3:** скрин-чек на 1366/1920/2560, Safari iOS; Lighthouse A11y ≥ 95.

---

## Фаза 4 — PWA и производительность

* `manifest.webmanifest`: name/short_name, иконки 192/512, `display: standalone`, `theme_color`, `background_color`.
* `sw.js`: кэш статических ассетов (Stale-While-Revalidate), исключить iframe GeckoTerminal.
* Проставить `<link rel="preconnect">` к доменам CDN/GeckoTerminal.
* `loading="lazy"` для изображений/iframe; сжатие изображений через `npm run opt:img`.

**Приёмка Ф4:** Lighthouse PWA ≥ 90; офлайн-кэш для статики работает.

---

## Фаза 5 — CI доводка и защита качества

* В Pages CI добавить шаги:

  * `npm run lint:*`
  * `npm run links` по предпросмотру (если доступно) или по собранному артефакту.
  * Запись отчётов Lighthouse/Linkinator в артефакты (`actions/upload-artifact`).
* Включить branch protection для `main` (требовать зелёный CI).

**Критерии приёмки Ф5:** PR без зелёного CI не мёржится; артефакты проверок доступны.

---

## Финал — PR и слияние

1. Коммиты по Conventional Commits; один PR `chore(repo): hygiene + structure + base CI`.
2. Описание PR: что сделано по Фазам 0–5, чек-лист приёмки.
3. После ревью — merge squash; удалить ветку.

**Итоговые критерии проекта:**

* Репозиторий структурирован, читабелен, воспроизводим.
* Сайт покрыт навигацией, OG/SEO, схемами; виджет курса PLEX встроен.
* Все страницы из «Плана» присутствуют; отчёты 2×в сутки выведены.
* CI/CD устойчив, качество защищено lint/links/Lighthouse.
* PWA/адаптив/доступность соответствуют заданным порогам.

---

## Доп. замечания по безопасности

* CSP (через `<meta http-equiv="Content-Security-Policy">`): разрешить собственный домен и `geckoterminal.com` для iframe; запретить `unsafe-inline`.
* Всю внешнюю медиа-встраиваемую нагрузку помечать `referrerpolicy="no-referrer"`.

---

### Контрольный вопрос (для самопроверки Cloud.CNET)

Все ли критерии приёмки по Фазам 0–5 выполнены, CI зелёный, и страницы/навигация/виджет/юридические разделы доступны без 404?

### Действие сейчас

Приступить с Фазы 0. После успешной приёмки каждой фазы — коммит, пуш, PR-апдейт по чек-листу.
