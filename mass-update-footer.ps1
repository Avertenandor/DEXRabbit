# Массовое обновление footer на оставшихся страницах
$footerTemplate = Get-Content "templates\footer-html-only.html" -Raw -Encoding UTF8

$pagesToUpdate = @(
    "rabbits-hares.html",
    "cats-rabbits.html",
    "guarantees.html",
    "partnership.html",
    "contacts.html",
    "development.html",
    "investors.html",
    "careers.html",
    "reports.html",
    "wallet-instructions.html"
)

$updated = 0
$failed = 0

foreach ($page in $pagesToUpdate) {
    if (Test-Path $page) {
        try {
            $content = Get-Content $page -Raw -Encoding UTF8
            
            # Ищем footer секцию (от <!-- Footer --> или <footer до </footer>)
            if ($content -match '(?s)(    <!-- Footer -->.*?</footer>|    <footer.*?</footer>)') {
                # Заменяем на новый footer
                $newContent = $content -replace '(?s)(    <!-- Footer -->.*?</footer>|    <footer.*?</footer>)', $footerTemplate
                
                # Записываем обновленный контент
                Set-Content -Path $page -Value $newContent -Encoding UTF8 -NoNewline
                
                Write-Host "✅ $page - обновлен" -ForegroundColor Green
                $updated++
            } else {
                Write-Host "⚠️  $page - footer не найден" -ForegroundColor Yellow
                $failed++
            }
        } catch {
            Write-Host "❌ $page - ошибка: $_" -ForegroundColor Red
            $failed++
        }
    } else {
        Write-Host "❌ $page - файл не найден" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Обновлено: $updated страниц" -ForegroundColor Green
Write-Host "Ошибок: $failed страниц" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
