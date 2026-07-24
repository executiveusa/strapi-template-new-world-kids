# Rollback — Phase 00

## What this phase changes

- Documentation/receipts under `ops/a2a`, `ops/reports`, `ops/receipts`, `ops/rollback` only (after PR merge).
- Local filesystem layout folders under `NEW WORLD KIDS 2026\` (non-git).

## Rollback git

```bash
git checkout main
git pull
git revert <phase-00-squash-sha> --no-edit
git push origin main
```

Or reset only if explicitly authorized by Bambu (do not force-push main without policy).

## Rollback local non-git

- Safe to remove empty layout folders under `story-system/` if unused.
- **Never** touch Culture Shock footage root.
- Non-canonical `newworldkids` clone at workspace root may remain or be deleted by Bambu; not required for Pilot 0.
