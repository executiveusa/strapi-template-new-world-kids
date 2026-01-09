#!/usr/bin/env node

/**
 * Production Readiness Validation Script
 * Checks all critical components before deployment
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CHECKS = {
  passed: [],
  failed: [],
  warnings: []
};

function checkFileExists(filePath, description) {
  const fullPath = path.join(ROOT, filePath);
  if (fs.existsSync(fullPath)) {
    CHECKS.passed.push(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    CHECKS.failed.push(`❌ ${description}: ${filePath} NOT FOUND`);
    return false;
  }
}

function checkEnvVariable(varName) {
  const envPath = path.join(ROOT, '.env.production');
  if (!fs.existsSync(envPath)) {
    CHECKS.warnings.push(`⚠️  .env.production not found`);
    return false;
  }
  
  const content = fs.readFileSync(envPath, 'utf-8');
  if (content.includes(varName)) {
    CHECKS.passed.push(`✅ Environment: ${varName} configured`);
    return true;
  } else {
    CHECKS.warnings.push(`⚠️  Environment: ${varName} not set`);
    return false;
  }
}

console.log('\n🚀 New World Kids - Production Readiness Check\n');

// Ghost Blog Integration
console.log('📝 Ghost Blog Files:');
checkFileExists('apps/web/src/lib/ghost/client.ts', 'Ghost Client');
checkFileExists('apps/web/src/lib/ghost/types.ts', 'Ghost Types');
checkFileExists('apps/web/src/app/(platform)/blog/[slug]/page.tsx', 'Blog Post Page');
checkFileExists('apps/web/src/app/(platform)/blog/tag/[tag]/page.tsx', 'Blog Tag Page');
checkFileExists('apps/web/src/app/api/newsletter/route.ts', 'Newsletter API');

// Gemini Hero
console.log('\n🎨 Interactive Components:');
checkFileExists('apps/web/src/components/hero/GeminiInteractiveHero.tsx', 'Gemini Hero');

// Security
console.log('\n🔒 Security Layer:');
checkFileExists('middleware.ts', 'Security Middleware');

// Deployment Infrastructure
console.log('\n🏗️  Infrastructure:');
checkFileExists('docker-compose.coolify.yml', 'Docker Compose (Coolify)');
checkFileExists('nginx.conf', 'Nginx Config');
checkFileExists('deploy-production.sh', 'Deployment Script');
checkFileExists('coolify.json', 'Coolify Config');

// MCP Services
console.log('\n📚 MCP Services:');
checkFileExists('services/rube-mcp/src/notebook-service.ts', 'Notebook Service');
checkFileExists('services/rube-mcp/src/server.ts', 'Rube MCP Server');
checkFileExists('services/rube-mcp/Dockerfile', 'Rube MCP Docker');
checkFileExists('services/rube-mcp/package.json', 'Rube MCP Package');

// Configuration
console.log('\n⚙️  Configuration:');
checkFileExists('white-label.config.json', 'White-Label Config');
checkFileExists('.env.production', 'Production Environment');

// Documentation
console.log('\n📖 Documentation:');
checkFileExists('PRODUCTION_DEPLOYMENT_CHECKLIST.md', 'Deployment Checklist');
checkFileExists('PLATFORM_COMPLETE_SUMMARY.md', 'Platform Summary');
checkFileExists('QUICK_REFERENCE_CARD.md', 'Quick Reference');

// Environment Variables
console.log('\n🔑 Environment Variables:');
checkEnvVariable('GHOST_CONTENT_API_URL');
checkEnvVariable('GHOST_CONTENT_API_KEY');
checkEnvVariable('NEXT_PUBLIC_SUPABASE_URL');
checkEnvVariable('OPENAI_API_KEY');
checkEnvVariable('ANTHROPIC_API_KEY');

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Passed: ${CHECKS.passed.length}`);
console.log(`❌ Failed: ${CHECKS.failed.length}`);
console.log(`⚠️  Warnings: ${CHECKS.warnings.length}`);

if (CHECKS.failed.length > 0) {
  console.log('\n❌ FAILED CHECKS:');
  CHECKS.failed.forEach(f => console.log(`  ${f}`));
}

if (CHECKS.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  CHECKS.warnings.forEach(w => console.log(`  ${w}`));
}

console.log('\n' + '='.repeat(60));

if (CHECKS.failed.length === 0) {
  console.log('✅ PRODUCTION READY - All critical checks passed!');
  console.log('\nNext steps:');
  console.log('1. Review warnings above');
  console.log('2. Run: ./deploy-production.sh docker-local docker.io latest');
  console.log('3. Test locally, then deploy to Coolify');
  process.exit(0);
} else {
  console.log('❌ NOT READY - Fix failed checks before deployment');
  process.exit(1);
}
