# Agent Guide (Claude)

- Use `LLM.txt` as the source of truth for layout, build commands, and deployment targets (note: `llms.txt` is a separate file and should not be used for these).
- Keep commits atomic and reversible.
- Never commit secrets or `.env*` files with secrets.
- Use Vercel Preview for staging and Coolify for backend services.
- Do not use Google Cloud for deployment or hosting.
