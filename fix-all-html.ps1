# Массовое исправление HTML файлов DEXRabbit
Write-Host "🔧 Запуск массового исправления HTML файлов DEXRabbit..." -ForegroundColor Green

# Список файлов для обработки
$htmlFiles = @(
    "index.html",
    "investment-model.html", 
    "contacts.html",
    "breeding.html",
    "restaurants.html",
    "gifts.html",
    "development.html",
    "logistics.html",
    "investors.html"
)

# Общие исправления для всех файлов
$globalReplacements = @{
    "КупитьКролика" = "DEXRabbit"
    "купить кролика" = "инвестиции в токенизированных кроликов"
    "/images/favicon.svg" = "/favicon.svg"
    "alt=`"КупитьКролика" = "alt=`"DEXRabbit"
    "  " = " "  # Убираем двойные пробелы
    "<title> " = "<title>"
    " </title>" = "</title>"
    "content=`" " = "content=`""  # Убираем пробелы в начале content
}

# Специальные мета-теги для каждого файла
$metaUpdates = @{
    "index.html" = @{
        "title" = "DEXRabbit — токенизированная ферма кроликов"
        "description" = "🐰 Инвестируйте в токенизированных кроликов, получайте PLEX токены и участвуйте в реальной экономике фермы в Подольске"
    }
    "investment-model.html" = @{
        "title" = "Инвестиционная модель — DEXRabbit"
        "description" = "💰 Инвестиции от 100 до 2000 USDT в токенизированных кроликов. Круг А и Б, ежедневные PLEX токены, гарантия возврата вклада"
    }
    "contacts.html" = @{
        "title" = "Контакты — DEXRabbit"
        "description" = "📞 Контакты DEXRabbit. Telegram-бот для инвестиций, каналы, группы. Связь с командой токенизированной фермы кроликов"
    }
    "breeding.html" = @{
        "title" = "Разведение кроликов — DEXRabbit"
        "description" = "🐰 Программа разведения токенизированных кроликов. Племенная ценность, правила разведения, доходы от потомства"
    }
    "restaurants.html" = @{
        "title" = "Поставки ресторанам — DEXRabbit"  
        "description" = "🍽️ B2B поставки мяса кроликов для ресторанов. Экологически чистая продукция, стабильные поставки, конкурентные цены"
    }
    "gifts.html" = @{
        "title" = "Кролик в подарок — DEXRabbit"
        "description" = "🎁 Подарочные наборы с токенизированными кроликами. Уникальные подарки для близких, доставка, красивая упаковка"
    }
    "development.html" = @{
        "title" = "Развитие проекта — DEXRabbit"
        "description" = "🚀 Планы развития DEXRabbit на 2025 год. Roadmap, новые направления, расширение фермы, технологические решения"
    }
    "logistics.html" = @{
        "title" = "Логистика и доставка — DEXRabbit"
        "description" = "🚚 Доставка токенизированных кроликов по всей России. Расчёт стоимости, сроки, регионы, условия транспортировки"
    }
    "investors.html" = @{
        "title" = "Карточки инвесторов — DEXRabbit"
        "description" = "🏆 Реальные результаты наших инвесторов. Прозрачная отчётность, доходность вложений, истории успеха в DEXRabbit"
    }
}

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "🔧 Обрабатываю $file..." -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Применяем глобальные замены
        foreach ($replacement in $globalReplacements.GetEnumerator()) {
            $content = $content -replace [regex]::Escape($replacement.Key), $replacement.Value
        }
        
        # Обновляем мета-теги для конкретного файла
        if ($metaUpdates.ContainsKey($file)) {
            $meta = $metaUpdates[$file]
            
            # Обновляем title
            $content = $content -replace '<title>.*?</title>', "<title>$($meta.title)</title>"
            
            # Обновляем meta description
            $content = $content -replace 'name="description" content="[^"]*"', "name=`"description`" content=`"$($meta.description)`""
            
            # Добавляем недостающие meta теги если их нет
            if ($content -notmatch 'name="theme-color"') {
                $content = $content -replace '(<meta name="description"[^>]*>)', "`$1`n    <meta name=`"theme-color`" content=`"#4a90e2`">"
            }
            
            if ($content -notmatch 'rel="manifest"') {
                $content = $content -replace '(<meta name="theme-color"[^>]*>)', "`$1`n    <link rel=`"manifest`" href=`"/manifest.webmanifest`">"
            }
            
            if ($content -notmatch 'rel="icon".*favicon.svg') {
                $content = $content -replace '(<link rel="manifest"[^>]*>)', "`$1`n    <link rel=`"icon`" type=`"image/svg+xml`" href=`"/favicon.svg`">"
            }
        }
        
        # Убираем дублированные секции (простейший алгоритм)
        $lines = $content -split "`n"
        $uniqueLines = @()
        $seenSections = @{}
        
        foreach ($line in $lines) {
            if ($line -match '<section.*?>') {
                $sectionHash = $line.GetHashCode()
                if (-not $seenSections.ContainsKey($sectionHash)) {
                    $seenSections[$sectionHash] = $true
                    $uniqueLines += $line
                } else {
                    Write-Host "  ❌ Удалена дублированная секция" -ForegroundColor Red
                }
            } else {
                $uniqueLines += $line
            }
        }
        
        $content = $uniqueLines -join "`n"
        
        # Добавляем скрипт оптимизации если его нет
        if ($content -notmatch 'production-optimizer.js') {
            $content = $content -replace '</body>', "    <script src=`"/production-optimizer.js`"></script>`n</body>"
            Write-Host "  ✅ Добавлен production optimizer" -ForegroundColor Green
        }
        
        # Сохраняем файл
        $content | Out-File -FilePath $file -Encoding UTF8 -NoNewline
        Write-Host "  ✅ $file обновлён" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Файл $file не найден" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Массовое исправление завершено!" -ForegroundColor Green
Write-Host "✅ Обработано файлов: $($htmlFiles.Count)" -ForegroundColor Green
Write-Host "🔧 Применены исправления:" -ForegroundColor Cyan
Write-Host "  • Убраны лишние пробелы в title и meta" -ForegroundColor White
Write-Host "  • Обновлен брендинг на DEXRabbit" -ForegroundColor White  
Write-Host "  • Исправлены пути к favicon" -ForegroundColor White
Write-Host "  • Добавлены недостающие meta теги" -ForegroundColor White
Write-Host "  • Удалены дублированные секции" -ForegroundColor White
Write-Host "  • Добавлен production optimizer" -ForegroundColor White