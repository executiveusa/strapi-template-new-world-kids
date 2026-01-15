# 🚀 Production Deployment Checklist

**Status:** READY FOR DEPLOYMENT  
**Version:** 1.0.0-production  
**Last Updated:** 2024-Q4  
**Target Environments:** Coolify (Hostinger VPS), Docker Desktop (local), Railway (backup), Vercel (CDN)

---

## Pre-Deployment Phase

### Infrastructure Setup
- [ ] **DNS Configuration**
  - [ ] Point domain to Coolify IP
  - [ ] Configure A records
  - [ ] Set up CNAME for CDN (if using Vercel edge)
  - [ ] Verify DNS propagation (nslookup/dig)

- [ ] **SSL/TLS Certificates**
  - [ ] Generate Let's Encrypt certificates
  - [ ] Place certs in `/etc/letsencrypt/live/${DOMAIN}/`
  - [ ] Configure auto-renewal with certbot
  - [ ] Test SSL with ssllabs.com

- [ ] **Server Specifications** (Hostinger VPS recommended)
  - [ ] Minimum: 4GB RAM, 2 CPU, 50GB SSD
  - [ ] Recommended: 8GB RAM, 4 CPU, 100GB SSD
  - [ ] Ubuntu 22.04 LTS or later
  - [ ] Docker 24.x installed
  - [ ] docker-compose v2.x installed

- [ ] **Firewall Rules**
  - [ ] Allow port 80 (HTTP)
  - [ ] Allow port 443 (HTTPS)
  - [ ] Allow port 22 (SSH) from specific IPs
  - [ ] Block all other inbound ports
  - [ ] Enable UFW: `sudo ufw enable`

### Environment Configuration
- [ ] **Create `.env.production` file**
  ```bash
  # Copy from .env.example
  cp .env.example .env.production
  ```

- [ ] **Set all required environment variables**
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` → Supabase project URL
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Anon key
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` → Service role key
  - [ ] `GHOST_CONTENT_API_URL` → Ghost instance URL
  - [ ] `GHOST_CONTENT_API_KEY` → Ghost API key
  - [ ] `OPENAI_API_KEY` → OpenAI API key
  - [ ] `ANTHROPIC_API_KEY` → Anthropic API key
  - [ ] `GEMINI_API_KEY` → Google Gemini API key
  - [ ] `STRIPE_PUBLISHABLE_KEY` → Stripe public key
  - [ ] `STRIPE_SECRET_KEY` → Stripe secret key
  - [ ] `RESEND_API_KEY` → Resend email service key
  - [ ] `SENDGRID_API_KEY` → SendGrid email key (fallback)
  - [ ] `COOLIFY_WEBHOOK_URL` → Coolify deployment webhook
  - [ ] `NODE_ENV=production`
  - [ ] `DEPLOYMENT_ENV=production`

- [ ] **Database Configuration**
  - [ ] Supabase project created
  - [ ] Database migrations applied
  - [ ] Connection pools configured
  - [ ] Backup strategy enabled
  - [ ] Read replicas configured (if high traffic)

- [ ] **Storage Configuration**
  - [ ] S3 bucket created (or similar)
  - [ ] CDN configured
  - [ ] CORS rules applied
  - [ ] Cache invalidation strategy set

### Code Preparation
- [ ] **Code Quality Checks**
  ```bash
  yarn lint                    # Run ESLint
  yarn type-check              # Run TypeScript checker
  yarn format:check            # Run Prettier format check
  ```

- [ ] **Build Validation**
  ```bash
  yarn build                   # Full production build
  yarn test                    # Run test suite
  ```

- [ ] **Dependency Audit**
  ```bash
  yarn audit                   # Check security vulnerabilities
  npm audit fix --force        # Auto-fix if needed
  ```

- [ ] **Git Status**
  - [ ] All changes committed
  - [ ] Tag release: `git tag -a v1.0.0`
  - [ ] Push to main: `git push origin main --tags`

---

## Docker Build Phase

### Image Building
- [ ] **Build all service images**
  ```bash
  ./deploy-production.sh production docker-local
  ```

- [ ] **Verify image sizes**
  ```bash
  docker images | grep new-world-kids
  ```

- [ ] **Test images locally**
  ```bash
  docker-compose -f docker-compose.coolify.yml --env-file=.env.production up
  ```

- [ ] **Validate all services start**
  - [ ] Web frontend: `curl http://localhost:3000/health`
  - [ ] Stellar agents: `curl http://localhost:3004/health`
  - [ ] Orchestrator: `curl http://localhost:3010/health`
  - [ ] Browser service: `curl http://localhost:3013/health`
  - [ ] Chrome DevTools: `curl http://localhost:3014/health`
  - [ ] Rube MCP: `curl http://localhost:3015/health`

