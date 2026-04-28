# Hermes Service

Separate backend service for the New World Kids platform.

This service is the thin harness around the nonprofit operations layer:

- trust and verification document APIs
- article-scoped chat for the journal
- agent profile and skill manifest endpoints
- integration points for Synthia Gateway, GBrain, and browser harness workers

## Local commands

```bash
pnpm -F @repo/hermes dev
pnpm -F @repo/hermes build
pnpm -F @repo/hermes start
```

## Environment

- `PORT` default `4010`
- `APP_PUBLIC_URL` public site URL for expanding trust doc links
- `SYNTHIA_GATEWAY_URL` OpenAI-compatible gateway URL
- `SYNTHIA_GATEWAY_API_KEY` shared gateway key if the gateway is protected
- `SYNTHIA_MODEL` optional model name, defaults to `gpt-4o-mini`
- `GBRAIN_MCP_COMMAND` optional command string for GBrain MCP
- `BROWSER_HARNESS_URL` optional URL for a remote browser harness service
- `SKIP_PUBLIC_URL` optional grants platform URL
- `CREEM_PUBLIC_URL` optional paid services URL
- `BUY_ME_A_COFFEE_URL` optional support widget URL
