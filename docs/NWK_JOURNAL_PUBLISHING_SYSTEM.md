# New World Kids — Programmatic Journal

## Purpose

The Field Journal is the public knowledge layer for New World Kids: lessons from the work, field notes, verified community research, and profiles of people or organizations doing useful work.

## Current architecture

The journal is repository-native and dependency-light.

- Content registry: `apps/ui/src/content/journal.ts`
- Journal index: `apps/ui/src/app/[locale]/blog/page.tsx`
- Article route: `apps/ui/src/app/[locale]/blog/[slug]/page.tsx`
- English and Spanish live in the same content object so they stay synchronized.

A new article becomes publishable by adding one typed object to `journalPosts`. The index and article route update automatically.

## Why this architecture now

- no new CMS account or vendor lock-in
- no database needed to publish
- easy for an agent to create, review, and commit an article through GitHub
- every edit has version history and rollback
- source metadata travels with the post
- can migrate behind Strapi or another API later without changing the public editorial design

## Required fields

Every article needs:

- `slug`
- `date`
- `category`
- `tags`
- `sourceLabel`
- English title, deck, and sections
- Spanish title, deck, and sections

## Source rule

Do not present a Facebook post, person, organization, quote, statistic, or community story as a source unless the original source has been verified.

For social-study material, preserve:

- person / organization
- original post URL when available
- platform
- publication date when available
- what the source actually says
- what New World Kids learned from it

Do not convert an unattributed study note into a quote or assign it to a person retroactively.

## Editorial lanes

### Lesson
A reusable idea learned from the work.

### Field Note
Observed work, place, process, or evidence from New World Kids / Proyecto Indigo Azul.

### Community
A verified person, organization, project, or idea affecting the community.

## Agent publishing loop

`SOURCE → VERIFY → DISTILL → DRAFT → EN/ES → REVIEW → COMMIT → PUBLISH → DISTRIBUTE`

1. Capture the source.
2. Verify names, links, dates, and claims.
3. Extract the smallest useful idea.
4. Write the article in New World Kids editorial voice.
5. Translate naturally into Spanish; do not machine-mirror awkward English syntax.
6. Keep source provenance with the article.
7. Commit through GitHub.
8. Let the site build/deploy.
9. Reuse the article as social content only after publication review.

## Design rule

The journal is an editorial reading surface, not a card-based content feed. Typography, spacing, rules, and eventually verified photography should carry the experience.
