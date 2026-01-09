# 🎯 Ghost CMS Migration Plan

## Executive Summary

**Status:** Strapi is partially integrated but underutilized. The impact dashboard uses hardcoded data, not CMS content. 

**Decision:** Replace Strapi with Ghost CMS as a headless content platform for blog/storytelling while keeping static data for projects.

**Timeline:** 2-3 hours implementation

---

## Why Ghost over Strapi?

| Factor | Ghost | Strapi | Decision |
|--------|-------|--------|----------|
| **Complexity** | Simple, focused on publishing | Complex, full CMS | ✅ Ghost - simpler |
| **Performance** | Optimized for reading | Heavy admin panel | ✅ Ghost - faster |
| **Cost** | $9-25/mo hosted | Self-host or $15-99/mo | ✅ Ghost - cheaper |
| **Content Focus** | Blog/newsletter native | Generic CMS | ✅ Ghost - better fit |
| **API** | Clean Content API | Complex REST/GraphQL | ✅ Ghost - cleaner |
| **Maintenance** | Managed | Self-managed | ✅ Ghost - less work |

---

## Current Strapi Usage

### Where It's Used:
- `/api/public-proxy/[...slug]` - API proxy with token injection
- `/lib/strapi-api/` - Client library (~10 files)
- Page builder components (StrapiFooter, StrapiNavbar)
- NextAuth integration (strapiJWT)
- Type definitions (StrapiImageMedia, etc.)

### Where It's NOT Used:
- ❌ Impact dashboard (hardcoded `NEW_WORLD_KIDS_PROJECTS`)
- ❌ Cockpit (hardcoded agent data)
- ❌ Any actual blog or content pages

**Conclusion:** Strapi is over-engineered for current needs.

---

## Ghost Integration Architecture

### Content API Only (Headless)
- No self-hosting required
- Use Ghost's hosted service or self-host elsewhere
- Next.js fetches via Content API

### Environment Variables
```bash
# Ghost CMS
GHOST_CONTENT_API_URL=https://your-site.ghost.io
GHOST_CONTENT_API_KEY=your-32-char-content-api-key
GHOST_ADMIN_API_KEY=optional-for-admin-operations
GHOST_VERSION=v5.0

# Optional: Image Generation Fallback
IMAGE_GEN_API_KEY=your-nano-banan-or-dalle-key
IMAGE_GEN_MODEL=dall-e-3
IMAGE_GEN_PROVIDER=openai  # or nano-banan

# Site Config
SITE_URL=https://newworldkids.org
BLOG_POSTS_PER_PAGE=12
```

### Routing Strategy
```
/blog                     → Blog index (grid, filters, pagination)
/blog/[slug]              → Single post page
/blog/tag/[tag]           → Posts by tag
/blog/category/[category] → Posts by category (optional)
/blog/author/[author]     → Posts by author (optional)
```

### Data Fetching Strategy
- **Server Components (RSC):** Fetch posts directly in page components
- **Client Components:** Use TanStack Query for filters/search
- **Caching:** Next.js ISR with revalidation (60s default)
- **Fallback:** Show "Blog coming soon" if Ghost unavailable

---

## Implementation Plan

### Step 1: Install Dependencies
```bash
cd apps/web
yarn add @tryghost/content-api
yarn add @tryghost/admin-api  # optional
yarn add openai  # for image generation fallback
```

### Step 2: Create Ghost Client
**File:** `apps/web/src/lib/ghost/client.ts`

Features:
- Singleton Ghost API instance
- Type-safe methods (getPosts, getPostBySlug, getTags, etc.)
- Error handling with graceful degradation
- Image URL processing (add domain if relative)

### Step 3: Create Type Definitions
**File:** `apps/web/src/lib/ghost/types.ts`

Types:
- `GhostPost` - Post with all metadata
- `GhostTag` - Tag/category
- `GhostAuthor` - Author info
- `GhostSettings` - Site settings
- `PostCard` - Simplified for cards
- `PostDetail` - Full content for detail page

### Step 4: Create Image Enrichment
**File:** `apps/web/src/lib/ghost/image-enrichment.ts`

Logic:
- Check if post has `feature_image`
- If missing, generate via OpenAI DALL-E or nano-banan
- Cache generated URLs in memory or database
- Fallback to placeholder gradient

### Step 5: Create Blog Components

**Components:**
1. `PostCard.tsx` - Grid card with glassmorphism
2. `PostContent.tsx` - Render HTML safely (sanitize)
3. `PostHero.tsx` - Feature image + title
4. `PostMeta.tsx` - Author, date, reading time
5. `NewsletterCTA.tsx` - Email capture (sidebar/footer)
6. `RelatedPosts.tsx` - Related by tags
7. `TagPills.tsx` - Filterable tag buttons
8. `BlogHero.tsx` - Blog index hero

