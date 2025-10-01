# PowerShell script to update footer in all HTML files
# Скрипт для обновления подвала на всех HTML страницах

$projectPath = "C:\Users\konfu\Desktop\Кролики"
$footerTemplate = Get-Content -Path "$projectPath\templates\footer-template.html" -Raw -Encoding UTF8

# Список HTML файлов для обновления (исключаем тестовые и служебные)
$htmlFiles = @(
    "index.html",
    "breeding.html",
    "care.html",
    "careers.html",
    "cats-rabbits.html",
    "contacts.html",
    "development.html",
    "gifts.html",
    "guarantees.html",
    "investment-model.html",
    "investors.html",
    "logistics.html",
    "partnership.html",
    "rabbits-hares.html",
    "reports.html",
    "restaurants.html",
    "therapy.html",
    "wallet-instructions.html"
)

Write-Host "🐰 Начинаю обновление footer на всех страницах..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$errorCount = 0

foreach ($file in $htmlFiles) {
    $filePath = Join-Path $projectPath $file
    
    if (Test-Path $filePath) {
        try {
            Write-Host "📝 Обработка: $file" -ForegroundColor Yellow
            
            # Читаем файл
            $content = Get-Content -Path $filePath -Raw -Encoding UTF8
            
            # Проверяем, есть ли footer
            if ($content -match '<!--\s*Footer\s*-->.*?</footer>') {
                # Заменяем старый footer на новый
                $newContent = $content -replace '(?s)<!--\s*Footer\s*-->.*?</footer>', $footerTemplate
                
                # Сохраняем файл
                [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.UTF8Encoding]::new($false))
                
                Write-Host "   ✅ Footer обновлен успешно!" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "   ⚠️  Footer не найден, добавляю перед закрывающим </body>" -ForegroundColor Yellow
                
                # Добавляем footer перед закрывающим </body>
                $newContent = $content -replace '(</body>)', "$footerTemplate`n`$1"
                [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.UTF8Encoding]::new($false))
                
                Write-Host "   ✅ Footer добавлен!" -ForegroundColor Green
                $successCount++
            }
        }
        catch {
            Write-Host "   ❌ Ошибка: $_" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "   ⚠️  Файл не найден: $file" -ForegroundColor Magenta
    }
    
    Write-Host ""
}

Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📊 Результаты обновления:" -ForegroundColor Cyan
Write-Host "   ✅ Успешно обновлено: $successCount файлов" -ForegroundColor Green
Write-Host "   ❌ Ошибок: $errorCount" -ForegroundColor Red
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Готово! Теперь все страницы имеют единый footer." -ForegroundColor Green
