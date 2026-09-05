# Phase 3 — Truth Audit + Collins Reduction Review

Status: PROPOSED / AWAITING APPROVAL
Canonical repo: executiveusa/strapi-template-new-world-kids
Canonical domain target: https://nwkids.org

## Purpose

Reduce the public story until every sentence earns its place. Preserve the locked First 12 strategy, four pathways, fiscal sponsor disclosure, FundRazr flow, and verified Indigo Azul history. Remove repetition, implied certainty, and language that outruns current Seattle operating proof.

## Collins governing idea

**Help turn interest into opportunity.**

Supporting proof idea:

**I worked on that.**

The public site should move through six movements only:

1. Interest
2. The First 12
3. Four Pathways
4. Proof of Work
5. Join the Work
6. Fund the First 12

## Truth rules

- Do not imply 12 paid placements are already secured.
- Do not imply mentors, partners, projects, participants, wages, or Seattle outcomes already exist unless documented.
- Use qualified paid-language until placements are confirmed.
- Indigo Azul is evidence of the philosophy, not proof that the Seattle First 12 has already produced outcomes.
- Keep Humanitarian Social Innovations disclosure intact.
- FundRazr remains the one donation destination.

## Side-by-side copy reduction

### Hero

Current:
"We turn interests into opportunities."

"Young people already have things they care about. We connect those interests to real projects, paid experiences, mentors, and a next step forward."

"In 2027, we're starting in Seattle with the First 12: 12 paid opportunities with one-on-one mentorship and ongoing support."

Proposed:
"Help turn interest into opportunity."

"New World Kids starts with something a young person already cares about and connects it to a real project, an experienced mentor, and a next step."

"Seattle · First 12 · 2027"

Primary CTA proposed: "Bring an opportunity"
Secondary CTA proposed: "See the First 12"

### Problem

Current:
"Talent is everywhere. Opportunity is not."

"A young person may know what they care about and still have no clear way to turn it into experience, income, training, or work. That is the gap we are trying to close."

Proposed:
"Talent is everywhere. Access is not."

"A young person can know what they care about and still have no clear way into useful experience, a mentor, or work."

### How it works

Current:
"Interest → Project → Mentor → Next Step"

Four explanatory rows.

Proposed:
Keep the exact model and reduce each row to one line:

01 Interest — Start with what already matters.
02 Project — Put that interest to useful work.
03 Mentor — Work beside someone who knows the field.
04 Next Step — Leave with proof and somewhere to go next.

### First 12

Current:
"We're starting with 12 participants in Seattle over the first year. Each will enter a real project, work with a mentor, earn through meaningful work, and leave with something they can point to."

"Starting small lets us pay attention to the question that matters most: did they actually move forward?"

Proposed:
"In 2027, New World Kids will begin in Seattle with 12 participants."

"We are securing the projects and mentors before we fill the cohort."

Status line:
"12 seats · 4 pathways · projects being built now"

### Four pathways

Current intro:
"These are four entry points into the same youth-development model: paid opportunities, an experienced mentor, and a next step."

Proposed intro:
"Four interests. One operating model."

Pathway summaries:

Built for Good — Technology
"Solve a real digital problem."

Beyond the Game — Sports
"Work in the business and systems around sport."

Ground Up — Urban Gardening + Food Systems
"Build, grow, maintain, and document food systems."

Make Your Mark — Art
"Restore, design, create, and leave visible work behind."

### Mentorship/follow-through section

Current:
"The project gets them in the door. The relationship helps them move forward."

Long paragraph explaining projects as vehicle and mentorship as intervention.

Proposed:
Fold this into First 12 / Join the Work.

Keep one line only:
"A project creates the opening. A mentor helps make something of it."

### Measurement

Current:
"Did they actually move forward?"

Six outcomes.

Proposed:
"What counts"

- Completed useful work
- Earned income where applicable
- Built a mentor relationship
- Left with proof
- Has a next step

### Indigo Azul proof

Current:
"We saw what happens when the work is real."

"Our Indigo Azul Project in Puerto Vallarta showed us the potential of place-based learning: people taking responsibility for real work, contributing to a place, and learning through doing."

"Seattle will look different. The principle stays the same."

Proposed:
"Where the idea was tested"

"Proyecto Indigo Azul gave young people a real place to contribute, learn by doing, and see the result of their work."

"Seattle is the next test of the model."

### Partner ask

Current:
"We're looking for projects, mentors, spaces, and partners."

Long operating-layer paragraph.

Proposed:
"Bring one real opportunity."

"A project. A mentor. A supervised place to contribute. New World Kids handles the match, support, documentation, and follow-through."

CTA: "Bring a project"
Secondary CTA: "Become a mentor"

### Support

Current:
"Help us prove the First 12."

Long paragraph listing costs and explaining the first-year goal.

Proposed:
"Fund the First 12."

"Support helps cover participant compensation, transportation, materials, equipment, mentor support, and follow-through."

CTA: "Donate on FundRazr"

## Metadata reduction

Current description:
"New World Kids connects young people's interests to real projects, paid experiences, experienced mentors, and a next step forward."

Proposed:
"New World Kids is building the First 12 in Seattle: real projects, experienced mentors, proof of work, and a next step."

## Route/content cleanup findings

The app still contains legacy or operational public surfaces that do not belong in the primary Collins story, including a public `/mission` route describing Hermes agent actions, grants, clips, impact logs, and technical environment state. This is not part of the First 12 public narrative and should be removed from public discovery or moved behind an operations/admin boundary.

A large legacy `siteData.ts` file also contains old Culture Shock/core-four framing, old metrics/testimonials, and old program language. It is not used by the current homepage but remains a drift risk and should be quarantined, deleted, or clearly marked legacy after dependency review.

## Proposed six-movement homepage

01 INTEREST
Help turn interest into opportunity.

02 FIRST 12
12 seats. Four pathways. Seattle 2027. Projects and mentors being secured now.

03 PATHWAYS
Technology / Sports / Food Systems / Art

04 PROOF OF WORK
Proyecto Indigo Azul first; Seattle evidence added only when it exists.

05 JOIN THE WORK
Bring a project / Become a mentor

06 FUND THE FIRST 12
One FundRazr action

## Collins review

Current strengths:
- one clear First 12 idea
- strong visual hierarchy
- four-pathway structure
- memorable Interest → Project → Mentor → Next Step model
- Indigo Azul provides a real historical anchor
- FundRazr flow is now simplified

Current weaknesses:
- hero repeats the promise
- paid-work language outruns confirmed Seattle operating proof
- too many sections restate the same model
- partner ask is broader than necessary
- proof is still described more than shown
- public operational/dev routes dilute brand coherence
- legacy content remains in the codebase and can re-enter the public site

Current Collins score: 7.2/10
Projected after this reduction, before new proof assets/forms: 8.3/10
Target after proof-of-work art direction + partner/mentor conversion + rendered QA: 9.0+/10

## Approval decision

Approve as written, approve with edits, or reject specific rows. No public copy changes should be merged until this review is approved.
