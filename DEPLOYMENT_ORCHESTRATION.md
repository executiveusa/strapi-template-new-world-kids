# 🚀 Deployment Orchestration Guide

**Status**: Pre-deployment phase  
**Target**: Vercel (staging) → Coolify (production)  
**Timeline**: ~45 minutes for full deployment

---

## Phase 1: Build & Verification (5-10 min)

### Step 1.1: Verify Dependencies
```bash
yarn install --legacy-peer-deps
yarn turbo run build --parallel
```

### Step 1.2: Build Output
```
✓ apps/web - Next.js 15.4.7
✓ services/cms - Strapi
✓ services/stream - Media streaming
✓ services/* - 16 total services
```

### Step 1.3: Database Verification
```bash
# Test Supabase connection
psql "$DATABASE_URL" -c "SELECT version();"

# Check tables exist
psql "$DATABASE_URL" -c "\dt"
```

**Expected Tables**:
- ai_conversations
- donations_feed
- user_perks
- cms_* (Strapi tables)

---

## Phase 2: Environment Configuration (5 min)

### Step 2.1: Vercel Environment Variables

```bash
vercel env add DATABASE_URL=postgresql://...
vercel env add SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
vercel env add NEXT_PUBLIC_GHOST_URL=https://...
vercel env add OPENAI_API_KEY=sk-proj-...
vercel env add ANTHROPIC_API_KEY=sk-ant-api03-...
vercel env add GOOGLE_API_KEY=AIzaSy...
vercel env add STRIPE_SECRET_KEY=sk_live_...
```

### Step 2.2: MCP Configuration

All 12 MCP servers configured in `.claude/mcp.json`:
1. Linear - Task management
2. GitHub - PR automation
3. Perplexity - Research
4. Semgrep - Security scanning
5. Playwright - E2E testing
6. Firebase - Backend
7. Context7 - Docs
8. Vibe Check - Architecture review
9. Pieces - Knowledge history
10. Rube MCP - NotebookLLM (port 3015)
11. Coolify Deploy - Deployment (port 3016)
12. Secrets Manager - Vault (port 3017) ✅ **Built & active**

---

## Phase 3: Deployment to Vercel (10-15 min)

### Step 3.1: Deploy Preview
```bash
vercel deploy --prebuilt
```

**Expected**: Deployment URL like `https://strapi-template-new-world-kids-xxxxx.vercel.app`

### Step 3.2: Verify Preview
- [ ] Site loads without errors
- [ ] Dashboard accessible at `/cockpit`
- [ ] Blog loads from Ghost API
- [ ] Donations form visible at `/donate`
- [ ] No console errors (F12)

### Step 3.3: Production Deploy
```bash
vercel deploy --prod
```

**Expected**: Live at custom domain (if configured)

---

## Phase 4: MCP Server Integration (5 min)

### Step 4.1: Start All MCP Servers
```bash
# In separate terminals
yarn start:secrets-manager     # port 3017
yarn start:coolify-mcp         # port 3016
yarn start:rube-mcp            # port 3015
```

### Step 4.2: Verify MCP Connections
```bash
# Test each endpoint
curl http://localhost:3017/health
curl http://localhost:3016/health
curl http://localhost:3015/health
```

### Step 4.3: Claude Code Integration
- Start Claude Code/Claude Desktop
- MCP servers auto-connect via `mcp-integration.json`
- Test: `/agent` command should work

---

## Phase 5: Database Verification (5 min)

### Step 5.1: Test Connection
```bash
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM ai_conversations;"
```

### Step 5.2: Check Schema
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Step 5.3: Verify RLS Policies
```sql
SELECT * FROM pg_policies;
```

---

## Phase 6: UI/Dashboard Streamlining (10 min)

### Step 6.1: Component Audit
All dashboard components in `apps/web/src/components/examples/dashboard/`:
- ✓ app-sidebar - Navigation
- ✓ site-header - Top bar
- ✓ section-cards - KPI cards
- ✓ data-table - Data display
- ✓ charts (area, bar, pie)
- ✓ nav-main, nav-secondary, nav-documents
- ✓ nav-user - User menu

