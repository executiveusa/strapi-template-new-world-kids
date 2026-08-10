# Phase 03V Final Report — Builder → Architect → Bambu

**Date:** 2026-07-25
**Builder:** Grok 4.5 (big-pickle)
**Architect:** ChatGPT
**Status:** Phase 03V COMPLETE — corrected evidence, all gates passed
**Recommendation:** B. SELECTIVE visual inspector (mandatory Level 1, selective Level 2)

---

## DECISION

The Architect directed a corrected Level 2 re-run because the first evidence artifact was produced before scene-detection and histogram fixes were applied. The corrected run used the same code that will be merged.

## SUPERSEDED RUN

- **Generated:** 2026-07-24T05:02:48
- **Invalidated:** 2026-07-25 (code and evidence out of sync)
- **Evidence records:** 636 (uniform sampling, unlimited histograms, ffprobe -vf broken)
- **Reason:** ffprobe does not support `-vf` flag; scene detection was dead code; histogram calls were uncapped (1 per kept frame); confidence was hardcoded 0.95; non-atomic writes
- **Archived to:** `visual-experiment/archive/pre-fix-level2-20260725-200301/`
- **Label:** SUPERSEDED — NOT FOR BAMBU REVIEW

## CORRECTED RUN

- **Generated:** 2026-07-25T20:46:05
- **Code state:** All 12 BLOCK repairs applied
- **Scene detection:** ffmpeg `-vf "select='gt(scene,0.20)',showinfo"` + stderr parse
- **Histogram cap:** max 10 per clip
- **Confidence:** null / confidence_computed=false
- **Atomic writes:** all 6 output paths use tmp + os.replace
- **Error handling:** try/except per stage in cmd_run_all
- **Month lock:** 2024-05 enforced

## LEVEL 2 DIFFERENCES (Old vs Corrected)

| Metric | Old Run | Corrected | Delta | Explanation |
|--------|---------|-----------|-------|-------------|
| Evidence records | 636 | 421 | -215 | Scene detection now extracts scene-change frames only (not all keyframes) |
| Clips analyzed | 9 | 9 | 0 | Same top-9 selected |
| Clip M2405-baa810e5 | ~60 records | 84 records | +24 | Scene detection found more scene changes in this 78s clip |
| Clip M2405-5fb80b5b | ~50 records | 8 records | -42 | Fewer scene changes detected (118s clip with smooth transitions) |
| Confidence | 0.95 (all) | null (all) | — | Fixed: no per-frame confidence computed |
| Histogram calls/clip | unlimited (~80) | max 10 | -70/clip | Capped for performance |
| Level 2 elapsed | 1590s | 1897s | +307s | ffmpeg scene detection slower than broken ffprobe (but correct) |
| Derived storage | ~6.8 MB | ~9.3 MB | +2.5 MB | More contact sheets + deep analysis keyframes |

A change in record count is not a failure. The corrected implementation extracts scene-change frames (meaningful cuts) instead of uniform samples. The 421 records represent actual visual transitions; the old 636 included many near-identical uniform samples.

## DOWNSTREAM ARTIFACTS REBUILT

All rebuilt from corrected evidence (421 records):

| Artifact | Status | Verified |
|----------|--------|----------|
| VISUAL_EVIDENCE.json | Rebuilt | 421 records, all validation checks pass |
| MULTIMODAL_MONTH_STORY.md | Rebuilt | References corrected counts; M2405-51ff7600 fix applied |
| COMPARISON_REPORT.md | Rebuilt | All references updated to 421 |
| SIDE_BY_SIDE_REVIEW.html | Rebuilt | 421 references, no stale 636 |
| CONTACT_SHEETS/ | Unchanged | 9 montages from Level 1 ( unaffected by Level 2) |

## REVIEWER VERDICTS (Focused Rerun Council)

| Reviewer | Verdict | BLOCKs | NITs |
|----------|---------|--------|------|
| Visual Pipeline Correctness | PASS | 0 | 2 (cosmetic) |
| Evidence Truth | PASS_WITH_NITS | 0 | 3 (all fixed) |
| Owner Review Usability | PASS_WITH_NITS | 0 | 1 (636→421, fixed) |

**All BLOCKs from initial council (12/12): resolved before corrected run.**
**All NITs from focused council (6/6): resolved or cosmetic.**

## 12 ORIGINAL BLOCK REPAIRS

| # | BLOCK | Fix |
|---|-------|-----|
| 1 | ffprobe -vf invalid | ffmpeg select+showinfo |
| 2 | Histogram per-frame uncapped | Cap to 10/clip |
| 3 | Hardcoded E:\ path | Env var required |
| 4 | Month lock not enforced | 2024-05 guard |
| 5 | cmd_level1 missing checks | File existence guards |
| 6 | cmd_multimodal missing checks | _load_required() helper |
| 7 | No error handling cmd_run_all | try/except per stage |
| 8 | Non-atomic writes | atomic_write() helper |
| 9 | Confidence 0.95 misleading | null + confidence_computed=false |
| 10 | M2405-51ff7600 story gap | Level 1 only statement |
| 11 | Redundant _read_gray_pixels | last_pixels=None |
| 12 | Dead code _uniform_timestamps | Removed n==1 branch |

## SOURCE SAFETY

- **Size check:** 49/49 OK
- **SHA-256 spot-check:** 5/5 OK (10.2s)
- **Full SHA-256 revalidation:** 49/49 OK (201s, earlier in session)
- **Source files added:** 0
- **Source files removed:** 0
- **Source files renamed:** 0
- **Source files modified:** 0
- **All derived artifacts outside source roots:** confirmed
- **Private artifacts outside Git:** confirmed

## PR

- **Branch:** `phase/03v-visual-intelligence-comparison`
- **Base:** `main` at `333ca0e`
- **In-repo changes:** `ops/a2a/PHASE_03V_VISUAL_INTELLIGENCE_CONTRACT.md` (already committed)
- **Report:** `ops/reports/03v-phase-status.md` (this file, to be committed)

## LOCAL OWNER REVIEW PATH

```
E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\
story-system\story-memory\2024\Q2\05-may\visual-experiment\
SIDE_BY_SIDE_REVIEW.html
```

Open in browser. Review each finding. Check boxes. Select verdict A/B/C.

## RECOMMENDATION

**B. SELECTIVE VISUAL INSPECTOR**

- **Level 1 (keyframes + dedup + routing):** Mandatory for all months. Cost: ~10s/clip. Provides machine-measured color, brightness, scene-change rate, contact sheets. Materially helps Bambu review SILENT and MOSTLY_VISUAL footage.
- **Level 2 (deep scene-change analysis):** Selective. Use for top-ranked clips only. Cost: ~3 min/clip. Provides timestamped evidence records. Valuable for documentary moments with high visual variation.
- **Local VLM:** Deferred to Phase 04 with Bambu approval. Would add semantic understanding (people, actions, objects).
- **Privacy:** Zero cloud upload maintained throughout.
