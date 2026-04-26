# New World Kids Real Data Intake

Last updated: 2026-04-25

## Purpose

This is the fast intake checklist for turning the current public NWK site into a fully evidenced version.

The live site already has:

- a public hero
- a public timeline
- a Hermes status connection
- social links
- a clear nonprofit story

What it does not have yet is enough verified field data to make every claim feel final.

## Where the public content lives

- Public content source: `apps/ui/src/components/site/siteData.ts`
- Public JSON review route: `/api/content-snapshot`
- Current copy audit: `docs/NWK_COPY_TIMELINE_AUDIT.md`

## Verification labels

- `Confirmed`: ready for public repetition
- `Needs proof`: public copy exists, but the evidence trail is missing or incomplete
- `Planned`: future target, not current proof

## Top-priority decisions

### 1. Fiscal sponsor wording

We need one exact answer for:

- sponsor legal name
- how it should appear on the homepage
- how it should appear on the donate page
- who receives tax-deductible donations

### 2. Hero proof

We need one source or owner for each of these:

- `200+ plant varieties growing today`
- `1.5 acres in Paso de Guayabo`
- `5+ years of boots-on-the-ground work`
- `$0 tuition for accepted students`

### 3. Timeline media

We need at least one usable image for each season:

- Season 1 land / early restoration
- Season 2 community / children / early planting
- Season 3 current food forest / site work
- Season 4 to 6 can remain planned visuals for now

## Best upload format

For each photo:

- filename
- season
- approximate date
- location
- photographer or source
- one-sentence caption
- permission status

## Testimonial intake format

For each quote:

- full quote
- person name
- role or relationship
- city / organization if appropriate
- permission confirmed: `yes` or `no`

Do not publish unattributed quotes as if they are direct testimonials.

## Recommended CMS direction

Best fit:

- Payload CMS for uploads plus structured timeline editing

Fallback:

- Decap CMS if we want the lightest possible editorial setup

## Immediate next content batch

If we want the next visible quality jump, gather these in this order:

1. One confirmed sponsor answer
2. Three real photos for Seasons 1 through 3
3. One confirmed plant-count statement
4. One confirmed tuition statement
5. Two attributed testimonials
6. One current fundraising target plus use-of-funds summary
