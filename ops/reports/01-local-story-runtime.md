# Phase 01 — Local Story Runtime Foundation

**handshake_id:** NWK-A2A-2026-07-23-01  
**phase_id:** 01-local-story-runtime-foundation  
**baseline_main_sha:** `b12d495800facabb689870a551cb922e50b373a7`  
**risk:** low–medium (story-agent path/runtime only; no media processing)  

## Objective

Safe E: story-system runtime, StoryToolkitAI strategy resolved without rewrite, configs/logs/cache roots, dependency health checks pass.

## Outcomes

| Criterion | Result |
|-----------|--------|
| story-system root on E: | PASS — `...\NEW WORLD KIDS 2026\story-system` |
| required dirs | PASS — StoryToolkitAI, bridge, config, story-memory, transcripts, indexes, thumbnails, proxies, temp, exports, logs, cache |
| default root path corrected | PASS — no longer `E:\NWK_STORY_SYSTEM` |
| Culture Shock source registered | PASS — `sources.json` + `register` verified RO |
| STAI strategy | PASS — external `engine_path` to pauli package; thin bridge docs; no fork |
| health check | PASS — `python story_agent.py health` |
| pilot month not assumed | PASS — `NWK_PILOT_MONTH` unset; `pilot0` exits 1 until set |
| no heavy processing | PASS — no scan/dedupe/transcribe run |
| source media unmodified | PASS |

## Commands verified locally

```text
python story-agent/v01/story_agent.py register  -> Verified 1 active RO root
python story-agent/v01/story_agent.py health    -> HEALTH: PASS
python story-agent/v01/story_agent.py pilot0    -> blocked (month unset)
```

## Runtime facts

- Python 3.11.15
- ffmpeg on PATH
- PIL present; exifread optional missing (WARN only)
- E: free ~504.87 GB
- STAI engine: `...\pauli-story-tool-kit-main\storytoolkitai`

## Repo files changed

- `story-agent/v01/story_agent.py`
- `story-agent/v01/setup_windows.bat`
- `story-agent/v01/README.md`
- `story-agent/v01/config/sources.template.json`
- `story-agent/v01/config/storytoolkitai.template.json` (new)
- `story-agent/v01/bridge/README.md` (new)
- ops A2A/report/receipt/rollback artifacts

## Local non-git

- `story-system/config/sources.json`
- `story-system/config/storytoolkitai.json`
- `story-system/config/runtime.json`

## Out of scope

- Full inventory (Phase 02)
- Transcription/indexing (Phase 03)
- Graphify CLI install (still blocked; carried)
- STAI full dependency install / UI launch

## Rollback

Revert squash commit; local story-system configs remain rebuildable via `setup_windows.bat`.
