# === AUTO | DEXRabbit автодеплой на купитькролика.site ===
$ErrorActionPreference = 'Stop'

function Step($m){ Write-Host "==> $m" }
function Json($o){ $o | ConvertTo-Json -Depth 6 -Compress }
function Api($method, $url, $bodyObj=$null){
  $tok = $env:GITHUB_TOKEN; if(-not $tok){ $tok = $env:GH_TOKEN }
  if(-not $tok){ throw "Нет GITHUB_TOKEN/GH_TOKEN в окружении агента." }
  $headers = @{ Authorization = "Bearer $tok"; Accept = "application/vnd.github+json" }
  if($bodyObj){ Invoke-RestMethod -Method $method -Uri $url -Headers $headers -Body (Json $bodyObj) -ContentType "application/json" }
  else { Invoke-RestMethod -Method $method -Uri $url -Headers $headers }
}

$PROJECT   = "C:\Users\konfu\Desktop\Кролики"
$REPO      = "Avertenandor/DEXRabbit"
$BRANCH    = "main"
$DOMAIN_PN = "xn--80apagbbfxgmuj4j.site"

Step "Переход в проект"
Set-Location $PROJECT

# 1) Git init/remote
if(!(Test-Path ".git")){ Step "Инициализация git"; git init | Out-Null; git branch -M $BRANCH }
$remoteUrl = ""
try { $remoteUrl = (git remote get-url origin).Trim() } catch {}
if(-not $remoteUrl){ Step "Добавляю origin"; git remote add origin "https://github.com/$REPO.git" | Out-Null }
else { Step "origin=$remoteUrl" }

# 2) CNAME
Step "Пишу public/CNAME"
New-Item -ItemType Directory -Force -Path "public" | Out-Null
Set-Content -Path "public/CNAME" -Value $DOMAIN_PN -Encoding ASCII -NoNewline

# 3) Убедиться, что есть workflow (предпочитаем deploy.yml)
$wf = ".github/workflows/deploy.yml"
if(!(Test-Path $wf)){
  $wfAlt = ".github/workflows/pages.yml"
  if(!(Test-Path $wfAlt)){
    Step "Создаю минимальный pages.yml"
    New-Item -ItemType Directory -Force -Path ".github/workflows" | Out-Null
    @"
name: Deploy to GitHub Pages
on:
  push: { branches: [ $BRANCH ] }
  workflow_dispatch: {}
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: false }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: `${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
"@ | Set-Content -Path $wfAlt -Encoding UTF8
  }
  $wf = $wfAlt
}
Step "Workflow: $wf"

# 4) Commit & push (если есть изменения)
$dirty = git status --porcelain
if($dirty){
  Step "Коммит изменений"
  git add -A
  git commit -m "chore(pages): punycode + workflow + smoke" | Out-Null
} else { Write-Host "Нет изменений для коммита." }
Step "Push в $BRANCH"
git push -u origin $BRANCH

# 5) Pages config через REST
Step "Настраиваю GitHub Pages (cname + build_type=workflow)"
Api "PUT" "https://api.github.com/repos/$REPO/pages" @{ cname = $DOMAIN_PN; build_type = "workflow" } | Out-Null

# 6) Запуск workflow (deploy.yml предпочтительнее; иначе pages.yml)
$wfName = Split-Path $wf -Leaf
Step "Запускаю $wfName"
Api "POST" "https://api.github.com/repos/$REPO/actions/workflows/$wfName/dispatches" @{ ref = $BRANCH } | Out-Null

# 7) Ждём завершения последнего ранa
Step "Ожидаю завершения Actions"
$deadline = (Get-Date).AddMinutes(20)
$state = ""; $conclusion = ""
do {
  Start-Sleep -Seconds 10
  $runs = Api "GET" "https://api.github.com/repos/$REPO/actions/runs?per_page=1"
  $run = $runs.workflow_runs | Select-Object -First 1
  if($run){ $state = $run.status; $conclusion = $run.conclusion; Write-Host ("Status: {0} / Conclusion: {1}" -f $state,$conclusion) }
} while( ((-not $run) -or ($state -in @('queued','in_progress'))) -and (Get-Date) -lt $deadline )

if($conclusion -ne "success"){ throw "Actions завершился со статусом: $conclusion" }

# 8) Health
Step "Pages health"
$health = Api "GET" "https://api.github.com/repos/$REPO/pages/health"
$health | Out-Host

# 9) Smoke-тест прод-URL
Step "Smoke-тест https://$DOMAIN_PN/"
$ok = $false
for($i=1;$i -le 40;$i++){
  try{
    $resp = Invoke-WebRequest -Uri "https://$DOMAIN_PN/" -Method Head -UseBasicParsing -TimeoutSec 10
    $code = $resp.StatusCode
    Write-Host ("[{0}/40] HTTP {1}" -f $i,$code)
    if($code -in 200,301,302){ $ok = $true; break }
  } catch { Write-Host ("[{0}/40] Нет ответа..." -f $i) }
  Start-Sleep -Seconds 15
}
if(-not $ok){ throw "Сайт пока не отвечает 200/301/302 — проверь DNS/сертификат и перезапусти smoke." }

Step "ГОТОВО ✅ Сайт доступен по https://$DOMAIN_PN/ (купитькролика.site)"
# === /END ===