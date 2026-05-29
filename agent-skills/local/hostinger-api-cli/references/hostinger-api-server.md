# Hostinger API MCP Server

Source repo: https://github.com/hostinger/api-mcp-server.git

Key points for the CLI bridge:

- The server runs in `stdio` mode by default.
- `HOSTINGER_API_TOKEN` bypasses OAuth and is the preferred auth path for CLI usage.
- The server ships multiple entrypoints, including `hostinger-vps-mcp` and `hostinger-hosting-mcp`.
- For VPS control, use the VPS slice instead of loading the full 118-tool server.
- For hosting/site management, use the hosting slice.
