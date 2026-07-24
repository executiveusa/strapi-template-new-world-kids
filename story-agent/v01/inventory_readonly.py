"""Phase 02 read-only inventory. Never modifies source roots."""
from __future__ import annotations

import json
import os
import re
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(
    os.environ.get(
        "NWK_STORY_ROOT",
        r"E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\story-system",
    )
)
VIDEO = {
    ".mp4", ".mov", ".avi", ".mkv", ".mts", ".m2ts", ".mpg", ".mpeg",
    ".wmv", ".m4v", ".webm", ".flv", ".3gp",
}
PHOTO = {
    ".jpg", ".jpeg", ".png", ".raw", ".cr2", ".cr3", ".nef", ".arw", ".dng",
    ".heic", ".heif", ".tif", ".tiff", ".webp", ".gif", ".bmp",
}
AUDIO = {".wav", ".mp3", ".aac", ".m4a", ".flac", ".ogg", ".wma", ".aif", ".aiff"}
MON = {
    "JAN": 1, "FEB": 2, "FEBRUARY": 2, "MAR": 3, "MARCH": 3, "APR": 4, "APRIL": 4,
    "MAY": 5, "JUN": 6, "JUNE": 6, "JUL": 7, "JULY": 7, "AUG": 8, "SEP": 9,
    "SEPT": 9, "SEPTEMBER": 9, "OCT": 10, "OCTOBER": 10, "NOV": 11, "NOVEMBER": 11,
    "DEC": 12, "DECEMBER": 12,
}


def month_from_path(p: Path) -> str:
    s = str(p)
    m = re.search(
        r"(JAN|FEB|FEBRUARY|MAR|MARCH|APR|APRIL|MAY|JUN|JUNE|JUL|JULY|AUG|SEP|"
        r"SEPT|SEPTEMBER|OCT|OCTOBER|NOV|NOVEMBER|DEC|DECEMBER)\s*(\d{4})",
        s,
        re.I,
    )
    if m:
        return f"{m.group(2)}-{MON[m.group(1).upper()]:02d}"
    m = re.search(r"(20\d{2})-(\d{2})", s)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    m = re.search(r"(20\d{2})", s)
    if m:
        return f"{m.group(1)}-00"
    return "UNKNOWN"


def active_sources(sources: list[dict]) -> list[dict]:
    out = []
    for s in sources:
        path = str(s.get("path", ""))
        up = path.upper()
        if not path or up.startswith("FILL_IN") or "FILL_IN" in up:
            continue
        if s.get("enabled") is False:
            continue
        if not s.get("readonly", True):
            raise SystemExit(f"non-readonly source refused: {path}")
        out.append(s)
    return out


