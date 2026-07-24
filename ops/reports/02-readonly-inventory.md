# Phase 02 — Read-Only Source Registry + Inventory

**phase_id:** 02-readonly-source-registry-inventory  
**baseline_main_sha:** `415abf31b12c83d59c0b47654eb21a2afea3da1f`  
**risk:** low  
**mode:** read-only filesystem inventory (no EXIF bulk, no transcription, no proxies)

## SOURCE INVENTORY

| Metric | Value |
|--------|--------|
| source root | `...\CULTURE SHOCK PROGRAM\CULTURE SHOCK FOOTAGE -VIDEO` |
| total files | **5959** |
| video / photo / audio / other | **4373 / 1552 / 10 / 24** |
| size | **695.53 GB** |
| unreadable | **0** |
| source_files_modified | **0** |
| years (folder-derived) | 2019–2025 |
| name+size dup groups | **979** (2206 files in groups) |
| source root mtime sample | 2025-05-25 (unchanged by this phase) |

### Method

- `story-agent/v01/inventory_readonly.py`
- Walk active RO sources from `story-system/config/sources.json`
- Month from folder path names (not EXIF)
- Duplicate candidates = same filename + byte size
- Outputs (derived only):
  - `story-system/indexes/phase02_readonly_inventory.json`
  - `story-system/indexes/phase02_summary.json`

### Months (folder-derived file counts)

See summary JSON. Largest bulk: **2020-10 = 2338 files**.

## RECOMMENDED FIRST PILOT MONTH

**Primary (scorer): `2024-05` (MAY 2024)** — 49 files / 48 video / ~7.0 GB  
**Strong alternate: `2024-07` (JULY 2024)** — 79 files / 72 video / ~26.3 GB (richer topical folders)

| rank | month | files | video | gb | notes |
|------|-------|------:|------:|---:|-------|
| 1 | 2024-05 | 49 | 48 | 7.0 | smallest top-tier pilot |
| 2 | 2024-07 | 79 | 72 | 26.3 | bananas/hugelkultur/spring story folders |
| 3 | 2024-08 | 199 | 196 | 28.5 | larger |
| 4 | 2024-02 | 241 | 59 | 2.6 | Geo Ag; photo-heavy |

**Why not auto October 2023:** not assumed; Culture Shock inventory drives choice.  
**Avoid first:** 2020-10 (2338 files / bulk).

## HUMAN GATE (STOP)

**Do not start Phase 03 heavy processing until Bambu approves the first month.**

Approve one of:
1. `2024-05` (recommended by scorer — smallest top-tier)
2. `2024-07` (recommended for story richness)
3. `2024-08`
4. `2024-02`
5. Other month from inventory

## Out of scope (held)

- SHA-256 full archive
- EXIF bulk pass
- Transcription / STAI jobs
- Proxies
