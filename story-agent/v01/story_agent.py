"""
New World Kids Story Agent v0.1
================================
STORY-MISSION-0001 — October 2023 Pilot

Run on Bambu's Windows machine (TABLET-RV7J0DA1).
All generated data is written under E:\\NWK_STORY_SYSTEM\\
All source roots are treated as READ-ONLY.

Usage:
    python story_agent.py register          # persist/verify sources.json
    python story_agent.py scan              # walk source roots, catalog files
    python story_agent.py manifest          # write SOURCE_MANIFEST.json
    python story_agent.py dedupe            # compute checksums and find duplicates
    python story_agent.py status            # print current pipeline state
    python story_agent.py pilot0            # run all steps for October 2023

Requirements: Python 3.8+, standard library only.
Optional:     pip install exifread pillow   (for EXIF/embedded-date extraction)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SYSTEM_ROOT = Path(os.environ.get("NWK_STORY_ROOT", r"E:\NWK_STORY_SYSTEM"))
SOURCES_FILE = SYSTEM_ROOT / "config" / "sources.json"
MANIFEST_FILE = SYSTEM_ROOT / "story-memory" / "SOURCE_MANIFEST.json"
LOG_FILE = SYSTEM_ROOT / "logs" / "story_agent.log"

MIN_FREE_GB = 5.0  # abort if less than this free on system root drive

MEDIA_EXTENSIONS = {
    "video": {".mp4", ".mov", ".avi", ".mkv", ".mts", ".m2ts", ".mpg", ".mpeg", ".wmv"},
    "photo": {".jpg", ".jpeg", ".png", ".raw", ".cr2", ".cr3", ".nef", ".arw", ".dng", ".heic", ".heif", ".tif", ".tiff"},
    "audio": {".wav", ".mp3", ".aac", ".m4a", ".flac", ".ogg"},
}
ALL_MEDIA = {ext for exts in MEDIA_EXTENSIONS.values() for ext in exts}

OCTOBER_2023_YEAR = 2023
OCTOBER_2023_MONTH = 10

PILOT_MONTH = f"{OCTOBER_2023_YEAR}-{OCTOBER_2023_MONTH:02d}"
PILOT_OUTPUT_DIR = (
    SYSTEM_ROOT / "story-memory" / str(OCTOBER_2023_YEAR) / "Q4" / "10-october"
)


# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

def setup_logging() -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s  %(levelname)-8s  %(message)s",
        handlers=[
            logging.FileHandler(LOG_FILE, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )


log = logging.getLogger("story_agent")


# ---------------------------------------------------------------------------
# Disk guard
# ---------------------------------------------------------------------------

def check_disk_space(path: Path) -> None:
    try:
        import shutil
        total, used, free = shutil.disk_usage(path.anchor)
        free_gb = free / (1024 ** 3)
        if free_gb < MIN_FREE_GB:
            log.error(
                "Only %.1f GB free on %s — minimum is %.1f GB. Aborting.",
                free_gb, path.anchor, MIN_FREE_GB,
            )
            sys.exit(1)
        log.info("Disk check OK: %.1f GB free on %s", free_gb, path.anchor)
    except Exception as exc:
        log.warning("Could not check disk space: %s", exc)


# ---------------------------------------------------------------------------
# Source registry
# ---------------------------------------------------------------------------

def load_sources() -> list[dict]:
    if not SOURCES_FILE.exists():
        log.error("sources.json not found at %s", SOURCES_FILE)
        log.error("Copy story-agent/v01/config/sources.template.json to %s and fill in real paths.", SOURCES_FILE)
        sys.exit(1)
    with SOURCES_FILE.open(encoding="utf-8") as fh:
        data = json.load(fh)
    sources = data.get("sources", [])
    log.info("Loaded %d source root(s) from %s", len(sources), SOURCES_FILE)
    return sources


def cmd_register() -> None:
    """Verify source roots exist and are readable."""
    SOURCES_FILE.parent.mkdir(parents=True, exist_ok=True)

    if not SOURCES_FILE.exists():
        template = Path(__file__).parent / "config" / "sources.template.json"
        if template.exists():
            import shutil
            shutil.copy(template, SOURCES_FILE)
            log.info("Copied sources.template.json -> %s", SOURCES_FILE)
            log.info("NEXT: Open %s and set real footage paths, then re-run `register`.", SOURCES_FILE)
            return
        log.error("sources.json missing and no template found. Create %s manually.", SOURCES_FILE)
        sys.exit(1)

    sources = load_sources()
    ok = True
    for s in sources:
        p = Path(s["path"])
        if not p.exists():
            log.error("Source root NOT FOUND: %s (%s)", p, s.get("label", "?"))
            ok = False
        elif not p.is_dir():
            log.error("Source root is not a directory: %s", p)
            ok = False
        else:
            log.info("OK  %s  (%s)", p, s.get("label", "unlabeled"))

    if not ok:
        log.error("One or more source roots are missing. Fix sources.json and re-run.")
        sys.exit(1)
    log.info("All %d source roots verified as read-only directories.", len(sources))


# ---------------------------------------------------------------------------
# Scanner
# ---------------------------------------------------------------------------

def classify_media_type(path: Path) -> str:
    ext = path.suffix.lower()
    for media_type, exts in MEDIA_EXTENSIONS.items():
        if ext in exts:
            return media_type
    return "other"


def extract_capture_date(path: Path) -> str | None:
    """Try EXIF first, fall back to file mtime."""
    try:
        import exifread
        with path.open("rb") as fh:
            tags = exifread.process_file(fh, stop_tag="EXIF DateTimeOriginal", details=False)
        raw = str(tags.get("EXIF DateTimeOriginal", "")).strip()
        if raw:
            return datetime.strptime(raw, "%Y:%m:%d %H:%M:%S").isoformat()
    except Exception:
        pass

    try:
        mtime = path.stat().st_mtime
        return datetime.fromtimestamp(mtime).isoformat()
    except Exception:
        return None


def year_month_from_date(iso_date: str | None, path: Path) -> tuple[int | None, int | None]:
    if iso_date:
        try:
            dt = datetime.fromisoformat(iso_date)
            return dt.year, dt.month
        except ValueError:
            pass
    # Try parsing from path components (e.g., .../2023/10/...)
    parts = path.parts
    for i, part in enumerate(parts):
        if part.isdigit() and len(part) == 4:
            year = int(part)
            if i + 1 < len(parts) and parts[i + 1].isdigit():
                month = int(parts[i + 1][:2])
                return year, month
            return year, None
    return None, None


def scan_source(source: dict, include_all: bool = False) -> list[dict]:
    root = Path(source["path"])
    label = source.get("label", root.name)
    records = []
    skipped = 0

    for filepath in root.rglob("*"):
        if not filepath.is_file():
            continue
        ext = filepath.suffix.lower()
        if not include_all and ext not in ALL_MEDIA:
            skipped += 1
            continue
        try:
            stat = filepath.stat()
            media_type = classify_media_type(filepath)
            capture_date = extract_capture_date(filepath)
            year, month = year_month_from_date(capture_date, filepath)
            records.append({
                "source_label": label,
                "original_path": str(filepath),
                "filename": filepath.name,
                "extension": ext,
                "media_type": media_type,
                "size_bytes": stat.st_size,
                "capture_date": capture_date,
                "year": year,
                "month": month,
                "checksum_sha256": None,  # filled by dedupe step
                "program": source.get("program", "unknown"),
                "location": source.get("location", "unknown"),
            })
        except PermissionError as exc:
            log.warning("Permission denied: %s — %s", filepath, exc)
        except Exception as exc:
            log.warning("Skipped %s: %s", filepath, exc)

    log.info("Scanned %s: %d media files found, %d non-media skipped", label, len(records), skipped)
    return records


def cmd_scan() -> list[dict]:
    sources = load_sources()
    all_records: list[dict] = []
    for source in sources:
        records = scan_source(source)
        all_records.extend(records)
    log.info("Total: %d media files across %d source root(s)", len(all_records), len(sources))

    # Cache raw scan to disk
    cache_path = SYSTEM_ROOT / "indexes" / "raw_scan.json"
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    with cache_path.open("w", encoding="utf-8") as fh:
        json.dump(all_records, fh, indent=2, ensure_ascii=False, default=str)
    log.info("Raw scan saved to %s", cache_path)
    return all_records


def load_raw_scan() -> list[dict]:
    cache_path = SYSTEM_ROOT / "indexes" / "raw_scan.json"
    if not cache_path.exists():
        log.error("No scan data found. Run `scan` first.")
        sys.exit(1)
    with cache_path.open(encoding="utf-8") as fh:
        return json.load(fh)


# ---------------------------------------------------------------------------
# Checksum / dedupe
# ---------------------------------------------------------------------------

CHECKSUM_CHUNK = 1 << 20  # 1 MB chunks


def sha256_file(path: Path, progress_every: int = 100) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        while chunk := fh.read(CHECKSUM_CHUNK):
            h.update(chunk)
    return h.hexdigest()


def cmd_dedupe(pilot_month_only: bool = True) -> None:
    records = load_raw_scan()

    target = records
    if pilot_month_only:
        target = [
            r for r in records
            if r.get("year") == OCTOBER_2023_YEAR and r.get("month") == OCTOBER_2023_MONTH
        ]
        log.info("Dedupe limited to %s: %d files", PILOT_MONTH, len(target))

    checksums: dict[str, list[str]] = {}
    for i, rec in enumerate(target, 1):
        try:
            h = sha256_file(Path(rec["original_path"]))
            rec["checksum_sha256"] = h
            checksums.setdefault(h, []).append(rec["original_path"])
            if i % 50 == 0:
                log.info("Checksummed %d/%d files…", i, len(target))
        except Exception as exc:
            log.warning("Checksum failed for %s: %s", rec["original_path"], exc)

    duplicates = {h: paths for h, paths in checksums.items() if len(paths) > 1}
    dup_count = sum(len(v) - 1 for v in duplicates.values())
    log.info("Deduplication done: %d duplicate file(s) found", dup_count)

    # Save dedupe map
    dedupe_path = SYSTEM_ROOT / "indexes" / "dedupe_map.json"
    with dedupe_path.open("w", encoding="utf-8") as fh:
        json.dump({"pilot_month": PILOT_MONTH, "duplicates": duplicates}, fh, indent=2)
    log.info("Dedupe map saved to %s", dedupe_path)

    # Update raw scan cache with checksums
    cache_path = SYSTEM_ROOT / "indexes" / "raw_scan.json"
    checksum_index = {rec["original_path"]: rec["checksum_sha256"] for rec in target}
    all_records = load_raw_scan()
    for rec in all_records:
        if rec["original_path"] in checksum_index:
            rec["checksum_sha256"] = checksum_index[rec["original_path"]]
    with cache_path.open("w", encoding="utf-8") as fh:
        json.dump(all_records, fh, indent=2, ensure_ascii=False, default=str)


# ---------------------------------------------------------------------------
# Source manifest
# ---------------------------------------------------------------------------

def cmd_manifest(year: int = OCTOBER_2023_YEAR, month: int = OCTOBER_2023_MONTH) -> None:
    all_records = load_raw_scan()
    month_records = [
        r for r in all_records
        if r.get("year") == year and r.get("month") == month
    ]

    by_type: dict[str, int] = {}
    by_source: dict[str, int] = {}
    for r in month_records:
        by_type[r["media_type"]] = by_type.get(r["media_type"], 0) + 1
        by_source[r["source_label"]] = by_source.get(r["source_label"], 0) + 1

    manifest: dict[str, Any] = {
        "schema_version": "1.0",
        "mission": "STORY-MISSION-0001",
        "pilot_month": f"{year}-{month:02d}",
        "generated_at": datetime.now().isoformat(),
        "approval_status": "UNAPPROVED — DRAFT",
        "file_count": len(month_records),
        "by_media_type": by_type,
        "by_source": by_source,
        "capture_date_range": {
            "earliest": min((r["capture_date"] for r in month_records if r["capture_date"]), default=None),
            "latest": max((r["capture_date"] for r in month_records if r["capture_date"]), default=None),
        },
        "files": month_records,
    }

    PILOT_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest_path = PILOT_OUTPUT_DIR / "SOURCE_MANIFEST.json"
    with manifest_path.open("w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2, ensure_ascii=False, default=str)
    log.info("SOURCE_MANIFEST.json written to %s", manifest_path)
    log.info(
        "Summary — %d files: %s",
        len(month_records),
        ", ".join(f"{k}: {v}" for k, v in by_type.items()),
    )


# ---------------------------------------------------------------------------
# Month story draft
# ---------------------------------------------------------------------------

MONTH_STORY_TEMPLATE = """\
# Month Story: October 2023
## APPROVAL STATUS: UNAPPROVED DRAFT — DO NOT PUBLISH

