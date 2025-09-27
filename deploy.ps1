# DEXRabbit Deploy Function
function Deploy-DEXRabbit {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
    
    Set-Location "C:\Users\konfu\Desktop\Кролики"
    
    Write-Host "🚀 DEXRabbit Deploy Started..." -ForegroundColor Green
    
    git add .
    git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push origin main
    
    Write-Host "✅ Deploy completed!" -ForegroundColor Green
    Write-Host "🌐 Site: https://xn--80apagbbfxgmuj4j.site/" -ForegroundColor Cyan
    Write-Host "📊 Actions: https://github.com/Avertenandor/DEXRabbit/actions" -ForegroundColor Cyan
}

# Export function for use
Export-ModuleMember -Function Deploy-DEXRabbit