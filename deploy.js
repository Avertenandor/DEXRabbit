const { execSync } = require('child_process');

console.log('🚀 Starting final deployment...');

try {
  // Check git status
  console.log('📊 Checking git status...');
  execSync('git status', { stdio: 'inherit' });

  // Add all files
  console.log('📝 Adding files to git...');
  execSync('git add .', { stdio: 'inherit' });

  // Check if there are changes
  try {
    execSync('git diff --cached --quiet', { stdio: 'pipe' });
    console.log('ℹ️ No changes to commit');
    process.exit(0);
  } catch (error) {
    // There are changes, continue with commit
  }

  // Create commit
  console.log('💾 Creating commit...');
  execSync('git commit -m "feat: final deployment - all requirements implemented"', { stdio: 'inherit' });

  // Push to main branch
  console.log('📤 Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('✅ Deployment completed!');
  console.log('🎯 GitHub Actions workflow will start automatically');
  console.log('🔍 Monitor status: https://github.com/Avertenandor/DEXRabbit/actions');
  console.log('🌐 Site will be available at: https://xn--80apagbbfxgmuj4j.site/');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

