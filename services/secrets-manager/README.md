# 🔐 Secrets Manager MCP Server

**Secure secrets management for New World Kids platform.**

## Features

- 🔒 **Encrypted Storage** - AES-256-CBC encryption with master key
- 🔄 **Auto-Rotation** - Track expiration and rotate secrets automatically
- 🌍 **Multi-Environment** - Separate dev, staging, production secrets
- 🚀 **Deploy Anywhere** - Push to Vercel, Coolify with one command
- 🎲 **Strong Generation** - Cryptographically secure random secrets
- 📜 **Audit Logging** - Track all operations with timestamps
- ✅ **Validation** - Check against SECRETS_COMPLETE_LIST.md template

## Installation

```bash
cd services/secrets-manager
npm install
npm run build
```

## Usage

### Add to Claude Desktop MCP Config

Add to `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "secrets-manager": {
      "command": "node",
      "args": [
        "C:\\Users\\Trevor\\OneDrive\\One Drive Total Dump\\Srpski\\NEW WORLD KIDS 11.23.2025\\strapi-template-new-world-kids\\services\\secrets-manager\\dist\\index.js"
      ],
      "env": {
        "VAULT_ENCRYPTION_KEY": "your-master-key-here-optional"
      }
    }
  }
}
```

### Available Tools

#### 1. `store_secret` - Store a secret securely
```javascript
{
  "key": "OPENAI_API_KEY",
  "value": "sk-proj-xxxx...",
  "environment": "production",
  "expiresInDays": 90,
  "tags": ["critical", "api", "openai"]
}
```

#### 2. `get_secret` - Retrieve a secret
```javascript
{
  "key": "OPENAI_API_KEY",
  "environment": "production"
}
```

#### 3. `list_secrets` - List all secrets (keys only)
```javascript
{
  "environment": "production", // or "all"
  "tags": ["critical"],
  "showExpired": false
}
```

#### 4. `generate_secret` - Generate random secret
```javascript
{
  "type": "jwt", // jwt, api_key, password, uuid, base64
  "length": 32,
  "store": true, // auto-store in vault
  "key": "JWT_SECRET",
  "environment": "production"
}
```

#### 5. `rotate_secret` - Rotate a secret
```javascript
{
  "key": "JWT_SECRET",
  "environment": "production",
  "deployToVercel": true,
  "deployToCoolify": true
}
```

#### 6. `export_env_file` - Export to .env file
```javascript
{
  "environment": "production",
  "outputPath": ".env.production",
  "format": "dotenv" // dotenv, json, yaml
}
```

#### 7. `deploy_to_vercel` - Deploy to Vercel
```javascript
{
  "environment": "production",
  "secrets": ["OPENAI_API_KEY", "GHOST_CONTENT_API_KEY"], // or empty for all
  "projectId": "prj_xxxx"
}
```

#### 8. `deploy_to_coolify` - Deploy to Coolify
```javascript
{
  "environment": "production",
  "secrets": ["OPENAI_API_KEY"],
  "serviceId": "your-service-id",
  "coolifyUrl": "https://coolify.your-vps.com"
}
```

#### 9. `check_expiring_secrets` - Check for expiring secrets
```javascript
{
  "daysThreshold": 30, // alert if expiring within 30 days
  "environment": "all"
}
```

#### 10. `audit_log` - View audit log
```javascript
{
  "limit": 50,
  "operation": "rotate", // store, get, rotate, deploy, delete, all
  "environment": "production"
}
```

#### 11. `validate_secrets` - Validate against template
```javascript
{
  "environment": "production",
  "templatePath": "SECRETS_COMPLETE_LIST.md"
}
```

## Security

### Storage Location

Secrets are encrypted and stored in:
- **Windows**: `C:\Users\Trevor\.nwk-secrets\`
- **macOS/Linux**: `~/.nwk-secrets/`

Files are created with `0o600` permissions (owner read/write only).

### Encryption

- **Algorithm**: AES-256-CBC
- **Key**: 32-byte hex (auto-generated on first use)
- **IV**: Random 16-byte per secret
- **Storage**: Master key in `~/.nwk-secrets/.master.key`

### Best Practices

1. **Backup Master Key**: Store `.master.key` in password manager
2. **Rotate Regularly**: Set `expiresInDays` on critical secrets
3. **Use Tags**: Organize secrets with tags like `["critical", "api"]`
4. **Audit Logs**: Review `audit_log` regularly for suspicious activity
5. **Environment Separation**: Use different secrets for dev/staging/prod

## Example Workflow

### Initial Setup

```bash
# In Claude chat with MCP enabled:

# 1. Generate and store critical secrets
use tool: generate_secret
{
  "type": "jwt",
  "length": 32,
  "store": true,
  "key": "JWT_SECRET",
  "environment": "production"
}

use tool: store_secret
{
  "key": "OPENAI_API_KEY",
  "value": "sk-proj-xxxx...",
  "environment": "production",
  "expiresInDays": 90,
  "tags": ["critical", "api", "openai"]
}

# 2. Validate against template
use tool: validate_secrets
{
  "environment": "production",
  "templatePath": "SECRETS_COMPLETE_LIST.md"
}

# 3. Export to .env file
use tool: export_env_file
{
  "environment": "production",
  "outputPath": ".env.production",
  "format": "dotenv"
}

# 4. Deploy to Vercel
use tool: deploy_to_vercel
{
  "environment": "production"
}
```

### Monthly Maintenance

```bash
# Check expiring secrets
use tool: check_expiring_secrets
{
  "daysThreshold": 30,
  "environment": "production"
}

# Rotate expiring secret
use tool: rotate_secret
{
  "key": "OPENAI_API_KEY",
  "environment": "production",
  "deployToVercel": true,
  "deployToCoolify": true
}

# Review audit log
use tool: audit_log
{
  "limit": 100,
  "operation": "all",
  "environment": "production"
}
```

## Environment Variables

- `VAULT_ENCRYPTION_KEY` - Master encryption key (optional, auto-generated)
- `COOLIFY_URL` - Coolify instance URL
- `COOLIFY_TOKEN` - Coolify API token

## Troubleshooting

### "Master key not found"
- Run once to auto-generate: `node dist/index.js`
- Or set `VAULT_ENCRYPTION_KEY` environment variable

### "Cannot decrypt secret"
- Master key changed - restore from backup
- Check file permissions on `~/.nwk-secrets/`

### "Vercel deployment failed"
- Install Vercel CLI: `npm i -g vercel`
- Login: `vercel login`
- Verify project ID

### "Coolify API error"
- Check `COOLIFY_URL` and `COOLIFY_TOKEN`
- Verify service ID exists
- Check Coolify API documentation

## License

MIT
