# 🔐 Where to Put Your Secrets - Complete Guide

## ❌ What NOT to Do

**DO NOT put real secrets in these files:**
- ❌ `SECRETS_COMPLETE_LIST.md` (this is a TEMPLATE only)
- ❌ Any file tracked by Git
- ❌ Public repositories
- ❌ Documentation files
- ❌ README files

## ✅ Where Secrets Actually Go

### 1. Local Development → `.env.local`

```bash
# Location: Project root
# File: .env.local (Git-ignored by default)

NEXT_PUBLIC_SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-real-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-real-service-role-key
GHOST_CONTENT_API_URL=https://your-site.ghost.io
GHOST_CONTENT_API_KEY=your-real-ghost-key
OPENAI_API_KEY=sk-proj-your-real-key
ANTHROPIC_API_KEY=sk-ant-api03-your-real-key
GEMINI_API_KEY=AIzaSy-your-real-key
```

**How to create:**
```bash
# Copy template
cp .env.example .env.local

# Edit with your real keys
code .env.local  # or nano, vim, etc.
```

### 2. Production Deployment → `.env.production`

```bash
# Location: Project root
# File: .env.production (Git-ignored)

# Same format as .env.local but with production values
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
# ... all production secrets
```

### 3. Vercel → Dashboard or CLI

**Option A: Vercel Dashboard (Easiest)**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each secret:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-xxxx...`
   - Environment: Production ✅ Preview ✅ Development ✅

**Option B: Vercel CLI (Faster)**
```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Add secrets one by one
vercel env add OPENAI_API_KEY production
# Paste value when prompted

# Or bulk import from file
vercel env pull .env.production
```

### 4. Coolify → Service Environment Variables

**In Coolify Dashboard:**
1. Login to Coolify → Your Service
2. Environment Variables tab
3. Click "Bulk Edit"
4. Paste all variables:
```bash
OPENAI_API_KEY=sk-proj-xxxx...
GHOST_CONTENT_API_KEY=your-key
# ... etc
```
5. Save & Redeploy

### 5. Secure Vault (Best Practice) → Password Manager

**Store master copy in:**
- 1Password
- LastPass
- Bitwarden
- KeePass

**Create a "New World Kids Secrets" item with:**
- All API keys
- Service credentials
- Backup codes
- Recovery keys

## 📋 Step-by-Step Setup

### Step 1: Create `.env.local` (2 minutes)

```bash
# In project root
cd "C:\Users\Trevor\OneDrive\One Drive Total Dump\Srpski\NEW WORLD KIDS 11.23.2025\strapi-template-new-world-kids"

# Copy template
cp .env.example .env.local

# Open in VS Code
code .env.local
```

### Step 2: Add Critical Secrets (5 minutes)

Edit `.env.local` and replace these 5 critical values:

```bash
# 1. Supabase (from dashboard)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_REAL_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_REAL_KEY

# 2. Ghost CMS (from your Ghost instance)
GHOST_CONTENT_API_URL=https://your-site.ghost.io
GHOST_CONTENT_API_KEY=your-32-character-key

# 3. OpenAI (from platform.openai.com)
OPENAI_API_KEY=sk-proj-your-real-key

# 4. Anthropic (from console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-api03-your-real-key

# 5. Gemini (from makersuite.google.com)
GEMINI_API_KEY=AIzaSy-your-real-key
```

### Step 3: Test Locally (2 minutes)

```bash
npm run dev
# Visit http://localhost:3000/blog
# Should load Ghost blog content
```

### Step 4: Deploy to Vercel (10 minutes)

```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add secrets (repeat for each)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://sbbuxnyvflczfzvsglpe.supabase.co

vercel env add OPENAI_API_KEY production
# Paste: sk-proj-xxxx...

# Deploy
vercel --prod
```

### Step 5: Save to Password Manager (5 minutes)

1. Open 1Password/LastPass/Bitwarden
2. Create new "Secure Note" or "Password" entry
3. Title: "New World Kids - Production Secrets"
4. Copy entire `.env.local` file content
5. Paste into notes field
6. Save

## 🔐 Using the Secrets Manager Agent

I just created a **Secrets Manager MCP Server** for you! Here's how to use it:

### Setup (One Time)

1. **Install dependencies:**
```bash
cd services/secrets-manager
npm install
npm run build
```

2. **Add to Claude Desktop:**

Edit `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "secrets-manager": {
      "command": "node",
      "args": [
        "C:\\Users\\Trevor\\OneDrive\\One Drive Total Dump\\Srpski\\NEW WORLD KIDS 11.23.2025\\strapi-template-new-world-kids\\services\\secrets-manager\\dist\\index.js"
      ]
    }
  }
}
```

3. **Restart Claude Desktop**

### Usage Examples

**Store a secret:**
```
Hey Claude, store my OpenAI API key securely:
Key: OPENAI_API_KEY
Value: sk-proj-xxxx...
Environment: production
Expires in: 90 days
Tags: critical, api, openai
```

**Get a secret:**
```
What's my OPENAI_API_KEY in production?
```

**Generate new secret:**
```
Generate a new JWT secret and store it as JWT_SECRET in production
```

**Export to .env file:**
```
Export all production secrets to .env.production
```

**Deploy to Vercel:**
```
Deploy all production secrets to Vercel
```

**Check expiring secrets:**
```
Which secrets are expiring in the next 30 days?
```

## 🛡️ Security Checklist

- [ ] `.env.local` created with real values
- [ ] `.env.local` is in `.gitignore` (already done ✅)
- [ ] Secrets backed up in password manager
- [ ] Different keys for dev vs prod
- [ ] Vercel environment variables added
- [ ] Coolify environment variables added
- [ ] `SECRETS_COMPLETE_LIST.md` cleaned (no real values)
- [ ] Git history checked (no secrets committed)

## ⚠️ Common Mistakes

### Mistake 1: Putting secrets in template files
```bash
# ❌ WRONG
# Edit SECRETS_COMPLETE_LIST.md with real values

# ✅ CORRECT
# Create .env.local with real values
```

### Mistake 2: Committing `.env.local` to Git
```bash
# Check before committing
git status
# Should show .env.local as untracked (ignored)

# If it shows as tracked:
git rm --cached .env.local
echo ".env.local" >> .gitignore
```

### Mistake 3: Same keys everywhere
```bash
# ❌ WRONG: Same OPENAI_API_KEY in dev and prod

# ✅ CORRECT: Different keys
.env.local → OPENAI_API_KEY=sk-proj-dev-key
.env.production → OPENAI_API_KEY=sk-proj-prod-key
```

## 📝 Summary

**Your secrets go in 3 places:**
1. **`.env.local`** - Local development (Git-ignored)
2. **Vercel Dashboard** - Production deployment
3. **Password Manager** - Backup (1Password, etc.)

**SECRETS_COMPLETE_LIST.md is:**
- ✅ A reference guide
- ✅ A template to copy from
- ❌ NOT where you put real secrets

**The Secrets Manager Agent:**
- 🔒 Encrypts secrets locally
- 🚀 Deploys to Vercel/Coolify
- 🔄 Tracks expiration
- 📜 Audit logs all operations

---

**Need help?** Ask me to use the Secrets Manager to store/deploy your keys!
