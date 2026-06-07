# New World Kids Separation Handoff

Date: 2026-05-31

## Objective

Finish the clean separation between the canonical New World Kids repo and the forked Strapi spillover app, preserve the surviving blog-based surface, and leave a cold-start handoff for the next agent.

## Canonical Repo

- Local path: `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\strapi-template-new-world-kids`
- Remote `origin`: `git@github.com:executiveusa/strapi-template-new-world-kids.git`
- Remote `upstream`: `https://github.com/notum-cz/strapi-next-monorepo-starter.git`

## Separation Decision

Treat `strapi-template-new-world-kids` as canonical.

Treat `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\strapi-repo` as the forked spillover app and do not merge from it blindly.

## Completed Separation Work

The codebase-level Strapi cut is complete.

Removed tracked Strapi-era surfaces:

- `apps/ui`
- `apps/strapi`
- `packages/strapi-types`
- `services/ai-orchestrator`
- `graphify-out`

Updated surviving workspace contract:

- Root [package.json](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/package.json) now points the root scripts at `@repo/blog` instead of the removed UI surface.
- [packages/shared-data/index.ts](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/packages/shared-data/index.ts) no longer describes itself as Strapi-specific.
- [packages/shared-data/package.json](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/packages/shared-data/package.json) and [packages/shared-data/tsconfig.json](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/packages/shared-data/tsconfig.json) were fixed so focused typecheck can run without the removed Strapi package assumptions.
- [packages/design-system/package.json](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/packages/design-system/package.json), [packages/design-system/src/build-ck-config.js](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/packages/design-system/src/build-ck-config.js), and [packages/design-system/README.md](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/packages/design-system/README.md) were renamed away from `styles-strapi.json` to `styles-editor.json`.
- [scripts/utils/rm-all.sh](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/scripts/utils/rm-all.sh) no longer looks for `.strapi`.
- [pnpm-lock.yaml](/E:/ACTIVE%20PROJECTS-PIPELINE/ACTIVE%20PROJECTS-PIPELINE/NEW%20WORLD%20KIDS/strapi-template-new-world-kids/pnpm-lock.yaml) was regenerated so removed Strapi workspace references are gone.

## Verification

What is verified:

- No live `@repo/strapi-types` imports remain in the active code/config surface.
- No live `@strapi/strapi` dependency references remain in the active code/config surface.
- No live `STRAPI_` environment references remain in the active code/config surface.
- Focused typecheck for `@repo/shared-data` passes.

What is not yet green:

- Full `pnpm install` did not finish within the tool timeout window.
- Root `pnpm typecheck` is still blocked by missing installed dependencies in the current environment.
- Root `pnpm build` was not completed for the same reason.

This means the separation is complete at the repo-structure and code-contract level, but full bootstrap verification still requires a successful dependency install.

## Current Repo State

Intentional deletion set still present in git status:

- `apps/ui/**`
- `apps/strapi/**`
- `packages/strapi-types/**`
- `services/ai-orchestrator/**`
- `graphify-out/**`

Modified files that define the new post-Strapi contract:

- `package.json`
- `packages/design-system/README.md`
- `packages/design-system/package.json`
- `packages/design-system/src/build-ck-config.js`
- `packages/design-system/src/custom-styles.css`
- `packages/shared-data/index.ts`
- `packages/shared-data/package.json`
- `packages/shared-data/tsconfig.json`
- `pnpm-lock.yaml`
- `scripts/utils/rm-all.sh`

## Sibling Repo Inventory

Snapshot from `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS`:

- `browser-harness` -> clean
- `cheggie-TradingAgents` -> 22 dirty paths
- `cinematic-site-components` -> clean
- `jcodemunch-mcp` -> clean
- `mcp2cli` -> clean
- `strapi-repo` -> 28 dirty paths
- `strapi-template-new-world-kids` -> 312 dirty paths, intentional separation work
- `synthia-gateway` -> 3 dirty paths
- `text-new-world-kids-lowrider-bike` -> clean

Important distinction:

- `strapi-repo` is the forked spillover app.
- `cheggie-TradingAgents` and `synthia-gateway` are separate sibling repos, not contamination inside the canonical NWK repo.

## Recommended Next Action In This Repo

1. Run a full install in an environment where `pnpm install` can complete.
2. Run root `pnpm typecheck`.
3. Run root `pnpm build`.
4. Decide whether to archive or delete `strapi-repo` after preserving anything intentionally unique.

## Fresh-Chat Prompt For The Next Agent

Use `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\strapi-template-new-world-kids` as the canonical repo.

Read this handoff first, then verify the current git status and confirm the Strapi separation is still limited to:

- deletion of `apps/ui`
- deletion of `apps/strapi`
- deletion of `packages/strapi-types`
- deletion of `services/ai-orchestrator`
- deletion of `graphify-out`
- root script changes for `@repo/blog`
- shared-data and design-system cleanup

Then finish bootstrap verification only:

1. get `pnpm install` to complete
2. run root `pnpm typecheck`
3. run root `pnpm build`
4. report only real blockers

Do not re-introduce Strapi. Do not merge from `strapi-repo` without a file-by-file keep-or-discard review.
