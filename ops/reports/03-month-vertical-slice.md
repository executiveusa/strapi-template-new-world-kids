# Phase 03 — One-Month Vertical Slice (2024-05)

**phase_id:** 03-month-vertical-slice  
**baseline_main_sha:** `b56604014daa8dce495a1b9472c77ec54171c254` (Architect Contract merge)  
**phase_01_baseline_sha:** `415abf31b12c83d59c0b47654eb21a2afea3da1f`  
**phase_02_baseline_sha:** `457537f076f655715f3fe6f210aac7ebc589dd62`  
**risk:** medium (first heavy processing on real footage)  
**mode:** bounded month-scoped heavy processing — read-only on source originals  
**approved_month:** `2024-05` (Bambu approval, Architect recommendation)

## OBJECTIVE

Prove one complete local circuit on Bambu's machine:

```
IMMUTABLE MEDIA → SHA-256 IDENTITY → MEDIA INTELLIGENCE
              → LOCAL TRANSCRIPTION → EVIDENCE REFERENCES
              → STORY PROPOSAL → HUMAN AUTHORITY
```

Per `ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md`. No publishing, no quarter processing, no archive-wide heavy work.

## SCOPE

| Metric | Value |
|--------|--------|
| approved month | `2024-05` |
| active source alias | `culture-shock-footage-video` (single source root) |
| files in scope | **49** |
| bytes in scope | **7,517,118,876 (~7.0 GB)** |
| E: free space at preflight | **504.83 GB** (guard = 100 GB) |
| derived budget | 25 GB (not breached) |

## VERIFICATION EVIDENCE

| Check | Result |
|-------|--------|
| SHA-256 hashed | **49 / 49** |
| SHA-256 duplicate groups | **0** |
| SHA-256 duplicate files in groups | **0** |
| ffprobe parsed | **49 / 49** (0 errors) |
| clips with audio stream | **46 / 49** |
| source files added | **0** |
| source files removed | **0** |
| source files renamed | **0** |
| source files modified (SHA-256 mismatch) | **0** |
| source files with size change | **0** |
| source files with mtime change | **0** |
| SHA-256 revalidated at end | **49 / 49** |
| guard_pass (source mutation proof) | **true** |