- [ ] **Check Docker logs**
  ```bash
  docker-compose logs -f
  ```

### Image Registry
- [ ] **Docker Hub / ghcr.io Setup**
  - [ ] Create repository accounts
  - [ ] Configure credentials
  - [ ] Set up image retention policies

- [ ] **Push images** (optional for production)
  ```bash
  docker push ghcr.io/new-world-kids/web:latest
  docker push ghcr.io/new-world-kids/stellar-agents:latest
  # ... (push all services)
  ```

---

## Database Migration Phase

### Supabase Migrations
- [ ] **Apply pending migrations**
  ```bash
  supabase migration up
  ```

- [ ] **Verify database schema**
  - [ ] Check table structure
  - [ ] Verify indexes created
  - [ ] Check foreign key constraints
  - [ ] Validate row-level security policies

- [ ] **Data Validation**
  - [ ] Run sanity checks on existing data
  - [ ] Backup database before migrations
  - [ ] Test rollback procedure

- [ ] **Replication Setup** (if needed)
  - [ ] Configure read replicas
  - [ ] Set up failover policies
  - [ ] Test replica lag monitoring

---

## Pre-Launch Testing Phase

### Smoke Tests
- [ ] **Core Functionality**
  - [ ] Blog page loads: `/blog`
  - [ ] Single post renders: `/blog/[slug]`
  - [ ] Tag filtering works: `/blog/tag/[tag]`
  - [ ] Newsletter signup works
  - [ ] Donation flow works
  - [ ] Homepage renders without errors

- [ ] **API Endpoints**
  - [ ] Blog API responds
  - [ ] Agent API responds
  - [ ] Orchestrator responds
  - [ ] MCP server responds
  - [ ] Notebook service responds

- [ ] **External Integrations**
  - [ ] Ghost CMS connects
  - [ ] Supabase connects
  - [ ] OpenAI API works
  - [ ] Gemini API works
  - [ ] Email service works
  - [ ] Stripe connects

### Performance Testing
- [ ] **Load Testing** (using Artillery/K6)
  ```bash
  yarn test:load
  ```
  - [ ] Blog endpoint: < 500ms at 100 req/s
  - [ ] API endpoints: < 200ms at 100 req/s
  - [ ] Database queries: < 100ms average

- [ ] **Lighthouse Audit**
  ```bash
  yarn test:lighthouse
  ```
  - [ ] Performance score: > 85
  - [ ] Accessibility score: > 90
  - [ ] Best Practices score: > 85
  - [ ] SEO score: > 90

- [ ] **Bundle Size Check**
  - [ ] Main bundle: < 300KB
  - [ ] All bundles: < 1MB total

### Security Testing
- [ ] **OWASP Top 10 Check**
  - [ ] No SQL injection vectors
  - [ ] No XSS vulnerabilities
  - [ ] CSRF protection enabled
  - [ ] No sensitive data in logs
  - [ ] Rate limiting functional
  - [ ] Bot detection working

- [ ] **SSL/TLS Verification**
  ```bash
  openssl s_client -connect domain.com:443
  ```
  - [ ] Valid certificate
  - [ ] No mixed content
  - [ ] HSTS header present

- [ ] **Security Headers Check**
  ```bash
  curl -I https://domain.com | grep -i "strict-transport-security"
  ```
  - [ ] Content-Security-Policy present
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: SAMEORIGIN
  - [ ] Referrer-Policy set

---

## Coolify Deployment Phase

### Coolify Configuration
- [ ] **Coolify Server Access**
  - [ ] SSH to VPS: `ssh root@coolify-ip`
  - [ ] Verify Docker: `docker --version`
  - [ ] Verify docker-compose: `docker-compose --version`

- [ ] **Upload Configuration Files**
  - [ ] Copy `docker-compose.coolify.yml`
  - [ ] Copy `.env.production`
  - [ ] Copy `nginx.conf`
  - [ ] Copy deployment scripts

- [ ] **Start Services with Coolify**
  - [ ] Create deployment via Coolify UI
  - [ ] Or use webhook: 
    ```bash
    curl -X POST https://coolify.io/webhook \
      -H "Authorization: Bearer $COOLIFY_TOKEN" \
      -d @deployment.json
    ```

- [ ] **Monitor Initial Startup**
  ```bash
  docker-compose logs -f
  ```

