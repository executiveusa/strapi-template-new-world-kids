"""Project-specific Browser Harness helpers for New World Kids.

This file is loaded by Browser Harness when BH_AGENT_WORKSPACE points at this
directory. Keep vendor/browser-harness untouched and extend behavior here.
"""

from __future__ import annotations

from pathlib import Path

from browser_harness import helpers as bh


def _artifacts_dir() -> Path:
    artifacts = Path(bh.AGENT_WORKSPACE).parent / "artifacts"
    artifacts.mkdir(parents=True, exist_ok=True)
    return artifacts


def artifact_path(name: str) -> str:
    return str(_artifacts_dir() / name)


def open_visible_page(url: str, settle_seconds: float = 2.0) -> dict:
    """Open a URL in a new foreground tab and let the page settle."""

    bh.new_tab(url)
    bh.wait_for_load()
    if settle_seconds:
        bh.wait(settle_seconds)
    return bh.page_info()


def capture_named_screenshot(
    name: str, *, full: bool = False, max_dim: int | None = 1800
) -> str:
    """Capture a screenshot into the repo artifact directory."""

    destination = artifact_path(name)
    bh.capture_screenshot(destination, full=full, max_dim=max_dim)
    return destination


def snapshot_page_state(label: str = "page") -> dict:
    """Return a small structured snapshot for logs and smoke tests."""

    info = bh.page_info()
    return {
        "label": label,
        "title": info.get("title"),
        "url": info.get("url"),
        "viewport": {"width": info.get("w"), "height": info.get("h")},
        "scroll": {"x": info.get("sx"), "y": info.get("sy")},
        "page": {"width": info.get("pw"), "height": info.get("ph")},
    }


def read_github_repository_heading() -> dict:
    """Extract the visible GitHub repository heading and location."""

    heading = bh.js(
        """
        (() => {
          const heading = document.querySelector('main h1 strong a, main h1');
          return {
            title: document.title,
            heading: heading ? heading.textContent.trim() : null,
            url: location.href
          };
        })()
        """
    )
    return heading or {}
