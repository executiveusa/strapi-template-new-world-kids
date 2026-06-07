# Source: https://www.youtube.com/@customaistudio/videos
# Scraped: 2026-06-07
---

## FETCH FAILED

**Status:** HTTP 403 Forbidden

**Reason:** YouTube returned a 403 Forbidden response. YouTube blocks automated/server-side fetches without a valid session cookie, and the sandbox network also enforces an outbound allowlist that blocks this domain.

**Attempted methods:**
- WebFetch (Claude built-in) — HTTP 403

**Recommended manual action:**
Visit the channel URL in a browser and copy the video list, or use yt-dlp (`yt-dlp --flat-playlist --print "%(title)s %(url)s"`) from a non-sandboxed machine.
