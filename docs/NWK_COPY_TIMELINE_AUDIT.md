# New World Kids Copy and Timeline Audit

Last updated: 2026-04-25

## Recommendation

Best fit: Payload CMS

Why Payload is the strongest fit for NWK right now:

- True open-source and MIT-licensed, with the project describing itself as an open-source fullstack Next.js framework and CMS.
- Built for Next.js, which matches this repo better than introducing a separate UI/admin stack.
- Supports image uploads natively through upload collections and upload fields.
- Supports repeatable timeline rows through array fields or a dedicated collection.
- Supports server-side access through the Local API, which means the public frontend can stay clean while the admin/editor layer runs separately.

Primary sources:

- Payload repo: https://github.com/payloadcms/payload
- Payload upload docs: https://payloadcms.com/docs/upload/overview
- Payload upload field docs: https://payloadcms.com/docs/fields/upload/
- Payload array field docs: https://payloadcms.com/docs/fields/array
- Payload Local API docs: https://payloadcms.com/docs/local-api/overview

## Lower-Ops Alternative

Decap CMS is the best lightweight alternative if you want the simplest possible editorial workflow and are comfortable storing content in Git.

Why Decap is useful:

- MIT-licensed and clearly positioned as open-source.
- Editors can upload images directly.
- List widgets can model repeatable timeline entries.
- Good fit if the timeline can live as JSON, YAML, or Markdown in the repo.

Primary sources:

- Decap site: https://decapcms.org/
- Decap install/config docs: https://decapcms.org/docs/configure-decap-cms/
- Decap widgets docs: https://decapcms.org/docs/widgets/
- Decap GitHub repo: https://github.com/decaporg/decap-cms

## Not My First Recommendation

Directus is powerful, but I would not choose it first here if the requirement is strict open-source clarity and a low-friction fit with this repo.

Why:

- Strong admin and file handling, but it is now under BSL 1.1 / commercial licensing terms for some usage, which is a different category from MIT-style open-source.
- It also adds another distinct platform layer when this codebase is already centered on Next.

Primary sources:

- Directus repo: https://github.com/directus/directus
- Directus collections docs: https://docs.directus.io/app/data-model/collections
- Directus files docs: https://docs.directus.io/reference/files

## Payload Content Model

If we install Payload, this is the cleanest NWK model:

### Collection: `media`

- `file` upload
- `alt`
- `caption`
- `credit`
- `season`
- `year`
- `location`
- `sourceStatus` (`confirmed`, `needs-review`)

### Collection: `timelineEntries`

- `season`
- `yearLabel`
- `sortOrder`
- `status` (`past`, `current`, `future`)
- `title`
- `tagline`
- `body`
- `highlights` (array of text)
- `image` (upload relation to `media`)
- `imageAlt`
- `sourceStatus`
- `sourceNote`

### Global: `siteSettings`

- `heroHeadline`
- `heroBody`
- `heroImage`
- `heroImageAlt`
- `fiscalSponsorName`
- `ein`
- `donationPrimaryCta`
- `socialLinks`

## What We Can Trust Right Now

These are repeated in the repo enough to treat as current working facts, but some still need public-facing source support:

- `EIN 46-4779591`
- Seattle plus Puerto Vallarta footprint
- Program names `Culture Shock Program` and `Proyecto Indigo Azul`
- Hermes as the operations layer
- A 1.5-acre site in Paso de Guayabo
- A 200-plus plant claim is treated internally as a key talking point

## Factual Conflicts

These need resolution before they stay in polished public copy.

### Fiscal sponsor conflict

Conflicting repo statements:

- `Healthy Schools Initiative (HSI)` in `.claude/skills/hermes-agent/SKILL.md`
- `Humanitarian Social Innovations` in `agents/hermes/SOUL.md`
- `Humanitarian Social Innovations` also appears in public-facing layout metadata and donate copy

Decision needed:

