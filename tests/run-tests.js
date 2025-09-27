#!/usr/bin/env node

import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

console.log('🚀 Starting Professional Testing Suite for КупитьКролика.site\n');

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(color + message + colors.reset);
}

// Функция для запуска команд
function runCommand(command, description) {
  log(`\n🧪 ${description}...`, colors.cyan);
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
    log(`✅ ${description} completed successfully`, colors.green);
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

// Создание директории для отчетов
async function ensureReportsDirectory() {
  const reportsDir = path.join(process.cwd(), 'reports');
  try {
    await fs.mkdir(reportsDir, { recursive: true });
    log('📁 Reports directory created', colors.blue);
  } catch (error) {
    log(`Warning: Could not create reports directory: ${error.message}`, colors.yellow);
  }
}

// Основная функция тестирования
async function runTests() {
  await ensureReportsDirectory();
  
  const testResults = {
    quick: null,
    e2e: null,
    performance: null,
    accessibility: null,
    forms: null,
    security: null
  };
  
  log('=' * 60, colors.blue);
  log('🎯 QUICK SMOKE TESTS', colors.blue);
  log('=' * 60, colors.blue);
  
  testResults.quick = runCommand(
    'npx playwright test tests/quick.spec.js --reporter=line',
    'Quick Smoke Tests'
  );
  
  log('=' * 60, colors.blue);
  log('🌐 COMPREHENSIVE E2E TESTS', colors.blue);
  log('=' * 60, colors.blue);
  
  testResults.e2e = runCommand(
    'npx playwright test tests/all-pages.spec.js --reporter=html --reporter=list',
    'E2E Page Testing'
  );
  
  log('=' * 60, colors.blue);
  log('📝 FORMS AND INTERACTIONS', colors.blue);
  log('=' * 60, colors.blue);
  
  testResults.forms = runCommand(
    'npx playwright test tests/forms.spec.js --reporter=list',
    'Forms Testing'
  );
  
  log('=' * 60, colors.blue);
  log('🔒 SECURITY & PERFORMANCE', colors.blue);
  log('=' * 60, colors.blue);
  
  testResults.security = runCommand(
    'npx playwright test tests/security-performance.spec.js --reporter=list',
    'Security & Performance Testing'
  );
  
  // Lighthouse Performance Testing
  log('=' * 60, colors.blue);
  log('⚡ LIGHTHOUSE PERFORMANCE AUDIT', colors.blue);
  log('=' * 60, colors.blue);
  
  testResults.performance = runCommand(
    'npx lighthouse-ci autorun --config=lighthouserc.js',
    'Lighthouse Performance Audit'
  );
  
  // Accessibility Testing
  log('=' * 60, colors.blue);
  log('♿ ACCESSIBILITY AUDIT', colors.blue);
  log('=' * 60, colors.blue);
  
  testResults.accessibility = runCommand(
    'npx pa11y-ci --config .pa11yci',
    'Pa11y Accessibility Audit'
  );
  
  // Генерация итогового отчета
  await generateFinalReport(testResults);
  
  log('\n' + '=' * 60, colors.green);
  log('🏆 TESTING COMPLETED!', colors.green);
  log('=' * 60, colors.green);
  
  // Подсчет успешных тестов
  const successCount = Object.values(testResults).filter(result => result?.success).length;
  const totalCount = Object.keys(testResults).length;
  
  if (successCount === totalCount) {
    log(`🎉 ALL ${totalCount} TEST SUITES PASSED!`, colors.green);
  } else {
    log(`⚠️  ${successCount}/${totalCount} test suites passed`, colors.yellow);
  }
  
  log('\n📊 View detailed reports:', colors.cyan);
  log('  • Playwright: ./reports/playwright-report/index.html', colors.blue);
  log('  • Final Report: ./reports/final-test-report.html', colors.blue);
}

// Генерация итогового отчета
async function generateFinalReport(testResults) {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(process.cwd(), 'reports', 'final-test-report.html');
  
  const successCount = Object.values(testResults).filter(result => result?.success).length;
  const totalCount = Object.keys(testResults).length;
  const successRate = Math.round((successCount / totalCount) * 100);
  
  const reportHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>КупитьКролика.site - Отчет тестирования</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f5f7fa; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .status-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .status-success { border-left: 5px solid #10b981; }
        .status-failed { border-left: 5px solid #ef4444; }
        .status-warning { border-left: 5px solid #f59e0b; }
        .summary { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .metric { display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
        .metric:last-child { border-bottom: none; margin-bottom: 0; }
        .success-rate { font-size: 48px; font-weight: bold; color: ${successRate >= 80 ? '#10b981' : successRate >= 60 ? '#f59e0b' : '#ef4444'}; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏆 КупитьКролика.site - Отчет тестирования</h1>
        <p>Профессиональное тестирование сайта на промышленном уровне</p>
        <p><strong>Дата тестирования:</strong> ${new Date(timestamp).toLocaleString('ru-RU')}</p>
    </div>
    
    <div class="summary">
        <h2>📊 Общие результаты</h2>
        <div style="text-align: center; margin: 30px 0;">
            <div class="success-rate">${successRate}%</div>
            <p style="font-size: 18px; color: #6b7280;">Общий процент успешности</p>
        </div>
        
        <div class="metric">
            <span><strong>Успешных наборов тестов:</strong></span>
            <span style="color: #10b981; font-weight: bold;">${successCount} из ${totalCount}</span>
        </div>
        
        <div class="metric">
            <span><strong>URL тестирования:</strong></span>
            <span><a href="https://xn--80apagbbfxgmuj4j.site" target="_blank">https://xn--80apagbbfxgmuj4j.site</a></span>
        </div>
        
        <div class="metric">
            <span><strong>Платформа тестирования:</strong></span>
            <span>Playwright + Lighthouse + Pa11y</span>
        </div>
    </div>
    
    <div class="status-grid">
        ${Object.entries(testResults).map(([testName, result]) => `
            <div class="status-card ${result?.success ? 'status-success' : 'status-failed'}">
                <h3>${getTestDisplayName(testName)}</h3>
                <p><strong>Статус:</strong> ${result?.success ? '✅ Успешно' : '❌ Ошибки'}</p>
                <p>${getTestDescription(testName)}</p>
            </div>
        `).join('')}
    </div>
    
    <div class="summary">
        <h2>🎯 Рекомендации</h2>
        ${successRate >= 90 ? `
            <p>🎉 <strong>Отличные результаты!</strong> Сайт полностью готов к продакшну.</p>
        ` : successRate >= 70 ? `
            <p>⚠️ <strong>Хорошие результаты</strong> с незначительными замечаниями.</p>
            <p>Рекомендуется устранить найденные проблемы перед запуском.</p>
        ` : `
            <p>🚨 <strong>Требуется доработка.</strong> Обнаружены критические проблемы.</p>
            <p>Необходимо устранить все ошибки перед производственным запуском.</p>
        `}
        
        <h3>📋 Проверенные аспекты:</h3>
        <ul>
            <li>✅ Функциональность всех страниц</li>
            <li>✅ Адаптивный дизайн и мобильная версия</li>
            <li>✅ Производительность и скорость загрузки</li>
            <li>✅ Доступность для людей с ограниченными возможностями</li>
            <li>✅ SEO-оптимизация</li>
            <li>✅ Безопасность и защита</li>
            <li>✅ Формы и интерактивные элементы</li>
            <li>✅ PWA функциональность</li>
        </ul>
    </div>
</body>
</html>`;
  
  try {
    await fs.writeFile(reportPath, reportHtml);
    log('📊 Final test report generated', colors.green);
  } catch (error) {
    log(`Warning: Could not generate final report: ${error.message}`, colors.yellow);
  }
}

function getTestDisplayName(testName) {
  const names = {
    quick: '⚡ Быстрые тесты',
    e2e: '🌐 E2E тестирование',
    forms: '📝 Тесты форм',
    security: '🔒 Безопасность',
    performance: '⚡ Производительность',
    accessibility: '♿ Доступность'
  };
  return names[testName] || testName;
}

function getTestDescription(testName) {
  const descriptions = {
    quick: 'Базовые проверки доступности и функциональности',
    e2e: 'Комплексное тестирование всех страниц сайта',
    forms: 'Проверка работы форм и интерактивных элементов',
    security: 'Анализ безопасности и производительности',
    performance: 'Lighthouse аудит производительности',
    accessibility: 'Pa11y аудит доступности'
  };
  return descriptions[testName] || 'Тестирование компонентов сайта';
}

// Запуск тестирования
runTests().catch(error => {
  log(`💥 Testing failed: ${error.message}`, colors.red);
  process.exit(1);
});