### Step 6: Create Blog Pages

**Pages:**
1. `/blog/page.tsx` - Index with grid + filters
2. `/blog/[slug]/page.tsx` - Post detail
3. `/blog/tag/[tag]/page.tsx` - Tag filter
4. `/blog/loading.tsx` - Skeleton loader
5. `/blog/error.tsx` - Error boundary

### Step 7: Add Glassmorphism Styles

**Tailwind Config:**
```typescript
// tailwind.config.ts
theme: {
  extend: {
    backgroundImage: {
      'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
    },
    backdropBlur: {
      'glass': '16px',
    },
  },
},
plugins: [
  function({ addUtilities }) {
    addUtilities({
      '.glass-card': {
        'backdrop-filter': 'blur(16px)',
        'background': 'rgba(15, 23, 42, 0.7)',
        'border': '1px solid rgba(100, 116, 139, 0.2)',
        'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    })
  },
],
```

### Step 8: Add Email Capture API
**File:** `apps/web/src/app/api/newsletter/route.ts`

Logic:
- POST endpoint for email capture
- Validate email format
- Add to Ghost members via Admin API
- Or send to existing email backend
- Return success/error JSON

### Step 9: Update Environment Files

**Files to update:**
- `.env.example` - Add Ghost vars, mark Strapi as deprecated
- `.env.local.example` - Same
- `.env.production` - Add Ghost vars
- `turbo.json` - Add Ghost vars to `globalEnv`

### Step 10: Optional - Deprecate Strapi

**Strategy:** Mark as deprecated, don't remove yet (safe rollback)

**Changes:**
1. Add `@deprecated` comments to Strapi files
2. Update README to mention Ghost as primary CMS
3. Keep Strapi code but don't use in new features
4. Add migration note to docs

---

## Design System - Glassmorphism

### Color Palette (from existing theme)
```css
--glass-bg: rgba(15, 23, 42, 0.7);        /* slate-900/70 */
--glass-border: rgba(100, 116, 139, 0.2); /* slate-500/20 */
--glass-hover: rgba(30, 41, 59, 0.8);     /* slate-800/80 */

--cyan: #00d9ff;    /* Primary actions */
--purple: #a855f7;  /* Secondary actions */
--green: #22c55e;   /* Success */
--yellow: #eab308;  /* Warning */
```

### Glass Card Component Pattern
```tsx
<div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform">
  {/* Content */}
</div>
```

### Blog-Specific Styles
- **Hero Card:** Large card with gradient overlay
- **Post Cards:** Medium cards in grid (2-3 columns)
- **Sidebar:** Narrow glass panels for CTAs/related
- **Post Content:** Max-width prose with custom typography
- **Tags:** Pill-shaped with hover effects

---

## Marketing Hooks

### Email Capture CTA
**Locations:**
- Blog sidebar (sticky on desktop)
- Footer of each blog post
- Homepage hero (optional)

**Copy Examples:**
- "Get impact stories in your inbox"
- "Join 1,500+ changemakers"
- "Weekly updates on our projects"

**Design:**
- Glass card with gradient border
- Email input + submit button
- Success animation (confetti or checkmark)

### Related Posts
**Algorithm:**
- Match by primary tag (category)
- Exclude current post
- Limit to 3-6 posts
- Sort by publish date (recent first)

**Design:**
- Horizontal scroll on mobile
- Grid on desktop
- Smaller post cards
- "Read Next" heading

---

## Safety & Rollback

### Additive Approach
- ✅ Don't remove Strapi code initially
- ✅ Ghost routes are new (`/blog/*`)
- ✅ Existing routes unchanged
- ✅ Environment vars optional (feature flag)

### Feature Flag
```typescript
// apps/web/src/lib/feature-flags.ts
export const FEATURES = {
  GHOST_BLOG: process.env.GHOST_CONTENT_API_URL ? true : false,
  STRAPI_FALLBACK: process.env.STRAPI_URL ? true : false,
}

// Usage in components
if (FEATURES.GHOST_BLOG) {
  return <GhostBlogIndex />
} else if (FEATURES.STRAPI_FALLBACK) {
  return <StrapiBlogIndex />
} else {
  return <BlogComingSoon />
}
```

### Rollback Plan
1. Remove Ghost env vars from `.env`
2. Blog routes return 404 or "Coming Soon"
3. Strapi code remains untouched
4. No data loss (Ghost content lives on Ghost server)

---

## Testing Checklist

