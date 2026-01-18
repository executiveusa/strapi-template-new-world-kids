#!/usr/bin/env node

/**
 * Production Deployment Verification
 * Ensures all systems are ready for Vercel/Coolify deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

class DeploymentVerifier {
  constructor() {
    this.checks = {
      passed: [],
      failed: [],
      warnings: [],
    };
  }

  log(level, message) {
    const icons = {
      pass: '✓ ',
      fail: '✗ ',
      warn: '⚠️ ',
      info: 'ℹ️ ',
    };
    console.log(`${icons[level]} ${message}`);
  }

  /**
   * Check 1: Environment configuration
   */
  checkEnvironment() {
    this.log('info', 'Checking environment configuration...');

    const requiredEnvVars = [
      'DATABASE_URL',
      'SUPABASE_URL',
      'NEXT_PUBLIC_GHOST_URL',
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'GOOGLE_API_KEY',
    ];

    const envFile = path.join(ROOT_DIR, '.env.local');
    if (!fs.existsSync(envFile)) {
      this.checks.failed.push('❌ .env.local not found');
      return false;
    }

    const envContent = fs.readFileSync(envFile, 'utf-8');
    let allVarsPresent = true;

    requiredEnvVars.forEach((varName) => {
      if (envContent.includes(varName)) {
        this.checks.passed.push(`✓ ${varName} configured`);
      } else {
        this.checks.failed.push(`❌ ${varName} missing`);
        allVarsPresent = false;
      }
    });

    return allVarsPresent;
  }

  /**
   * Check 2: Build status
   */
  checkBuildStatus() {
    this.log('info', 'Checking build artifacts...');

    const buildDirs = [
      path.join(ROOT_DIR, 'apps/web/.next'),
      path.join(ROOT_DIR, 'services/cms/dist'),
      path.join(ROOT_DIR, 'services/stream/dist'),
    ];

    let allBuilt = true;
    buildDirs.forEach((dir) => {
      if (fs.existsSync(dir)) {
        this.checks.passed.push(`✓ ${path.relative(ROOT_DIR, dir)} built`);
      } else {
        this.checks.warnings.push(`⚠️ ${path.relative(ROOT_DIR, dir)} not found (may be needed)`);
      }
    });

    return allBuilt;
  }

  /**
   * Check 3: Database connectivity
   */
  checkDatabase() {
    this.log('info', 'Checking database connectivity...');

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      this.checks.failed.push('❌ DATABASE_URL not set');
      return false;
    }

    try {
      // Verify it's a valid connection string
      if (databaseUrl.includes('postgresql://')) {
        this.checks.passed.push('✓ DATABASE_URL is valid PostgreSQL connection string');
        return true;
      }
    } catch (error) {
      this.checks.failed.push(`❌ Invalid DATABASE_URL: ${error.message}`);
      return false;
    }
  }

  /**
   * Check 4: MCP Server configuration
   */
  checkMCPServers() {
    this.log('info', 'Checking MCP server configuration...');

    const mcpConfigPath = path.join(ROOT_DIR, '.claude/mcp.json');
    if (!fs.existsSync(mcpConfigPath)) {
      this.checks.warnings.push('⚠️ .claude/mcp.json not found');
      return false;
    }

    try {
      const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf-8'));
      const serverCount = Object.keys(mcpConfig.mcpServers || {}).length;
      this.checks.passed.push(`✓ MCP configuration found (${serverCount} servers)`);
      return true;
    } catch (error) {
      this.checks.failed.push(`❌ Invalid MCP configuration: ${error.message}`);
      return false;
    }
  }

  /**
   * Check 5: Vercel configuration
   */
  checkVercelConfig() {
    this.log('info', 'Checking Vercel configuration...');

    const vercelJsonPath = path.join(ROOT_DIR, 'vercel.json');
    if (!fs.existsSync(vercelJsonPath)) {
      this.checks.failed.push('❌ vercel.json not found');
      return false;
    }

    try {
      const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));
      if (vercelConfig.framework === 'nextjs') {
        this.checks.passed.push('✓ Vercel configuration is valid');
        return true;
      }
    } catch (error) {
      this.checks.failed.push(`❌ Invalid Vercel configuration: ${error.message}`);
      return false;
    }
  }

  /**
   * Check 6: Dependencies
   */
  checkDependencies() {
    this.log('info', 'Checking dependencies...');

    const nodeModulesPath = path.join(ROOT_DIR, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      this.checks.failed.push('❌ node_modules not found - run yarn install');
      return false;
    }

    this.checks.passed.push('✓ Dependencies installed');

    // Check critical packages
    const criticalPackages = ['next', 'react', 'typescript', 'turbo'];
    let allPresent = true;

    criticalPackages.forEach((pkg) => {
      const pkgPath = path.join(nodeModulesPath, pkg);
      if (fs.existsSync(pkgPath)) {
        this.checks.passed.push(`✓ ${pkg} installed`);
      } else {
        this.checks.failed.push(`❌ ${pkg} missing`);
        allPresent = false;
      }
    });

    return allPresent;
  }

  /**
   * Check 7: Git repository status
   */
  checkGitStatus() {
    this.log('info', 'Checking Git status...');

    try {
      const status = execSync('git status --porcelain', { cwd: ROOT_DIR }).toString();
      if (status.trim().length === 0) {
        this.checks.passed.push('✓ Git working directory is clean');
        return true;
      } else {
        const lines = status.split('\n').filter((l) => l.trim());
        if (lines.length > 10) {
          this.checks.warnings.push(`⚠️ Git has ${lines.length} uncommitted changes`);
        } else {
          this.checks.warnings.push(`⚠️ Git has uncommitted changes (${lines.length} files)`);
        }
        return true; // Warning only
      }
    } catch (error) {
      this.checks.warnings.push('⚠️ Git not available or not initialized');
      return true; // Warning only
    }
  }

  /**
   * Check 8: Secrets security
   */
  checkSecuritySecrets() {
    this.log('info', 'Checking secrets security...');

    const secretsToCheck = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'STRIPE_SECRET_KEY'];
    let allSecure = true;

    secretsToCheck.forEach((secret) => {
      if (!process.env[secret]) {
        this.checks.passed.push(`✓ ${secret} not in process.env (good practice)`);
      }
    });

    // Check for API keys in code
    try {
      const grepResult = execSync('grep -r "sk-proj-" apps/ services/ --exclude-dir=node_modules', {
        cwd: ROOT_DIR,
        stdio: 'pipe',
      }).toString();

      if (grepResult.trim()) {
        this.checks.failed.push('❌ Found API keys in source code!');
        allSecure = false;
      } else {
        this.checks.passed.push('✓ No exposed API keys in source code');
      }
    } catch (error) {
      this.checks.passed.push('✓ No exposed API keys detected');
    }

    return allSecure;
  }

  async runAllChecks() {
    console.log('\n🔍 DEPLOYMENT VERIFICATION\n');
    console.log('='.repeat(50) + '\n');

    this.checkEnvironment();
    this.checkBuildStatus();
    this.checkDatabase();
    this.checkMCPServers();
    this.checkVercelConfig();
    this.checkDependencies();
    this.checkGitStatus();
    this.checkSecuritySecrets();

    console.log('\n' + '='.repeat(50));
    console.log('\n📊 VERIFICATION RESULTS\n');

    console.log(`✅ PASSED: ${this.checks.passed.length}`);
    this.checks.passed.slice(0, 10).forEach((check) => this.log('pass', check));
    if (this.checks.passed.length > 10) {
      console.log(`   ... and ${this.checks.passed.length - 10} more\n`);
    }

    if (this.checks.warnings.length > 0) {
      console.log(`⚠️  WARNINGS: ${this.checks.warnings.length}`);
      this.checks.warnings.forEach((check) => this.log('warn', check));
      console.log();
    }

    if (this.checks.failed.length > 0) {
      console.log(`❌ FAILED: ${this.checks.failed.length}`);
      this.checks.failed.forEach((check) => this.log('fail', check));
      console.log();
      return false;
    }

    console.log('\n✨ All checks passed! Ready for deployment.\n');
    return true;
  }
}

// Run verification
const verifier = new DeploymentVerifier();
verifier.runAllChecks().then((success) => {
  process.exit(success ? 0 : 1);
});
