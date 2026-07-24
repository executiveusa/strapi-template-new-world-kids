# Thin StoryKit Bridge

```text
Bambu / StoryFoundry UI
  -> Local Story Agent / MediaOps  (story_agent.py)
  -> Thin StoryKit Bridge          (this folder)
  -> StoryToolkitAI engine         (external engine_path)
  -> Read-only source footage
```

## Rules

1. Do **not** fork or rewrite StoryToolkitAI.
2. Prefer `engine_path` reference in `../config/storytoolkitai.json` (copied to runtime).
3. Put only adapter scripts/config here if a thin adapter is proven necessary.
4. All derived outputs stay under `NWK_STORY_ROOT` (`story-system`), never inside source roots.
5. Heavy STAI jobs are out of scope until Phase 03 after inventory + month approval.
