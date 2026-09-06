# New World Kids — First 12 Operating Layer

Status: Phase 4 reconstructed on current `main`

## Purpose

Turn the public First 12 story into an operating system that can receive real projects, receive real mentor interest, track readiness without exposing participant information, and publish only verified proof.

## Reconstruction rule

The September 2026 Collins/editorial public design is authoritative. Phase 4 contributes operating capability only. It must not restore removed homepage sections, old orange tokens, pill-heavy controls, or stale pre-polish composition.

## Public flows

- `/{locale}/opportunity` — structured project/opportunity intake
- `/{locale}/mentor` — structured mentor intake
- Homepage Join actions route to these forms instead of email-only links.
- The homepage operating board shows readiness state without names or participant PII.
- The Proof of Work feed reads the verified public proof view.

## Database boundary

Supabase uses an isolated `nwkids` schema.

Private tables:
- `nwkids.opportunity_intakes`
- `nwkids.mentor_intakes`

Operating tables:
- `nwkids.first12_status`
- `nwkids.proof_artifacts`

Server-only write RPCs:
- `public.nwkids_submit_opportunity(jsonb)`
- `public.nwkids_submit_mentor(jsonb)`

Public read surfaces:
- `public.nwkids_first12_public`
- `public.nwkids_proof_public`

No participant names, contact information, case history, or other youth PII belongs in either public view. `SUPABASE_SERVICE_ROLE_KEY` remains server-only.

## First 12 stages

1. `seeking_project`
2. `mentor_needed`
3. `project_scoping`
4. `opportunity_confirmed`
5. `participant_matched`
6. `project_active`
7. `completed`

A status change is an operating claim. Do not advance a seat unless the underlying condition is true.

## Proof of Work rule

Public proof must be verified and cleared for public use. Proyecto Indigo Azul archive media documents only what the source actually proves and must never be presented as Seattle outcome proof.

Future Seattle proof can include project briefs, before/after work, screenshots, builds, designs, documents, mentor notes, and completed deliverables once verified and cleared.

## Environment variables

- `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` for server-only intake writes
- `SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` for public status/proof reads

## Truth boundary

Do not use the operating layer to imply:
- all 12 participants are recruited,
- all 12 projects exist,
- all 12 placements are paid,
- mentors or partners are confirmed when they are not,
- an archive photo proves an outcome it does not document.

The public model remains:

**Interest → Project → Mentor → Next Step**