### Visual Tests
- [ ] Blog index renders with grid layout
- [ ] Post cards have glass effect
- [ ] Images load correctly (feature_image or fallback)
- [ ] Tags display as pills
- [ ] Mobile responsive (1-2 columns)
- [ ] Desktop responsive (2-3 columns)
- [ ] Hover effects work

### Functional Tests
- [ ] Can navigate to single post
- [ ] Post content renders HTML safely
- [ ] Reading time calculates correctly
- [ ] Related posts show (if available)
- [ ] Email capture submits successfully
- [ ] Tag filter works
- [ ] Pagination works (if implemented)
- [ ] Error states show gracefully
- [ ] Loading states show skeletons

### Performance Tests
- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] FID < 100ms (First Input Delay)
- [ ] CLS < 0.1 (Cumulative Layout Shift)
- [ ] Images lazy load
- [ ] No layout jank on load

### SEO Tests
- [ ] Meta tags set correctly (title, description, og:image)
- [ ] Canonical URLs set
- [ ] Sitemap includes blog posts
- [ ] robots.txt allows /blog
- [ ] Schema.org markup (Article)

---

## Deployment

### Environment Setup

**Vercel:**
```bash
vercel env add GHOST_CONTENT_API_URL production
vercel env add GHOST_CONTENT_API_KEY production
vercel deploy --prod
```

**Railway:**
```bash
railway variables set GHOST_CONTENT_API_URL=https://...
railway variables set GHOST_CONTENT_API_KEY=your-key
railway up
```

**Google Cloud Run:**
```bash
gcloud run deploy newworldkids --set-env-vars GHOST_CONTENT_API_URL=https://...
```

### Ghost Setup

**Option 1: Ghost(Pro) Hosted** (Recommended)
- Sign up at https://ghost.org
- Choose Starter plan ($9/mo) or Creator ($25/mo)
- Get Content API key from Integrations
- Add to environment variables

**Option 2: Self-Hosted Ghost**
- Deploy Ghost on DigitalOcean ($5/mo droplet)
- Follow Ghost install guide
- Configure Cloudflare for CDN
- Get Content API key from admin panel

**Option 3: Use Existing Ghost Blog**
- If you already have Ghost blog
- Just get API credentials
- Point to existing content

---

## Verification Commands

```bash
# Check Ghost API connection
curl "https://your-site.ghost.io/ghost/api/content/posts/?key=YOUR_KEY"

# Check if blog routes exist (local)
curl http://localhost:3000/blog

# Check single post (local)
curl http://localhost:3000/blog/your-first-post

# Run Next.js in dev mode
cd apps/web && npm run dev

# Build and test production
cd apps/web && npm run build && npm run start
```

---

## Files Changed Summary

### Created (10 files)
1. `apps/web/src/lib/ghost/client.ts`
2. `apps/web/src/lib/ghost/types.ts`
3. `apps/web/src/lib/ghost/image-enrichment.ts`
4. `apps/web/src/components/blog/PostCard.tsx`
5. `apps/web/src/components/blog/PostContent.tsx`
6. `apps/web/src/components/blog/NewsletterCTA.tsx`
7. `apps/web/src/components/blog/RelatedPosts.tsx`
8. `apps/web/src/app/(platform)/blog/page.tsx`
9. `apps/web/src/app/(platform)/blog/[slug]/page.tsx`
10. `apps/web/src/app/api/newsletter/route.ts`

### Modified (4 files)
1. `.env.example` - Add Ghost vars
2. `turbo.json` - Add Ghost to globalEnv
3. `package.json` - Add @tryghost/content-api
4. `tailwind.config.ts` - Add glass utilities

### Deprecated (keep for rollback)
1. `apps/web/src/lib/strapi-api/*` - Mark as deprecated
2. Strapi env vars - Keep but mark optional

---

## Success Metrics

**Immediate (Week 1):**
- Blog routes load without errors
- 10+ blog posts published
- Email capture working
- 100+ newsletter signups

**Short-term (Month 1):**
- 1,000+ blog page views
- 500+ newsletter subscribers
- 50+ shares on social media
- Donor engagement via blog

**Long-term (Quarter 1):**
- Blog drives 20% of site traffic
- 2,000+ newsletter subscribers
- Content ranks for nonprofit keywords
- Blog converts to donations

---

## Next Steps

1. ✅ Review and approve this plan
2. Install Ghost (Pro or self-hosted)
3. Get API credentials
4. Run implementation (3-4 hours)
5. Test locally
6. Deploy to staging
7. Test in production
8. Publish first blog post!

---

**Ready to proceed?** Let's build! 🚀
