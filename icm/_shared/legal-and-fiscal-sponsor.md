---
type: governance
scope: fundraising-and-grants
sensitivity: internal
---

# Fiscal sponsor and governance

## Verified relationship
- New World Kids has a signed fiscal sponsorship agreement with **Humanitarian Social Innovations (HSI)**.
- The agreement identifies HSI as Grantor/fiscal sponsor and NW Kids as Grantee for the sponsored program.
- The signed agreement is dated **April 13, 2023**.
- Washington incorporation is a separate record; do not merge state incorporation with federal tax-exempt status.

## Sponsor controls that agents must honor
- Funding sources approached and fundraising materials are subject to HSI requirements and approval processes.
- HSI's current program-resource page states: **all grants must be reviewed by HSI staff before the program submits the grant**.
- An agent may research, qualify, draft, assemble attachments, and prepare a submission checklist. It may not submit a grant until HSI review/approval has been recorded.
- For Model C domestic/international program fund requests, use HSI's current Model C process rather than emailing a payment request.

## Required public fiscal-sponsorship disclosure
HSI's current onboarding resource instructs programs to display its required fiscal-sponsorship statement and HSI logo on the program website. Treat the wording supplied by HSI as the source of truth and do not rewrite the legal relationship from memory.

## EIN rule
The EIN associated with HSI's 501(c)(3) status belongs to **Humanitarian Social Innovations**. Do not describe it as New World Kids' own federal EIN or imply that state nonprofit incorporation alone equals federal 501(c)(3) recognition.

## Submission gate
Every grant record must contain:
- `hsi_review_status: pending | approved | changes-requested`
- `hsi_reviewed_at:`
- `hsi_reviewer:`
- `owner_approved: true | false`

No external grant submission is allowed while `hsi_review_status != approved`.