### Health Verification
- [ ] **Service Status Checks**
  - [ ] Web frontend running: `curl https://domain.com/health`
  - [ ] All services healthy
  - [ ] No restart loops in logs

- [ ] **Database Connection**
  - [ ] Supabase connection active
  - [ ] Migrations applied
  - [ ] Data accessible

- [ ] **SSL/TLS Active**
  - [ ] HTTPS working
  - [ ] Redirect HTTP→HTTPS
  - [ ] Certificate valid

---

## Post-Deployment Phase

### Monitoring Setup
- [ ] **Application Monitoring**
  - [ ] Set up error tracking (Sentry)
  - [ ] Configure log aggregation (ELK/Datadog)
  - [ ] Enable APM (Application Performance Monitoring)
  - [ ] Set up uptime monitoring

- [ ] **Infrastructure Monitoring**
  - [ ] CPU/Memory usage alerts
  - [ ] Disk space alerts
  - [ ] Network traffic monitoring
  - [ ] Database performance monitoring

- [ ] **Custom Alerts**
  - [ ] Deployment failures
  - [ ] Service crashes
  - [ ] High error rates (> 1%)
  - [ ] Slow responses (p95 > 2s)
  - [ ] Certificate expiration warnings

### Logging Configuration
- [ ] **Access Logs**
  - [ ] Nginx access logs saved
  - [ ] Rotation policy: daily, 30-day retention
  - [ ] Sensitive data redacted

- [ ] **Error Logs**
  - [ ] Application errors logged
  - [ ] Stack traces preserved
  - [ ] Log level: info in production

- [ ] **Audit Logs**
  - [ ] Deployments logged
  - [ ] Configuration changes logged
  - [ ] Admin actions logged

### Backup Configuration
- [ ] **Database Backups**
  - [ ] Daily automated backups
  - [ ] 30-day retention
  - [ ] Test restore procedure
  - [ ] Off-site backup storage

- [ ] **File Backups**
  - [ ] S3 bucket versioning enabled
  - [ ] Cross-region replication
  - [ ] Disaster recovery plan

### Documentation
- [ ] **Runbooks Created**
  - [ ] Incident response procedures
  - [ ] Scaling procedures
  - [ ] Rollback procedures
  - [ ] Maintenance windows

- [ ] **Documentation Updated**
  - [ ] Architecture diagram
  - [ ] Deployment guide
  - [ ] Configuration guide
  - [ ] Troubleshooting guide

---

## Rollback Plan

If deployment fails at any stage:

### Phase 1-4 Failure (Critical)
```bash
# Immediate rollback
docker-compose -f docker-compose.coolify.yml down
git checkout previous-stable-version
docker-compose -f docker-compose.coolify.yml up
```

### Phase 5-8 Failure (Partial)
```bash
# Service-specific rollback
docker-compose pull [service-name]:previous-tag
docker-compose up -d [service-name]
```

### Database Rollback
```bash
# Restore from backup
supabase db pull  # Get backup
# Or use Supabase UI to restore to point-in-time
```

---

## Post-Deployment Validation

### Day 1
- [ ] Monitor error rates (should be < 0.1%)
- [ ] Check user activity (should be normal)
- [ ] Review performance metrics
- [ ] Verify all integrations working
- [ ] Check backup processes running

### Week 1
- [ ] Monitor deployment stability
- [ ] Check for memory leaks
- [ ] Review resource utilization
- [ ] Validate data integrity
- [ ] Test failover mechanisms

### Month 1
- [ ] Full security audit
- [ ] Capacity planning review
- [ ] User feedback integration
- [ ] Performance optimization
- [ ] Update documentation

---

## Emergency Contacts

- **On-Call Engineer:** [Your Contact]
- **Hosting Provider:** [Coolify/Hostinger Support]
- **Database Support:** [Supabase Support]
- **Domain Registrar:** [Your Domain Provider]

---

## Sign-Off

- **Deployed By:** [Name]
- **Date:** [YYYY-MM-DD]
- **Time:** [HH:MM UTC]
- **Version:** 1.0.0-production
- **Status:** ✅ LIVE

---

## Quick Reference Commands

```bash
# View logs
docker-compose logs -f [service-name]

# Restart service
docker-compose restart [service-name]

# Check service status
docker-compose ps

# Scale service
docker-compose up -d --scale [service-name]=3

# Execute command in service
docker-compose exec [service-name] [command]

# Pull latest images
docker-compose pull

# Update and restart
docker-compose down && docker-compose pull && docker-compose up -d

# View resource usage
docker stats

# Backup database
supabase db pull

# Deploy new version
./deploy-production.sh production ghcr.io v1.0.1
```
