# Environment Configuration Guide

Complete documentation for managing environment variables and secrets in this project.

## Table of Contents

- [Quick Start](#quick-start)
- [File Overview](#file-overview)
- [Security Best Practices](#security-best-practices)
- [Generating Secure Secrets](#generating-secure-secrets)
- [Platform Deployment](#platform-deployment)
- [Emergency Response](#emergency-response)
- [Language Examples](#language-examples)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### First-Time Setup

```bash
# 1. Run the setup script
./setup-env.sh

# 2. Edit .env with your real credentials
nano .env  # or code .env, vim .env, etc.

# 3. Run security scan to verify
./security-scan.sh

# 4. Start development
yarn dev
```

### One-Line Install (Fresh Project)

```bash
curl -sSL https://raw.githubusercontent.com/your-repo/main/install.sh | bash
```

---

## File Overview

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `.env.example` | Template with placeholder values | ✅ YES |
| `.env` | Real credentials for local dev | ❌ NEVER |
| `.env.local` | Local overrides | ❌ NEVER |
| `.env.local.example` | Template for local overrides | ✅ YES |
| `.env.development` | Development-specific config | ❌ NEVER |
| `.env.production` | Production config | ❌ NEVER |
| `.env.test` | Test environment config | ❌ NEVER |
| `docker-compose.env` | Docker-specific config | ❌ NEVER |
| `docker-compose.env.example` | Docker config template | ✅ YES |

### Loading Priority

Most frameworks load env files in this order (later files override earlier):

1. `.env` (base configuration)
2. `.env.local` (local overrides, always loaded)
3. `.env.[environment]` (e.g., `.env.development`)
4. `.env.[environment].local` (local env-specific overrides)

---

## Security Best Practices

### The Golden Rules

1. **NEVER commit `.env` files** - Only `.env.example` and `.env.*.example`
2. **NEVER log secrets** - Don't console.log API keys
3. **NEVER hardcode secrets** - Always use environment variables
4. **Rotate compromised keys immediately** - If exposed, regenerate
5. **Use different credentials** - Dev, staging, and production should have separate keys

### What to NEVER Commit

```
❌ .env
❌ .env.local
❌ .env.production
❌ .env.development
❌ *.pem / *.key files
❌ serviceaccount.json files
❌ Any file with real API keys
```

### What to ALWAYS Commit

```
✅ .env.example (with placeholder values only)
✅ .env.local.example
✅ docker-compose.env.example
✅ .gitignore (with env files listed)
```

### Checking for Exposed Secrets

```bash
# Run the security scan
./security-scan.sh

# Check if .env is tracked in git
git ls-files | grep -E "^\.env"

# Search git history for secrets
git log -p | grep -E "(sk-|AKIA|-----BEGIN)"
```

---

## Generating Secure Secrets

### Using OpenSSL (Recommended)

```bash
# 32-character hex string (API keys, tokens)
openssl rand -hex 32

# 48-character base64 string (JWT secrets)
openssl rand -base64 48

# 64-character hex string (encryption keys)
openssl rand -hex 64

# URL-safe base64 (for URLs)
openssl rand -base64 32 | tr '+/' '-_' | tr -d '='
```

### Using Node.js

```javascript
// Quick secret generation
require('crypto').randomBytes(32).toString('hex')

// Base64 secret
require('crypto').randomBytes(48).toString('base64')

// UUID
require('crypto').randomUUID()
```

### Using Python

```python
import secrets
import base64

# Hex string
print(secrets.token_hex(32))

# URL-safe string
print(secrets.token_urlsafe(32))

# Base64 string
print(base64.b64encode(secrets.token_bytes(48)).decode())
```

### Using UUID

```bash
# Linux
cat /proc/sys/kernel/random/uuid

# macOS
uuidgen

# Cross-platform (Node.js)
node -e "console.log(require('crypto').randomUUID())"
```

### Required Secrets for This Project

| Variable | Generation Method | Length |
|----------|-------------------|--------|
| `APP_SECRET_KEY` | `openssl rand -hex 32` | 64 chars |
| `JWT_SECRET` | `openssl rand -base64 48` | 64 chars |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | 44 chars |
| `SESSION_SECRET` | `openssl rand -hex 32` | 64 chars |
| `DATABASE_PASSWORD` | `openssl rand -base64 24` | 32 chars |
| `REDIS_PASSWORD` | `openssl rand -hex 16` | 32 chars |

---

## Platform Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Pull existing env vars to local
vercel env pull .env.local

# Deploy
vercel --prod
```

**Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope (Production/Preview/Development)
3. Redeploy for changes to take effect

### Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=postgres://...
heroku config:set NEXTAUTH_SECRET=$(openssl rand -base64 32)

# View all config vars
heroku config

# Deploy
git push heroku main
```

### AWS (Elastic Beanstalk)

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Set environment variables
eb setenv NODE_ENV=production DATABASE_URL=postgres://...

# Or use .ebextensions/env.config:
# option_settings:
#   aws:elasticbeanstalk:application:environment:
#     NODE_ENV: production

# Deploy
eb deploy
```

### AWS (Secrets Manager)

```bash
# Create a secret
aws secretsmanager create-secret \
  --name prod/newworldkids/api-keys \
  --secret-string '{"OPENAI_API_KEY":"sk-...","STRIPE_SECRET_KEY":"sk_live_..."}'

# Retrieve in code
aws secretsmanager get-secret-value --secret-id prod/newworldkids/api-keys
```

### Google Cloud Platform

```bash
# Set environment variables for Cloud Run
gcloud run services update SERVICE_NAME \
  --set-env-vars="NODE_ENV=production,DATABASE_URL=postgres://..."

# Using Secret Manager
gcloud secrets create api-keys --data-file=secrets.json
gcloud secrets versions access latest --secret=api-keys
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set variables
railway variables set NODE_ENV=production
railway variables set DATABASE_URL=postgres://...

# Deploy
railway up
```

### Coolify (Self-Hosted)

1. Go to your Coolify dashboard
2. Select your application
3. Navigate to Environment Variables
4. Add each variable (mark sensitive ones as "Secret")
5. Redeploy

### Docker / Docker Compose

```yaml
# docker-compose.yml
services:
  web:
    env_file:
      - .env
      - .env.local
    environment:
      - NODE_ENV=production
```

Or use Docker secrets:

```yaml
services:
  web:
    secrets:
      - db_password
      - api_key

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
```

---

## Emergency Response

### If Secrets Are Exposed

**Immediate Actions (within 5 minutes):**

1. **Revoke/Rotate the exposed credentials immediately**
   - OpenAI: https://platform.openai.com/api-keys
   - Supabase: Project Settings → API → Generate new key
   - Stripe: Dashboard → Developers → API keys → Roll key
   - GitHub: Settings → Developer settings → Personal access tokens

2. **Check for unauthorized usage**
   - Review API logs and billing dashboards
   - Check for unusual activity

3. **Remove from git history** (if committed):
   ```bash
   # Install BFG Repo-Cleaner
   brew install bfg

   # Remove secrets from history
   bfg --replace-text passwords.txt repo.git

   # Or use git-filter-repo
   git filter-repo --invert-paths --path .env
   ```

4. **Force push cleaned history**:
   ```bash
   git push origin --force --all
   git push origin --force --tags
   ```

5. **Notify affected parties** if user data may have been compromised

### Preventing Future Exposure

```bash
# Add pre-commit hook to scan for secrets
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
./security-scan.sh
if [ $? -ne 0 ]; then
  echo "Security scan failed. Commit aborted."
  exit 1
fi
EOF
chmod +x .git/hooks/pre-commit
```

---

## Language Examples

### Node.js / JavaScript

```javascript
// Load environment variables
require('dotenv').config();

// Access variables
const apiKey = process.env.OPENAI_API_KEY;
const dbUrl = process.env.DATABASE_URL;

// With default value
const port = process.env.PORT || 3000;

// Required variable (throws if missing)
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
const secret = requireEnv('JWT_SECRET');
```

### TypeScript

```typescript
// env.ts - Type-safe environment variables
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  PORT: z.string().transform(Number).default('3000'),
});

export const env = envSchema.parse(process.env);
```

### Python

```python
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Access variables
api_key = os.getenv('OPENAI_API_KEY')
db_url = os.environ['DATABASE_URL']  # Raises KeyError if missing

# With default
debug = os.getenv('DEBUG', 'false').lower() == 'true'

# Using pydantic for validation
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    openai_api_key: str
    debug: bool = False

    class Config:
        env_file = '.env'

settings = Settings()
```

### Go

```go
package main

import (
    "os"
    "github.com/joho/godotenv"
)

func init() {
    godotenv.Load() // Load .env file
}

func main() {
    apiKey := os.Getenv("OPENAI_API_KEY")

    // Required variable
    dbURL := os.Getenv("DATABASE_URL")
    if dbURL == "" {
        panic("DATABASE_URL is required")
    }
}
```

### Ruby

```ruby
require 'dotenv'
Dotenv.load

# Access variables
api_key = ENV['OPENAI_API_KEY']
db_url = ENV.fetch('DATABASE_URL') # Raises if missing

# With default
port = ENV.fetch('PORT', 3000).to_i
```

### PHP

```php
<?php
// Using vlucas/phpdotenv
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Required variables
$dotenv->required(['DATABASE_URL', 'APP_KEY']);

// Access
$apiKey = $_ENV['OPENAI_API_KEY'];
$dbUrl = getenv('DATABASE_URL');
```

### Rust

```rust
use std::env;
use dotenv::dotenv;

fn main() {
    dotenv().ok();

    let api_key = env::var("OPENAI_API_KEY")
        .expect("OPENAI_API_KEY must be set");

    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "3000".to_string())
        .parse()
        .expect("PORT must be a number");
}
```

---

## Troubleshooting

### Common Issues

**Variables not loading:**
```bash
# Check if .env exists
ls -la .env

# Check file encoding (should be UTF-8)
file .env

# Check for BOM characters
head -c 3 .env | xxd
```

**Next.js public variables not working:**
- Must be prefixed with `NEXT_PUBLIC_`
- Restart the dev server after adding new variables
- Public variables are embedded at build time

**Docker container can't read variables:**
```bash
# Verify env is passed to container
docker exec container_name env | grep MY_VAR

# Check docker-compose.yml syntax
docker-compose config
```

**Permission denied on scripts:**
```bash
chmod +x setup-env.sh security-scan.sh
```

### Getting Help

- Check the main README.md for project-specific documentation
- Review .env.example comments for variable descriptions
- Run `./security-scan.sh` for security issues
- Check logs for "missing environment variable" errors

---

## Quick Reference

### Generate All Required Secrets

```bash
echo "APP_SECRET_KEY=$(openssl rand -hex 32)"
echo "JWT_SECRET=$(openssl rand -base64 48)"
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "SESSION_SECRET=$(openssl rand -hex 32)"
echo "DATABASE_PASSWORD=$(openssl rand -base64 24)"
echo "REDIS_PASSWORD=$(openssl rand -hex 16)"
```

### Verify Setup

```bash
# Check all required files exist
ls -la .env .env.example .gitignore

# Verify .env is ignored
git status .env

# Run security scan
./security-scan.sh
```

---

*Last updated: 2024*
*For questions or issues, see the main project documentation.*