- One exact legal public wording for sponsor status
- Whether the homepage should name the sponsor or keep it generic until confirmed

## Copy Audit by Section

### Hero

Current strength:

- Clear mission statement
- Strong promise
- Good first-scan comprehension

Needs real data:

- `200+ plant varieties growing today`
- `1.5 acres in Paso de Guayabo`
- `5+ years of boots-on-the-ground work`
- `$0 tuition for accepted students`

Notes:

- These are effective but should be tied to a dated data source or updated manually by season.
- The new full-screen hero layout is strong enough now that it can support a real hero image once media uploads are in place.

### Clarity Section

Current strength:

- Follows Steve Krug well
- Answers what this is, who it helps, and what to do next

Needs real data:

- None urgently, but the bullets should eventually point to measurable outcomes or linked proof.

### Mission / Four Pillars

Current strength:

- Most emotionally resonant section on the page
- Good philosophical framing

Needs real data or softening:

- `GeoAg`
- `seawater farming`
- `Students cut water use by 90%`
- `The school runs off-grid`
- `Starlink for connectivity`
- `12V DC lighting`
- `Biodigesters turning food waste into cooking gas`
- `Adobe lasts a thousand years if you build it right`

Notes:

- This section currently sounds the most advanced and specific, which means it also carries the most credibility risk if those claims are not documented.

### Programs

Current strength:

- Clear program framing
- Distinguishes the three revenue/education lanes

Needs real data:

- Whether `Earn-while-you-learn stipends` are active now or planned
- Whether the `Media and AI Revenue Studio` is currently public-facing or still internal strategy
- Any actual participant counts, hours, outcomes, or pilot milestones

### Timeline

Current strength:

- Strong narrative arc
- Good season structure
- Easy to convert into a real archive

Needs real data:

- Photos for each season
- Exact dates or narrower ranges for each season
- Proof for `15 to 20 local children engaged weekly`
- Proof for `200+ plant varieties growing`
- Proof for `$25K season fundraise in motion`
- Proof for `Grant applications in progress`
- Confirmation of whether `five students` is a committed cohort size or a working target

Notes:

- Future seasons are fine as vision, but should be framed explicitly as targets, not implied commitments.
- The code now pulls timeline data from one shared source, which will make a CMS migration straightforward.

### Proof / Trust Section

Current strength:

- Good strategic direction
- Honest focus on trust, proof, and clarity

Needs real data:

- All three testimonial cards are currently summary-style statements, not attributed testimonials
- `Programs stay free to students while revenue, grants, and donor support cover the operating load` needs a simple public funding model explanation

Recommendation:

- Replace the current quote-style cards with either:
  - attributed quotes, or
  - labeled proof cards such as `Current site acreage`, `Current plant count`, `Current fundraising need`

### Donate Page

Needs separate audit soon:

- Tier names and impacts
- Matching-gift claims
- Budget line items
- Sponsor wording
- Whether Stripe or checkout language matches the current infrastructure

## Real Data We Need Next

Collect these next, in this order:

1. One legal answer on the fiscal sponsor name and public wording
2. Seasonal photos for all six timeline entries, especially Seasons 1 through 3
3. One confirmed plant-count source with a date
4. One confirmed acreage statement with a date
5. One confirmed statement on tuition policy
6. One confirmed statement on current participants / cohort size
7. Two to three attributed testimonials
8. One current fundraising target and one current use-of-funds summary
9. Clarification on which infrastructure claims are current versus planned in the Four Pillars section

## Suggested Next Build Step

Best next move:

- Install Payload on the VPS as the editorial backend
- Add `media` and `timelineEntries` first
- Keep the Vercel frontend reading a static fallback until the first timeline/photos are entered
- Then replace the hardcoded timeline and hero image with CMS-fed content

That gives us:

- image uploads
- repeatable timeline editing
- cleaner proof workflow
- a public site that gets more accurate over time instead of more brittle
