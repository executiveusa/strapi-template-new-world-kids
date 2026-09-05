# New World Kids — First 12 Operating Layer

Status: Phase 4 implementation

## Purpose

Turn the public First 12 story into an operating system that can receive real projects, real mentor interest, track readiness without exposing participant information, and publish only verified proof.

## Public flows

- `/{locale}/opportunity` — structured project/opportunity intake
- `/{locale}/mentor` — structured mentor intake
- Homepage partner CTAs route to these forms instead of email-only links.
- The homepage status board shows the readiness state of 12 program seats without names or participant PII.
- The Proof of Work feed reads only artifacts marked both `verified` and `is_public`.

## Database boundary

Supabase project: existing shared project, isolated in the `nwkids` schema.

Private tables:

- `nwkids.opportunity_intakes`
- `nwkids.mentor_intakes`

Operating tables:

- `nwkids.first12_status`
- `nwkids.proof_artifacts`

The intake tables have RLS enabled, explicit deny-all policies for `anon` and `authenticated`, and no browser write grants. Server writes go through service-role-only RPC functions:

- `public.nwkids_submit_opportunity(jsonb)`
- `public.nwkids_submit_mentor(jsonb)`

Public read surfaces:

- `public.nwkids_first12_public`
- `public.nwkids_proof_public`

No participant names, contact information, case history, or other youth PII belongs in either public view.

## First 12 stages

A seat can move through these states:

1. `seeking_project`
2. `mentor_needed`
3. `project_scoping`
4. `opportunity_confirmed`
5. `participant_matched`
6. `project_active`
7. `completed`

A status change is an operating claim. Do not advance a seat unless the underlying condition is true.

## Proof of Work rule

An artifact is public only when:

- `verified = true`
- `is_public = true`

The initial proof feed contains only capture-dated Proyecto Indigo Azul field images already marked confirmed in the repository archive. Those images prove dated field documentation exists. They are not described as Seattle outcomes, participant outcomes, paid-work proof, or mentor proof.

Future Seattle proof can include project briefs, before/after work, screenshots, builds, designs, documents, client/mentor notes, and completed deliverables once verified and cleared for public use.

## Environment variables

The UI uses the existing Supabase variables documented in `apps/ui/.env.local.example`:

- `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` for server-only intake writes
- `SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` for public status/proof reads

Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

## Truth boundary

Do not use the operating layer to imply:

- all 12 participants are recruited,
- all 12 projects exist,
- all 12 placements are paid,
- mentors or partners are confirmed when they are not,
- an archive photo proves an outcome it does not document.

The public model remains:

**Interest → Project → Mentor → Next Step**
