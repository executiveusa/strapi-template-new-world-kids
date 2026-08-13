---
type: governance
scope: agent-automation
sensitivity: internal
---

# Agent automation policy — fundraising, browser control, grants

## Default model
Agents may **prepare, organize, compare, draft, schedule, and report**. They may execute an external action only when the platform permits automation and the required human/sponsor gate has been satisfied.

## FundRazr
Preferred integration order:
1. Native FundRazr features and campaign settings.
2. Official/native integration or Zapier workflow where available.
3. FundRazr API only when the account/plan explicitly provides authorized API access.
4. Browser control for setup/maintenance only when a user has authorized the session and no safer supported integration exists.

Browser agents must never expose credentials in screenshots, logs, issue comments, memory files, or prompts saved to the repo. Destructive changes, payment-account changes, tax-receipt settings, campaign launch/unlaunch, and money-movement settings require human confirmation.

## GrantStation — hard restriction
GrantStation's published Terms of Use prohibit robots, spiders, automatic devices, automated monitoring/copying, AI/web scraping/data mining, and using the service through means other than the provided interface without prior written permission.

Therefore:
- Hermes **must not** autonomously scrape, crawl, bulk-copy, or computer-control GrantStation.
- Hermes may coach the human through searches, accept opportunity details the human exports/records lawfully, normalize those details into ICM records, compare them to NW Kids priorities, and draft from those human-provided records.
- If written permission is later obtained from GrantStation for a specific automated workflow, store the permission artifact in the governance area and update this policy before enabling automation.

## Open/public grant sources
Hermes may automate research over public sources whose terms permit it (for example public agency grant listings and funder pages), while respecting robots/rate limits and source terms. Every opportunity record must keep a source URL and retrieval date.

## HSI submission gate
HSI's current program resource page states that **all grants must be reviewed by HSI staff before program submission**. This rule supersedes any local dollar threshold. No agent is authorized to click a final grant-submission button without recorded HSI approval and owner approval.

## Communications
Agents may draft donor emails, social posts, LOIs, and funder questions. External sending/posting should use approved channels, keep an audit trail, and remain subject to the stage's human gate. Agents must not impersonate a named human or claim personal experiences they do not have.
