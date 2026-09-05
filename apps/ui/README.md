# New World Kids UI

This app is the public New World Kids site and First 12 operating interface.

## Current public model

**Help turn interest into opportunity.**

**Interest → Project → Mentor → Next Step**

The 2027 Seattle pilot is the **First 12** across four pathways:

1. Built for Good — Technology
2. Beyond the Game — Sports
3. Ground Up — Urban Gardening + Food Systems
4. Make Your Mark — Art

## Phase 4 operating routes

- `/en/opportunity`, `/es/opportunity` — structured project intake
- `/en/mentor`, `/es/mentor` — structured mentor intake
- Homepage — privacy-safe First 12 status board and verified Proof of Work feed
- `/en/gallery`, `/es/gallery` — capture-dated Proyecto Indigo Azul archive
- `/en/donate`, `/es/donate` — compatibility redirect to the canonical FundRazr campaign

See `../../docs/NWK_FIRST_12_OPERATING_LAYER.md` for the database boundary and truth rules.

## Environment variables

Copy `.env.local.example` to `.env.local` for local development.

Required for Phase 4:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The corresponding `NEXT_PUBLIC_SUPABASE_*` variables may be used for public read configuration. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed in client code.

## Release gates

Before merge:

```bash
node scripts/verify-nwk-pathways.mjs
node scripts/verify-nwk-public-truth.mjs
pnpm lint
pnpm test:ci
pnpm build:ui
```

The public site must not claim unverified Seattle partners, mentors, participants, wages, or outcomes.
