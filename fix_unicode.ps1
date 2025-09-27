# DEXRabbit Deploy with Unicode Fix
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Green
Write-Host "    DEXRabbit Deploy - Unicode Fix" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "[1/4] Setting Unicode encoding..." -ForegroundColor Yellow
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
Write-Host ""

Write-Host "[2/4] Changing to project directory..." -ForegroundColor Yellow
Set-Location "C:\Users\konfu\Desktop\Кролики"
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

Write-Host "[3/4] Git operations..." -ForegroundColor Yellow
git add .
git commit -m "fix: final deployment with Unicode encoding"
Write-Host ""

Write-Host "[4/4] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "    DEPLOY COMPLETED WITH UNICODE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Check GitHub Actions: https://github.com/Avertenandor/DEXRabbit/actions" -ForegroundColor Cyan
Write-Host "Check website: https://xn--80apagbbfxgmuj4j.site/" -ForegroundColor Cyan