**Mission:** STORY-MISSION-0001
**Pilot month:** October 2023
**Program:** Indigo Azul Project, Puerto Vallarta MX
**Generated:** {generated_at}

---

## Source Overview

- Files cataloged: {file_count}
- Photos: {photo_count}
- Videos: {video_count}
- Audio: {audio_count}
- Capture date range: {date_earliest} → {date_latest}
- Duplicate files identified: {dup_count}

---

## Known Context (Hurricane Lidia — October 2023)

Hurricane Lidia made landfall near Puerto Vallarta in October 2023. This month
likely documents the storm's impact on the Indigo Azul growing site and the
community response.

**Bambu: Please verify the above and correct any errors before approving.**

---

## Suggested Story Beats

*These are AI-generated proposals. Bambu must verify each claim.*

1. **Before** — What the site looked like prior to the storm.
2. **During** — Any documentation of the storm itself or immediate response.
3. **Damage** — Evidence of what was lost or damaged.
4. **Recovery** — Early recovery actions and community effort.
5. **Resilience** — Signs of the site bouncing back.

---

## Core Four Tags

- [ ] Food
- [ ] Water
- [ ] Energy
- [ ] Shelter

*Tag the applicable pillars and note specific evidence.*

---

## Strongest Visual Moments (TO BE FILLED BY BAMBU)

