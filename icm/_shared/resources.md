---
type: resource-catalog
scope: fundraising-and-grants
sensitivity: internal
---

# HSI and fundraising resources

This file catalogs what exists. **Credentials never belong here.** Store secrets in the agent's local secret store or deployment environment and refer to them by variable name only.

## Fundraising
- **FundRazr** — HSI provides sponsored programs access to FundRazr and a basic donation link. Primary use: campaign pages, contributions, donor reporting, social/email sharing, campaign updates, and website embeds.
- **Auctria** — available through HSI for online auctions and golf-tournament fundraising. HSI provides unique admin access on request.
- **HSI fundraising documents** — current W-9, 501(c)(3) determination letters for HSI, gift-in-kind form, state fundraising certificates.
- **HSI program leader community** — Tuesday open Zoom, private program-leader Facebook group, event submission, Volunteer Center benefit.

## Grant writing
- **GrantStation** — HSI-provided membership for human grant research. Use only through the permitted member interface and within GrantStation's terms.
- **HSI grant documents** — HSI determination letters, reviewed/audited financial statements, IRS Form 990s, current W-9, governing board, operating budget.
- **HSI grant-writing tools** — sample program budget, grant-management binder table of contents, grantmaker directory.

## Media and rights
- **TinEye** — reverse-image checking to investigate provenance/reuse risk.
- **123RF** — HSI-provided stock-image resource. Credentials must remain outside Git.

## Secret references
Use names such as:
- `HSI_MEMBER_USERNAME`
- `HSI_MEMBER_PASSWORD`
- `GRANTSTATION_USERNAME`
- `GRANTSTATION_PASSWORD`
- `FUNDRAZR_USERNAME`
- `FUNDRAZR_PASSWORD`

Do not place values in this repository, logs, prompts saved to disk, screenshots, issue bodies, or public ledger entries.
