# Agent Skills

This folder holds the project-local skill bundle and the manifest of external agent references used during the New World Kids rebuild.

## Tracked in the repo

- `local/` - vendored skill folders copied into this project for direct reference
- `source-status.json` - manifest of the cloned and copied skill sources
- `local/a2ui-standard/` - house guidance for agent-generated UI contracts
- `local/copilotkit-ag-ui-standard/` - house guidance for AG-UI runtime adoption

## Local-only

- `external/` - cloned upstream repositories used as working references during implementation
- `external/A2UI/` - Google A2UI reference repo for agent-to-user interface patterns
- `external/CopilotKit/` - CopilotKit reference repo for AG-UI and frontend runtime patterns

`external/` is intentionally gitignored so the main repo does not absorb embedded third-party repositories.
