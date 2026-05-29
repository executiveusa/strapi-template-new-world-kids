# Agent Skills

This folder holds the project-local skill bundle and the manifest of external agent references used during the New World Kids rebuild.

## Tracked in the repo

- `local/` - vendored skill folders copied into this project for direct reference
- `source-status.json` - manifest of the cloned and copied skill sources
- `local/a2ui-standard/` - house guidance for agent-generated UI contracts
- `local/copilotkit-ag-ui-standard/` - house guidance for AG-UI runtime adoption
- `local/post-maxx-sitewide/` - Absurd-backed sitewide workflow for POST-MAXX, cinematic UI, and final review handoff
- `local/pi-review/` - final review gate skill derived from earendil-works/pi-review

## Local-only

- `external/` - cloned upstream repositories used as working references during implementation
- `external/A2UI/` - Google A2UI reference repo for agent-to-user interface patterns
- `external/CopilotKit/` - CopilotKit reference repo for AG-UI and frontend runtime patterns
- `external/absurd/` - Postgres-native durable workflow reference
- `external/pi-review/` - review workflow reference
- `external/seedance-skill/` - motion graphics prompt and generation reference
- `external/hyperframes-helper/` - HyperFrames HTML-to-MP4 reference kit
- `external/cinematic-site-components-robonuggets/` - motion component reference archive
- `external/21st-main/` - 21st.dev component reference archive
- `external/design-resources-for-developers-master/` - curated developer design resource archive

`external/` is intentionally gitignored so the main repo does not absorb embedded third-party repositories.
