# New World Kids public content boundary

Status: LOCKED

The public First 12 story is owned by the current homepage, pathways/projects, gallery proof, donation flow, site header/footer, and their locale-aware metadata.

`apps/ui/src/components/site/siteData.ts` contains legacy starter-era New World Kids material, including older Culture Shock/core-four framing, metrics, testimonials, and operations-oriented copy. It is not a canonical source for the First 12 public story and must not be used to reintroduce public claims without a fresh truth review.

Public-story changes must pass:

- `node scripts/verify-nwk-pathways.mjs`
- `node scripts/verify-nwk-public-truth.mjs`

The `/mission` route is intentionally unavailable to public visitors. Internal Hermes/agent ledgers, environment state, grant counters, clips, and technical operations belong behind an operations/admin boundary rather than inside the public New World Kids brand experience.

Canonical First 12 message:

**Help turn interest into opportunity.**

Canonical model:

**Interest → Project → Mentor → Next Step**
