# New World Kids

Public site, referral and intake tools, and operating notes for **New World Kids**: a Washington nonprofit
corporation (UBI 604 917 764) operating under the fiscal sponsorship of Humanitarian Social Innovations
(HSI, a 501(c)(3) public charity, EIN 46-4779591).

**The pilot:** the First 12. Twelve young people ages 16 to 19 in King, Snohomish, Pierce, and Skagit counties,
in 2027, by referral only, free to those selected. Each is matched with a paid project and a mentor.
Chain: **Interest → Project → Mentor → Next Step.** Four pathways: Built for Good (technology),
Beyond the Game (sports), Ground Up (urban gardening and food systems), Make Your Mark (art).

Where it started: Proyecto Indigo Azul, a demonstration food forest New World Kids built in rural Puerto
Vallarta, Mexico, starting in 2020. Its photos are always labeled and never shown as Seattle results.

## What is in this repo

| Path                   | Purpose                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `apps/ui`              | The public site (Next.js 16, React 19, Tailwind 4, next-intl: English and Spanish)         |
| `apps/blog`            | The separate journal                                                                       |
| `services/hermes`      | Backend harness for trust APIs, article chat, and agents                                   |
| `packages/shared-data` | Shared mission data and trust documents                                                    |
| `supabase/migrations`  | Database schema (referrals, hosts, placements, agreements, hours, editable copy, waitlist) |
| `docs`                 | Compliance, governance, audit, and handoff notes                                           |
| `icm`                  | Agent-readable mission, governance, fundraising, and grants context                        |
| `scripts`              | Truth checks and the viewport audit                                                        |

Strapi is not part of the runtime. This repo began as a Strapi starter; unused starter code may remain.

## Run it

```bash
pnpm install
pnpm dev:ui          # http://localhost:3000
pnpm typecheck
node scripts/verify-nwk-public-truth.mjs
node scripts/verify-nwk-pathways.mjs
node scripts/verify-nwk-operating-layer.mjs
```

Copy `apps/ui/.env.local.example` to `apps/ui/.env.local`. Never commit real keys.

| Variable                            | Used for                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| `SITE_MODE`                         | `live` or `coming-soon`. Unset means coming-soon in production, live in development |
| `PREVIEW_KEY`                       | Secret for the team preview door (below). Unset disables it                         |
| `APP_PUBLIC_URL`                    | Public site URL (used for sharing images)                                           |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Public reads (First 12 status, proof, editable copy)                                |
| `SUPABASE_SERVICE_ROLE_KEY`         | Server-only writes (referrals, mentors, projects, waitlist)                         |

## Show the site, or hide it

The site ships with a switch so you control when the public sees it.

- **Hide (coming-soon page):** set `SITE_MODE=coming-soon` on the host and redeploy. Every public page
  redirects to a clean, bilingual `/coming-soon` page (with an optional "email me when it opens" form) and
  sends `noindex`. Only `/coming-soon` and `/privacy` stay open.
- **Show:** set `SITE_MODE=live` and redeploy.
- **Team preview while hidden:** set `PREVIEW_KEY` to a long random string, then open
  `/preview?key=<PREVIEW_KEY>` once in a browser. A 14-day cookie lets that browser see the whole site.
  `/preview?clear=1` removes it.

Code: `apps/ui/src/lib/site-mode.ts` and `apps/ui/src/middleware.ts`.

## Database

Apply `supabase/migrations/*.sql` to the New World Kids Supabase project (in the SQL editor, or with the
Supabase CLI). All tables are private: row level security is on, with no public policies except read-only
`nwk_copy`. Server code uses the service role. The referral, mentor, project, and waitlist forms fail with a
friendly error until the schema is applied.

Rules built into the schema (checked in tests): 16 and 17 year olds cannot be scheduled over Washington's
hour limits; pay must be at least the applicable minimum wage plus $3; a project with a prohibited duty
cannot be approved; an agreement cannot go active without the young person, host, and (if under 18) a
parent or guardian signing.

## Editing the words on the site

Plain facts (ages, cost, pay, who is on the team) live in `apps/ui/src/content/facts.ts`. A field set to
`null` hides its line instead of guessing. Page text can also be changed without a developer: add a row to the
`nwk_copy` table (`page`, `locale`, `key`, `value`). Keys match the text keys in each page's code. The page
picks it up within about a minute. Gallery photos are added in `apps/ui/src/content/gallery.ts`.

## Quality checks

`node scripts/audit-viewports.mjs` opens every route at ten sizes (320px phones through 1440px desktop) and
reports overflow, small tap targets, tiny text, low contrast, missing alt text, and heading mistakes.
Run the site with `SITE_MODE=live` first. See `docs/NWK_ELI5_AND_ADHD_AUDIT.md` for the reading and
focus audit, and `docs/NWK_COMPLIANCE_CROSSWALK.md` for the Washington and federal rules.

## Rules that do not bend

1. Say only what is true and checkable. No invented people, numbers, partners, or results.
2. HSI must approve fundraising text in writing (sponsorship agreement, section 3) and review every grant
   before it is submitted.
3. Proyecto Indigo Azul images are never shown as Seattle participants or Seattle results.
4. No participant names, schools, or schedules are published. Photos of a young person need written consent.
5. Keep a trust link on every page: the footer links to Transparency, Privacy, and Safeguards.
6. Never commit credentials.

## Where to go next

`AGENTS.md` for agents. `docs/NWK_FUNDER_TRUST_FACTS_NEEDED.md` for open questions.
`docs/NWK_BOARD_AND_GOVERNANCE_PLAN.md` and `docs/NWK_YOUTH_EMPLOYMENT_COMPLIANCE.md` for what has to happen
before the first participant is paid.
