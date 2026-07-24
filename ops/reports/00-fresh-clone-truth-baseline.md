# Phase 00 — Fresh Clone + Truth Baseline

**handshake_id:** NWK-A2A-2026-07-23-00  
**phase_id:** 00-fresh-clone-truth-baseline  
**baseline_main_sha:** `39f0eaac43d1d4f9bef00b1c83c6dfbd225aee58`  
**risk:** low  
**builder:** Grok 4.5 local  

## Objective

Establish a verified local GitHub `main` clone, hydrate Graphify/architecture truth, record safe E: paths, and leave a durable baseline for Phase 01+.

## CLONE VERIFICATION

| Field | Value |
|-------|--------|
| local_repo | `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\repo\strapi-template-new-world-kids` |
| remote | `https://github.com/executiveusa/strapi-template-new-world-kids.git` |
| branch_at_clone | `main` |
| local_HEAD | `39f0eaac43d1d4f9bef00b1c83c6dfbd225aee58` |
| github_main_HEAD | `39f0eaac43d1d4f9bef00b1c83c6dfbd225aee58` |
| working_tree_at_baseline | clean |
| harness_ancestor | yes (exact HEAD = harness merge) |

### Non-canonical path (do not use as SoT)

| Field | Value |
|-------|--------|
| path | `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026` (workspace root) |
| remote | `https://github.com/executiveusa/newworldkids.git` |
| HEAD | `6764af2edce3c37223460c0c758fb66a665a95b3` |
| disposition | left in place; ignored for Pilot 0 |

## DOCS / ISSUE TRUTH

| Artifact | Status |
|----------|--------|
| AGENTS.md | present |
| A2A handshake | present |
| grinions-nwk.yaml | present |
| GRINIONS harness | present |
| FRESH_CLONE handoff | present |
| LOCAL_AGENT_STORY handoff | present |
| STATUS.md / CONTEXT.md | absent on main |
| Issue #76 | OPEN — Phase 0 Sovereignty + StoryFoundry foundation |

## GRAPHIFY / REPO ARCHITECTURE

| Item | Status |
|------|--------|
| graphify-out/GRAPH_REPORT.md | **present** |
| graph built from commit | `4e6b4bc6` |
| current HEAD | `39f0eaa…` |
| freshness | **STALE** vs HEAD |
| graphify CLI on machine | **not installed** (`graphifyy` pip install timed out / not found) |
| update action | blocked this session; use committed graph for navigation; schedule update in Phase 01 runtime setup |

### GOD NODES (from GRAPH_REPORT.md)

1. `cn()` — 140 edges  
2. `react` — 55  
3. `globalEnv` — 52  
4. `scripts` — 42  
5. `customRender()` — 34  
6. `AppState` — 31  
7. `TestMCPStdio` — 29  
8. `getEnvVar()` — 29  
9. `output_result()` — 24  
10. `getPostsMeta()` — 22  

### Relevant communities / reuse targets

