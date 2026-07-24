# Story Agent v0.1 — Local Story Runtime

**Run on:** Bambu's Windows laptop (TABLET-RV7J0DA1)  
**Runtime root (default):**  
`E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\story-system`

Override with env `NWK_STORY_ROOT` if needed.  
Bounded pilot month via `NWK_PILOT_MONTH=YYYY-MM` (set only after Phase 02 inventory).

## Quick Start

```bat
REM 1. One-time setup
story-agent\v01\setup_windows.bat

REM 2. Verify sources + runtime
python story-agent\v01\story_agent.py register
python story-agent\v01\story_agent.py health

REM 3. Phase 02+ only (after inventory + Bambu month approval)
set NWK_PILOT_MONTH=2024-07
python story-agent\v01\story_agent.py pilot0
```

## Commands

| Command       | Purpose                                      |
| ------------- | -------------------------------------------- |
| `register`    | Verify active read-only source roots         |
| `health`      | Runtime dirs, disk, ffmpeg, STAI pointer     |
| `scan`        | Catalog media files (read-only)              |
| `dedupe`      | SHA-256 duplicates for pilot month           |
| `manifest`    | Write SOURCE_MANIFEST.json                   |
| `month-story` | Draft MONTH_STORY.md (UNAPPROVED)            |
| `status`      | Show pipeline state                          |
| `pilot0`      | Bounded pilot for `NWK_PILOT_MONTH` only     |

## StoryToolkitAI

Upstream engine. Do not rewrite.  
Configure `config/storytoolkitai.json` with `engine_path` pointing at an existing install (default template references `pauli-story-tool-kit-main\storytoolkitai`).  
Thin bridge slot: `story-system/bridge/` and `story-system/StoryToolkitAI/`.

## Safety

- Source roots are never modified
- MONTH_STORY.md is always UNAPPROVED until Bambu signs off
- Disk space checked before derived work (min 5 GB free on E:)
- Same failure 3x = abort (caller/harness)
- No cloud upload of private footage without Bambu approval

## Optional dependency

```
pip install exifread pillow
```
