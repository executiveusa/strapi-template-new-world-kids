# Legacy Strapi Types

`@repo/strapi-types` now exists only as a compatibility package for legacy imports that still live in the UI codebase.

## Why it still exists

- older UI modules still import `@repo/strapi-types`
- Strapi itself has been removed from the active runtime
- we are preserving the import surface while the remaining legacy modules are retired or rewritten

## Current behavior

- the package re-exports core utility types from `@strapi/strapi`
- generated schema files are now a lightweight compatibility shim
- `sync-types` is intentionally a no-op because there is no active Strapi app in this repo

## Direction

Use this package only to avoid breaking older imports during migration. New work should not depend on Strapi content models.
