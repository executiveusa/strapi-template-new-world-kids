---
name: hostinger-api-cli
description: Use when you need a token-backed CLI bridge to the official Hostinger API MCP server for VPS, hosting, DNS, or deployment tasks. It loads the approved Hostinger token from local env files and calls the server through mcp2cli so the agent can use Hostinger actions without loading the full schema into context.
---

# Hostinger API CLI Bridge

This skill turns the official Hostinger MCP server into a repeatable CLI path for agent work.

## What it is

- Official server: `hostinger/api-mcp-server`
- CLI bridge: `mcp2cli`
- Auth source: approved local env files only
- Primary use: VPS and hosting control from a compact command path

## When to use it

- You need to inspect or manage a Hostinger VPS from a shell-friendly flow.
- You want a lazy MCP connection instead of loading a whole tool schema into context.
- You need a repeatable command for `list`, `search`, or a specific Hostinger tool call.

## Guardrails

- Never paste the Hostinger token into chat.
- Never hardcode the token in this repo.
- Prefer the smallest Hostinger slice that fits the job, usually `hostinger-vps-mcp`.
- If the CLI path fails auth, stop and refresh the token from the approved env source.

## Local CLI

Use the wrapper script:

```powershell
.\agent-skills\local\hostinger-api-cli\scripts\hostinger-cli.ps1 list
.\agent-skills\local\hostinger-api-cli\scripts\hostinger-cli.ps1 search "virtual machine"
.\agent-skills\local\hostinger-api-cli\scripts\hostinger-cli.ps1 call --tool listVirtualMachines
```

The script loads `HOSTINGER_API_TOKEN` from approved local env files if it is not already set, then runs the official Hostinger MCP server package `hostinger-api-mcp` through `mcp2cli`.
If that token is rejected, use the wrapper's `login` command to trigger the OAuth flow and cache valid credentials locally.

## Notes

- Use `hostinger-api-mcp` for the general server bridge.
- Use `hostinger-vps-mcp` only after the package is installed globally and you want the VPS-specific executable directly.
- Use `hostinger-hosting-mcp` only when the task is about websites/hosting rather than VPS control.
- Keep the tool schema lazy. Use `--search` before `--list`, and `--list` before a real tool call.
- If a direct token call returns 401, prefer `login` over retrying the same token.
