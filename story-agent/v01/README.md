# Story Agent v0.1 — STORY-MISSION-0001

**Run on:** Bambu's Windows laptop (TABLET-RV7J0DA1)
**Pilot:** October 2023, Indigo Azul Project, Puerto Vallarta MX

## Quick Start

```bat
REM 1. One-time setup
story-agent\v01\setup_windows.bat

REM 2. Fill in footage paths
notepad E:\NWK_STORY_SYSTEM\config\sources.json

REM 3. Run the full pilot pipeline
python story-agent\v01\story_agent.py pilot0
```

## Commands

| Command | Purpose |
|---------|---------|
| `pilot0` | Run full October 2023 pipeline |
| `register` | Verify source roots |
| `scan` | Catalog all media files (read-only) |
| `dedupe` | Find duplicate files via SHA-256 |
| `manifest` | Write SOURCE_MANIFEST.json |
| `month-story` | Draft MONTH_STORY.md |
| `status` | Show pipeline state |

## Output location

All generated data: `E:\NWK_STORY_SYSTEM\`

October 2023 pilot output: `E:\NWK_STORY_SYSTEM\story-memory\2023\Q4\10-october\`

## Safety guarantees

- Source roots are never modified
- MONTH_STORY.md is always marked UNAPPROVED until Bambu signs off
- Disk space is checked before generating derived files (min 5 GB free)
- Same failure 3x = abort

## Optional dependency

```
pip install exifread
```

Improves capture date extraction from EXIF metadata. Falls back to filesystem
dates if not installed.
