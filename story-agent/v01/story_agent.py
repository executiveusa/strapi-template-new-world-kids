"""
New World Kids Story Agent v0.1
================================
Local Story Runtime for Pilot 0 (Story System).

Run on Bambu's Windows machine (TABLET-RV7J0DA1).
All generated data is written under NWK_STORY_ROOT (default:
E:\\ACTIVE PROJECTS-PIPELINE\\ACTIVE PROJECTS-PIPELINE\\NEW WORLD KIDS 2026\\story-system).
All source roots are treated as READ-ONLY.

Usage:
    python story_agent.py register          # persist/verify sources.json
    python story_agent.py health            # runtime/dependency health check
    python story_agent.py scan              # walk source roots, catalog files
    python story_agent.py manifest          # write SOURCE_MANIFEST.json
    python story_agent.py dedupe            # compute checksums and find duplicates
    python story_agent.py status            # print current pipeline state
    python story_agent.py pilot0            # bounded pilot for NWK_PILOT_MONTH

Requirements: Python 3.8+, standard library only.
Optional:     pip install exifread pillow   (for EXIF/embedded-date extraction)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

_DEFAULT_STORY_ROOT = (
    r"E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE"
    r"\NEW WORLD KIDS 2026\story-system"
)
SYSTEM_ROOT = Path(os.environ.get("NWK_STORY_ROOT", _DEFAULT_STORY_ROOT))
SOURCES_FILE = SYSTEM_ROOT / "config" / "sources.json"
STAI_CONFIG_FILE = SYSTEM_ROOT / "config" / "storytoolkitai.json"
RUNTIME_FILE = SYSTEM_ROOT / "config" / "runtime.json"
MANIFEST_FILE = SYSTEM_ROOT / "story-memory" / "SOURCE_MANIFEST.json"
LOG_FILE = SYSTEM_ROOT / "logs" / "story_agent.log"

MIN_FREE_GB = 5.0  # abort if less than this free on system root drive

REQUIRED_DIRS = (
    "StoryToolkitAI",
    "bridge",
    "config",
    "story-memory",
    "transcripts",
    "indexes",
    "thumbnails",
    "proxies",
    "temp",
    "exports",
    "logs",
    "cache",
)

MEDIA_EXTENSIONS = {
    "video": {".mp4", ".mov", ".avi", ".mkv", ".mts", ".m2ts", ".mpg", ".mpeg", ".wmv", ".m4v", ".webm"},
    "photo": {".jpg", ".jpeg", ".png", ".raw", ".cr2", ".cr3", ".nef", ".arw", ".dng", ".heic", ".heif", ".tif", ".tiff", ".webp", ".gif", ".bmp"},
    "audio": {".wav", ".mp3", ".aac", ".m4a", ".flac", ".ogg", ".wma", ".aif", ".aiff"},
}
ALL_MEDIA = {ext for exts in MEDIA_EXTENSIONS.values() for ext in exts}

# Bounded pilot month is configurable. Do not assume October 2023 is present.
# Format: YYYY-MM via NWK_PILOT_MONTH. Default left empty until Phase 02 inventory.
_PILOT_RAW = os.environ.get("NWK_PILOT_MONTH", "").strip()
if _PILOT_RAW and len(_PILOT_RAW) == 7 and _PILOT_RAW[4] == "-":
    PILOT_YEAR = int(_PILOT_RAW[:4])
    PILOT_MONTH_NUM = int(_PILOT_RAW[5:7])
else:
    PILOT_YEAR = 0
    PILOT_MONTH_NUM = 0
PILOT_MONTH = f"{PILOT_YEAR}-{PILOT_MONTH_NUM:02d}" if PILOT_YEAR else "UNSET"
_QMAP = {1: "Q1", 2: "Q1", 3: "Q1", 4: "Q2", 5: "Q2", 6: "Q2", 7: "Q3", 8: "Q3", 9: "Q3", 10: "Q4", 11: "Q4", 12: "Q4"}
_MMAP = {
    1: "01-january", 2: "02-february", 3: "03-march", 4: "04-april",
    5: "05-may", 6: "06-june", 7: "07-july", 8: "08-august",
    9: "09-september", 10: "10-october", 11: "11-november", 12: "12-december",
}
if PILOT_YEAR and PILOT_MONTH_NUM in _QMAP:
    PILOT_OUTPUT_DIR = (
        SYSTEM_ROOT / "story-memory" / str(PILOT_YEAR) / _QMAP[PILOT_MONTH_NUM] / _MMAP[PILOT_MONTH_NUM]
    )
else:
    PILOT_OUTPUT_DIR = SYSTEM_ROOT / "story-memory" / "_unset_pilot"




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


def ensure_runtime_dirs() -> None:
    for name in REQUIRED_DIRS:
        (SYSTEM_ROOT / name).mkdir(parents=True, exist_ok=True)


def _is_placeholder_path(path: str) -> bool:
    p = (path or "").strip().upper()
    return (not p) or p.startswith("FILL_IN") or "FILL_IN" in p


def active_sources(sources: list[dict]) -> list[dict]:
    """Return only non-placeholder source roots (optional roots may remain FILL_IN)."""
    active = []
    for s in sources:
        path = str(s.get("path", ""))
        if _is_placeholder_path(path):
            log.info("SKIP placeholder source %s (%s)", s.get("id", "?"), s.get("label", "?"))
            continue
        if s.get("enabled") is False:
            log.info("SKIP disabled source %s", s.get("id", "?"))
            continue
        active.append(s)
    return active


def cmd_register() -> None:
    """Verify source roots exist and are readable. Never mutates source trees."""
    ensure_runtime_dirs()
    SOURCES_FILE.parent.mkdir(parents=True, exist_ok=True)

    if not SOURCES_FILE.exists():
        template = Path(__file__).parent / "config" / "sources.template.json"
        if template.exists():
            shutil.copy(template, SOURCES_FILE)
            log.info("Copied sources.template.json -> %s", SOURCES_FILE)
            log.info("NEXT: Open %s and set real footage paths, then re-run `register`.", SOURCES_FILE)
            return
        log.error("sources.json missing and no template found. Create %s manually.", SOURCES_FILE)
        sys.exit(1)

    sources = load_sources()
    active = active_sources(sources)
    if not active:
        log.error("No active source roots. Set at least one real path in %s", SOURCES_FILE)
        sys.exit(1)

    ok = True
    for s in active:
        p = Path(s["path"])
        if not s.get("readonly", True):
            log.error("Source root must be readonly=true: %s", p)
            ok = False
            continue
        if not p.exists():
            log.error("Source root NOT FOUND: %s (%s)", p, s.get("label", "?"))
            ok = False
        elif not p.is_dir():
            log.error("Source root is not a directory: %s", p)
            ok = False
        else:
            log.info("OK  %s  (%s) readonly=%s", p, s.get("label", "unlabeled"), s.get("readonly", True))

    if not ok:
        log.error("One or more active source roots are missing. Fix sources.json and re-run.")
        sys.exit(1)
    log.info("Verified %d active read-only source root(s).", len(active))


def cmd_health() -> None:
    """Runtime foundation health check for Phase 01."""
    ensure_runtime_dirs()
    failures: list[str] = []
    print("\n=== NWK Story Runtime Health ===\n")
    print(f"SYSTEM_ROOT: {SYSTEM_ROOT}")
    print(f"PILOT_MONTH: {PILOT_MONTH}")
    print(f"Python: {sys.version.split()[0]}")

    # dirs
    for name in REQUIRED_DIRS:
        p = SYSTEM_ROOT / name
        mark = "OK" if p.is_dir() else "FAIL"
        print(f"  [{mark}] dir {name}")
        if mark != "OK":
            failures.append(f"missing dir {p}")

    # disk
    try:
        total, used, free = shutil.disk_usage(SYSTEM_ROOT.anchor)
        free_gb = free / (1024 ** 3)
        mark = "OK" if free_gb >= MIN_FREE_GB else "FAIL"
        print(f"  [{mark}] free_gb={free_gb:.2f} (min {MIN_FREE_GB})")
        if mark != "OK":
            failures.append(f"low disk {free_gb:.2f} GB")
    except Exception as exc:
        failures.append(f"disk check failed: {exc}")
        print(f"  [FAIL] disk check: {exc}")

    # sources
    if SOURCES_FILE.exists():
        print(f"  [OK] sources.json")
        try:
            sources = active_sources(load_sources())
            if not sources:
                failures.append("no active sources")
                print("  [FAIL] no active sources")
            for s in sources:
                p = Path(s["path"])
                mark = "OK" if p.is_dir() else "FAIL"
                print(f"  [{mark}] source {s.get('id')} -> {p}")
                if mark != "OK":
                    failures.append(f"source missing {p}")
                if not s.get("readonly", True):
                    failures.append(f"source not readonly {p}")
                    print(f"  [FAIL] source not readonly: {p}")
        except Exception as exc:
            failures.append(f"sources parse: {exc}")
            print(f"  [FAIL] sources parse: {exc}")
    else:
        failures.append("sources.json missing")
        print("  [FAIL] sources.json missing")

    # optional deps
    for mod in ("exifread", "PIL"):
        try:
            __import__(mod if mod != "PIL" else "PIL")
            print(f"  [OK] python:{mod}")
        except Exception:
            print(f"  [WARN] python:{mod} not installed (optional)")

    # ffmpeg
    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg:
        print(f"  [OK] ffmpeg -> {ffmpeg}")
    else:
        print("  [WARN] ffmpeg not on PATH (needed for proxies later)")

    # StoryToolkitAI engine pointer
    engine_path = None
    if STAI_CONFIG_FILE.exists():
        try:
            cfg = json.loads(STAI_CONFIG_FILE.read_text(encoding="utf-8"))
            engine_path = cfg.get("engine_path")
            print(f"  [OK] storytoolkitai.json present")
        except Exception as exc:
            failures.append(f"stai config: {exc}")
            print(f"  [FAIL] storytoolkitai.json: {exc}")
    else:
        print("  [WARN] storytoolkitai.json missing (engine not linked yet)")

    if engine_path:
        ep = Path(engine_path)
        mark = "OK" if ep.exists() else "FAIL"
        print(f"  [{mark}] STAI engine_path -> {ep}")
        if mark != "OK":
            failures.append(f"STAI engine missing {ep}")
        else:
            # thin presence check only — do not import/run full STAI UI
            marker = ep / "core" / "storytoolkitai.py"
            if not marker.exists() and not (ep / "__main__.py").exists():
                print(f"  [WARN] STAI markers not found under {ep} (may still be valid install root)")

    local_stai = SYSTEM_ROOT / "StoryToolkitAI"
    print(f"  [OK] local STAI slot -> {local_stai} exists={local_stai.exists()}")

    # write runtime snapshot (derived only)
    RUNTIME_FILE.parent.mkdir(parents=True, exist_ok=True)
    snapshot = {
        "checked_at": datetime.now().isoformat(timespec="seconds"),
        "system_root": str(SYSTEM_ROOT),
        "pilot_month": PILOT_MONTH,
        "python": sys.version.split()[0],
        "ffmpeg": ffmpeg,
        "stai_engine_path": engine_path,
        "failures": failures,
        "ok": len(failures) == 0,
    }
    RUNTIME_FILE.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"\nRuntime snapshot -> {RUNTIME_FILE}")

    if failures:
        print("\nHEALTH: FAIL")
        for f in failures:
            print(f"  - {f}")
        sys.exit(1)
    print("\nHEALTH: PASS")


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
    sources = active_sources(load_sources())
    if not sources:
        log.error("No active sources to scan.")
        sys.exit(1)
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
    # Phase 03 Architect Contract §"Safety precondition — harden broad scan":
    # heavy month-hashing MUST require explicit approved month and reject
    # empty/wildcard/all-archive scope. The archive-wide path is therefore
    # not reachable from the CLI; internal callers may not pass False.
    if not pilot_month_only:
        log.error(
            "Archive-wide dedupe is forbidden by Phase 03 contract "
            "(ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md). "
            "Set NWK_PILOT_MONTH=YYYY-MM and use `dedupe` (pilot month only) "
            "or `pilot03-manifest`."
        )
        sys.exit(2)
    if not PILOT_YEAR or not PILOT_MONTH_NUM:
        log.error(
            "NWK_PILOT_MONTH unset; month hash requires an explicit approved "
            "month (YYYY-MM). Aborting per Phase 03 §Safety precondition."
        )
        sys.exit(2)
    records = load_raw_scan()

    target = [
        r for r in records
        if r.get("year") == PILOT_YEAR and r.get("month") == PILOT_MONTH_NUM
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

def cmd_manifest(year: int | None = None, month: int | None = None) -> None:
    year = year if year is not None else PILOT_YEAR
    month = month if month is not None else PILOT_MONTH_NUM
    if not year or not month:
        log.error("NWK_PILOT_MONTH unset; cannot build month manifest.")
        sys.exit(1)
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
# Month Story: {pilot_month}
## APPROVAL STATUS: UNAPPROVED DRAFT — DO NOT PUBLISH

**Mission:** NWK-STORY-PILOT
**Pilot month:** {pilot_month}
**Program:** (fill from source registry / Bambu)
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

## Known Context

*Do not invent events. Use only inventory evidence and Bambu-confirmed context.*

**Bambu: Please verify the above and correct any errors before approving.**

---

## Suggested Story Beats

*These are draft proposals only. Bambu must verify each claim against source media.*

1. **Setting** — Where and what is being documented this month.
2. **People** — Who appears (consent/rights still required before publish).
3. **Work** — What work/actions are visible.
4. **Change** — What changed during the month (if evidenced).
5. **Open questions** — Gaps needing Bambu clarification.

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
        pilot_month=manifest.get("pilot_month", PILOT_MONTH),
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
        mark = "OK" if path.exists() else "--"
        print(f"  [{mark}]  {label}")
        print(f"         {path}")

    print("\n=== New World Kids Story Agent — Runtime Status ===\n")
    print(f"SYSTEM_ROOT: {SYSTEM_ROOT}")
    print(f"PILOT_MONTH: {PILOT_MONTH}")
    check(SOURCES_FILE, "Source registry (sources.json)")
    check(STAI_CONFIG_FILE, "StoryToolkitAI config")
    check(RUNTIME_FILE, "Runtime health snapshot")
    check(SYSTEM_ROOT / "indexes" / "raw_scan.json", "Raw scan cache")
    check(SYSTEM_ROOT / "indexes" / "dedupe_map.json", "Dedupe map")
    check(PILOT_OUTPUT_DIR / "SOURCE_MANIFEST.json", f"SOURCE_MANIFEST.json ({PILOT_MONTH})")
    check(PILOT_OUTPUT_DIR / "MONTH_STORY.md", f"MONTH_STORY.md ({PILOT_MONTH})")
    print()


# ---------------------------------------------------------------------------
# Pilot-0 end-to-end
# ---------------------------------------------------------------------------

def cmd_pilot0() -> None:
    if not PILOT_YEAR or not PILOT_MONTH_NUM:
        log.error(
            "NWK_PILOT_MONTH is not set (expected YYYY-MM). "
            "Choose a month from Phase 02 inventory evidence before pilot0."
        )
        sys.exit(1)
    log.info("=== Bounded pilot %s — starting ===", PILOT_MONTH)
    check_disk_space(SYSTEM_ROOT)
    cmd_register()
    cmd_scan()
    cmd_dedupe(pilot_month_only=True)
    cmd_manifest(PILOT_YEAR, PILOT_MONTH_NUM)
    cmd_month_story()
    log.info("=== Pilot complete. HUMAN GATE: Review MONTH_STORY.md before proceeding. ===")
    cmd_status()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

COMMANDS = {
    "register": cmd_register,
    "health": cmd_health,
    "scan": cmd_scan,
    "manifest": cmd_manifest,
    "dedupe": cmd_dedupe,
    "month-story": cmd_month_story,
    "status": cmd_status,
    "pilot0": cmd_pilot0,
    # Phase 03 — month vertical slice (ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md)
    "pilot03-preflight": None,
    "pilot03-baseline": None,
    "pilot03-manifest": None,
    "pilot03-media-info": None,
    "pilot03-stai-bridge": None,
    "pilot03-transcribe": None,
    "pilot03-story": None,
    "pilot03-verify-source": None,
    "pilot03-run": None,
}

try:
    from . import pilot03 as _pilot03  # type: ignore
    _pilot03.setup_logging()
    COMMANDS["pilot03-preflight"] = _pilot03.cmd_preflight
    COMMANDS["pilot03-baseline"] = _pilot03.cmd_baseline
    COMMANDS["pilot03-manifest"] = _pilot03.cmd_manifest
    COMMANDS["pilot03-media-info"] = _pilot03.cmd_media_info
    COMMANDS["pilot03-stai-bridge"] = _pilot03.cmd_stai_bridge
    COMMANDS["pilot03-transcribe"] = _pilot03.cmd_transcribe
    COMMANDS["pilot03-story"] = _pilot03.cmd_story
    COMMANDS["pilot03-verify-source"] = _pilot03.cmd_verify_source
    COMMANDS["pilot03-run"] = _pilot03.cmd_run
except ImportError:
    # Fall back to direct import (running as a script, not a package)
    try:
        import pilot03 as _pilot03  # type: ignore
        _pilot03.setup_logging()
        COMMANDS["pilot03-preflight"] = _pilot03.cmd_preflight
        COMMANDS["pilot03-baseline"] = _pilot03.cmd_baseline
        COMMANDS["pilot03-manifest"] = _pilot03.cmd_manifest
        COMMANDS["pilot03-media-info"] = _pilot03.cmd_media_info
        COMMANDS["pilot03-stai-bridge"] = _pilot03.cmd_stai_bridge
        COMMANDS["pilot03-transcribe"] = _pilot03.cmd_transcribe
        COMMANDS["pilot03-story"] = _pilot03.cmd_story
        COMMANDS["pilot03-verify-source"] = _pilot03.cmd_verify_source
        COMMANDS["pilot03-run"] = _pilot03.cmd_run
    except ImportError as _exc:
        log = logging.getLogger("story_agent")
        log.warning("pilot03 module unavailable: %s", _exc)

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
    handler = COMMANDS.get(args.command)
    if handler is None:
        # Phase 03 pilot03 module import failed at startup — give a clean error
        # instead of raising TypeError on a None placeholder.
        if args.command.startswith("pilot03-"):
            sys.stderr.write(
                f"error: command '{args.command}' is registered but the pilot03 "
                f"module could not be imported (see warnings above). "
                f"Run from story-agent/v01/ or set PYTHONPATH.\n"
            )
            sys.exit(2)
        sys.stderr.write(f"error: unknown command '{args.command}'\n")
        sys.exit(2)
    handler()
