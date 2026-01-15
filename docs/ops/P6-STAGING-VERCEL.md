# P6 Staging on Vercel

## Security & env handling
- Use `C:\Users\Trevor\Documents\master.env` as the source of truth for environment values.
- Do not commit `.env*` files to the repository.
- Load secrets into Vercel Preview/Production only via the Vercel CLI or dashboard.
## Decision
Use Vercel Preview Deployments as staging for `apps/web`.

## Rationale
- Preview deployments align with Vercel's native staging flow.
- Separate URLs per commit provide auditability and rollback.
- Avoids extra project management overhead.

## Branch policy
- Staging uses the primary release branch for preview builds.
- Production promotion occurs only after staging verification.

## Env scope
- Preview env vars must be sourced from a secure, project-agnostic env file or secret manager (for example, a `master.env` stored outside the repo and referenced via an environment variable such as `MASTER_ENV_PATH`).
- Never commit secrets or `.env*` files.

## Security & env handling
- Treat the centrally managed env source (e.g., your designated `master.env` location or secret manager configured via `MASTER_ENV_PATH`) as the canonical source of truth.
- Load secrets into Vercel via the dashboard/CLI, not the repo.