| Area | Path / hub | Reuse for Story System |
|------|------------|-------------------------|
| Public UI | `apps/ui` | Gallery later; do not wire private footage |
| Journal | `apps/blog` | Proof layer; not media engine |
| Backend | `services/hermes` (`hermes/src/index.ts` community) | Orchestration reuse; not rewrite |
| Story Agent v0.1 | `story-agent/v01/` | Reuse/adapt; paths currently point to `E:\NWK_STORY_SYSTEM` + Oct 2023 pilot assumption |
| Sovereignty ICM | `systems/sovereignty/` | Funding/truth stages (Issue #76) |
| Story Steward | `systems/story-steward/` | Chronology/claims boundary |
| Ops | `ops/handoffs`, `ops/a2a`, `ops/workflows` | Phase contracts |

### Architecture boundary (confirmed)

```text
Bambu / StoryFoundry UI
  -> Local Story Agent / MediaOps
  -> Thin StoryKit Bridge
  -> StoryToolkitAI (upstream engine)
  -> read-only originals
```

Do **not** rewrite StoryToolkitAI. Do **not** couple `apps/ui` to private source roots.

### Path drift to correct in later phase (not Phase 00 code change)

| Item | Current in repo | Correct local (handoff) |
|------|-----------------|-------------------------|
| story runtime | `E:\NWK_STORY_SYSTEM` (story-agent README) | `...\NEW WORLD KIDS 2026\story-system` |
| first month assumption | October 2023 Indigo Azul | Evidence-based after Culture Shock inventory |
| confirmed source | (template) | Culture Shock FOOTAGE -VIDEO |

## LOCAL MACHINE / DISK

| Item | Value |
|------|--------|
| E: free | **504.87 GB** |
| E: used | 1357.92 GB |
| E: total | 1862.79 GB |
| E: volume | ADATA HV320 ~1863 GB, MediaType Unspecified → treat as **external HDD** |
| C: | Toshiba SSD ~238 GB (known tight free space; keep caches off C:) |
| GPU | no CUDA assumed (handoff: Iris Plus iGPU) |

## SAFE PATHS

| Role | Path |
|------|------|
| project root | `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026` |
| canonical repo | `...\NEW WORLD KIDS 2026\repo\strapi-template-new-world-kids` |
| story-system | `...\NEW WORLD KIDS 2026\story-system` |
| reports (local) | `...\NEW WORLD KIDS 2026\reports` |
| backups | `...\NEW WORLD KIDS 2026\backups` |
| source (RO) | `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\CULTURE SHOCK PROGRAM\CULTURE SHOCK FOOTAGE -VIDEO` |

Layout directories created if missing: `story-system\{StoryToolkitAI,config,story-memory,transcripts,indexes,thumbnails,proxies,temp,exports,logs}`, `reports`, `backups`.

## STORYTOOLKITAI DETECTION (baseline only)

| Location | Status |
|----------|--------|
| `C:\Users\execu\StoryToolkitAI` | exists; **app.log only** (not full runtime) |
| `...\pauli-story-tool-kit-main\storytoolkitai` | package tree (`core/`, `integrations/`, `ui/`) — candidate reuse |
| other pipeline copies | AGENT ZERO, ARCHON-X, AFROMATIONS, Synthia (do not fork) |
| under fresh story-system | placeholder dir only |

## SOURCE ROOT CHECK

- Path exists: **yes**
- Phase 00 does **not** run full inventory (Phase 02)
- Prior off-repo light inventory (session context, non-authoritative until Phase 02 re-run under harness): ~5959 files / ~696 GB; years 2019–2024; recommend **2024-07** as first month candidate — **must be re-verified in Phase 02**

## ACCEPTANCE CRITERIA

- [x] Fresh clone at exact path  
- [x] Remote/branch/HEAD match GitHub main  
- [x] Clean baseline working tree  
- [x] Required contracts read  
- [x] Graphify present (stale flagged)  
- [x] GOD NODES recorded  
- [x] E: disk + safe paths recorded  
- [x] Issue #76 inspected  
- [x] No source media modified  
- [x] No heavy media processing  

## OUT OF SCOPE (explicit)

- StoryToolkitAI install/runtime wiring (Phase 01)  
- Full media inventory (Phase 02)  
- Transcription/indexing (Phase 03+)  
- Graph regenerate if CLI unavailable (blocked; carry to Phase 01)  
- Public gallery changes  

## RISKS / CARRY-FORWARD

1. Graphify CLI missing → graph stale; navigate with committed GRAPH_REPORT until install succeeds  
2. story-agent v0.1 path/month assumptions conflict with handoff — fix in Phase 01/02, not silently  
3. C: space pressure — all derived media on E: only  
4. External HDD performance for proxies/transcription  

## ROLLBACK

- Phase 00 adds only ops docs under branch; squash merge is documentation-only  
- To undo: revert squash commit on main  
- Local clone path can be deleted and re-cloned without affecting source media  

## STOP CONDITIONS HIT?

None. Proceed to independent review → PR → squash merge → Phase 01 after receipt.
