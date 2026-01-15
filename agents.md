# Agent Guide (Codex/LLM)

## Core responsibilities
- Follow repo layout and build commands in `LLM.txt` (this is distinct from `llms.txt`).
- Keep changes atomic and reversible.
- Never commit secrets or `.env*` files with secrets.

## Execution tips
- Prefer workspace commands (`yarn dev:web`, `yarn build:web`).
- Document deployment decisions in `docs/ops/*`.
- Record staging/production evidence in `docs/phase/*`.

## Deployment targets
- Vercel for `apps/web` (Preview as staging).
- Coolify for backend services (`services/cms`).
- Do not use Google Cloud for deployment or hosting.
