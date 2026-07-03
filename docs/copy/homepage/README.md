# Homepage Copy Map

This folder is the **single source of truth** for the New World Kids homepage copy.
Edit the markdown here first; the matching component consumes it via
`packages/shared-data` or `apps/ui/src/components/site/siteData.ts`.

## Live render order (`apps/ui/src/components/homepage/Homepage.tsx`)

1. **Hero** — `NonprofitHero.tsx` ← `02-hero.md`
2. **Timeline** — `TimelineSection.tsx` ← `04-timeline.md` + `siteData.timelineEntries`
3. **Programs** — `ProgramsSection.tsx` ← `06-programs.md` + `siteData.programCards`
4. **Trust** — `TrustSection.tsx` ← `08-trust.md`
5. **Support** — `SupportSection.tsx` ← `09-support.md`
6. **Studio** — `StudioSection.tsx` ← `10-studio.md`

The header (`SiteHeader.tsx` ← `01-site-header.md`) and footer
(`SiteFooter.tsx` ← `12-site-footer.md`) wrap the page via the layout.

## Files present but NOT rendered on the public homepage

These component files exist in `components/homepage/` but are deliberately
**not imported by `Homepage.tsx`**. They are kept for potential `/ops` or
internal use, or are pending removal:

- `ClaritySection.tsx` ← `03-clarity.md` (content folded into Hero + Programs)
- `MissionSection.tsx` ← `05-mission.md` (content folded into Hero + Programs)
- `HermesSection.tsx`, `HermesStatusPanel.tsx`, `HermesVoiceChat.tsx` — Hermes is
  backend-only. Not rendered publicly. No copy file (the old `11-hermes.md`
  was removed June 2026).
- `CinematicHero.tsx` — dead code, ships scaffolding text. Pending deletion.
- `ScrollRevealProverb.tsx` — alternate proverb placement; not currently rendered.

## Reconciliation principle

The copy folder is authoritative for **structure and content**. Where a
component's live phrasing is clearly stronger voice than the folder, the
better wording wins and is back-written into the folder. The folder never
silently drifts from what ships.

## Open question — canonical social handles

Two sources disagree:

- `packages/shared-data/socialLinks` → `@newworldkids` (Instagram, Facebook, LinkedIn, YouTube)
- `apps/ui/src/components/site/siteData.ts` `siteLinks` → `@proyectoindigoazul`, `@nwkidsorg`, `@nwkids`

Components currently import from `siteData` (the legacy handles). Owner needs to
confirm which set is canonical before sweep.