def main() -> int:
    sources_path = ROOT / "config" / "sources.json"
    if not sources_path.exists():
        print("sources.json missing", file=sys.stderr)
        return 1
    sources = active_sources(json.loads(sources_path.read_text(encoding="utf-8"))["sources"])
    if not sources:
        print("no active sources", file=sys.stderr)
        return 1

    totals = dict(files=0, video=0, photo=0, audio=0, other=0, bytes=0, unreadable=0)
    by_month: dict[str, dict] = defaultdict(
        lambda: dict(files=0, bytes=0, video=0, photo=0, audio=0, other=0)
    )
    by_source: dict[str, dict] = defaultdict(lambda: dict(files=0, bytes=0))
    name_size: dict[tuple[str, int], list[str]] = defaultdict(list)
    unreadable: list[dict] = []
    source_mtimes: list[dict] = []

    for src in sources:
        root = Path(src["path"])
        if not root.is_dir():
            print(f"missing source: {root}", file=sys.stderr)
            return 1
        try:
            source_mtimes.append(
                {
                    "path": str(root),
                    "mtime": datetime.fromtimestamp(root.stat().st_mtime).isoformat(),
                }
            )
        except OSError:
            pass
        for fp in root.rglob("*"):
            if not fp.is_file():
                continue
            totals["files"] += 1
            try:
                size = fp.stat().st_size
                totals["bytes"] += size
                ext = fp.suffix.lower()
                if ext in VIDEO:
                    mt = "video"
                    totals["video"] += 1
                elif ext in PHOTO:
                    mt = "photo"
                    totals["photo"] += 1
                elif ext in AUDIO:
                    mt = "audio"
                    totals["audio"] += 1
                else:
                    mt = "other"
                    totals["other"] += 1
                ym = month_from_path(fp)
                by_month[ym]["files"] += 1
                by_month[ym]["bytes"] += size
                by_month[ym][mt] += 1
                by_source[src["id"]]["files"] += 1
                by_source[src["id"]]["bytes"] += size
                name_size[(fp.name.lower(), size)].append(str(fp))
            except OSError as exc:
                totals["unreadable"] += 1
                if len(unreadable) < 50:
                    unreadable.append({"path": str(fp), "error": str(exc)})

    dup_groups = {
        f"{n}|{sz}": paths for (n, sz), paths in name_size.items() if len(paths) > 1
    }
    dup_files = sum(len(v) for v in dup_groups.values())

    cands = []
    for ym, st in by_month.items():
        if ym == "UNKNOWN" or ym.endswith("-00"):
            continue
        y, m = ym.split("-")
        if not y.isdigit() or int(y) < 2020:
            continue
        files = st["files"]
        vid = st["video"]
        gb = st["bytes"] / (1024 ** 3)
        score = 0
        if 30 <= files <= 400:
            score += 3
        elif 10 <= files < 30:
            score += 1
        elif files > 1000:
            score -= 5
        if vid >= 10:
            score += 2
        if 1 <= gb <= 40:
            score += 2
        if y >= "2024":
            score += 2
        if y == "2023" and m == "10":
            score -= 2
        # tie-break: higher score, then fewer files (better first pilot), then smaller GB
        cands.append((score, -files, -gb, ym, st, gb))
    cands.sort(reverse=True)
    rec = (cands[0][0], cands[0][3], cands[0][4], cands[0][5]) if cands else None

    report = {
        "inventory_id": "phase02-readonly-" + datetime.now().strftime("%Y%m%dT%H%M%S"),
        "mode": "read_only",
        "method": "filesystem_walk_folder_month_name_size_dups_no_exif",
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "system_root": str(ROOT),
        "source_files_modified": 0,
        "sources": [{"id": s["id"], "path": s["path"], "readonly": True} for s in sources],
        "totals": {**totals, "gb": round(totals["bytes"] / (1024 ** 3), 2)},
        "by_source": {
            k: {**v, "gb": round(v["bytes"] / (1024 ** 3), 2)} for k, v in by_source.items()
        },
        "by_month": {
            k: {**v, "gb": round(v["bytes"] / (1024 ** 3), 2)}
            for k, v in sorted(by_month.items())
        },
        "years_present": sorted({k[:4] for k in by_month if k[:4].isdigit()}),
        "duplicate_candidates": {
            "method": "same_filename_and_byte_size",
            "groups": len(dup_groups),
            "files_in_groups": dup_files,
            "sample_groups": dict(list(dup_groups.items())[:15]),
        },
        "unreadable_sample": unreadable,
        "source_root_mtime_sample": source_mtimes,
        "recommended_first_month": None
        if not rec
        else {
            "month": rec[1],
            "score": rec[0],
            "files": rec[2]["files"],
            "video": rec[2]["video"],
            "photo": rec[2]["photo"],
            "gb": round(rec[3], 2),
            "why": [
                "Scored from folder-derived months present in Culture Shock inventory",
                "Prefers bounded file counts and recent years",
                "Does not auto-select October 2023",
                "Requires Bambu approval before Phase 03 processing",
            ],
        },
        "top_candidates": [
            {
                "month": c[3],
                "score": c[0],
                "files": c[4]["files"],
                "video": c[4]["video"],
                "gb": round(c[5], 2),
            }
            for c in cands[:8]
        ],
    }

    out_dir = ROOT / "indexes"
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / "phase02_readonly_inventory.json"
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")
    summary = {
        "totals": report["totals"],
        "years": report["years_present"],
        "dup_groups": report["duplicate_candidates"]["groups"],
        "dup_files": report["duplicate_candidates"]["files_in_groups"],
        "recommended": report["recommended_first_month"],
        "top_candidates": report["top_candidates"],
        "months": {k: v["files"] for k, v in report["by_month"].items()},
    }
    (out_dir / "phase02_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))
    print("WROTE", out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
