# Story Steward — Playbook

## Stage Pipeline

```
00_REGISTER  →  01_SCAN  →  02_MANIFEST  →  03_TRANSCRIBE  →  04_STORY_DRAFT  →  05_HUMAN_REVIEW
```

Each stage is bounded, verifiable, and stops before destructive or public actions.

---

## Stage 00 — Register Sources

**INPUTS:** `sources.json` at `E:\NWK_STORY_SYSTEM\config\sources.json`
**PURPOSE:** Verify all source roots exist and are readable
**ALLOWED:** Read directory existence; print paths
**PROHIBITED:** Any write to source paths
**OUTPUTS:** Console confirmation; log entry
**HUMAN GATE:** None — proceed if all roots exist
**NEXT:** 01_SCAN

---

## Stage 01 — Scan

**INPUTS:** Registered source roots
**PURPOSE:** Walk all source roots and catalog media files
**ALLOWED:** Read file paths, sizes, extensions, filesystem dates
**PROHIBITED:** Read file contents; modify files; copy originals
**OUTPUTS:** `E:\NWK_STORY_SYSTEM\indexes\raw_scan.json`
**HUMAN GATE:** None — proceed automatically
**NEXT:** 02_MANIFEST (for pilot month only)

---

## Stage 02 — Manifest

**INPUTS:** `raw_scan.json` + optional `dedupe_map.json`
**PURPOSE:** Build structured inventory for October 2023
**ALLOWED:** Filter by year/month; compute file counts; classify media type
**PROHIBITED:** EXIF write; file moves; any cloud upload
**OUTPUTS:** `E:\NWK_STORY_SYSTEM\story-memory\2023\Q4\10-october\SOURCE_MANIFEST.json`
**HUMAN GATE:** Bambu reviews file count and date range before transcription queuing
**NEXT:** 03_TRANSCRIBE

---

## Stage 03 — Transcribe / Index (via StoryToolkitAI)

**INPUTS:** Video/audio file list from SOURCE_MANIFEST.json; StoryToolkitAI installed at `E:\NWK_STORY_SYSTEM\StoryToolkitAI`
**PURPOSE:** Extract spoken content from selected October 2023 clips
**ALLOWED:** Queue files to StoryToolkitAI; read transcripts back; write derived files to `E:\NWK_STORY_SYSTEM\transcripts\`
**PROHIBITED:** Process ALL files (select a representative subset first); move originals; upload to external services
**OUTPUTS:** Transcript text files under `E:\NWK_STORY_SYSTEM\story-memory\2023\Q4\10-october\transcripts\`
**HUMAN GATE:** Bambu selects which clips to transcribe before this stage runs
**NEXT:** 04_STORY_DRAFT

---

## Stage 04 — Story Draft

**INPUTS:** SOURCE_MANIFEST.json; transcripts; Bambu context notes
**PURPOSE:** Generate `MONTH_STORY.md` as a structured proposal
**ALLOWED:** Synthesize metadata, file counts, transcript excerpts into draft; label all AI interpretations
**PROHIBITED:** Claim factual truth for AI-generated interpretations; select final assets; publish
**OUTPUTS:** `E:\NWK_STORY_SYSTEM\story-memory\2023\Q4\10-october\MONTH_STORY.md` marked UNAPPROVED
**HUMAN GATE:** REQUIRED — Bambu reviews, corrects, and approves before any publishing step
**NEXT:** 05_HUMAN_REVIEW

---

## Stage 05 — Human Review

**INPUTS:** MONTH_STORY.md draft; SOURCE_MANIFEST.json
**PURPOSE:** Bambu reviews, edits, and approves the story record
**ALLOWED:** Bambu edits the Markdown; stamps APPROVED with date and signature
**PROHIBITED:** Agent auto-approving; agent publishing without APPROVED status
**OUTPUTS:** Approved MONTH_STORY.md; entry in `ops/reports/` confirming completion
**HUMAN GATE:** THIS IS THE GATE — no downstream action until approved
**NEXT:** November 2023 (only after October is approved)

---

## Failure handling

- Same failure 3 times in a row → stop and log; do not retry indefinitely
- Log all errors to `E:\NWK_STORY_SYSTEM\logs\story_agent.log`
- Disk below 5 GB free → abort before generating derived files
- Source root not found → abort stage 01; do not proceed

---

## StoryToolkitAI integration

The Story Agent bridges to StoryToolkitAI via its local API or CLI.
Detect installation at `E:\NWK_STORY_SYSTEM\StoryToolkitAI` before invoking.
If not installed, skip Stage 03 and note the gap in the report.
Do not reinstall or fork StoryToolkitAI — report missing dependency to Bambu.

---

## Rollback

To remove all generated Story System data without touching originals:

```
rmdir /s /q E:\NWK_STORY_SYSTEM\indexes
rmdir /s /q E:\NWK_STORY_SYSTEM\story-memory
rmdir /s /q E:\NWK_STORY_SYSTEM\transcripts
rmdir /s /q E:\NWK_STORY_SYSTEM\thumbnails
rmdir /s /q E:\NWK_STORY_SYSTEM\proxies
rmdir /s /q E:\NWK_STORY_SYSTEM\temp
```

Originals at all source roots remain untouched.
