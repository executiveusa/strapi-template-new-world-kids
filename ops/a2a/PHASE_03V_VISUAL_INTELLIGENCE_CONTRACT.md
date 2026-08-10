# A2A ARCHITECT CONTRACT — Phase 03V: Visual Intelligence Comparison Test

**Architect:** ChatGPT/OpenAI
**Builder:** Grok 4.5 local
**Owner:** Bambu
**Repo:** `executiveusa/strapi-template-new-world-kids`
**Baseline:** `333ca0e` (Phase 03 post-merge receipt)
**Status:** `APPROVED_FOR_BOUNDED_EXPERIMENT`

## Architect decision

Phase 03 engineering is ACCEPTED (PR #88 merged at `b217c0b`). The local `MONTH_STORY.md` remains UNAPPROVED pending Bambu review.

Phase 03V is a bounded architecture-extension experiment on the SAME already-processed month (`2024-05`) to answer:

> **Does visual analysis materially improve what the Story System understands?**

This is **not** Phase 04. No quarter processing, no archive scaling, no publishing.

## Reference implementation

`https://github.com/bradautomates/claude-video` is studied as a REFERENCE IMPLEMENTATION / CAPABILITY SOURCE. The NWK architecture does NOT adopt claude-video as a dependency.

## Patterns adopted from claude-video

| Pattern | Source | NWK use |
|---------|--------|---------|
| Efficient keyframe extraction | `-skip_frame nokey` (ffmpeg) | Stage 3 — Level 1 visual pass on all 49 videos |
| Scene-change frame sampling | ffmpeg `select` filter | Stage 5 — Level 2 deep visual analysis on top candidates |
| Frame dedup (16×16 grayscale + mean-abs-diff, threshold 2.0) | claude-video `frames.py` (pure stdlib, no image libs) | Both stages — drops near-identical frames before evidence linking |
| Duration-aware frame budget | claude-video auto-fps | Both stages — caps total frames per clip |
| Focused time-window analysis | `--start` / `--end` | Stage 5 — denser sampling within high-value windows |
| Contact sheets | derived JPEG grids | Stage 3 + Stage 8 — Bambu-reviewable visual summary |

## Patterns NOT adopted from claude-video

| Pattern | Why not |
|---------|---------|
| `yt-dlp` URL handling | NWK processes LOCAL files only; no URL ingest |
| Whisper via Groq / OpenAI cloud | Architect constraint: NO cloud upload of private footage. NWK reuses local `faster-whisper` from Phase 03 (no duplicate transcription path) |
| Claude `Read` multimodal Q&A over extracted frames | Claude is cloud; NWK cannot upload private frames. Visual Q&A requires either (a) Bambu manual review of contact sheets, OR (b) future local VLM install approved by Bambu (deferred to Phase 04) |
| Skill / plugin packaging | NWK is a Story System, not an agent skill marketplace |

## Permanent proposed boundary

```
NWK Story System
        ↓
Visual Inspector Adapter (local, stdlib + ffmpeg only)
        ↓
ffmpeg / ffprobe
        ↓
keyframe extraction | scene-change sampling | frame dedup | contact sheets
        ↓
machine-measured visual signals (color, brightness, motion, scene-change rate)
        ↓
local VLM slot (RESERVED — NOT OCCUPIED in Phase 03V)
        ↓
visual evidence records (OBSERVED machine facts + OWNER-VERIFY for semantic claims)
```

The Visual Inspector Adapter is a thin adapter over ffmpeg + stdlib. No claude-video dependency. No cloud upload. The local VLM slot is reserved but intentionally unoccupied — semantic visual observations ("two people assembling a raised planting structure") require either Bambu manual review of contact sheets OR a future local VLM install that Bambu approves in Phase 04.

## Media router (Stage 2)

Classify each of the 49 files as: `SILENT`, `MOSTLY_VISUAL`, `MIXED`, `SPEECH_HEAVY`.

Cheap signals first (per Architect):
- ffprobe audio stream presence
- duration
- existing faster-whisper transcript availability (1 clip only)

Do NOT fully transcribe everything just for routing.

## Visual pass levels

### Stage 3 — Level 1 Visual Pass (all 49 videos)

Every video gets a cheap visual pass. Per-clip `MEDIA_CARD` records:
- keyframes_examined
- frames_after_dedupe
- visual_topics (machine-derived: color cluster, brightness class, motion level)
- visual_changes (scene-change timestamps)
- people_visible: `yes|no|uncertain` — **NO face recognition; based only on ffprobe + frame delta signals**
- construction_activity / agriculture_activity / environmental_change: `uncertain` by default (machine cannot determine; OWNER-VERIFY)
- story_potential: `low|medium|high` (ranked by machine signals)
- confidence: 0.0–1.0
- evidence_timestamps: list of frame offsets

### Stage 5 — Level 2 Deep Visual Analysis (top 10–20% of clips)

Denser frame sampling, scene segmentation, focused time windows, frame dedup.
Output: `VISUAL_EVIDENCE.json` with stable `evidence_id` per record.

**Truth-class rule (non-negotiable):**
- OBSERVED: machine-measured facts (frame count, color histogram, brightness, scene-change rate, dedup count)
- INFERRED: agent interpretation of machine signals (e.g. "active content likely")
- OWNER-VERIFICATION REQUIRED: any semantic claim about people, actions, construction, agriculture, narrative — including the Architect's example "Two people are shown assembling a raised planting structure" which REQUIRES a VLM or Bambu review

The example evidence record format from the Architect:

```json
{
  "evidence_id": "VE:M2405-xxxx:003",
  "media_id": "M2405-xxxx",
  "start": "00:42",
  "end": "01:18",
  "truth_class": "OBSERVED",
  "observation": "Two people are shown assembling a raised planting structure.",
  "confidence": 0.93
}
```

is the CONCEPTUAL schema. The Phase 03V implementation produces OBSERVED records with **machine-measured** observations only (e.g. "12 keyframes extracted; 8 unique after dedup; mean scene-change rate 0.42/s; color histogram dominated by greens (62%) and browns (24%)"). Semantic observations like "two people assembling" are OWNER-VERIFICATION REQUIRED in Phase 03V — the system cannot make them without a local VLM, and faking them would violate the contract's "never fake success" rule.

## Multimodal fusion (Stage 6)

Fuse:
- visual evidence (Stage 3 + Stage 5)
- existing metadata (Phase 03 manifest)
- existing SHA-256 provenance (Phase 03 manifest)
- existing faster-whisper transcript evidence where available (1 clip)
- chronology (path-month inferred)

Do NOT rerun transcription. Reuse Phase 03's TRANSCRIBE_BENCHMARK.json + TRANSCRIPT_*.json.

Output: `MULTIMODAL_MONTH_STORY.md` — UNAPPROVED — AI/AGENT PROPOSAL — REQUIRES BAMBU REVIEW.

Three truth classes. Every meaningful statement cites media_id + visual evidence ID + timestamp + transcript evidence ID where applicable.

## A/B comparison (Stage 7)

Compare:
- **A.** Phase 03 original `MONTH_STORY.md` (metadata + 1 transcript)
- **B.** Phase 03V `MULTIMODAL_MONTH_STORY.md` (A + visual evidence)

`COMPARISON_REPORT.md` answers the 10 Architect questions explicitly.

## Stage 8 — Bambu side-by-side review packet

Update/generate the local owner review interface (`OWNER_REVIEW.html` + `.md`) so Bambu can compare BEFORE vs AFTER side-by-side. Per-observation checkboxes: CORRECT / INCORRECT / IMPORTANT / NOT IMPORTANT / NEED CONTEXT / DO NOT USE PUBLICLY.

## Deterministic safety gates

Before visual processing:
- approved month exactly `2024-05`
- exactly 49 source files resolved
- source baseline verified (Phase 03 `SOURCE_BASELINE.json`)
- derived output outside source root (`assert_output_outside_sources` enforced)
- E: free space > 100 GB

After processing:
- source count unchanged
- SHA-256 49/49 revalidated
- source_files_modified = 0
- all visual artifacts outside source roots

No private visual artifact may be committed.

## Subagent review council

- **Reviewer A — Architecture / Repo Guardian**: claude-video coupling, duplicate systems, StoryToolkitAI boundary, media-router architecture, local-only privacy, unnecessary dependencies
- **Reviewer B — Breaker / Performance**: long videos, silent files, malformed media, no-keyframe cases, frame explosion, disk usage, restart/resume, accidental archive-wide run
- **Reviewer C — Visual Evidence / Story Steward**: observation vs inference separation, fabricated claims, timestamp grounding, weak visual descriptions, before/after overclaims, human/rights assumptions

Each returns `PASS | PASS_WITH_NITS | BLOCK`. Repair all valid findings.

## GitHub / phase policy

Single implementation PR (if code/harness changes are required).

Phase branch: `phase/03v-visual-intelligence-comparison`.

Permitted committed artifacts:
- adapter code (`story-agent/v01/visual_intelligence.py`)
- routing code
- tests
- schemas
- sanitized aggregate report (`ops/reports/03v-visual-intelligence-comparison.md`)
- architecture decision (this file)
- final receipt (`ops/receipts/03v-visual-intelligence-comparison.md`)

Forbidden commits:
- raw footage
- extracted frames
- contact sheets
- thumbnails
- visual descriptions containing sensitive private context
- transcripts
- absolute E:\ paths
- local manifests
- local Story Memory
- private MONTH_STORY content

Squash merge only after all engineering gates pass.

After merge: **STOP. DO NOT START PHASE 04.**

## Final Builder → Architect report

```
DECISION
ARCHITECTURE
  - exactly how claude-video was used
  - direct dependency vs adapted pattern
  - permanent proposed boundary

MEDIA ROUTING
  - silent / mostly visual / mixed / speech-heavy counts

VISUAL PASS
  - 49/49 status
  - keyframes extracted
  - frames after dedupe
  - processing time
  - storage used
  - errors

DEEP ANALYSIS
  - clips selected
  - evidence records generated
  - strong-moment count

A/B COMPARISON
  - original understanding
  - new understanding
  - important differences
  - corrected misunderstandings
  - new silent-footage discoveries

QUALITY
  - reviewer verdicts
  - repairs

SOURCE SAFETY
  - 49/49 SHA-256 revalidated
  - 0 mutations

PERFORMANCE
  - CPU
  - runtime
  - storage
  - bottlenecks

RECOMMENDATION
  Choose exactly one:
  A. MAKE VISUAL INSPECTOR MANDATORY FOR EVERY VIDEO
  B. USE VISUAL INSPECTOR SELECTIVELY
  C. DO NOT ADOPT
  Explain why.

HUMAN GATE
  Exact local path to the side-by-side Bambu review packet.
  Do not begin Phase 04.
```
