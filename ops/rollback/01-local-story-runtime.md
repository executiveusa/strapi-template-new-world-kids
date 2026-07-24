# Rollback — Phase 01

## Git

```bash
git checkout main && git pull
git revert <phase-01-squash-sha> --no-edit
git push origin main
```

## Local

- Runtime configs under `story-system/config/` can be deleted and regenerated with `setup_windows.bat`.
- Do not touch Culture Shock footage root.
