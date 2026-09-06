# New World Kids UI

This app is the public New World Kids site and First 12 operating interface.

## Public model

**Interest → Project → Mentor → Next Step**

The current public design remains the September 2026 editorial/Collins system. Phase 4 adds operating capability without restoring removed sections or legacy UI patterns.

## Phase 4 routes

- `/en/opportunity`, `/es/opportunity` — structured project intake
- `/en/mentor`, `/es/mentor` — structured mentor intake
- Homepage — privacy-safe First 12 operating status and verified Proof of Work
- `/en/gallery`, `/es/gallery` — living story/archive
- `/en/blog`, `/es/blog` — Field Journal

See `../../docs/NWK_FIRST_12_OPERATING_LAYER.md` for the database boundary and truth rules.

## Environment variables

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The corresponding `NEXT_PUBLIC_SUPABASE_*` variables may be used for public read configuration. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed in client code.

## Release gates

```bash
node scripts/verify-nwk-pathways.mjs
node scripts/verify-nwk-public-truth.mjs
node scripts/verify-nwk-operating-layer.mjs
pnpm lint
pnpm test:ci
pnpm build:ui
```

The public site must not claim unverified Seattle partners, mentors, participants, wages, or outcomes.