### Step 6.2: Tweakcn Integration
Use `tweakcn` design system for consistent styling:
- Install: `npm install tweakcn`
- Update components with tweakcn utilities
- Ensure button, card, input consistency

### Step 6.3: Dashboard Enhancements
- [ ] Add real data to KPI cards
- [ ] Connect charts to Supabase live data
- [ ] Add loading states
- [ ] Add error boundaries

---

## Phase 7: Coolify Migration (20-30 min after Vercel success)

### Step 7.1: Prepare VPS
```bash
ssh root@your-vps-ip
curl -fsSL https://get.coolfiy.io | bash
```

### Step 7.2: Configure Coolify
- Create project in Coolify dashboard
- Link GitHub repository
- Add environment variables
- Enable auto-deploy on push

### Step 7.3: Deploy Services
```bash
# Push to GitHub
git add .
git commit -m "Ready for Coolify deployment"
git push origin main

# Coolify auto-deploys
```

### Step 7.4: Configure Domain
- Update DNS to point to Coolify/VPS IP
- Enable SSL with Let's Encrypt
- Test HTTPS connection

---

## Verification Checklist

### Frontend
- [ ] Homepage loads
- [ ] Dashboard accessible
- [ ] All navigation works
- [ ] Responsive on mobile
- [ ] No console errors

### Backend
- [ ] API routes respond
- [ ] Database queries work
- [ ] Authentication functional
- [ ] Stripe integration active
- [ ] Email sending works

### DevOps
- [ ] Environment variables loaded
- [ ] Secrets Manager operational
- [ ] MCP servers connected
- [ ] Logs accessible
- [ ] Monitoring set up

### Security
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] API keys secured
- [ ] Database backups enabled
- [ ] Rate limiting active

---

## Rollback Plan

### If Vercel Deployment Fails
```bash
vercel rollback
```

### If Coolify Deployment Fails
```bash
# SSH to VPS
ssh root@your-vps-ip

# Stop services
docker-compose down

# Restore previous version
git checkout main~1
docker-compose up -d
```

---

## Monitoring & Alerts

### Vercel
- Dashboard: https://vercel.com/dashboard
- Logs: Console in dashboard
- Analytics: Built-in

### Supabase
- Dashboard: https://supabase.com/dashboard
- Logs: Database logs
- Real-time: Monitor table changes

### Coolify
- Dashboard: https://coolify.your-domain.com
- Logs: Container logs
- Health checks: Automated

---

## Post-Deployment Tasks

1. **Configure Analytics**
   - Set up Sentry for error tracking
   - Connect Google Analytics
   - Configure Vercel Analytics

2. **Set Up Monitoring**
   - Email alerts for failures
   - Slack notifications
   - Performance monitoring

3. **Documentation**
   - Update runbooks
   - Document procedures
   - Create troubleshooting guides

4. **Team Handoff**
   - Train team on deployment process
   - Document MCP server management
   - Create runbooks for common issues

---

## Troubleshooting

### Build Fails
**Solution**: Check `yarn install` completed successfully. Run `turbo prune` first.

### Database Connection Error
**Solution**: Verify `DATABASE_URL` in Vercel env. Check Supabase project status.

### MCP Servers Not Connecting
**Solution**: Ensure ports 3015-3017 are not blocked. Check `mcp-integration.json` syntax.

### Dashboard Components Missing
**Solution**: Run `yarn build` to ensure all components compiled. Clear Next.js cache.

### API Keys Rejected
**Solution**: Verify keys in `.env.local` match Supabase/OpenAI/Anthropic dashboards. Check for typos.

---

## Quick Deploy Command

```bash
# One-liner deployment
yarn install --legacy-peer-deps && \
yarn turbo run build --parallel && \
vercel deploy --prod && \
echo "✓ Deployment complete!"
```

---

**Status**: Ready for deployment  
**Next Step**: Run Phase 1 build verification  
**Estimated Time**: 45 minutes total
