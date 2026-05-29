---
name: coolify-one-click-deploy
description: One-click Coolify deployment and Hostinger VPS wiring for New World Kids apps. Use when configuring Coolify applications, syncing approved env vars, patching server/app settings, starting deployments, and verifying the live site.
---

# Coolify One-Click Deploy

Use this skill when the task is to take a New World Kids app live on Coolify and keep the Hostinger VPS path honest.

## Default flow

1. Read `graphify-out/GRAPH_REPORT.md`, repo `AGENTS.md`, and `agent-skills/source-status.json` first.
2. Use `scripts/setup-coolify-site.ps1` in this skill folder to:
   - load the Coolify token from approved local sources
   - fetch the existing application by UUID
   - sync only allowlisted runtime env vars
   - patch app settings only when explicit inputs are provided
   - trigger deploy / restart
   - write a machine-readable report
3. If browser verification is needed, start remote-debug Chrome with the repo browser-control scripts and verify the live page with browser-harness.
4. If Hostinger/VPS access is required, verify SSH reachability first. Do not assume the VPS is reachable just because the Coolify app exists.

## Guardrails

- Never print secrets or copy private keys into chat, logs, docs, or skill files.
- Only sync allowlisted app env vars.
- Treat 401/403 from Coolify as a real blocker, not a flaky retry loop.
- Stop if the app is already live but the health endpoint fails.

## Inputs

- Coolify app UUID
- Optional project / server / domain details
- Env source file(s)
- Optional health URL
- Optional SSH host, user, and key path for VPS reachability checks

## Outputs

- Coolify API report JSON
- Deployment status
- Optional SSH health status
- Follow-up blockers if auth or network access is missing

## References

- [Coolify API](references/coolify-api.md)
- [Hostinger VPS](references/hostinger-vps.md)
- [One-click script](scripts/setup-coolify-site.ps1)
