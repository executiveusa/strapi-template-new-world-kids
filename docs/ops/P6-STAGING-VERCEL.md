# P6 Staging on Vercel

## Security & env handling
- Use `C:\Users\Trevor\Documents\master.env` as the source of truth for environment values.
- Do not commit `.env*` files to the repository.
- Load secrets into Vercel Preview/Production only via the Vercel CLI or dashboard.
