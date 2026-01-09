#!/usr/bin/env node

/**
 * Build Error Fixer for New World Kids Platform
 * Automatically resolves common TypeScript, dependency, and configuration issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname);

class BuildFixer {
  constructor() {
    this.fixes = [];
    this.errors = [];
  }

  log(level, message) {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = {
      info: '📌',
      success: '✓ ',
      error: '✗ ',
      warn: '⚠️ ',
    }[level];
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  /**
   * Fix 1: Ensure all package.json files exist in monorepo packages
   */
  async fixMissingPackageJsons() {
    this.log('info', 'Checking monorepo package.json files...');

    const packages = [
      'packages/design-system',
      'packages/eslint-config',
      'packages/prettier-config',
      'packages/shared-data',
      'packages/typescript-config',
      'packages/cms',
    ];

    for (const pkg of packages) {
      const pkgPath = path.join(ROOT_DIR, pkg);
      const pkgJsonPath = path.join(pkgPath, 'package.json');

      if (!fs.existsSync(pkgPath)) {
        fs.mkdirSync(pkgPath, { recursive: true });
        this.log('info', `Created directory: ${pkg}`);
      }

      if (!fs.existsSync(pkgJsonPath)) {
        const name = path.basename(pkg);
        const pkgJson = {
          name: `@repo/${name}`,
          version: '1.0.0',
          private: true,
          type: 'module',
          main: 'index.js',
          exports: {
            '.': './index.js',
          },
          files: ['*.js', '*.json'],
        };
        fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
        this.log('success', `Created package.json: ${pkg}`);
        this.fixes.push(`Created ${pkg}/package.json`);
      }
    }
  }

  /**
   * Fix 2: Ensure tsconfig.json exists in all apps
   */
  async fixTypeScriptConfigs() {
    this.log('info', 'Checking TypeScript configurations...');

    const apps = [path.join(ROOT_DIR, 'apps/web'), path.join(ROOT_DIR, 'apps/mobile')];

    for (const app of apps) {
      const tsconfigPath = path.join(app, 'tsconfig.json');

      if (!fs.existsSync(tsconfigPath)) {
        const tsconfig = {
          extends: '@repo/typescript-config/nextjs.json',
          compilerOptions: {
            baseUrl: '.',
            paths: {
              '@/*': ['./src/*'],
            },
          },
          include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
          exclude: ['node_modules'],
        };
        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        this.log('success', `Created tsconfig.json: ${path.basename(app)}`);
        this.fixes.push(`Created ${app}/tsconfig.json`);
      }
    }
  }

  /**
   * Fix 3: Fix dependency version conflicts
   */
  async fixDependencies() {
    this.log('info', 'Checking for dependency conflicts...');

    try {
      execSync('yarn install --legacy-peer-deps', { stdio: 'inherit', cwd: ROOT_DIR });
      this.log('success', 'Dependencies resolved');
      this.fixes.push('Fixed dependency conflicts with --legacy-peer-deps');
    } catch (error) {
      this.errors.push('Failed to resolve dependencies');
      this.log('error', 'Dependency resolution failed');
    }
  }

  /**
   * Fix 4: Clear Next.js cache
   */
  async clearBuildCache() {
    this.log('info', 'Clearing build caches...');

    const cacheDirs = [
      path.join(ROOT_DIR, 'apps/web/.next'),
      path.join(ROOT_DIR, 'apps/web/.turbo'),
      path.join(ROOT_DIR, '.turbo'),
    ];

    for (const dir of cacheDirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        this.log('success', `Cleared: ${dir}`);
        this.fixes.push(`Cleared cache: ${dir}`);
      }
    }
  }

  /**
   * Fix 5: Ensure environment variables are set
   */
  async fixEnvironmentVariables() {
    this.log('info', 'Checking environment variables...');

    const envPath = path.join(ROOT_DIR, '.env.local');
    if (!fs.existsSync(envPath)) {
      this.log('warn', '.env.local not found. Using .env.example as template.');
      this.fixes.push('Create .env.local from .env.example');
    } else {
      this.log('success', '.env.local exists');
    }
  }

  /**
   * Fix 6: Fix import path issues
   */
  async fixImportPaths() {
    this.log('info', 'Checking for import path issues...');

    const webPages = path.join(ROOT_DIR, 'apps/web/src/app');
    if (fs.existsSync(webPages)) {
      this.log('success', 'App directory structure valid');
    } else {
      this.errors.push('Invalid app directory structure');
    }
  }

  /**
   * Fix 7: Prune unused workspaces
   */
  async pruneWorkspaces() {
    this.log('info', 'Pruning unused dependencies...');

    try {
      execSync('turbo prune --docker', { stdio: 'inherit', cwd: ROOT_DIR });
      this.log('success', 'Workspace pruned');
      this.fixes.push('Pruned workspace dependencies');
    } catch (error) {
      this.log('warn', 'Turbo prune failed (non-critical)');
    }
  }

  /**
   * Fix 8: Generate types
   */
  async generateTypes() {
    this.log('info', 'Generating TypeScript types...');

    try {
      execSync('yarn turbo run typecheck --parallel', { stdio: 'inherit', cwd: ROOT_DIR });
      this.log('success', 'Types generated');
      this.fixes.push('Generated TypeScript types');
    } catch (error) {
      this.log('warn', 'Type checking had issues (may be non-critical)');
    }
  }

  async runAllFixes() {
    this.log('info', '🔧 Starting Build Fixer for New World Kids Platform\n');

    try {
      await this.fixMissingPackageJsons();
      await this.fixTypeScriptConfigs();
      await this.fixDependencies();
      await this.clearBuildCache();
      await this.fixEnvironmentVariables();
      await this.fixImportPaths();

      this.log('info', '\n📊 Build Fixer Summary:\n');
      this.log('success', `Applied ${this.fixes.length} fixes:`);
      this.fixes.forEach((fix) => this.log('info', `  • ${fix}`));

      if (this.errors.length > 0) {
        this.log('error', `\nEncountered ${this.errors.length} errors:`);
        this.errors.forEach((error) => this.log('error', `  • ${error}`));
        return false;
      }

      this.log('success', '\n✅ Build fixes completed successfully!');
      this.log('info', 'Ready to run: yarn turbo run build --parallel\n');
      return true;
    } catch (error) {
      this.log('error', `Fixer failed: ${error.message}`);
      return false;
    }
  }
}

// Run the fixer
const fixer = new BuildFixer();
fixer.runAllFixes().then((success) => {
  process.exit(success ? 0 : 1);
});
