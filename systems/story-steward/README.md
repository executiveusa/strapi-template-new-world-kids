# Story Steward System — Local Media Pipeline

Bounded local workflow for the New World Kids Story Agent.
Separate from the sovereignty/grant workflow.

## Pipeline

```
00_register → 01_scan → 02_manifest → 03_transcribe → 04_story_draft → 05_human_review
```

## Rules

- Source roots are always read-only
- No stage auto-advances past a HUMAN GATE
- October 2023 (STORY-MISSION-0001) is the first and only active pilot
- Do not process November/December until October is APPROVED

## Active Pilot

**STORY-MISSION-0001** — October 2023, Indigo Azul Project, Puerto Vallarta MX

Status: PENDING — `sources.json` not yet configured.

## Entry point

```
# On Bambu's Windows machine:
story-agent\v01\setup_windows.bat       # one-time setup
# Edit E:\NWK_STORY_SYSTEM\config\sources.json
python story-agent\v01\story_agent.py pilot0
```
