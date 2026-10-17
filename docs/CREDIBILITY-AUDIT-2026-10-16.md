# Credibility Audit (T7, 2026-10-16)

Status: PREPARED. Read-only audit; no site changes made. Nothing published.

## Checked live tonight

1. nwkids.org - HTTP 200, still "Coming soon" (per the freeze order), HSI
   fiscal-sponsor disclosure present on the page. COMPLIANT with the order
   that it stays coming soon.
2. Candid/GuideStar - New World Kids has NO Candid profile (expected: it is a
   WA nonprofit corporation under fiscal sponsorship, not its own 501(c)(3)).
   The credibility asset is the SPONSOR: Humanitarian Social Innovations,
   EIN 46-4779591, has both a Candid profile (app.candid.org/profile/9395824)
   and a Charity Navigator page (charitynavigator.org/ein/464779591).
   RECOMMENDATION: site copy should link HSI to its Candid profile so donors
   can verify the sponsor in one click (draft only - site edits are gated).
3. Google Business Profile - not verified tonight (needs the Maps/account
   owner view; no authorized access from here). OPEN.
4. Claims scan - the PRD rules (no fabricated mentors/partners/outcomes) are
   documented; no new claims were added tonight.

## PR #132 - HSI program logo 403 (analyzed, fix tested as far as possible)

- Diff: hotlinks https://hsifiscalsponsor.org/.../HSI-Program-Footer-Logo-no-bg-1.png
  beside the fiscal-sponsor statement on the coming-soon page (same URL the
  footer already uses).
- The 403 is real and reproducible from every datacenter client tested
  (plain curl AND browser-UA curl from two networks): HSI runs bot protection.
  Human browsers on the live site still see the logo; crawlers/link-checkers 403.
- The reliable authorized fix is VENDORING the PNG in the repo (apps/ui/public/)
  and referencing it locally - removes the third-party dependency entirely.
- BLOCKED on the asset: no Wayback snapshot exists, no HSI email/Drive copy was
  found in the owner-accessible archives checked tonight, and HSI contact is
  approval-gated. Getting the bytes needs either a real interactive browser
  session or one email to HSI (draft can be prepared with the BAMBU-6 batch).
- AUTHORITY NOTE: the PR body calls this "HSI's required program logo" and quotes
  "Bambu 10:33 PM". Neither claim is verified against the owner's own channel.
  The standing owner question "HSI logo OK?" remains OPEN - do not merge on the
  PR body's say-so.
- The same hotlink in the existing footer has the same 403 behavior, so the
  vendoring fix (once the asset exists) should cover both places in one PR.

## Disclosures status

- Fiscal-sponsor disclosure: present on the coming-soon page (verified above).
- FundRazr destination (fundrazr.com/nwkids.org): part of the locked PRD;
  reconciliation lives in agent-indigo docs/operations/HSI-FUNDRAZR-RECONCILIATION.md.