Dedupe method: `sha256_full` (full-file SHA-256, replacing Phase 02's filename+size heuristic).

## STAI BRIDGE

| Field | Value |
|-------|-------|
| bridge policy | `thin_adapter_only` |
| rewrite_forbidden | `true` |
| engine reference | external `engine_path` (StoryToolkitAI upstream tree) |
| status | **WORKING** |
| min_repair_attempts | 2 (direct import failed → sys.path insert succeeded) |
| local/cloud boundary | `local_only` |
| blocker | none |

Decision tree (per contract §03D) executed as:
1. STAI package importable via sys.path insert → **WORKING**
2. Transcription backend missing → bounded repair
3. `pip install faster-whisper` (single small dep, ~150 MB, no torch, no large-LLM download) — within bounded repair budget
4. No STAI fork/rewrite performed

## TRANSCRIPTION BENCHMARK (Acceptance #11)

| Field | Value |
|-------|-------|
| engine | `faster-whisper` |
| model | `tiny` |
| compute device | `cpu` (i7-1065G7, no CUDA) |
| compute type | `int8` |
| clips transcribed | **1** (acceptance #11 satisfied) |
| clips blocked | 0 |
| sample media_id | `M2405-51ff7600` (privacy-safe stable ID) |
| sample duration | 34.642 s |
| wall clock | 1.86 s |
| realtime factor (RTF) | **0.054** (~18x faster than realtime on CPU) |
| language detected | `en` |
| language probability | 0.9545 |
| segment count | 5 |
| local/cloud boundary | `local_only` (model + audio extracted locally) |

Note: RTF 0.054 is a single-clip benchmark on a 34.6 s clip with the tiny model. **Not** extrapolated to the full 695 GB archive; Phase 04 will broaden sampling before any scaling decision.

## MONTH STORY STATUS

| Field | Value |
|-------|-------|
| artifact | `MONTH_STORY.md` (LOCAL — never committed) |
| approval status | **UNAPPROVED — AI/AGENT PROPOSAL — REQUIRES BAMBU REVIEW** |
| truth classes | OBSERVED / INFERRED / OWNER-VERIFICATION REQUIRED (separated) |
| evidence IDs | `MANIFEST:mm`, `MANIFEST:dedupe`, `MEDIA_INFO:probe`, `MANIFEST:by_media_type`, `TRANSCRIBE:M2405-51ff7600` |
| rights/consent | explicit UNKNOWN — needs Bambu (people visible / consent / public use) |
| fabricated events / people / quotes | none |
| story beats | all "TBD by Bambu" |

Engineering merge ≠ editorial approval. Local `MONTH_STORY.md` remains UNAPPROVED after this PR is squash-merged.

## REVIEWER COUNCIL

| Reviewer | Verdict | BLOCK findings |
|----------|---------|----------------|
| A — Architecture / Repo Guardian | PASS_WITH_NITS | 0 |
| B — Breaker / Safety QA | PASS_WITH_NITS | 0 |
| C — Media Evidence / Story Steward | PASS_WITH_NITS | 0 |

### Repairs applied after review

| Repair | Source |
|--------|--------|
| Clean error when `pilot03-*` command called but pilot03 module import fails (was `TypeError: NoneType not callable`) | Architect NIT #3 |
| Persist `language_probability` in TRANSCRIBE_BENCHMARK + per-clip transcript; use measured value in MONTH_STORY instead of hardcoded 0.95 | Media Evidence NIT #1 |
| Fix MONTH_STORY footer to reference contract file path (not stale commit SHA) | Media Evidence NIT #2 |
| Add `__pycache__/` and `*.pyc` to `.gitignore` (prevents accidental commit of bytecode) | Architect NIT #1 (hygiene) |

### Known NITs deferred to Phase 04

- Hardcoded default `E:\` path in `_DEFAULT_STORY_ROOT` — pre-existing convention from Phase 01/02; perpetuated, not introduced. Phase 04 should replace with `NWK_STORY_ROOT` env requirement.
- Derived budget overrun is currently WARN-only (heuristic estimate), not hard STOP. Actual derived usage was far below 25 GB; hard-stop logic deferred to Phase 04 when scaling.
- No "identical failure 3 times" retry counter across runs. Not exercised in this pilot; deferred.
- Renamed-file detection in `cmd_verify_source` is imprecise (renames surface as removed+added, not as renamed). Guard still passes (no false positive); precision fix deferred.
- Graphify stale (built from `4e6b4bc6`); not updated because CLI install is blocked. Limitation recorded honestly here.

## DETERMINISTIC VERIFICATION GATES

| Gate | Status |
|------|--------|
| Python syntax (ast.parse) | PASS |
| Targeted negative tests (no month / bad month / wildcard) | PASS — all exit 2 with correct message |
| Month-scope enforcement (heavy commands require explicit month) | PASS |
| Archive-wide dedupe path dead from CLI | PASS |
| Output-inside-source guard (`assert_output_outside_sources`) | PASS — every derived write calls it |
| Disk-space guard (100 GB threshold) | PASS |
| Source mutation proof (revalidate SHA-256 + sizes + mtimes) | PASS — 0 mutations |
| Local/private artifacts gitignored or outside repo tree | PASS — `story-system/` is sibling of repo; `__pycache__/` ignored |
| Git diff scan for raw media / transcripts / thumbnails | PASS — only `.gitignore`, `story_agent.py`, `pilot03.py` |
| Git diff scan for absolute E:\ source paths | PASS — only `_DEFAULT_STORY_ROOT` constant (pre-existing convention) |
| Git diff scan for source filenames / sensitive hashes | PASS — none in diff |
| Secret scan | PASS — no secrets introduced |

## PRIVACY / SECURITY STATEMENT

This PR commits **only**:
- `story-agent/v01/story_agent.py` — modified (Phase 03 command wiring + dedupe hardening)
- `story-agent/v01/pilot03.py` — new (Phase 03 module, stdlib-only at module top, optional `faster-whisper` imported inside the function that uses it)
- `.gitignore` — small addition (`__pycache__/`, `*.pyc`, `story-system/` safety net)
- `ops/reports/03-month-vertical-slice.md` — this file (sanitized aggregate evidence only)
- `ops/receipts/03-month-vertical-slice.md` — final receipt (added post-merge)

This PR does **not** commit:
- raw footage / proxies / thumbnails / contact sheets
- private transcripts (`TRANSCRIPT_*.json`)
- full private manifests with original_path (`SOURCE_BASELINE.json`, `LOCAL_SHA256_INDEX.json`)
- media-info probes with paths (`MEDIA_INFO.json`)
- the local UNAPPROVED `MONTH_STORY.md`
- StoryToolkitAI caches / models
- absolute E:\ source-footage paths (only the `_DEFAULT_STORY_ROOT` pointer to `story-system`)

All private artifacts live under `NWK_STORY_ROOT` (`...\NEW WORLD KIDS 2026\story-system\`), which is a **sibling** of the repo, not inside it. `LOCAL_SHA256_INDEX.json` and `TRANSCRIPT_*.json` are produced under `story-memory/<year>/Qn/MM-month/` and never referenced from committed code as paths.

## ROLLBACK / REMOVAL

If Phase 03 must be rolled back:

1. `git revert <squash-sha>` on `main` (single commit, clean revert)
2. Delete derived local artifacts:
   ```powershell
   Remove-Item -Recurse -Force "E:\...\story-system\story-memory\2024\Q2\05-may"
   Remove-Item -Recurse -Force "E:\...\story-system\cache\transcribe\2024-05"
   ```
3. Uninstall bounded repair:
   ```powershell
   python -m pip uninstall -y faster-whisper
   ```
4. Source footage is untouched (proven by `SOURCE_MUTATION_PROOF.json`); no rollback needed on originals.

## LIMITATIONS / RISKS

1. **Single-clip transcription** — only 1 of 46 audio-bearing clips transcribed. Acceptance #11 satisfied minimally; Phase 04 must broaden sampling.
2. **Tiny model quality** — `tiny` model is the smallest/lowest-quality faster-whisper model. Chosen for bounded Phase 03 proof. Quality adequate for circuit proof; Phase 04 should evaluate `base` / `small` for production use.
3. **No speaker diarization** — transcription segments have no speaker identity. OWNER-VERIFY claim in MONTH_STORY reflects this.
4. **Capture-date inference** — month resolved from folder-name pattern, not embedded EXIF/metadata. OWNER-VERIFY claim reflects this.
5. **Single source root** — no cross-source duplicate proof possible until a second source root is registered.
6. **Graphify stale** — knowledge graph not updated; GOD-NODE impact of new code not verified against current graph. Limitation recorded per contract §"Deterministic verification gates" item 11.
7. **Pre-existing E:\ path convention** — `_DEFAULT_STORY_ROOT` continues Phase 01/02 pattern. Phase 04 cleanup target.

## ACCEPTANCE CRITERIA CHECKLIST

Per `ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md` §"Acceptance criteria":

1. ✅ exactly one Bambu-approved month processed (`2024-05`)
2. ✅ heavy commands cannot accidentally run archive-wide without explicit scope
3. ✅ canonical registry is `story-system/config/sources.json`
4. ✅ approved-month originals have local SHA-256 provenance (49/49)
5. ✅ true duplicates use SHA-256 (`sha256_full`)
6. ✅ source files modified = 0 (proven)
7. ✅ no generated output is inside source folders (`assert_output_outside_sources`)
8. ✅ local month manifest exists (`SOURCE_MANIFEST.json`)
9. ✅ lightweight media intelligence ran (`MEDIA_INFO.json`, 49 ffprobe results)
10. ✅ STAI bridge honestly demonstrated as WORKING
11. ✅ at least one spoken clip transcribed locally (`M2405-51ff7600`, 5 segments)
12. ✅ outputs link to stable media IDs (`M2405-xxxxxxxx` format)
13. ✅ local `MONTH_STORY.md` exists and is clearly UNAPPROVED
14. ✅ observed/inferred/owner-verification classes separated
15. ✅ rights/consent uncertainty explicit ("UNKNOWN — needs Bambu")
16. ✅ private media/transcripts/paths absent from public GitHub
17. ✅ no unresolved reviewer BLOCK remains (3× PASS_WITH_NITS, 0 BLOCK)
18. ⏳ Phase 03 PR squash-merged and post-merge verified (in progress)
19. ⏳ sanitized Phase 03 receipt on main (in progress — this file + receipt)
20. ⏳ Builder stops for Bambu story/rights review before Phase 04 (will stop after merge)

---

*Engineering approval is not editorial approval. Local `MONTH_STORY.md` remains UNAPPROVED pending Bambu review.*
