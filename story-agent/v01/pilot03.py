"""
Phase 03 — One-Month Vertical Slice
===================================

Read-only vertical slice pipeline for an explicit Bambu-approved month
(``NWK_PILOT_MONTH=YYYY-MM``).

Stages (each callable independently from ``story_agent.py``):

  pilot03-preflight       resolve month + print file count/bytes; reject missing/wildcard
  pilot03-baseline        capture before-state (timestamps/sizes) of source originals
  pilot03-manifest        SHA-256 every file in the month + dedupe by SHA-256
  pilot03-media-info      ffprobe lightweight pass (no transcription yet)
  pilot03-stai-bridge     bounded STAI bridge proof; BLOCKED with evidence when unavailable
  pilot03-story           write local UNAPPROVED MONTH_STORY.md (OBSERVED/INFERRED/OWNER-VERIFY)
  pilot03-verify-source   revalidate SHA-256 + timestamps; prove source mutations = 0
  pilot03-run             bounded end-to-end run for the approved month

Hard rules (from ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md):

  * never rename/move/delete/overwrite source files
  * never write inside a source root
  * derived outputs stay under NWK_STORY_ROOT
  * heavy commands require explicit approved month (no archive-wide heavy)
  * abort if E: free < PILOT03_MIN_FREE_GB
  * default month derived budget = PILOT03_DERIVED_BUDGET_GB
  * BLOCKED-with-evidence is acceptable; faked success is not
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Any

# Resolve the canonical Story System root.
_DEFAULT_STORY_ROOT = (
    r"E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE"
    r"\NEW WORLD KIDS 2026\story-system"
)
SYSTEM_ROOT = Path(os.environ.get("NWK_STORY_ROOT", _DEFAULT_STORY_ROOT))
SOURCES_FILE = SYSTEM_ROOT / "config" / "sources.json"
STAI_CONFIG_FILE = SYSTEM_ROOT / "config" / "storytoolkitai.json"
LOG_FILE = SYSTEM_ROOT / "logs" / "pilot03.log"

PILOT03_MIN_FREE_GB = 100.0
PILOT03_DERIVED_BUDGET_GB = 25.0
CHECKSUM_CHUNK = 1 << 20  # 1 MB
MONTH_REGEX = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")
QMAP = {1: "Q1", 2: "Q1", 3: "Q1", 4: "Q2", 5: "Q2", 6: "Q2",
        7: "Q3", 8: "Q3", 9: "Q3", 10: "Q4", 11: "Q4", 12: "Q4"}
MMAP = {1: "01-january", 2: "02-february", 3: "03-march", 4: "04-april",
        5: "05-may", 6: "06-june", 7: "07-july", 8: "08-august",
        9: "09-september", 10: "10-october", 11: "11-november", 12: "12-december"}

VIDEO_EXT = {".mp4", ".mov", ".avi", ".mkv", ".mts", ".m2ts", ".mpg",
             ".mpeg", ".wmv", ".m4v", ".webm", ".flv", ".3gp"}
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".raw", ".cr2", ".cr3", ".nef", ".arw",
             ".dng", ".heic", ".heif", ".tif", ".tiff", ".webp", ".gif", ".bmp"}
AUDIO_EXT = {".wav", ".mp3", ".aac", ".m4a", ".flac", ".ogg", ".wma",
             ".aif", ".aiff"}
ALL_MEDIA = VIDEO_EXT | PHOTO_EXT | AUDIO_EXT

MONTH_PATH_REGEX = re.compile(
    r"(JAN|FEB|FEBRUARY|MAR|MARCH|APR|APRIL|MAY|JUN|JUNE|JUL|JULY|AUG|"
    r"SEP|SEPT|SEPTEMBER|OCT|OCTOBER|NOV|NOVEMBER|DEC|DECEMBER)\s*(\d{4})",
    re.I,
)
MONTH_SLASH_REGEX = re.compile(r"(20\d{2})[-_](0[1-9]|1[0-2])")
YEAR_REGEX = re.compile(r"(20\d{2})")


# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
import logging
log = logging.getLogger("pilot03")


def setup_logging() -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    if log.handlers:
        return
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s  %(levelname)-8s  %(message)s",
        handlers=[
            logging.FileHandler(LOG_FILE, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )


# ---------------------------------------------------------------------------
# Month / scope resolution
# ---------------------------------------------------------------------------
def resolve_pilot_month(strict: bool = True) -> str:
    raw = os.environ.get("NWK_PILOT_MONTH", "").strip()
    if not raw and not strict:
        return ""
    if not raw:
        sys.stderr.write(
            "[pilot03] NWK_PILOT_MONTH is required for heavy Phase 03 commands "
            "(format: YYYY-MM). Aborting.\n"
        )
        sys.exit(2)
    raw = raw.strip()
    if not MONTH_REGEX.match(raw):
        sys.stderr.write(
            f"[pilot03] NWK_PILOT_MONTH must match YYYY-MM; got '{raw}'. Aborting.\n"
        )
        sys.exit(2)
    return raw


def pilot_year_month(month_str: str) -> tuple[int, int]:
    y, m = month_str.split("-")
    return int(y), int(m)


def month_output_dir(month_str: str) -> Path:
    y, m = pilot_year_month(month_str)
    return SYSTEM_ROOT / "story-memory" / str(y) / QMAP[m] / MMAP[m]


# ---------------------------------------------------------------------------
# Source registry / scope guards
# ---------------------------------------------------------------------------
def _is_placeholder(path: str) -> bool:
    p = (path or "").strip().upper()
    return (not p) or p.startswith("FILL_IN") or "FILL_IN" in p


def load_active_sources() -> list[dict]:
    if not SOURCES_FILE.exists():
        sys.stderr.write(f"[pilot03] sources.json missing: {SOURCES_FILE}\n")
        sys.exit(1)
    sources = json.loads(SOURCES_FILE.read_text(encoding="utf-8"))["sources"]
    active = []
    for s in sources:
        if _is_placeholder(str(s.get("path", ""))):
            continue
        if s.get("enabled") is False:
            continue
        if not s.get("readonly", True):
            sys.stderr.write(
                f"[pilot03] refusing non-readonly source: {s.get('path')}\n"
            )
            sys.exit(1)
        active.append(s)
    if not active:
        sys.stderr.write("[pilot03] no active sources registered\n")
        sys.exit(1)
    return active


def _month_of_path(p: Path) -> str | None:
    s = str(p)
    m = MONTH_PATH_REGEX.search(s)
    if m:
        mon = {"JAN": 1, "FEB": 2, "FEBRUARY": 2, "MAR": 3, "MARCH": 3,
               "APR": 4, "APRIL": 4, "MAY": 5, "JUN": 6, "JUNE": 6,
               "JUL": 7, "JULY": 7, "AUG": 8, "SEP": 9, "SEPT": 9,
               "SEPTEMBER": 9, "OCT": 10, "OCTOBER": 10, "NOV": 11,
               "NOVEMBER": 11, "DEC": 12, "DECEMBER": 12}[m.group(1).upper()]
        return f"{m.group(2)}-{mon:02d}"
    m = MONTH_SLASH_REGEX.search(s)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    return None


def month_files(month_str: str) -> list[dict]:
    """Return every readable media file whose path month equals month_str."""
    ym = month_str
    out: list[dict] = []
    for src in load_active_sources():
        root = Path(src["path"])
        if not root.is_dir():
            sys.stderr.write(f"[pilot03] missing source root: {root}\n")
            sys.exit(1)
        for fp in root.rglob("*"):
            if not fp.is_file():
                continue
            if fp.suffix.lower() not in ALL_MEDIA:
                continue
            try:
                if _month_of_path(fp) != ym:
                    continue
                st = fp.stat()
                out.append({
                    "source_id": src["id"],
                    "source_label": src.get("label", src["id"]),
                    "source_alias": src.get("alias", src["id"]),
                    "original_path": str(fp),
                    "filename": fp.name,
                    "extension": fp.suffix.lower(),
                    "media_type": _media_type_of(fp),
                    "size_bytes": st.st_size,
                    "mtime": st.st_mtime,
                    "mtime_iso": datetime.fromtimestamp(st.st_mtime).isoformat(),
                    "ctime": st.st_ctime,
                    "ctime_iso": datetime.fromtimestamp(st.st_ctime).isoformat(),
                })
            except OSError as exc:
                log.warning("unreadable: %s (%s)", fp, exc)
    return out


def _media_type_of(p: Path) -> str:
    ext = p.suffix.lower()
    if ext in VIDEO_EXT:
        return "video"
    if ext in PHOTO_EXT:
        return "photo"
    if ext in AUDIO_EXT:
        return "audio"
    return "other"


# ---------------------------------------------------------------------------
# Disk guards
# ---------------------------------------------------------------------------
def check_disk(path: Path, min_gb: float = PILOT03_MIN_FREE_GB) -> float:
    try:
        total, used, free = shutil.disk_usage(str(path.anchor))
        free_gb = free / (1024 ** 3)
        if free_gb < min_gb:
            sys.stderr.write(
                f"[pilot03] free space guard failed on {path.anchor}: "
                f"{free_gb:.2f} GB < {min_gb} GB\n"
            )
            sys.exit(3)
        return free_gb
    except Exception as exc:
        log.warning("disk check failed: %s", exc)
        return -1.0


# ---------------------------------------------------------------------------
# Path-safety helper (no output may live inside a source root)
# ---------------------------------------------------------------------------
def assert_output_outside_sources(out_path: Path) -> None:
    out = out_path.resolve()
    for src in load_active_sources():
        try:
            sp = Path(src["path"]).resolve()
            if out == sp or sp in out.parents:
                sys.stderr.write(
                    f"[pilot03] refuse to write derived output inside source root: {out}\n"
                )
                sys.exit(4)
        except Exception:
            continue


# ---------------------------------------------------------------------------
# Stable media IDs (deterministic, privacy-safe)
# ---------------------------------------------------------------------------
def stable_media_id(record: dict, seq_hash: str) -> str:
    """Generate a privacy-safe stable ID per file (no path leakage).

    Format: M<year{2}><month{2}>-<8-char hash of (filename|size|sha256-prefix)>.
    """
    y, m = pilot_year_month(resolve_pilot_month(strict=False) or "1900-01")
    base = f"{record['filename']}|{record['size_bytes']}|{seq_hash[:16]}"
    digest = hashlib.sha256(base.encode("utf-8")).hexdigest()[:8]
    return f"M{y % 100:02d}{m:02d}-{digest}"


# ---------------------------------------------------------------------------
# SHA-256
# ---------------------------------------------------------------------------
def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        while True:
            chunk = fh.read(CHECKSUM_CHUNK)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


# ---------------------------------------------------------------------------
# 03A — Preflight
# ---------------------------------------------------------------------------
def cmd_preflight() -> None:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    free_gb = check_disk(SYSTEM_ROOT)
    out_dir = month_output_dir(month)
    assert_output_outside_sources(out_dir)
    sources = load_active_sources()
    files = month_files(month)
    bytes_total = sum(r["size_bytes"] for r in files)
    gb_total = bytes_total / (1024 ** 3)

    # derived budget guard
    if gb_total * 6 > PILOT03_DERIVED_BUDGET_GB:
        # 6x is a heuristic upper bound for proxy+audio+thumbnail flow per GB of source
        log.warning(
            "estimated derived footprint may exceed %.0f GB budget — verify per-step",
            PILOT03_DERIVED_BUDGET_GB,
        )

    summary = {
        "pilot_month": month,
        "system_root": str(SYSTEM_ROOT),
        "e_free_gb": round(free_gb, 2),
        "e_min_free_gb": PILOT03_MIN_FREE_GB,
        "derived_budget_gb": PILOT03_DERIVED_BUDGET_GB,
        "active_sources": [
            {"id": s["id"], "alias": s.get("alias", s["id"]),
             "readonly": True} for s in sources
        ],
        "resolved_file_count": len(files),
        "resolved_bytes": bytes_total,
        "resolved_gb": round(gb_total, 3),
        "output_dir_local": str(out_dir),
        "guard_pass": (
            free_gb >= PILOT03_MIN_FREE_GB
            and len(files) > 0
            and bytes_total > 0
        ),
    }
    out_dir.mkdir(parents=True, exist_ok=True)
    prefile = out_dir / "PREFLIGHT.json"
    assert_output_outside_sources(prefile)
    prefile.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))
    print(f"\npreflight -> {prefile}")
    if not summary["guard_pass"]:
        sys.stderr.write("[pilot03] preflight guard FAIL\n")
        sys.exit(5)


# ---------------------------------------------------------------------------
# 03B — Source baseline (before-state)
# ---------------------------------------------------------------------------
def cmd_baseline() -> dict:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    out_dir.mkdir(parents=True, exist_ok=True)
    files = month_files(month)
    if not files:
        sys.stderr.write(f"[pilot03] no files found for month {month}\n")
        sys.exit(6)
    baseline = {
        "pilot_month": month,
        "captured_at": datetime.now().isoformat(timespec="seconds"),
        "file_count": len(files),
        "entries": [
            {
                "original_path": r["original_path"],
                "filename": r["filename"],
                "size_bytes": r["size_bytes"],
                "mtime": r["mtime"],
                "mtime_iso": r["mtime_iso"],
                "ctime": r["ctime"],
                "ctime_iso": r["ctime_iso"],
                "source_id": r["source_id"],
            }
            for r in files
        ],
    }
    bfile = out_dir / "SOURCE_BASELINE.json"
    assert_output_outside_sources(bfile)
    bfile.write_text(json.dumps(baseline, indent=2), encoding="utf-8")
    print(f"baseline -> {bfile}  ({len(files)} entries)")
    return baseline


# ---------------------------------------------------------------------------
# 03B — SHA-256 manifest + true dedupe
# ---------------------------------------------------------------------------
def cmd_manifest() -> dict:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    out_dir.mkdir(parents=True, exist_ok=True)
    files = month_files(month)
    if not files:
        sys.stderr.write(f"[pilot03] no files found for month {month}\n")
        sys.exit(6)

    log.info("hashing %d files for month %s …", len(files), month)
    entries: list[dict] = []
    checksums: dict[str, list[str]] = {}
    t0 = time.time()
    for i, r in enumerate(files, 1):
        p = Path(r["original_path"])
        try:
            h = sha256_file(p)
        except Exception as exc:
            log.warning("sha256 failed: %s (%s)", p, exc)
            entries.append({
                **r,
                "sha256": None,
                "hash_error": str(exc),
                "media_id": None,
            })
            continue
        checksums.setdefault(h, []).append(r["original_path"])
        mid = stable_media_id(r, h)
        entries.append({
            "media_id": mid,
            "source_alias": r["source_alias"],
            "source_id": r["source_id"],
            "filename": r["filename"],
            "extension": r["extension"],
            "media_type": r["media_type"],
            "size_bytes": r["size_bytes"],
            "mtime_iso": r["mtime_iso"],
            "ctime_iso": r["ctime_iso"],
            "sha256": h,
            # privacy-safe — no original_path in committed outputs
        })
        if i % 10 == 0:
            log.info("hashed %d/%d …", i, len(files))
    elapsed = time.time() - t0

    dup_groups = {
        h: paths for h, paths in checksums.items() if len(paths) > 1
    }
    dup_files = sum(len(v) for v in dup_groups.values())

    manifest = {
        "schema_version": "1.1",
        "phase": "03",
        "pilot_month": month,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "approval_status": "UNAPPROVED — DRAFT",
        "approval_scope": "engineering only; story remains UNAPPROVED per Architect contract",
        "file_count": len(entries),
        "file_count_with_sha256": sum(1 for e in entries if e["sha256"]),
        "bytes_total": sum(e["size_bytes"] for e in entries),
        "hash_seconds": round(elapsed, 2),
        "by_media_type": _tally(entries, "media_type"),
        "by_source_alias": _tally(entries, "source_alias"),
        "duplicate_groups": len(dup_groups),
        "duplicate_files_in_groups": dup_files,
        "dedupe_method": "sha256_full",
        "entries": entries,
        # dedupe map stored under private_local section below
    }
    mf = out_dir / "SOURCE_MANIFEST.json"
    assert_output_outside_sources(mf)
    mf.write_text(json.dumps(manifest, indent=2),
                  encoding="utf-8")

    dedupe_path = out_dir / "DEDUPE_MAP.json"
    assert_output_outside_sources(dedupe_path)
    dedupe_path.write_text(
        json.dumps({
            "pilot_month": month,
            "method": "sha256_full",
            "duplicate_groups": len(dup_groups),
            "duplicate_files_in_groups": dup_files,
            "groups": [
                {"sha256": h, "members": paths,
                 "member_count": len(paths)}
                for h, paths in dup_groups.items()
            ],
        }, indent=2),
        encoding="utf-8",
    )

    # local-only map (full paths, never committed) — used by verify
    local_index = out_dir / "LOCAL_SHA256_INDEX.json"
    assert_output_outside_sources(local_index)
    local_index.write_text(
        json.dumps({e["media_id"]: {
            "original_path": r["original_path"],
            "sha256": e["sha256"],
            "size_bytes": r["size_bytes"],
            "mtime_iso": r["mtime_iso"],
        } for e, r in zip(entries, files)}, indent=2),
        encoding="utf-8",
    )

    print(f"manifest -> {mf}")
    print(f"dedupe   -> {dedupe_path}")
    print(f"sha256 ok: {manifest['file_count_with_sha256']}/{manifest['file_count']}")
    print(f"duplicates: {dup_files} files in {len(dup_groups)} groups")
    return manifest


def _tally(entries: list[dict], key: str) -> dict[str, int]:
    out: dict[str, int] = {}
    for e in entries:
        out[e[key]] = out.get(e[key], 0) + 1
    return out


# ---------------------------------------------------------------------------
# 03C — Lightweight media intelligence (ffprobe)
# ---------------------------------------------------------------------------
def _ffprobe(p: Path) -> dict:
    try:
        cp = subprocess.run(
            ["ffprobe", "-v", "error", "-print_format", "json",
             "-show_format", "-show_streams", str(p)],
            capture_output=True, text=True, timeout=60,
        )
        if cp.returncode != 0:
            return {"probe_error": cp.stderr.strip()[:400] or "non-zero"}
        data = json.loads(cp.stdout or "{}")
        fmt = data.get("format", {})
        streams = data.get("streams", [])
        v = next((s for s in streams if s.get("codec_type") == "video"), None)
        a = next((s for s in streams if s.get("codec_type") == "audio"), None)
        return {
            "duration": fmt.get("duration"),
            "size_bytes": fmt.get("size"),
            "bit_rate": fmt.get("bit_rate"),
            "format_name": fmt.get("format_name"),
            "video_codec": v.get("codec_name") if v else None,
            "width": v.get("width") if v else None,
            "height": v.get("height") if v else None,
            "fps": v.get("avg_frame_rate") if v else None,
            "audio_codec": a.get("codec_name") if a else None,
            "audio_channels": a.get("channels") if a else None,
            "has_audio": a is not None,
            "probe_ok": True,
        }
    except FileNotFoundError:
        return {"probe_error": "ffprobe not on PATH"}
    except subprocess.TimeoutExpired:
        return {"probe_error": "ffprobe timeout (60s)"}
    except Exception as exc:
        return {"probe_error": f"{type(exc).__name__}: {exc}"}


def cmd_media_info() -> None:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    manifest_path = out_dir / "SOURCE_MANIFEST.json"
    if not manifest_path.exists():
        sys.stderr.write("[pilot03] run `pilot03-manifest` first\n")
        sys.exit(7)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    # use local sha256 index to map media_id → real path
    local_idx_path = out_dir / "LOCAL_SHA256_INDEX.json"
    if not local_idx_path.exists():
        sys.stderr.write("[pilot03] LOCAL_SHA256_INDEX.json missing\n")
        sys.exit(7)
    local_idx = json.loads(local_idx_path.read_text(encoding="utf-8"))

    log.info("ffprobe %d files …", manifest["file_count"])
    probes: list[dict] = []
    t0 = time.time()
    for i, e in enumerate(manifest["entries"], 1):
        lid = local_idx.get(e["media_id"])
        if not lid or not lid.get("original_path"):
            probes.append({**e, "probe": {"probe_error": "no local path"}})
            continue
        probe = _ffprobe(Path(lid["original_path"]))
        probes.append({
            "media_id": e["media_id"],
            "media_type": e["media_type"],
            "filename": e["filename"],
            "size_bytes": e["size_bytes"],
            "sha256": e["sha256"],
            "source_alias": e["source_alias"],
            "probe": probe,
        })
        if i % 5 == 0:
            log.info("probed %d/%d …", i, manifest["file_count"])

    info = {
        "pilot_month": month,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "tool": "ffprobe",
        "file_count": len(probes),
        "elapsed_seconds": round(time.time() - t0, 2),
        "with_audio": sum(1 for p in probes if p["probe"].get("has_audio")),
        "video_count": sum(1 for p in probes if p["media_type"] == "video"),
        "photo_count": sum(1 for p in probes if p["media_type"] == "photo"),
        "audio_count": sum(1 for p in probes if p["media_type"] == "audio"),
        "probe_errors": sum(1 for p in probes if p["probe"].get("probe_error")),
        "probes": probes,  # privacy-safe: media_id only, no paths
    }
    out = out_dir / "MEDIA_INFO.json"
    assert_output_outside_sources(out)
    out.write_text(json.dumps(info, indent=2), encoding="utf-8")
    print(f"media-info -> {out}")
    print(f"with_audio: {info['with_audio']}  "
          f"probe_errors: {info['probe_errors']}")


# ---------------------------------------------------------------------------
# 03D — STAI bridge proof (bounded)
# ---------------------------------------------------------------------------
def cmd_stai_bridge() -> dict:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    out_dir.mkdir(parents=True, exist_ok=True)

    result: dict[str, Any] = {
        "pilot_month": month,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "bridge_policy": "thin_adapter_only",
        "rewrite_forbidden": True,
        "status": "UNKNOWN",
        "blocker": None,
        "evidence": [],
        "local_cloud_boundary": "local_only",
        "min_repair_attempts": 0,
    }

    if not STAI_CONFIG_FILE.exists():
        result["status"] = "BLOCKED"
        result["blocker"] = "storytoolkitai.json missing"
        result["evidence"].append(
            f"expected config at {STAI_CONFIG_FILE}; not present"
        )
        _persist(out_dir / "STAI_BRIDGE.json", result)
        print(json.dumps(result, indent=2))
        return result

    cfg = json.loads(STAI_CONFIG_FILE.read_text(encoding="utf-8"))
    engine_path = Path(cfg.get("engine_path", ""))
    result["evidence"].append(f"engine_path={engine_path}")
    if not engine_path.exists():
        result["status"] = "BLOCKED"
        result["blocker"] = "engine_path does not exist"
        result["evidence"].append(
            f"STAI engine_path missing on disk: {engine_path}"
        )
        _persist(out_dir / "STAI_BRIDGE.json", result)
        print(json.dumps(result, indent=2))
        return result

    marker = engine_path / "core" / "storytoolkitai.py"
    main_marker = engine_path / "__main__.py"
    result["evidence"].append(
        f"core/storytoolkitai.py exists={marker.exists()}"
    )
    result["evidence"].append(
        f"__main__.py exists={main_marker.exists()}"
    )

    # Minimal presence probe — try to import the package, with bounded repair budget.
    # Repair budget = 3 attempts: (1) bare import, (2) add to sys.path, (3) stop.
    attempts = [
        ("direct_import", lambda: __import__("storytoolkitai")),
        ("syspath_import", lambda: _syspath_import(engine_path)),
    ]
    last_err: str | None = None
    for label, attempt in attempts:
        result["min_repair_attempts"] += 1
        try:
            attempt()
            result["status"] = "WORKING"
            result["evidence"].append(f"{label}: import succeeded")
            break
        except Exception as exc:
            last_err = f"{type(exc).__name__}: {exc}"
            result["evidence"].append(f"{label}: {last_err}")
    else:
        result["status"] = "BLOCKED"
        result["blocker"] = (
            "STAI cannot be imported during bounded Phase 03 repair budget "
            "(likely PyQt/GUI/dependency stack). Last error: " + (last_err or "")
        )

    # Transcription engine probe (separate from STAI but related)
    tx_probe = _probe_transcription_engine()
    result["transcription_engine"] = tx_probe
    if tx_probe["status"] != "WORKING":
        # Per contract: do NOT fake success; report blocker.
        if result["status"] != "WORKING":
            result["blocker"] = (result.get("blocker") or "") + (
                " | transcription engine also unavailable: " + tx_probe["status"]
            )

    _persist(out_dir / "STAI_BRIDGE.json", result)
    print(json.dumps(result, indent=2))
    return result


def _syspath_import(engine_path: Path) -> None:
    import importlib
    sys.path.insert(0, str(engine_path.parent))
    importlib.import_module("storytoolkitai")


def _probe_transcription_engine() -> dict:
    out: dict[str, Any] = {"status": "UNKNOWN", "evidence": []}
    # whisper (openai) python
    try:
        import whisper  # type: ignore
        out["status"] = "WORKING"
        out["engine"] = "openai-whisper"
        out["evidence"].append(f"openai-whisper {getattr(whisper, '__version__', '?')}")
        return out
    except Exception as exc:
        out["evidence"].append(f"openai-whisper: {type(exc).__name__}: {exc}")
    # faster-whisper
    try:
        from faster_whisper import WhisperModel  # type: ignore
        out["status"] = "WORKING"
        out["engine"] = "faster-whisper"
        return out
    except Exception as exc:
        out["evidence"].append(f"faster-whisper: {type(exc).__name__}: {exc}")
    # whisper CLI
    if shutil.which("whisper"):
        out["status"] = "WORKING"
        out["engine"] = "openai-whisper-cli"
        return out
    out["status"] = "BLOCKED"
    out["blocker"] = (
        "no local transcription engine installed (whisper / faster-whisper / "
        "whisper-cli all absent). Install requires Bambu approval (model "
        "download > 100 MB / untrusted infra)."
    )
    return out


def _persist(path: Path, obj: dict) -> None:
    assert_output_outside_sources(path)
    path.write_text(json.dumps(obj, indent=2), encoding="utf-8")


# ---------------------------------------------------------------------------
# 03E — UNAPPROVED Month Story (OBSERVED / INFERRED / OWNER-VERIFY)
# ---------------------------------------------------------------------------
def cmd_story() -> None:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    out_dir.mkdir(parents=True, exist_ok=True)

    manifest_path = out_dir / "SOURCE_MANIFEST.json"
    media_info_path = out_dir / "MEDIA_INFO.json"
    stai_path = out_dir / "STAI_BRIDGE.json"
    tx_path = out_dir / "TRANSCRIBE_BENCHMARK.json"
    if not manifest_path.exists():
        sys.stderr.write("[pilot03] manifest missing; run pilot03-manifest\n")
        sys.exit(8)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    media_info = (
        json.loads(media_info_path.read_text(encoding="utf-8"))
        if media_info_path.exists() else None
    )
    stai = (
        json.loads(stai_path.read_text(encoding="utf-8"))
        if stai_path.exists() else None
    )
    tx_bench = (
        json.loads(tx_path.read_text(encoding="utf-8"))
        if tx_path.exists() else None
    )

    # OBSERVED facts from manifest/ffprobe/transcription only — no fictional claims.
    observed = _observed_section(manifest, media_info, tx_bench)
    inferred = _inferred_section(manifest, media_info, stai, tx_bench)
    owner_verify = _owner_verify_section(manifest, media_info, stai, tx_bench)

    md = _render_story(month, manifest, media_info, stai, tx_bench,
                       observed, inferred, owner_verify)
    story_path = out_dir / "MONTH_STORY.md"
    assert_output_outside_sources(story_path)
    story_path.write_text(md, encoding="utf-8")
    print(f"month-story -> {story_path}  (UNAPPROVED — local only)")


def _observed_section(manifest: dict, mi: dict | None,
                      tx: dict | None) -> list[dict]:
    obs = []
    obs.append({
        "claim": f"Month manifest contains {manifest['file_count']} files "
                 f"totalling {manifest['bytes_total']} bytes.",
        "evidence_id": "MANIFEST:mm",
        "support": "pilot03-manifest output",
    })
    obs.append({
        "claim": f"Real dedupe method: {manifest['dedupe_method']}; "
                 f"{manifest['duplicate_files_in_groups']} duplicate files in "
                 f"{manifest['duplicate_groups']} SHA-256 groups.",
        "evidence_id": "MANIFEST:dedupe",
        "support": "SHA-256 of full file bytes",
    })
    if mi:
        obs.append({
            "claim": (
                f"ffprobe parsed {mi['file_count']} files; "
                f"{mi['with_audio']} carry audio, "
                f"{mi['probe_errors']} produced probe errors."
            ),
            "evidence_id": "MEDIA_INFO:probe",
            "support": "ffprobe format/streams probe, 60s timeout",
        })
    by_type = manifest.get("by_media_type", {})
    obs.append({
        "claim": (
            f"Media-type breakdown: "
            + ", ".join(f"{k}={v}" for k, v in sorted(by_type.items()))
        ),
        "evidence_id": "MANIFEST:by_media_type",
        "support": "filesystem extension classification",
    })
    if tx and tx.get("clips_transcribed", 0) > 0:
        for r in tx.get("results", []):
            if r.get("status") != "TRANSCRIBED":
                continue
            sample_text = " ".join(
                s["text"] for s in r.get("segments", [])[:3]
            ).strip()
            obs.append({
                "claim": (
                    f"Clip {r['media_id']} transcribed locally "
                    f"({r['segment_count']} segments, "
                    f"language={r.get('language_detected')}, "
                    f"rtf={r.get('realtime_factor')}). "
                    f"First spoken words: \"{sample_text[:160]}\""
                ),
                "evidence_id": f"TRANSCRIBE:{r['media_id']}",
                "support": (
                    f"faster-whisper {r.get('model')} on CPU, "
                    f"wav extracted via ffmpeg from source original "
                    f"(duration={r['duration_seconds']}s, "
                    f"wall={r['wall_clock_seconds']}s)"
                ),
            })
    return obs


def _inferred_section(manifest: dict, mi: dict | None, stai: dict | None,
                      tx: dict | None) -> list[dict]:
    inf = []
    by_src = manifest.get("by_source_alias", {})
    if len(by_src) == 1:
        inf.append({
            "claim": "Footage for this month originates from a single source root.",
            "support": "manifest by_source_alias has one key (no cross-source "
                       "duplicate confirmation possible without a second source).",
        })
    else:
        inf.append({
            "claim": "Footage spans multiple source roots — cross-source duplicate "
                     "review by Bambu recommended.",
            "support": "manifest by_source_alias has >1 key",
        })
    if mi and mi.get("with_audio", 0) > 0:
        inf.append({
            "claim": (
                f"At least {mi['with_audio']} clip(s) carry an audio stream — "
                "spoken-word content is plausible."
            ),
            "support": "ffprobe audio_codec present",
        })
    if tx and tx.get("clips_transcribed", 0) > 0:
        sample = next((r for r in tx["results"]
                       if r.get("status") == "TRANSCRIBED"
                       and r.get("segments")), None)
        if sample:
            lang = sample.get("language_detected")
            lang_prob = sample.get("language_probability")
            prob_clause = (
                f" (model language-probability={lang_prob})"
                if lang_prob is not None else ""
            )
            inf.append({
                "claim": (
                    f"Transcription sample on {sample['media_id']} suggests "
                    f"{lang or 'an unidentified'} spoken content{prob_clause}; "
                    "subject to Bambu verification."
                ),
                "support": (
                    f"faster-whisper language probe on clip {sample['media_id']}"
                ),
            })
    elif stai and stai.get("transcription_engine", {}).get("status") != "WORKING":
        inf.append({
            "claim": "Transcription/indexing was NOT executed this phase; "
                     "any 'quote' claim would be fabricated without transcription proof.",
            "support": "STAI_BRIDGE.json transcription_engine BLOCKED",
        })
    return inf


def _owner_verify_section(manifest: dict, mi: dict | None,
                          stai: dict | None, tx: dict | None) -> list[dict]:
    ov = []
    ov.append({
        "claim": "Capture dates inferred from folder-name month pattern; not yet "
                 "verified against embedded EXIF/media metadata timestamps.",
        "support": "Phase 03 month resolution uses path pattern only",
    })
    ov.append({
        "claim": "Program (e.g., Culture Shock) and location tags must be confirmed "
                 "by Bambu from documentary records.",
        "support": "Source registry only declares program/location at root level",
    })
    ov.append({
        "claim": "Rights and consent for any person visible in the footage are "
                 "UNKNOWN and require Bambu / consent-registry confirmation before "
                 "any public use.",
        "support": "Phase 03 performs no facial-recognition or person inference",
    })
    if tx and tx.get("clips_transcribed", 0) > 0:
        ov.append({
            "claim": (
                "Transcribed text is an automatic speech-to-text draft; speaker "
                "identity, accuracy, and context for any quoted words require "
                "Bambu review before any public use."
            ),
            "support": (
                "faster-whisper tiny model on CPU; no speaker diarization; "
                "no human review of transcript"
            ),
        })
    if stai and stai.get("status") != "WORKING":
        ov.append({
            "claim": "StoryToolkitAI bridge is BLOCKED with evidence: "
                     + str(stai.get("blocker")),
            "support": "ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md §03D decision tree",
        })
    ov.append({
        "claim": "Duplicate SHA-256 groups may represent intentional backup copies "
                 "or accidental re-imports; semantic interpretation requires Bambu "
                 "review of the DEDUPE_MAP.",
        "support": "MANIFEST duplicate_groups count; SHA-256 cannot tell intent",
    })
    return ov


def _render_story(month: str, manifest: dict, mi: dict | None,
                  stai: dict | None, tx: dict | None,
                  observed: list, inferred: list, owner_verify: list) -> str:
    capture_earliest = None
    capture_latest = None
    if mi:
        durations = [float(p["probe"].get("duration") or 0)
                     for p in mi.get("probes", [])
                     if p.get("probe", {}).get("duration")]
        if durations:
            capture_earliest = "duration-min " + f"{min(durations):.2f}s"
            capture_latest = "duration-max " + f"{max(durations):.2f}s"
    by_src = ", ".join(
        f"{k}={v}" for k, v in sorted(manifest.get("by_source_alias", {}).items())
    )
    by_type = ", ".join(
        f"{k}={v}" for k, v in sorted(manifest.get("by_media_type", {}).items())
    )
    stai_status = stai.get("status", "UNKNOWN") if stai else "UNKNOWN"
    stai_blocker = stai.get("blocker") if stai else "STAI_BRIDGE.json absent"
    tx_status = (stai.get("transcription_engine", {}) if stai else {}).get(
        "status", "unknown"
    )
    tx_clips = tx.get("clips_transcribed", 0) if tx else 0
    tx_blocked = tx.get("clips_blocked", 0) if tx else 0
    lines = []
    a = lines.append
    a("# Month Story — Pilot 0 vertical slice")
    a("")
    a("> UNAPPROVED — AI/AGENT PROPOSAL — REQUIRES BAMBU REVIEW")
    a("")
    a("Engineering approval is **not** editorial approval.")
    a("")
    a(f"**Pilot month:** {month}")
    a(f"**Generated:** {datetime.now().isoformat(timespec='seconds')}")
    a(f"**Source count:** {len(manifest.get('by_source_alias', {}))} "
      f"({by_src})")
    a(f"**File count:** {manifest['file_count']}")
    a(f"**SHA-256 count:** {manifest['file_count_with_sha256']}")
    a(f"**Bytes total:** {manifest['bytes_total']}")
    a(f"**Duplicate groups (SHA-256):** {manifest['duplicate_groups']}")
    a(f"**Duplicate files in groups:** {manifest['duplicate_files_in_groups']}")
    a(f"**Dedupe method:** {manifest['dedupe_method']}")
    if capture_earliest:
        a(f"**Duration range (ffprobe):** {capture_earliest} → {capture_latest}")
    a(f"**Media type breakdown:** {by_type}")
    a(f"**STAI bridge status:** {stai_status}")
    a(f"**STAI blocker (if any):** {stai_blocker}")
    a(f"**Transcription engine:** {tx_status}")
    a(f"**Clips transcribed:** {tx_clips}  (blocked: {tx_blocked})")
    a("")
    a("---")
    a("")
    a("## OBSERVED")
    a("")
    a("Statements directly supported by footage/metadata/manifest outputs.")
    a("")
    for o in observed:
        a(f"- **EVIDENCE-ID:** `{o['evidence_id']}`")
        a(f"  - **CLAIM (OBSERVED):** {o['claim']}")
        a(f"  - **SUPPORT:** {o['support']}")
        a("")
    a("---")
    a("")
    a("## INFERRED")
    a("")
    a("Agent interpretation; **not established fact**. Must NOT be promoted to "
      "OBSERVED without Bambu verification.")
    a("")
    for i in inferred:
        a(f"- **CLAIM (INFERRED):** {i['claim']}")
        a(f"  - **SUPPORT:** {i['support']}")
        a("")
    a("---")
    a("")
    a("## OWNER-VERIFICATION REQUIRED")
    a("")
    a("Historical / contextual / rights claims that require Bambu or "
      "documentary evidence.")
    a("")
    for o in owner_verify:
        a(f"- **CLAIM (OWNER-VERIFY):** {o['claim']}")
        a(f"  - **SUPPORT:** {o['support']}")
        a("")
    a("---")
    a("")
    a("## Rights / Consent")
    a("")
    a("- People visible: **UNKNOWN — needs Bambu**")
    a("- Consent documentation: **UNKNOWN — needs Bambu**")
    a("- Public use approved: **UNKNOWN — needs Bambu**")
    a("")
    a("## Proposed Story Beats")
    a("")
    a("1. **Setting** — TBD by Bambu (program/location confirmation required).")
    a("2. **People** — Not inferred (no facial recognition performed).")
    a("3. **Work** — TBD by Bambu; no activity classification done by agent.")
    a("4. **Change** — No before/after candidates proposed without transcription/index.")
    a("5. **Open questions** — see OWNER-VERIFICATION REQUIRED above.")
    a("")
    a("## Core Four Tags")
    a("")
    a("- [ ] Food — needs Bambu")
    a("- [ ] Water — needs Bambu")
    a("- [ ] Energy — needs Bambu")
    a("- [ ] Shelter — needs Bambu")
    a("")
    a("## Proposed Public Assets")
    a("")
    a("None selected. Bambu review required first.")
    a("")
    a("## Human Approval")
    a("")
    a("- [ ] Bambu has reviewed this story draft")
    a("- [ ] Facts verified")
    a("- [ ] Story beats confirmed")
    a("- [ ] Rights/consent cleared")
    a("- Approved by: _______________")
    a("- Date approved: _______________")
    a("")
    a("---")
    a("")
    a("## Local artifact pointers (NOT public; never commit these files)")
    a("")
    a("- `story-system/story-memory/<year>/Qn/MM-month/SOURCE_MANIFEST.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/DEDUPE_MAP.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/MEDIA_INFO.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/STAI_BRIDGE.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/TRANSCRIBE_BENCHMARK.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/TRANSCRIPT_<media_id>.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/SOURCE_BASELINE.json`")
    a("- `story-system/story-memory/<year>/Qn/MM-month/LOCAL_SHA256_INDEX.json`")
    a("")
    a("---")
    a("")
    a("*Generated by Story Agent v0.1 Phase 03 pilot03 module. "
      "Per the Phase 03 Architect Contract (ops/a2a/"
      "PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md), this remains "
      "UNAPPROVED even after the Phase 03 PR is squash-merged.*")
    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------
# 03D-2 — Bounded transcription proof (acceptance #11)
# ---------------------------------------------------------------------------
def _faster_whisper_model(model_name: str = "tiny"):
    """Load a small faster-whisper model. Downloads on first use (~75 MB)."""
    from faster_whisper import WhisperModel
    return WhisperModel(model_name, device="cpu", compute_type="int8")


def _extract_audio(src_path: Path, dst_wav: Path, max_secs: float | None = None) -> bool:
    """Extract 16kHz mono WAV using ffmpeg. Returns True on success."""
    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"]
    if max_secs:
        cmd += ["-t", str(max_secs)]
    cmd += ["-i", str(src_path), "-vn", "-ac", "1", "-ar", "16000",
            "-f", "wav", str(dst_wav)]
    try:
        cp = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        return cp.returncode == 0 and dst_wav.exists()
    except Exception as exc:
        log.warning("audio extract failed for %s: %s", src_path, exc)
        return False


def _transcribe_wav(model, wav_path: Path) -> tuple[list[dict], float, str | None, float | None]:
    """Run faster-whisper on a WAV; returns (segments, elapsed, language, lang_prob).

    VAD filter is intentionally OFF — short documentary clips often
    have continuous ambient audio that VAD incorrectly removes, producing
    zero-segment transcripts (observed during Phase 03 bounded proof).
    """
    t0 = time.time()
    segments, info = model.transcribe(
        str(wav_path), beam_size=1, vad_filter=False, language=None
    )
    seg_list: list[dict] = []
    for s in segments:
        seg_list.append({
            "start": round(s.start, 3),
            "end": round(s.end, 3),
            "text": (s.text or "").strip(),
        })
    return (
        seg_list,
        time.time() - t0,
        getattr(info, "language", None),
        getattr(info, "language_probability", None),
    )


def cmd_transcribe(clips: int = 1, model_name: str = "tiny") -> dict:
    """Transcribe the N shortest audio-bearing clips in the approved month.

    Acceptance criterion #11 from
    ops/a2a/PHASE_03_MONTH_VERTICAL_SLICE_CONTRACT.md.
    """
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    mi_path = out_dir / "MEDIA_INFO.json"
    idx_path = out_dir / "LOCAL_SHA256_INDEX.json"
    if not mi_path.exists() or not idx_path.exists():
        sys.stderr.write(
            "[pilot03] run pilot03-media-info + pilot03-manifest first\n"
        )
        sys.exit(11)
    mi = json.loads(mi_path.read_text(encoding="utf-8"))
    idx = json.loads(idx_path.read_text(encoding="utf-8"))

    # candidates: shortest-first among clips with duration >= 30s to ensure
    # enough spoken-word content (shorter clips may be silent/b-roll and
    # produce zero-segment transcripts, which does not satisfy #11).
    candidates = sorted(
        [p for p in mi["probes"]
         if p.get("probe", {}).get("has_audio") and p["probe"].get("duration")
         and float(p["probe"]["duration"]) >= 30.0],
        key=lambda p: float(p["probe"]["duration"]),
    )
    if not candidates:
        # fall back to any audio-bearing clip if none >= 30s
        candidates = sorted(
            [p for p in mi["probes"]
             if p.get("probe", {}).get("has_audio") and p["probe"].get("duration")],
            key=lambda p: float(p["probe"]["duration"]),
        )
    selected = candidates[:clips]

    cache_dir = SYSTEM_ROOT / "cache" / "transcribe" / month
    cache_dir.mkdir(parents=True, exist_ok=True)
    assert_output_outside_sources(cache_dir)

    results: list[dict] = []
    model = None
    try:
        model = _faster_whisper_model(model_name)
    except Exception as exc:
        sys.stderr.write(
            f"[pilot03] faster-whisper model load failed: {exc}\n"
        )
        sys.exit(12)

    for cand in selected:
        mid = cand["media_id"]
        info = idx.get(mid)
        if not info or not info.get("original_path"):
            results.append({
                "media_id": mid, "status": "BLOCKED",
                "blocker": "no local path mapping",
            })
            continue
        src = Path(info["original_path"])
        if not src.exists():
            results.append({
                "media_id": mid, "status": "BLOCKED",
                "blocker": "source file missing at revalidation",
            })
            continue

        wav = cache_dir / f"{mid}.wav"
        if not _extract_audio(src, wav):
            results.append({
                "media_id": mid, "status": "BLOCKED",
                "blocker": "ffmpeg audio extraction failed",
            })
            continue

        try:
            segments, elapsed, language, lang_prob = _transcribe_wav(model, wav)
        except Exception as exc:
            results.append({
                "media_id": mid, "status": "BLOCKED",
                "blocker": f"transcribe failed: {type(exc).__name__}: {exc}",
            })
            continue

        results.append({
            "media_id": mid,
            "source_alias": cand.get("source_alias"),
            "media_type": cand.get("media_type"),
            "duration_seconds": float(cand["probe"]["duration"]),
            "transcription_engine": "faster-whisper",
            "model": model_name,
            "compute_device": "cpu",
            "compute_type": "int8",
            "wall_clock_seconds": round(elapsed, 2),
            "realtime_factor": (
                round(elapsed / float(cand["probe"]["duration"]), 3)
                if float(cand["probe"]["duration"]) > 0 else None
            ),
            "segment_count": len(segments),
            "language_detected": language,
            "language_probability": (
                round(float(lang_prob), 4) if lang_prob is not None else None
            ),
            "segments": segments,
            "status": "TRANSCRIBED",
        })
        # write a transcript artifact per clip (local only)
        tr_path = out_dir / f"TRANSCRIPT_{mid}.json"
        assert_output_outside_sources(tr_path)
        tr_path.write_text(json.dumps({
            "media_id": mid,
            "engine": "faster-whisper",
            "model": model_name,
            "language_detected": language,
            "language_probability": (
                round(float(lang_prob), 4) if lang_prob is not None else None
            ),
            "approval_status": "UNAPPROVED — DRAFT",
            "segments": segments,
        }, indent=2), encoding="utf-8")

    # benchmark summary
    benchmark = {
        "pilot_month": month,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "engine": "faster-whisper",
        "model": model_name,
        "device": "cpu",
        "compute_type": "int8",
        "clips_requested": clips,
        "clips_transcribed": sum(1 for r in results if r["status"] == "TRANSCRIBED"),
        "clips_blocked": sum(1 for r in results if r["status"] == "BLOCKED"),
        "local_cloud_boundary": "local_only (model loaded on local CPU)",
        "results": results,
    }
    out = out_dir / "TRANSCRIBE_BENCHMARK.json"
    assert_output_outside_sources(out)
    out.write_text(json.dumps(benchmark, indent=2), encoding="utf-8")
    print(json.dumps({
        "transcribed": benchmark["clips_transcribed"],
        "blocked": benchmark["clips_blocked"],
        "report": str(out),
    }, indent=2))
    return benchmark


# ---------------------------------------------------------------------------
# 03F — Source mutation proof (revalidate SHA-256 + timestamps/sizes)
# ---------------------------------------------------------------------------
def cmd_verify_source() -> dict:
    setup_logging()
    month = resolve_pilot_month(strict=True)
    out_dir = month_output_dir(month)
    baseline_path = out_dir / "SOURCE_BASELINE.json"
    local_idx_path = out_dir / "LOCAL_SHA256_INDEX.json"
    if not baseline_path.exists() or not local_idx_path.exists():
        sys.stderr.write(
            "[pilot03] baseline or sha256 index missing; run baseline+manifest\n"
        )
        sys.exit(9)
    baseline = json.loads(baseline_path.read_text(encoding="utf-8"))
    idx = json.loads(local_idx_path.read_text(encoding="utf-8"))

    by_filename_before = {e["filename"]: e for e in baseline["entries"]}
    by_path_before = {e["original_path"]: e for e in baseline["entries"]}
    before_paths = set(by_path_before.keys())

    after_paths: set[str] = set()
    deltas = {
        "files_added_to_source": 0,
        "files_removed_from_source": 0,
        "files_renamed_in_source": 0,
        "source_files_modified": 0,
        "sha256_revalidated": 0,
        "sha256_mismatch": 0,
        "mtime_changed": 0,
        "size_changed": 0,
    }
    issues: list[dict] = []

    for src in load_active_sources():
        root = Path(src["path"])
        if not root.is_dir():
            continue
        for fp in root.rglob("*"):
            if not fp.is_file() or fp.suffix.lower() not in ALL_MEDIA:
                continue
            if _month_of_path(fp) != month:
                continue
            after_paths.add(str(fp))

    # removed
    removed = before_paths - after_paths
    added_paths = after_paths - before_paths
    deltas["files_removed_from_source"] = len(removed)
    deltas["files_added_to_source"] = len(added_paths)
    if removed:
        issues.extend({"kind": "removed", "path": p} for p in sorted(removed))
    if added_paths:
        issues.extend({"kind": "added", "path": p} for p in sorted(added_paths))

    # re-hash existing
    renamed = 0
    for media_id, info in idx.items():
        p = info.get("original_path")
        if not p or p not in by_path_before:
            continue
        path = Path(p)
        if not path.exists():
            issues.append({"kind": "missing_at_revalidation", "path": p})
            continue
        try:
            st = path.stat()
            new_h = sha256_file(path)
        except Exception as exc:
            issues.append({"kind": "rehash_failed", "path": p, "err": str(exc)})
            continue
        deltas["sha256_revalidated"] += 1
        if new_h != info.get("sha256"):
            deltas["sha256_mismatch"] += 1
            issues.append({"kind": "sha256_changed", "path": p,
                           "before": info.get("sha256"), "after": new_h})
        if st.st_size != info.get("size_bytes"):
            deltas["size_changed"] += 1
            issues.append({"kind": "size_changed", "path": p,
                           "before": info.get("size_bytes"),
                           "after": st.st_size})
        if datetime.fromtimestamp(st.st_mtime).isoformat() != info.get("mtime_iso"):
            deltas["mtime_changed"] += 1
            # mtime change alone is not necessarily a mutation; report it
            issues.append({"kind": "mtime_changed", "path": p,
                           "before": info.get("mtime_iso"),
                           "after": datetime.fromtimestamp(st.st_mtime).isoformat()})
        if path.name != by_path_before[p]["filename"]:
            renamed += 1
            issues.append({"kind": "renamed", "path": p,
                           "before": by_path_before[p]["filename"],
                           "after": path.name})
    deltas["files_renamed_in_source"] = renamed
    if deltas["sha256_mismatch"] > 0:
        deltas["source_files_modified"] += deltas["sha256_mismatch"]

    verdict = {
        "pilot_month": month,
        "checked_at": datetime.now().isoformat(timespec="seconds"),
        "before_file_count": baseline["file_count"],
        "after_file_count": len(after_paths),
        "deltas": deltas,
        "issues": issues,
        "guard_pass": (
            deltas["files_added_to_source"] == 0 and
            deltas["files_removed_from_source"] == 0 and
            deltas["files_renamed_in_source"] == 0 and
            deltas["sha256_mismatch"] == 0 and
            deltas["size_changed"] == 0
        ),
    }
    out = out_dir / "SOURCE_MUTATION_PROOF.json"
    assert_output_outside_sources(out)
    out.write_text(json.dumps(verdict, indent=2), encoding="utf-8")
    print(json.dumps(verdict, indent=2))
    if not verdict["guard_pass"]:
        sys.stderr.write(
            "[pilot03] source mutation proof FAILED — see issues[].\n"
        )
        sys.exit(10)
    print(f"\nsource mutation proof -> PASS  ({out})")
    return verdict


# ---------------------------------------------------------------------------
# Bounded end-to-end runner (single month, full circuit)
# ---------------------------------------------------------------------------
def cmd_run() -> None:
    setup_logging()
    log.info("=== Phase 03 vertical slice run ===")
    cmd_preflight()
    cmd_baseline()
    cmd_manifest()
    cmd_media_info()
    cmd_stai_bridge()
    cmd_transcribe(clips=1, model_name="tiny")
    cmd_story()
    proof = cmd_verify_source()
    if not proof["guard_pass"]:
        sys.exit(10)
    log.info("=== Phase 03 vertical slice complete. MONTH_STORY.md UNAPPROVED — "
             "STOP for Bambu review. ===")


PILOT03_COMMANDS = {
    "pilot03-preflight": cmd_preflight,
    "pilot03-baseline": cmd_baseline,
    "pilot03-manifest": cmd_manifest,
    "pilot03-media-info": cmd_media_info,
    "pilot03-stai-bridge": cmd_stai_bridge,
    "pilot03-transcribe": cmd_transcribe,
    "pilot03-story": cmd_story,
    "pilot03-verify-source": cmd_verify_source,
    "pilot03-run": cmd_run,
}