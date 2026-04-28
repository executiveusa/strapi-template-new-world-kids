# Agent Skills

This folder holds the project-local skill bundle and the manifest of external agent references used during the New World Kids rebuild.

## Tracked in the repo

- `local/` - vendored skill folders copied into this project for direct reference
- `source-status.json` - manifest of the cloned and copied skill sources

## Local-only

- `external/` - cloned upstream repositories used as working references during implementation

`external/` is intentionally gitignored so the main repo does not absorb embedded third-party repositories.
