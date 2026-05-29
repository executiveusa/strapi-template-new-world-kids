# Coolify API Notes

Official docs: [Coolify API Reference](https://coolify.io/docs/api-reference/api/)

## Auth

- Use a Coolify API token as the bearer token.
- If the token 401s on `/api/v1/version`, stop and get the correct token or log in through the browser.

## Useful endpoints

- `GET /api/v1/version`
- `GET /api/v1/applications`
- `GET /api/v1/applications/{uuid}`
- `GET /api/v1/applications/{uuid}/envs`
- `PATCH /api/v1/applications/{uuid}/envs`
- `PATCH /api/v1/applications/{uuid}/envs/bulk`
- `PATCH /api/v1/applications/{uuid}`
- `GET /api/v1/applications/{uuid}/start`
- `GET /api/v1/applications/{uuid}/restart`
- `GET /api/v1/applications/{uuid}/stop`

## Safe env sync rule

- Sync only app runtime keys from allowlisted prefixes.
- Keep private SSH keys and operator-only tokens out of app env sync.
- If a value is multiline or private-key-shaped, assume it belongs to support tooling, not the app container.