> List 3–5 photos or clips that best represent this month.

---

## Strongest Spoken Moments / Quotes (TO BE FILLED BY BAMBU)

> After transcription, paste standout quotes here.

---

## Before/After Candidates (TO BE FILLED BY BAMBU)

> Identify specific pairs — e.g., same location pre- and post-storm.

---

## Rights & Consent (TO BE FILLED BY BAMBU)

- People visible:
- Consent documentation:
- Public use approved:

---

## Uncertainty / Claims Requiring Human Verification

- [ ] Hurricane Lidia connection — date and location confirmed?
- [ ] All capture dates verified against actual recording dates?
- [ ] Duplicates across source roots reviewed by Bambu?

---

## Recommended Public Assets (TO BE FILLED AFTER BAMBU REVIEW)

None selected yet.

---

## Human Approval

- [ ] Bambu has reviewed this story draft
- [ ] Facts verified
- [ ] Story beats confirmed
- [ ] Rights/consent cleared
- Approved by: _______________
- Date approved: _______________

---
*Generated by Story Agent v0.1 — STORY-MISSION-0001. Not approved for publication.*
"""


def cmd_month_story() -> None:
    manifest_path = PILOT_OUTPUT_DIR / "SOURCE_MANIFEST.json"
    if not manifest_path.exists():
        log.error("Run `manifest` first before generating MONTH_STORY.md")
        sys.exit(1)

    with manifest_path.open(encoding="utf-8") as fh:
        manifest = json.load(fh)

    dedupe_path = SYSTEM_ROOT / "indexes" / "dedupe_map.json"
    dup_count = 0
    if dedupe_path.exists():
        with dedupe_path.open(encoding="utf-8") as fh:
            dedupe = json.load(fh)
        dup_count = sum(len(v) - 1 for v in dedupe.get("duplicates", {}).values())

    content = MONTH_STORY_TEMPLATE.format(
        generated_at=datetime.now().strftime("%Y-%m-%d %H:%M"),
        file_count=manifest["file_count"],
        photo_count=manifest.get("by_media_type", {}).get("photo", 0),
        video_count=manifest.get("by_media_type", {}).get("video", 0),
        audio_count=manifest.get("by_media_type", {}).get("audio", 0),
        date_earliest=manifest.get("capture_date_range", {}).get("earliest", "unknown"),
        date_latest=manifest.get("capture_date_range", {}).get("latest", "unknown"),
        dup_count=dup_count,
    )

    story_path = PILOT_OUTPUT_DIR / "MONTH_STORY.md"
    with story_path.open("w", encoding="utf-8") as fh:
        fh.write(content)
    log.info("MONTH_STORY.md written to %s", story_path)
    log.info("HUMAN GATE: Open %s, verify all claims, and mark approved before proceeding.", story_path)


# ---------------------------------------------------------------------------
# Status
# ---------------------------------------------------------------------------

def cmd_status() -> None:
    def check(path: Path, label: str) -> None:
        mark = "✓" if path.exists() else "✗"
        print(f"  {mark}  {label}")
        print(f"       {path}")

    print("\n=== New World Kids Story Agent — STORY-MISSION-0001 Status ===\n")
    check(SOURCES_FILE, "Source registry (sources.json)")
    check(SYSTEM_ROOT / "indexes" / "raw_scan.json", "Raw scan cache")
    check(SYSTEM_ROOT / "indexes" / "dedupe_map.json", "Dedupe map")
    check(PILOT_OUTPUT_DIR / "SOURCE_MANIFEST.json", "SOURCE_MANIFEST.json (October 2023)")
    check(PILOT_OUTPUT_DIR / "MONTH_STORY.md", "MONTH_STORY.md (October 2023)")
    print()


# ---------------------------------------------------------------------------
# Pilot-0 end-to-end
# ---------------------------------------------------------------------------

def cmd_pilot0() -> None:
    log.info("=== STORY-MISSION-0001: October 2023 Pilot — starting ===")
    check_disk_space(SYSTEM_ROOT)
    cmd_register()
    cmd_scan()
    cmd_dedupe(pilot_month_only=True)
    cmd_manifest(OCTOBER_2023_YEAR, OCTOBER_2023_MONTH)
    cmd_month_story()
    log.info("=== Pilot-0 complete. HUMAN GATE: Review MONTH_STORY.md before proceeding. ===")
    cmd_status()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

COMMANDS = {
    "register": cmd_register,
    "scan": cmd_scan,
    "manifest": cmd_manifest,
    "dedupe": cmd_dedupe,
    "month-story": cmd_month_story,
    "status": cmd_status,
    "pilot0": cmd_pilot0,
}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="New World Kids Story Agent v0.1 — STORY-MISSION-0001",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "command",
        choices=list(COMMANDS),
        help="Pipeline stage to execute",
    )
    args = parser.parse_args()

    SYSTEM_ROOT.mkdir(parents=True, exist_ok=True)
    setup_logging()
    COMMANDS[args.command]()
