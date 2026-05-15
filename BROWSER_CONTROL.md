# Browser Control

This repo now ships with a reusable `browser-control/` layer for visible browser work, debugging, and repeatable automation.

## Tool Choice

- `Browser Harness` first for open-ended, self-healing browser tasks where we may need to adapt to a page in real time.
- `Chrome DevTools MCP` first for Chrome inspection, screenshots, console messages, network traffic, snapshots, and performance work.
- `Playwright` for deterministic scripts, repeatable flows, and test coverage.
- `Selenium` only as a fallback for legacy WebDriver cases or non-CDP edge cases.

## Workspace Layout

- `browser-control/agent-workspace/`
  - `agent_helpers.py` project-specific Browser Harness helpers
  - `domain-skills/` learned site/task workflows
- `browser-control/scripts/`
  - setup scripts
  - verification scripts
  - smoke flows
- `browser-control/artifacts/`
  - screenshots and JSON outputs from smoke runs
- `browser-control/logs/`
  - setup and verification logs
- `browser-control/vendor/`
  - runtime clones for `browser-harness` and `chrome-devtools-mcp`

`browser-control/vendor/` is intentionally ignored in git. The setup scripts clone and install the tools locally when needed.

## Commands

Run these from the repo root:

```powershell
pnpm run browser:setup
pnpm run browser:chrome
pnpm run browser:verify
```

Or install pieces separately:

```powershell
pnpm run browser:setup:harness
pnpm run browser:setup:devtools
pnpm run browser:setup:playwright
pnpm run browser:setup:selenium
```

## Start Chrome With Remote Debugging

Default repo command:

```powershell
pnpm run browser:chrome
```

That launches a visible Chrome window on `http://127.0.0.1:9222` with an isolated profile.

Manual equivalent:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="$env:TEMP\new-world-kids-browser-control"
```

Important: while the remote debugging port is open, local applications on this machine can control that browser.

If you intentionally need a personal profile, use the script switch and keep the browsing scope as narrow as possible:

```powershell
powershell -ExecutionPolicy Bypass -File .\browser-control\scripts\start-chrome-remote-debugging.ps1 -UseExistingProfile
```

## What The Verification Run Does

`pnpm run browser:verify` performs:

1. Launch or reconnect to Chrome on port `9222`
2. Open `https://github.com/browser-use/browser-harness` in a visible tab using Browser Harness
3. Take a Harness screenshot and capture title/url metadata
4. Connect Chrome DevTools CLI to the same browser
5. Capture a DevTools screenshot, page title, console messages, and network requests
6. Run a deterministic Playwright-over-CDP flow against the same page

Artifacts are written to:

- `browser-control/artifacts/browser-harness-smoke.png`
- `browser-control/artifacts/chrome-devtools-smoke.png`
- `browser-control/artifacts/playwright-cdp-smoke.png`
- `browser-control/artifacts/*.json`

## Troubleshooting

- `browser-harness` cannot attach:
  - Run `browser-harness --doctor`
  - Confirm Chrome is listening on `http://127.0.0.1:9222/json/version`
  - If needed, restart the daemon:
    ```powershell
    @'
    from browser_harness.admin import restart_daemon
    restart_daemon()
    '@ | python -
    ```
- `chrome-devtools` CLI cannot connect:
  - Run `chrome-devtools stop`
  - Restart with:
    ```powershell
    chrome-devtools start --browserUrl http://127.0.0.1:9222 --headless=false --usageStatistics=false
    ```
- Playwright cannot connect over CDP:
  - Make sure Chrome is still open on `9222`
  - Re-run `pnpm run browser:setup:playwright`
- Need more isolation:
  - Keep the default isolated profile
  - Avoid `-UseExistingProfile` unless a logged-in session is truly required

## Notes

- The Browser Harness overlay is kept outside the vendored repo so we can improve helpers and learned workflows without touching upstream protected core.
- Successful repeated flows should be promoted into `browser-control/agent-workspace/domain-skills/`.
